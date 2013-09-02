package com.rocktest.nodejstest;


import static com.rocktest.nodejstest.CommonUtilities.DISPLAY_MESSAGE_ACTION;
import static com.rocktest.nodejstest.CommonUtilities.EXTRA_MESSAGE;
import static com.rocktest.nodejstest.CommonUtilities.PHONE_NUMBER;
import static com.rocktest.nodejstest.CommonUtilities.SENDER_ID;
import static com.rocktest.nodejstest.CommonUtilities.SERVER_URL;
import static com.rocktest.nodejstest.CommonUtilities.TAG;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationManager;
import android.os.AsyncTask;
import android.os.Bundle;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;
import android.widget.Toast;
import com.google.android.gcm.GCMRegistrar;

public class MainActivity extends Activity {
	TextView mDisplay;
    AsyncTask<Void, Void, Void> mRegisterTask;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        
        mDisplay = (TextView) findViewById(R.id.display);
        
        TelephonyManager systemService = (TelephonyManager)getSystemService(Context.TELEPHONY_SERVICE);
        PHONE_NUMBER = systemService.getLine1Number();
        
        checkNotNull(SERVER_URL, "SERVER_URL");
        checkNotNull(SENDER_ID, "SENDER_ID");
        GCMRegistrar.checkDevice(this);
        GCMRegistrar.checkManifest(this);
        
        registerReceiver(mHandleMessageReceiver, new IntentFilter(DISPLAY_MESSAGE_ACTION));
        
        final String regId = GCMRegistrar.getRegistrationId(this);
        
        if (regId.equals("")) {
          GCMRegistrar.register(this, SENDER_ID);
        } else {
        	if (GCMRegistrar.isRegisteredOnServer(this)) {
            //mDisplay.append(getString(R.string.already_registered) + "\n");
        		Log.i(TAG, getString(R.string.already_registered));
        		CommonUtilities.displayMessage(this,  getString(R.string.already_registered) + "\n");
        	} else {
        	   final Context context = this;
        	   
        	   mRegisterTask = new AsyncTask<Void, Void, Void>() {
        		   @Override
        		   protected Void doInBackground(Void... params) {
        			   boolean registered =
                                ServerUtilities.register(context, regId);
        			   if (!registered) {
        				   GCMRegistrar.unregister(context);
        				   }
        			   return null;
        			   }
        		   @Override
        		   protected void onPostExecute(Void result) {
        			   mRegisterTask = null;
        			   }
        		   };
        	  mRegisterTask.execute(null, null, null);
            }
        }
    }
    
    private class WebViewClientClass extends WebViewClient {
    	@Override
    	public boolean shouldOverrideUrlLoading(WebView view, String url){
    		view.loadUrl(url);
    		return true;
    	}
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
    	//Inflate the menu; this adds items to the action bar if it is present.
    	getMenuInflater().inflate(R.menu.options_menu, menu);
    	return true;
    }
    
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch(item.getItemId()) {
            case R.id.options_register:
            	if(!GCMRegistrar.isRegisteredOnServer(this)){
            		GCMRegistrar.register(this, SENDER_ID);
            	}else{
            		CommonUtilities.displayMessage(this, getString(R.string.already_registered));
            	}
              return true;
            case R.id.options_unregister:
            	if(GCMRegistrar.isRegisteredOnServer(this)){
            		GCMRegistrar.unregister(this);
            	}else{
            		CommonUtilities.displayMessage(this, getString(R.string.not_registered));
            	}
              return true;
            case R.id.options_send_location:
            	if(!GCMRegistrar.isRegisteredOnServer(this)){
            		GCMRegistrar.register(this, SENDER_ID);
            	}else{
            		ServerUtilities.sendLocation(this);
            	}
            	
             return true;
            case R.id.options_clear:
                mDisplay.setText(null);
                return true;
            case R.id.options_exit:
                finish();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
    
    @Override
    protected void onDestroy() {
    	if (mRegisterTask != null) {
    		mRegisterTask.cancel(true);
        }
    	if(mHandleMessageReceiver != null){
    		unregisterReceiver(mHandleMessageReceiver);
    	}
       
    	//GCMRegistrar.onDestroy(this);
    	super.onDestroy();
    }

    private void checkNotNull(Object reference, String name) {
    	if (reference == null) {
    		throw new NullPointerException(
    				getString(R.string.error_config, name));
    	}
    }

    private final BroadcastReceiver mHandleMessageReceiver =
            new BroadcastReceiver() {
    	@Override
    	public void onReceive(Context context, Intent intent) {
    		String newMessage = intent.getExtras().getString(EXTRA_MESSAGE);
    		mDisplay.append(newMessage + "\n");
        }
    };
    
    public Location checkMyLocation(){
    	LocationManager locationManager = (LocationManager)this.getSystemService(Context.LOCATION_SERVICE);
    	Criteria criteria = new Criteria();
    	Location location = null;
    	
    	String provider = locationManager.getBestProvider(criteria, true);
    	//locationManager.requestLocationUpdates(provider, 10000, 100, new LocationService());
    	
    	if(provider == null){ //gps off이면 network통해서 받아오도록..
    		Toast.makeText(getBaseContext(), "no GPS Provider", Toast.LENGTH_SHORT).show();
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
}
