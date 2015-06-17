/**
 * Created by Marcel on 10.06.2015.
 */


/**
 * Saves or update the given container in the database
 * @function
 * @param {Function} callBackFunction   - Necessary callBackFunction
 * @param {Container} container         - Complete store
 * @author Marcel Groﬂ
 */
function saveStore(callBackFunction, container) {
    $.couch.urlPrefix = strings.link.dbConnection;


    loadStore(function (created, data, id, rev) {
        if (created) {
            container["_id"] = id;
            container["_rev"] = rev;
            $.couch.db(strings.database.container).saveDoc(container, {
                success: function (data) {
                    callBackFunction(true);
                },
                error: function (status) {
                    console.log(status);
                    callBackFunction(false);
                }
            });
        }
    });
}

/**
 * Load complete store from database
 *
 * @param {Function} callBackFunction   - Necessary callBackFunction
 * @author Marcel Groﬂ
 */
function loadStore(callBackFunction){
    $.couch.urlPrefix = strings.link.dbConnection;

    var mapFunction = function(doc) {
        emit(null, doc);
    };
    $.couch.db(strings.database.container).query(mapFunction, "_count", "javascript", {
        success: function(data) {
            try {
                var containerObject = data["rows"][0].value;
                callBackFunction(true, containerObject, containerObject["_id"], containerObject["_rev"]);
            } catch(err){
                callBackFunction(true);
            }
        },
        error: function(status) {
            console.log(status);
            callBackFunction(false);
        },
        reduce: false
    });
}
