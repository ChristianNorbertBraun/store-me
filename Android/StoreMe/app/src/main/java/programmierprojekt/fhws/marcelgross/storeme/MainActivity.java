package programmierprojekt.fhws.marcelgross.storeme;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Handler;
import android.webkit.JavascriptInterface;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;

@SuppressLint("SetJavaScriptEnabeld")
public class MainActivity extends ActionBarActivity{

    private final String  URL = "http://faulratte.lima-city.de/";
    private WebView browser;
    private ActivityRegistry ar = new ActivityRegistry();

    @SuppressLint("JavascriptInterface")
    @Override
    public void onCreate(Bundle state) {
        super.onCreate(state);
        setContentView(R.layout.activity_main);
        getSupportActionBar().hide();

        ar.register(this);
        browser = (WebView) findViewById(R.id.webView);
        browser.getSettings().setJavaScriptEnabled(true);
        browser.getSettings().setLoadsImagesAutomatically(true);
        browser.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        browser.addJavascriptInterface(new Object() {

            @JavascriptInterface
            public void performClick1() {
                Intent intent = new Intent(MainActivity.this, ScannerActivity.class);
                intent.putExtra("Scan", 1);
                startActivity(intent);
            }
        }, "scan");
        browser.addJavascriptInterface(new Object(){

            @JavascriptInterface
        public void performClick2(){
                Intent intent = new Intent(MainActivity.this, ScannerActivity.class);
                intent.putExtra("Scan", 2);
                startActivity(intent);
            }
        }, "scan2");
        browser.loadUrl(URL);

    }

}