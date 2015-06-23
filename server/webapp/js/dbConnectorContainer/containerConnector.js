/**
 * Created by Marcel on 10.06.2015.
 */


/**
 * Saves or update the given container in the database
 * @function
 * @param {Function} callBackFunction   - Necessary callBackFunction
 * @param {Container} container         - Complete store
 * @author Marcel Gro�
 */
function saveStore(callBackFunction, container) {
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
}

/**
 * Load the root container and its subcontainers from database identified by its storeName
 *
 * @param {String} storeName    - the name which identifies the database
 * @returns {Container}         - the container identified by the given storeName
 * @author Marcel Gross
 */
function loadStoreByName(storeName, callBackFunction){
    try{
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

    return result;
}

/**
 * Load complete store from database
 *
 * @param {Function} callBackFunction   - Necessary callBackFunction
 * @author Marcel Gro�
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
