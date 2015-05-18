package programmierprojekt.fhws.marcelgross.storeme;

import android.app.Activity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Marcel on 18.05.2015.
 */
public class ActivityRegistry {

    private static List<Activity> activities;

    public static void register(Activity activity){
        if (activities == null)
            activities = new ArrayList<Activity>();

        activities.add(activity);
    }

    public static void finishAll(){
        for (Activity activity : activities)
            activity.finish();
    }
}
