package com.pageantplanet.braintree.dropin;

import android.app.Application;
import com.pageantplanet.BuildConfig;


public class DemoApplication extends Application {


    @Override
    public void onCreate() {
        super.onCreate();

        if (Settings.getVersion(this) != BuildConfig.VERSION_CODE) {
            Settings.setVersion(this);
        }
    }


    public static void resetApiClient() {

    }
}
