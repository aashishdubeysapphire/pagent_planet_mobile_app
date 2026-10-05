package com.pageantplanet.braintree;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;

import com.braintreepayments.api.DropInClient;
import com.braintreepayments.api.DropInListener;
import com.braintreepayments.api.DropInPaymentMethod;
import com.braintreepayments.api.DropInRequest;
import com.braintreepayments.api.DropInResult;
import com.braintreepayments.api.PaymentMethodNonce;
import com.braintreepayments.api.UserCanceledException;
import com.braintreepayments.api.VenmoPaymentMethodUsage;
import com.braintreepayments.api.VenmoRequest;
import com.facebook.react.bridge.Callback;
import com.pageantplanet.MainActivity;
import com.pageantplanet.braintree.dropin.DemoClientTokenProvider;
import com.pageantplanet.braintree.dropin.Settings;


public class BraintreeUtil implements DropInListener {

    Context context;

    public MainActivity mMainActivity;

    private static final String KEY_NONCE = "nonce";

    private PaymentMethodNonce nonce;


    private DropInClient dropInClient;

    private boolean purchased = false;

    private DemoClientTokenProvider mDemoClientTokenProvider;
    Callback mSuccess;
    Callback mError;
    public BraintreeUtil(Context context, MainActivity currentActivity) {
        this.context = context;
        mMainActivity= currentActivity;
    }

    public void onCreate(Bundle savedInstanceState) {
        // NOTE: We intentionally do NOT restore nonce from savedInstanceState
        // and do NOT register a SharedPreferences listener here.
        // The demo app's listener called mMainActivity.recreate() on any pref change,
        // which would destroy the MainActivity (and DropInClient) mid-payment.
        configureDropInClient();
    }


    public void onResume() {
        if (purchased) {
            purchased = false;
            clearNonce();
        }
    }


    public void onSaveInstanceState(@NonNull Bundle outState) {
        if (nonce != null) {
            outState.putParcelable(KEY_NONCE, nonce);
        }
    }


    private void configureDropInClient() {
        mDemoClientTokenProvider = new DemoClientTokenProvider(context);
        dropInClient = new DropInClient(mMainActivity, mDemoClientTokenProvider);
        dropInClient.setListener(this);
        // NOTE: Do NOT call fetchMostRecentPaymentMethod here.
        // It triggers getClientToken() immediately, before intiBrainTree() has been
        // called from JS with a valid token. This poisoned the DropInClient state,
        // causing the Drop-In UI to open and close immediately.
    }
    public void intiBrainTree(String token) {
        mDemoClientTokenProvider.onTokenReceived(token);
    }


    public void launchDropIn(Callback success, Callback error) {
        mSuccess=success;
        mError=error;
        DropInRequest dropInRequest = new DropInRequest();
        dropInRequest.setVenmoRequest(new VenmoRequest(VenmoPaymentMethodUsage.SINGLE_USE));
        dropInRequest.setMaskCardNumber(true);
        dropInRequest.setMaskSecurityCode(true);
        dropInRequest.setGooglePayDisabled(true);
        dropInRequest.setPayPalDisabled(true);
        dropInRequest.setAllowVaultCardOverride(Settings.isSaveCardCheckBoxVisible(context));
        dropInRequest.setVaultCardDefaultValue(Settings.defaultVaultSetting(context));
        dropInRequest.setVaultManagerEnabled(Settings.isVaultManagerEnabled(context));
        dropInRequest.setCardholderNameStatus(Settings.getCardholderNameStatus(context));



        dropInClient.launchDropIn(dropInRequest);
    }




    public void handleDropInResult(DropInResult result) {
        if (result.getPaymentMethodType() == null
                || result.getPaymentMethodType() == DropInPaymentMethod.GOOGLE_PAY) {
            // google pay doesn't have a payment method nonce to display; fallback to OG ui
//      addPaymentMethodButton.setVisibility(VISIBLE);
        } else {
//      addPaymentMethodButton.setVisibility(GONE);

//      paymentMethodIcon.setImageResource(result.getPaymentMethodType().getDrawable());
            if (result.getPaymentMethodNonce() != null) {
                displayResult(result);
            }

//      purchaseButton.setEnabled(true);
        }
    }

    private void displayResult(DropInResult dropInResult) {
        nonce = dropInResult.getPaymentMethodNonce();

        DropInPaymentMethod paymentMethodType = dropInResult.getPaymentMethodType();
        if (paymentMethodType != null) {
//      paymentMethodTitle.setText(paymentMethodType.getLocalizedName());
//      paymentMethodIcon.setImageResource(paymentMethodType.getDrawable());
        }
    }

    private void clearNonce() {

    }

    @Override
    public void onDropInSuccess(@NonNull DropInResult dropInResult) {
        try {
            // getString() is Braintree's own method on PaymentMethodNonce that returns the nonce token
            String nonceString = dropInResult.getPaymentMethodNonce().getString();
            Log.d(getClass().getSimpleName(), "Drop-In success. Nonce: " + nonceString);
            mSuccess.invoke(nonceString);
        } catch (Exception e) {
            Log.e(getClass().getSimpleName(), "Error reading nonce from DropInResult: " + e.getMessage());
            if (mError != null) {
                mError.invoke("Failed to read payment nonce: " + e.getMessage());
            }
        }
    }

    @Override
    public void onDropInFailure(@NonNull Exception error) {
        Log.e(getClass().getSimpleName(), "Drop-In failure: " + error.getClass().getSimpleName() + " - " + error.getMessage());
        boolean isUserCanceled = (error instanceof UserCanceledException);
        if (isUserCanceled) {
            // User pressed back — not an error, just notify JS so it can reset state
            Log.d(getClass().getSimpleName(), "User cancelled the Drop-In UI");
            if (mError != null) {
                mError.invoke("USER_CANCELLED");
            }
        } else {
            Log.e(getClass().getSimpleName(), error.toString());
            if (mError != null) {
                mError.invoke("Payment error: " + error.getMessage());
            }
        }
    }

    public void onDestroy() {

    }
}

