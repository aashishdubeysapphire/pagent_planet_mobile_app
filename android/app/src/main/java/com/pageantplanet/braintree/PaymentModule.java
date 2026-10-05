package com.pageantplanet.braintree;


import androidx.annotation.NonNull;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.pageantplanet.MainActivity;


import org.jetbrains.annotations.NotNull;

import java.util.HashMap;
import java.util.Map;


public class PaymentModule extends ReactContextBaseJavaModule {


    MainActivity mMainActivity;

    PaymentModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @NotNull
    @Override
    public String getName() {
        return "PaymentModule";
    }


    @ReactMethod
    public void getCardNonce(Callback success, Callback error) {
        if (mMainActivity == null) {
            mMainActivity = ((MainActivity) getCurrentActivity());
        }
        if (mMainActivity == null || mMainActivity.mBraintreeUtil == null) {
            error.invoke("Braintree not initialized. Call initBrainTree first.");
            return;
        }
        mMainActivity.mBraintreeUtil.launchDropIn(success, error);
    }

    @ReactMethod
    public void initBrainTree(String token) {
        mMainActivity= ((MainActivity) getCurrentActivity());

        mMainActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mMainActivity.mBraintreeUtil.intiBrainTree(token);
            }//public void run() {
        });
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("DEFAULT_EVENT_NAME", "New Event");
        return constants;
    }

}
