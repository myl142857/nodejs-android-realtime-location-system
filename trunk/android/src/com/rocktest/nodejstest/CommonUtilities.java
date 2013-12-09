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
 *
 */
package com.rocktest.nodejstest;

import android.content.Context;
import android.content.Intent;

public final class CommonUtilities {

    //static final String SERVER_URL = "http://chicrock.iptime.org:3030";
	//static final String SERVER_URL = "localhost:3030";
	static final String SERVER_URL = "182.162.143.141:3030";

    static final String SENDER_ID = "21670682387";

    static final String TAG = "NodejsTest";

    static final String DISPLAY_MESSAGE_ACTION =
            "com.rocktest.nodejstest.DISPLAY_MESSAGE";

    static final String EXTRA_MESSAGE = "message";
    
    static String PHONE_NUMBER = "";

    static void displayMessage(Context context, String message) {
        Intent intent = new Intent(DISPLAY_MESSAGE_ACTION);
        intent.putExtra(EXTRA_MESSAGE, message);
        context.sendBroadcast(intent);
    }
}
