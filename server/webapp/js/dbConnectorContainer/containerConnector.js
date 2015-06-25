/**
 * Created by Marcel on 10.06.2015.
 */


/**
 * Saves or update the given container in the database
 *
 * @function
 * @param {Function} callBackFunction   - Necessary callBackFunction
 * @param {Container} container         - Complete store
 * @author Marcel Gross
 */
var saveStore = function(callBackFunction, container){
    $.couch.urlPrefix = strings.link.dbConnection;
    var storeName = container.containerName;
    var db = loadStoreByName(storeName, function(){});
    if(db !== null){
        db = JSON.parse(db);
        container["_id"] = db._id;
        container["_rev"] = db._rev;
    } else {
        container["_id"] = storeName;
    }
    $.couch.db(strings.database.container).saveDoc(container, {
        success: function (data) {
            callBackFunction(true);
        },
        error: function (status) {
            console.log(status);
            callBackFunction(false);
        }
    });
};

/**
 * Load the root container and its subcontainers from database identified by its storeName
 *
 * @function
 * @param {String} storeName    - the name which identifies the database
 * @returns {Container}         - the container identified by the given storeName
 * @author Marcel Gross
 */
var loadStoreByName = function(storeName, callBackFunction){
    $.couch.urlPrefix = strings.link.dbConnection;
    $.couch.db(strings.database.container).openDoc(storeName, {
        success: function(data) {
            callBackFunction(true, data);
        },
        error: function(status) {
            console.log(status);
            callBackFunction(false);
        }
    });
    //todo remove this code if the function above works
/*    try{
        var link = strings.link.dbConnection+"/"+strings.database.container+"/"+storeName;
        var result = $.ajax({type: "GET", url: link, async: false});
    } catch(err){
        console.log(err);
    }

    if(result.status !== 200){
        console.log("not Found");
        result = null;
        callBackFunction(false);
    } else {
        result = result.responseText;
        callBackFunction(true, result);
    }

    return result;*/
};

/**
 * Load complete store from database
 *
 * @function
 * @param {Function} callBackFunction   - Necessary callBackFunction
 * @author Marcel Gross
 */
var loadStore = function(callBackFunction){
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
};
