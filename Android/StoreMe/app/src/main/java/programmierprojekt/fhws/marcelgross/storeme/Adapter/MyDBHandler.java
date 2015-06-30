package programmierprojekt.fhws.marcelgross.storeme.Adapter;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

/**
 * Created by Marcel on 29.06.2015.
 */
public class MyDBHandler extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "storeme_db";
    private static final int DATABASE_VERSION = 1;

    private static final String TABLE = "server";
    private static final String COLUMN_SERVER_ID = "id";
    private static final String COLUMN_SERVER_ADDRESS = "serverAdress";

    public MyDBHandler(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        Log.d("create table", TABLE);
        String CREATE_TABLE =
                "CREATE TABLE IF NOT EXISTS " + TABLE
                        + "("
                        + COLUMN_SERVER_ID + " INTEGER PRIMARY KEY AUTOINCREMENT, "
                        + COLUMN_SERVER_ADDRESS + " TEXT"
                        + ")";

        db.execSQL(CREATE_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        Log.d("Updated Table ", TABLE);
        db.execSQL("DROP DATABASE");
        onCreate(db);
    }

    public void saveServer(String address){
        Log.d("saved address", address);
        if (!address.startsWith("http://")){
            address = "http://" + address;
        }
        ContentValues values = new ContentValues();
        values.put(COLUMN_SERVER_ID, 1);
        values.put(COLUMN_SERVER_ADDRESS, address);

        SQLiteDatabase db = this.getWritableDatabase();
        db.insert(TABLE, null, values);
        db.close();
    }

    public boolean existsServer(){
        String query = "SELECT * FROM " + TABLE + " WHERE " + COLUMN_SERVER_ID + "= '1'";
        SQLiteDatabase db = this.getWritableDatabase();

        Cursor cursor = db.rawQuery(query, null);
        String result = "";
        if (cursor.moveToFirst()) {
            do {
                result = cursor.getString(1);
            } while (cursor.moveToNext());
        }
        Log.wtf("test", result);
        cursor.close();
        db.close();
        return result.startsWith("http://");
    }

    public void updateServer(String address){
        Log.d("Update address", address);
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues args = new ContentValues();
        if (!address.startsWith("http://")){
            address = "http://" + address;
        }
        args.put(COLUMN_SERVER_ADDRESS, address);
        db.update(TABLE, args, COLUMN_SERVER_ID + "= 1", null);
        db.close();
    }

    public String getServerAddress() {
        String query = "SELECT * FROM " + TABLE + " WHERE " + COLUMN_SERVER_ID + "= '1'";
        SQLiteDatabase db = this.getWritableDatabase();

        Cursor cursor = db.rawQuery(query, null);
        String result = "";
        if (cursor.moveToFirst()) {
            do {
                result = cursor.getString(1);
            } while (cursor.moveToNext());
        }
        cursor.close();
        db.close();
        Log.d("address", result);
        return result;
    }

    public void deleteSeverAdress() {
        SQLiteDatabase db = this.getWritableDatabase();
        db.execSQL("DELETE FROM " + TABLE);
        db.close();
    }
}
