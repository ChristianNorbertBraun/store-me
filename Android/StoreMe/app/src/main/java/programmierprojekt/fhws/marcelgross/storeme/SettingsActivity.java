package programmierprojekt.fhws.marcelgross.storeme;

import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import programmierprojekt.fhws.marcelgross.storeme.Adapter.ActivityRegistry;
import programmierprojekt.fhws.marcelgross.storeme.Adapter.MyDBHandler;


public class SettingsActivity extends ActionBarActivity implements View.OnClickListener {

    private MyDBHandler db = new MyDBHandler(this);
    private ActivityRegistry ar = ActivityRegistry.getInstance();

    private EditText input;
    private Button edit_btn;
    private Button del_btn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);
        ar.register(this);
        input = (EditText) findViewById(R.id.settings_input_et);
        edit_btn = (Button) findViewById(R.id.edit_btn);
        del_btn = (Button) findViewById(R.id.del_btn);

        edit_btn.setOnClickListener(this);
        del_btn.setOnClickListener(this);
        input.setText(db.getServerAddress());
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.edit_btn:
                editAddress();
                break;
            case R.id.del_btn:
                delAddress();
                break;
            default:
                break;
        }
    }

    public void editAddress(){
        String address = input.getText().toString().trim();
        if(!address.isEmpty()){
            db.updateServer(address);
        } else {
            Toast.makeText(getBaseContext(), R.string.fillInServer, Toast.LENGTH_LONG).show();
        }
        Intent intent = new Intent(getApplicationContext(), MainActivity.class);
        startActivity(intent);
    }

    public void delAddress(){
        db.deleteSeverAdress();
        Intent intent = new Intent(getApplicationContext(), MainActivity.class);
        startActivity(intent);
    }
}
