package com.rocktest.nodejstest;


import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;

public class MainActivity extends Activity {
	public static String defaultUrl = "localhost:3000";
	private WebView mWebView;
	
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
       // button
        /*
       Button startBtn = (Button) findViewById(R.id.sendMyLocation);
       startBtn.setOnClickListener(new View.OnClickListener(){
        	public void onClick(View v){
        		LocationManager manager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);

        		Location location = manager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
        		//manager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 1000, 0, this);
        		
        		Log.i("location", location.getLatitude() + "," + location.getLongitude());
        	}
        });
        */
        mWebView = (WebView) findViewById(R.id.webView);
        
       // WebView
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.loadUrl(defaultUrl);
        mWebView.setWebViewClient(new WebViewClientClass());
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
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
    
}
