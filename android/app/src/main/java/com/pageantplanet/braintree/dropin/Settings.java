package com.pageantplanet.braintree.dropin;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

import com.braintreepayments.api.ThreeDSecureRequest;
import com.braintreepayments.cardform.view.CardForm;
import com.pageantplanet.BuildConfig;


public class Settings {

    private static final String VERSION = "version";


    private static SharedPreferences sSharedPreferences;

    public static SharedPreferences getPreferences(Context context) {
        if (sSharedPreferences == null) {
            sSharedPreferences = PreferenceManager.getDefaultSharedPreferences(context.getApplicationContext());
        }

        return sSharedPreferences;
    }

    public static int getVersion(Context context) {
        return getPreferences(context).getInt(VERSION, 0);
    }

    public static void setVersion(Context context) {
        getPreferences(context).edit().putInt(VERSION, BuildConfig.VERSION_CODE).apply();
    }
    
    public static boolean isVaultManagerEnabled(Context context) {
        return getPreferences(context).getBoolean("enable_vault_manager", false);
    }

    public static int getCardholderNameStatus(Context context) {
        String status = getPreferences(context).getString("cardholder_name_status", "Disabled");

        switch (status) {
            case "Optional":
                return CardForm.FIELD_OPTIONAL;
            case "Required":
                return CardForm.FIELD_REQUIRED;
            case "Disabled":
            default:
                return CardForm.FIELD_DISABLED;
        }
    }

   public static boolean isSaveCardCheckBoxVisible(Context context) {
        return getPreferences(context).getBoolean("save_card_checkbox_visible", false);
    }

    public static boolean defaultVaultSetting(Context context) {
        return getPreferences(context).getBoolean("save_card_checkbox_default_value", true);
    }
}
