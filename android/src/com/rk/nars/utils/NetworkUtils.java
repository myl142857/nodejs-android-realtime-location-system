package com.rk.nars.utils;

import static com.rk.nars.utils.CommonUtils.TAG;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import android.util.Log;

public class NetworkUtils {
	public static String post(String endpoint, Map<String, String> params)
            throws IOException {
        URL url;
        try {
            url = new URL(endpoint);
        } catch (MalformedURLException e) {
            throw new IllegalArgumentException("invalid url: " + endpoint);
         }
        StringBuilder bodyBuilder = new StringBuilder();
        Iterator<Entry<String, String>> iterator = params.entrySet().iterator();
        // constructs the POST body using the parameters
        while (iterator.hasNext()) {
            Entry<String, String> param = iterator.next();
            bodyBuilder.append(param.getKey()).append('=')
                    .append(param.getValue());
            if (iterator.hasNext()) {
                bodyBuilder.append('&');
            }
        }
        String body = bodyBuilder.toString();
        Log.v(TAG, "Posting '" + body + "' to " + url);
        byte[] bytes = body.getBytes();
        HttpURLConnection conn = null;
        try {
        	conn = (HttpURLConnection) url.openConnection();
        	conn.setDoOutput(true);
        	conn.setUseCaches(false);
        	conn.setFixedLengthStreamingMode(bytes.length);
        	conn.setRequestMethod("POST");
        	conn.setRequestProperty("Content-Type",
        			"application/x-www-form-urlencoded;charset=UTF-8");
        	//post the request
        	OutputStream out = conn.getOutputStream();
        	out.write(bytes);
        	out.close();
        	//handle the response
        	int status = conn.getResponseCode();
        
          if (status != 200) {
        	  throw new IOException("Post failed with error code " + status);
          	}
          String message = conn.getResponseMessage();
          return message;
       } finally {
        	if (conn != null) {
        		conn.disconnect();
        	}
        }
    }
}
