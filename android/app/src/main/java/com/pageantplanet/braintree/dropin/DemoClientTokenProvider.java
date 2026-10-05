package com.pageantplanet.braintree.dropin;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import androidx.annotation.NonNull;
import com.braintreepayments.api.ClientTokenCallback;
import com.braintreepayments.api.ClientTokenProvider;
import android.util.Log;

public class DemoClientTokenProvider implements ClientTokenProvider {

    private static final String TAG = "DemoClientTokenProvider";

    private String mCachedToken = null;
    private ClientTokenCallback mPendingCallback = null;
    private final Handler mMainHandler = new Handler(Looper.getMainLooper());

    public DemoClientTokenProvider(Context context) {
    }

    /**
     * Called from JS (via PaymentModule.initBrainTree) to supply the Braintree client token.
     * Validates the token, caches it, and delivers it if Braintree is already waiting.
     */
    public void onTokenReceived(String token) {
        if (token == null || token.isEmpty() || token.equals("null") || token.equals("undefined")) {
            Log.e(TAG, "onTokenReceived called with invalid token: '" + token + "'");
            if (mPendingCallback != null) {
                ClientTokenCallback cb = mPendingCallback;
                mPendingCallback = null;
                cb.onFailure(new Exception("Client token from server was null or empty"));
            }
            return;
        }
        Log.d(TAG, "Token received and cached. Length: " + token.length());
        mCachedToken = token;
        if (mPendingCallback != null) {
            Log.d(TAG, "Delivering cached token to pending callback (async)");
            final ClientTokenCallback cb = mPendingCallback;
            mPendingCallback = null;
            // Post asynchronously to avoid re-entrant callback on the UI thread
            mMainHandler.post(() -> cb.onSuccess(token));
        }
    }

    @Override
    public void getClientToken(@NonNull ClientTokenCallback callback) {
        if (mCachedToken != null) {
            Log.d(TAG, "Token already cached — delivering asynchronously to Braintree");
            // Always post asynchronously. Braintree calls getClientToken() synchronously
            // inside launchDropIn() on the UI thread. Calling callback.onSuccess() on the
            // same thread/stack frame causes re-entrant state corruption in Drop-In v4,
            // leading to the "request for configuration failed" error.
            mMainHandler.post(() -> callback.onSuccess(mCachedToken));
        } else {
            // Token not yet available — store for when onTokenReceived() is called
            Log.d(TAG, "Token not yet available — storing pending callback");
            mPendingCallback = callback;
        }
    }
}
