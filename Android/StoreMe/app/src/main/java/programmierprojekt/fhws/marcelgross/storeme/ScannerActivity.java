package programmierprojekt.fhws.marcelgross.storeme;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.google.zxing.Result;

import me.dm7.barcodescanner.zxing.ZXingScannerView;
import programmierprojekt.fhws.marcelgross.storeme.Adapter.ActivityRegistry;


public class ScannerActivity extends Activity implements ZXingScannerView.ResultHandler {

    private ZXingScannerView mScannerView;
    private String result1, result2, url;
    private int resultPosition;
    private ActivityRegistry ar = ActivityRegistry.getInstance();

    @Override
    public void onCreate(Bundle state) {
        super.onCreate(state);
        mScannerView = new ZXingScannerView(this);
        setContentView(mScannerView);
        ar.register(this);

        Intent intent = getIntent();
        resultPosition = intent.getIntExtra("Scan", -1);
        result1 = intent.getStringExtra("result1");
        result2 = intent.getStringExtra("result2");
        url = intent.getStringExtra("url");
    }

    @Override
    public void onResume() {
        super.onResume();
        mScannerView.setResultHandler(this);
        mScannerView.startCamera();
    }

    @Override
    public void onPause() {
        super.onPause();
        mScannerView.stopCamera();
    }

    @Override
    public void handleResult(Result rawResult) {
        Intent intent = new Intent(ScannerActivity.this, ResultActivity.class);

        if (resultPosition == 1){
            intent.putExtra("result1", rawResult.getText());
            intent.putExtra("result2", result2);

        } else if (resultPosition == 2){
            intent.putExtra("result1", result1);
            intent.putExtra("result2", rawResult.getText());

        }
        intent.putExtra("url", url);
        startActivity(intent);
    }


}