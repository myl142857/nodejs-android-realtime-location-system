package com.rk.nars.utils;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import android.content.Context;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationManager;
import android.util.Log;
import android.widget.Toast;

import com.rk.nars.R;

public class LocationUtils {
	public static Location checkMyLocation(Context context){
    	LocationManager locationManager = (LocationManager)context.getSystemService(Context.LOCATION_SERVICE);
    	Criteria criteria = new Criteria();
    	Location location = null;
    	
    	String provider = locationManager.getBestProvider(criteria, true);
    	//locationManager.requestLocationUpdates(provider, 10000, 100, new LocationService());
    	
    	if(provider == null){ //gps off이면 network통해서 받아오도록..
    		Toast.makeText(context, "no GPS Provider", Toast.LENGTH_SHORT).show();
    		provider = LocationManager.NETWORK_PROVIDER;
    		location = locationManager.getLastKnownLocation(provider);
    	}
    	
    	location = locationManager.getLastKnownLocation(provider);
    	
    	if(location == null){
    		try{
    			Thread.sleep(10000);
    		}catch(InterruptedException e){
    			e.printStackTrace();
    		}
    		location = locationManager.getLastKnownLocation(provider);
    	}
    	return location;
    }
	public static boolean sendLocation(Context context, String phoneNumber) {
		// TODO Auto-generated method stub
		Location location = checkMyLocation(context);
		String location_str= location.getLatitude() + "," + location.getLongitude();
       
       String serverUrl = CommonUtils.SERVER_URL + "/location";
       Map<String, String> params = new HashMap<String, String>();
        
       params.put("phoneNumber", phoneNumber);
       params.put("location", location_str);
        
       long backoff = CommonUtils.BACKOFF_MILLI_SECONDS + CommonUtils.random.nextInt(1000);
       for (int i = 1; i <= CommonUtils.MAX_ATTEMPTS; i++) {
           Log.d(CommonUtils.TAG, "Attempt #" + i + " to register");
           try {
               CommonUtils.displayMessage(context, context.getString(
                       R.string.server_registering, i, CommonUtils.MAX_ATTEMPTS));
               String returnString = NetworkUtils.post(serverUrl, params);
               String message = context.getString(R.string.server_registered);
               CommonUtils.displayMessage(context, message);
               CommonUtils.displayMessage(context, returnString);
                
                return true;
            } catch (IOException e) {
                Log.e(CommonUtils.TAG, "Failed to register on attempt " + i, e);
                if (i == CommonUtils.MAX_ATTEMPTS) {
                    break;
                }
                try {
                    Log.d(CommonUtils.TAG, "Sleeping for " + backoff + " ms before retry");
                    Thread.sleep(backoff);
                } catch (InterruptedException e1) {
                    Log.d(CommonUtils.TAG, "Thread interrupted: abort remaining retries!");
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
}
