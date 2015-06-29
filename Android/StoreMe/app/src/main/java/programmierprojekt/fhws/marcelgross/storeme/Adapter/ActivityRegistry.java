package programmierprojekt.fhws.marcelgross.storeme.Adapter;

import android.app.Activity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Marcel on 18.05.2015.
 */
public class ActivityRegistry {

    private List<Activity> activities;

    private static ActivityRegistry instance;
    public static ActivityRegistry getInstance(){
        return instance == null ? instance = new ActivityRegistry() : instance;
    }

    public void register(Activity activity){
        if (activities == null)
            activities = new ArrayList<Activity>();

        activities.add(activity);
    }

    public void finishAll(){
        for (Activity activity : activities)
            activity.finish();
    }
}
