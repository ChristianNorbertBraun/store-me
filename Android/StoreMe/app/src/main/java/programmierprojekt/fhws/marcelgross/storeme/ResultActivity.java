package programmierprojekt.fhws.marcelgross.storeme;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import programmierprojekt.fhws.marcelgross.storeme.Adapter.ActivityRegistry;

public class ResultActivity extends Activity {

    private String result1, result2, url, tempurl;
    private ActivityRegistry ar = ActivityRegistry.getInstance();
    private final String DEPLETE = "deplete";
    private final String STOCK = "stock";

    @SuppressLint("JavascriptInterface")
    @Override
    public void onCreate(final Bundle state) {
        super.onCreate(state);
        setContentView(R.layout.webview);
        ar.register(this);

        Intent intent = getIntent();
        if(tempurl == null){
            url = intent.getStringExtra("url");
        } else {
            url = tempurl;
        }
        result1 = intent.getStringExtra("result1");
        result2 = intent.getStringExtra("result2");

        final String MODAL = returnModal();

        final WebView browser = (WebView) findViewById(R.id.webView);
        browser.getSettings().setJavaScriptEnabled(true);
        browser.getSettings().setLoadsImagesAutomatically(true);
        browser.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);

        browser.addJavascriptInterface(new Object() {

            @JavascriptInterface
            public void performClick() {
                Intent intent = new Intent(ResultActivity.this, ScannerActivity.class);
                intent.putExtra("Scan", 1);
                intent.putExtra("result1", result1);
                intent.putExtra("result2", result2);
                intent.putExtra("url", getIntentUrl(DEPLETE, STOCK, MODAL));
                startActivity(intent);
            }
        }, "scan");

        browser.addJavascriptInterface(new Object() {

            @JavascriptInterface
            public void performClick() {
                Intent intent = new Intent(ResultActivity.this, ScannerActivity.class);
                intent.putExtra("Scan", 2);
                intent.putExtra("result1", result1);
                intent.putExtra("result2", result2);
                intent.putExtra("url", getIntentUrl(DEPLETE, STOCK, MODAL));
                startActivity(intent);
            }
        }, "scan2");

        browser.addJavascriptInterface(new Object() {

            @JavascriptInterface
            public void performClick() {
                Intent intent = new Intent(ResultActivity.this, ScannerActivity.class);
                intent.putExtra("Scan", 1);
                intent.putExtra("result1", result1);
                intent.putExtra("result2", result2);
                intent.putExtra("url", getIntentUrl(STOCK, DEPLETE, MODAL));
                startActivity(intent);
            }
        }, "scan3");

        browser.addJavascriptInterface(new Object() {

            @JavascriptInterface
            public void performClick() {
                Intent intent = new Intent(ResultActivity.this, ScannerActivity.class);
                intent.putExtra("Scan", 2);
                intent.putExtra("result1", result1);
                intent.putExtra("result2", result2);
                intent.putExtra("url", getIntentUrl(STOCK, DEPLETE, MODAL));
                startActivity(intent);
            }
        }, "scan4");


        browser.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (!MODAL.isEmpty()){
                    if (!result1.isEmpty()){
                        Log.wtf("inputid", getInputID(MODAL)[0]);
                        Log.wtf("result1", result1);
                        view.loadUrl("javascript:getScanResult(\"" + result1 + "\", \"" + getInputID(MODAL)[0] + "\")");
                    }
                    if (!result2.isEmpty()){
                        Log.wtf("inputid", getInputID(MODAL)[1]);
                        Log.wtf("result2", result2);
                        view.loadUrl("javascript:getScanResult(\"" + result2 + "\", \"" + getInputID(MODAL)[1] + "\")");
                    }
                    if (!result1.isEmpty() && !result2.isEmpty()){
                        result1 = "";
                        result2 = "";
                    }
                }
                setTempurl(url);
            }
        });

        browser.loadUrl(url);
    }

    public String[] getInputID(String modal){
        String[] returnValue = {"item-id", "container-id"};
        if(modal.equals(STOCK)){
            returnValue[0] = returnValue[0] + "-" + STOCK;
            returnValue[1] = returnValue[1] + "-" + STOCK;
        } else if (modal.equals(DEPLETE)){
            returnValue[0] = returnValue[0] + "-" + DEPLETE;
            returnValue[1] = returnValue[1] + "-" + DEPLETE;
        }
        return returnValue;
    }

    public String returnModal(){
        String modal = "";
        if(url.contains("&")){
            modal = url.split("&")[1];
            modal = modal.split("=")[1];
        }
        return modal;
    }

    @Override
    public void onBackPressed() {
       Intent intent = new Intent(getApplicationContext(), MainActivity.class);
        startActivity(intent);
    }

    public String getIntentUrl(String replace, String myModal, String modal){
        String result = "";
        if (modal.isEmpty()){
            result = getCurrentUrl(myModal);
        }else if (modal.equals(replace)) {
            result = url.replace(replace, myModal);
        } else {
            result = url;
        }
        return  result;
    }

    public String getCurrentUrl(String modal){
        String currentUrl = "";
        if (!modal.isEmpty()){
            currentUrl = getTempurl()+"&modal="+modal;
        } else {
            currentUrl = getTempurl();
        }
        return currentUrl;
    }

    public String getTempurl() {
        return tempurl;
    }

    public void setTempurl(String tempurl) {
        this.tempurl = tempurl;
    }
}
