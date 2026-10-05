package com.pageantplanet

import android.content.Intent
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.pageantplanet.braintree.BraintreeUtil

class MainActivity : ReactActivity() {

    @JvmField
    var mBraintreeUtil: BraintreeUtil? = null

    override fun getMainComponentName(): String = "pageantplanet"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null) // MUST be null for react-native-screens

        mBraintreeUtil = BraintreeUtil(applicationContext, this)
        mBraintreeUtil?.onCreate(savedInstanceState)
    }

    /**
     * With `singleTask`, a new VIEW intent is delivered here instead of `onCreate`.
     * Updating the activity intent keeps deep-link resolution consistent for the JS
     * Linking layer when the app is already open.
     */
    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    override fun onResume() {
        super.onResume()
        mBraintreeUtil?.onResume()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        mBraintreeUtil?.onSaveInstanceState(outState)
    }

    override fun onDestroy() {
        super.onDestroy()
        mBraintreeUtil?.onDestroy()
    }
}
