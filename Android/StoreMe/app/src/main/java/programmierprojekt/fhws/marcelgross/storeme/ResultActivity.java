package programmierprojekt.fhws.marcelgross.storeme;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;


public class ResultActivity extends ActionBarActivity {

    private final String  URL = "http://faulratte.lima-city.de/";
    private WebView browser;
    private String result1, result2;

    @SuppressLint("JavascriptInterface")
    @Override
    public void onCreate(Bundle state) {
        super.onCreate(state);
        setContentView(R.layout.activity_main);
        getSupportActionBar().hide();
        Intent intent = getIntent();
        result1 = intent.getStringExtra("result1");
        result2 = intent.getStringExtra("result2");

        browser = (WebView) findViewById(R.id.webView);
        browser.getSettings().setJavaScriptEnabled(true);
        browser.getSettings().setLoadsImagesAutomatically(true);
        browser.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        browser.addJavascriptInterface(new Object() {

            @JavascriptInterface
            public void performClick1() {
                Intent intent = new Intent(ResultActivity.this, ScannerActivity.class);
                intent.putExtra("Scan", 1);
                intent.putExtra("result1", result1);
                intent.putExtra("result2", result2);
                startActivity(intent);
            }
        }, "scan");
        browser.addJavascriptInterface(new Object(){

            @JavascriptInterface
            public void performClick2(){
                Intent intent = new Intent(ResultActivity.this, ScannerActivity.class);
                intent.putExtra("Scan", 2);
                intent.putExtra("result1", result1);
                intent.putExtra("result2", result2);
                startActivity(intent);
            }
        }, "scan2");

        browser.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (result1 != null)
                view.loadUrl("javascript:getScanResult1(\"" + result1 + "\")");
                if (result2 != null)
                view.loadUrl("javascript:getScanResult2(\"" + result2 + "\")");
            }
        });

        browser.loadUrl(URL);
    }

    @Override
    public void onBackPressed() {
//        super.onBackPressed();
    }
}
