/*
 * Copyright 2012 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.rk.nars.utils;

import static com.rk.nars.utils.CommonUtils.PHONE_NUMBER;
import static com.rk.nars.utils.CommonUtils.SERVER_URL;
import static com.rk.nars.utils.CommonUtils.TAG;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import android.content.Context;
import android.telephony.TelephonyManager;
import android.util.Log;

import com.google.android.gcm.GCMRegistrar;
import com.rk.nars.R;

/**
 * Helper class used to communicate with the demo server.
 */
public final class ServerUtils {
    /**
     * Register this account/device pair within the server.
     *
     * @return whether the registration succeeded or not.
     */
    public static boolean register(final Context context, final String regId) {
        Log.i(TAG, "registering device (regId = " + regId + ")");
        String serverUrl = SERVER_URL + "/register";
        Map<String, String> params = new HashMap<String, String>();
        
        params.put("regId", regId);
        params.put("phoneNumber", PHONE_NUMBER);
        
        long backoff = CommonUtils.BACKOFF_MILLI_SECONDS + CommonUtils.random.nextInt(1000);
        for (int i = 1; i <= CommonUtils.MAX_ATTEMPTS; i++) {
            Log.d(TAG, "Attempt #" + i + " to register");
            try {
                CommonUtils.displayMessage(context, context.getString(
                        R.string.server_registering, i, CommonUtils.MAX_ATTEMPTS));
                String returnString = NetworkUtils.post(serverUrl, params);
                GCMRegistrar.setRegisteredOnServer(context, true);
                String message = context.getString(R.string.server_registered);
                CommonUtils.displayMessage(context, message);
                CommonUtils.displayMessage(context, returnString);
                
                return true;
            } catch (IOException e) {
                Log.e(TAG, "Failed to register on attempt " + i, e);
                if (i == CommonUtils.MAX_ATTEMPTS) {
                    break;
                }
                try {
                    Log.d(TAG, "Sleeping for " + backoff + " ms before retry");
                    Thread.sleep(backoff);
                } catch (InterruptedException e1) {
                    Log.d(TAG, "Thread interrupted: abort remaining retries!");
                    Thread.currentThread().interrupt();
                    return false;
                }
             backoff *= 2;
            }
        }
        String message = context.getString(R.string.server_register_error,
                CommonUtils.MAX_ATTEMPTS);
        CommonUtils.displayMessage(context, message);
        return false;
    }

    /**
     * Unregister this account/device pair within the server.
     */
    public static void unregister(final Context context, final String regId) {
        Log.i(TAG, "unregistering device (regId = " + regId + ")");
        String serverUrl = SERVER_URL + "/unregister";
        Map<String, String> params = new HashMap<String, String>();
        
        TelephonyManager systemService = (TelephonyManager)context.getSystemService(Context.TELEPHONY_SERVICE);
        String phoneNumber = systemService.getLine1Number();
        
        params.put("regId", regId);
        params.put("phoneNumber", phoneNumber);
        
        try {
            String returnMessage = NetworkUtils.post(serverUrl, params);
            GCMRegistrar.setRegisteredOnServer(context, false);
            String message = context.getString(R.string.server_unregistered);
            CommonUtils.displayMessage(context, message);
            CommonUtils.displayMessage(context, returnMessage);
        } catch (IOException e) {
            // At this point the device is unregistered from GCM, but still
            // registered in the server.
            // We could try to unregister again, but it is not necessary:
            // if the server tries to send a message to the device, it will get
            // a "NotRegistered" error message and should unregister the device.
            String message = context.getString(R.string.server_unregister_error,
                    e.getMessage());
            CommonUtils.displayMessage(context, message);
        }
    }
}
