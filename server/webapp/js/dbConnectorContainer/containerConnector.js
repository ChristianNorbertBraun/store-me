/**
 * Created by Marcel on 22.06.2015.
 */
/**
 * Load the root container and its subcontainers from database identified by its storeName
 *
 * @param {String} storeName    - the name which identifies the database
 * @returns {Container}         - the container identified by the given storeName
 * @author Marcel Gross
 */
function loadStoreByName(storeName){
    try{
        var link = strings.link.dbConnection+"/"+strings.database.container+"/"+storeName;
        var result = $.ajax({type: "GET", url: link, async: false});
    } catch(err){
        console.log(err);
    }

    if(result.status !== 200){
        console.log("not Found");
        result = null;
    } else {
        result = result.responseText;
    }

    return result;
}

/**
 * Checks if there is a database file with the name of the given container, if yes update this container otherwise create a new database file with the given container
 *
 * @param {Container} container         - given Container object
 * @param {Function} callBackFunction   - necessary callBackFunction
 * @author Marcel Gross
 */
function saveStore(container, callBackFunction){
    $.couch.urlPrefix = strings.link.dbConnection;
    var storeName = container.containerName;
    var db = loadStoreByName(storeName);
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

