package programmierprojekt.fhws.marcelgross.storeme;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import programmierprojekt.fhws.marcelgross.storeme.Adapter.ActivityRegistry;
import programmierprojekt.fhws.marcelgross.storeme.Adapter.MyDBHandler;

public class MainActivity extends ActionBarActivity implements View.OnClickListener{

    private ActivityRegistry ar = ActivityRegistry.getInstance();
    private MyDBHandler db = new MyDBHandler(this);
    private int counter = 0;

    private EditText input;
    private Button save_btn;
    private Button start_btn;
    private Button settings_btn;

    @Override
    public void onCreate(Bundle state) {
        super.onCreate(state);
        setContentView(R.layout.main_activity);
        ar.register(this);

        input = (EditText) findViewById(R.id.editText);
        start_btn = (Button) findViewById(R.id.start_btn);
        settings_btn = (Button) findViewById(R.id.settings_btn);
        save_btn = (Button) findViewById(R.id.save_btn);
        save_btn.setOnClickListener(this);
        start_btn.setOnClickListener(this);
        settings_btn.setOnClickListener(this);

        checkIfServerAddressIsSet();
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.save_btn:
                saveAddress();
                break;
            case R.id.start_btn:
                startStoreMe();
                break;
            case R.id.settings_btn:
                settings();
                break;
            default:
                break;
        }
    }

    public void checkIfServerAddressIsSet(){
        if (db.existsServer()){
            input.setVisibility(View.GONE);
            save_btn.setVisibility(View.GONE);
            start_btn.setVisibility(View.VISIBLE);
            settings_btn.setVisibility(View.VISIBLE);
        } else {
            input.setVisibility(View.VISIBLE);
            save_btn.setVisibility(View.VISIBLE);
            start_btn.setVisibility(View.GONE);
            settings_btn.setVisibility(View.GONE);
        }
    }

    public void saveAddress(){
        String address = input.getText().toString().trim();
        if(!address.isEmpty()){
            db.saveServer(address);
            finish();
            startActivity(getIntent());
        } else {
            Toast.makeText(getBaseContext(), R.string.fillInServer, Toast.LENGTH_LONG).show();
        }
    }

    public void startStoreMe(){
        Intent intent = new Intent(getApplicationContext(), ResultActivity.class);
        intent.putExtra("result1", "");
        intent.putExtra("result2", "");
        startActivity(intent);
    }

    public void settings(){
        Intent intent = new Intent(getApplicationContext(), SettingsActivity.class);
        startActivity(intent);
    }

    @Override
    public void onBackPressed() {
        if (counter == 0){
            Toast.makeText(this, R.string.clickToClose, Toast.LENGTH_SHORT).show();
            counter++;
        } else {
            ar.finishAll();
        }
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        final boolean result = super.onCreateOptionsMenu(menu);
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.main_menue, menu);


        return result;

    }

    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_info:
                startDialog();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    public void startDialog(){
        Dialog dialog = new AlertDialog.Builder(this)
        .setView(LayoutInflater.from(this).inflate(R.layout.dialog,null)).setTitle(R.string.about).create();
        dialog.show();
    }
}