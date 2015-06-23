/**
 * Created by Marcel on 22.06.2015.
 */

/**
 * Save an attribute from given name, unit and type to the database
 *
 * @param {Function} callBackFunction   - Necessary callBackFunction
 * @param {String} name                 - name of the attribute
 * @param {String} unit                 - type of unit for the current attribute
 * @param {String} type                 - describes the type of unit e.g. boolean
 * @author Marcel Gross
 */
function saveAttribute(callBackFunction, name, unit, type) {
    $.couch.urlPrefix = strings.link.dbConnection;

    var attribute =
    {
        _id : name,
        "unit" : unit,
        "type" : type
    };

    $.couch.db(strings.database.attributes).saveDoc(attribute, {
        success: function(data) {
            callBackFunction(true);
        },
        error: function(status){
            console.log(status);
            callBackFunction(false);
        }
    });
}

/**
 * Returns an array with all saved attributes
 *
 * @param {Function} callBackFunction   - Necessary callBackFunction
 * @author Marcel Gross
 */
function loadAllAttributes(callBackFunction){
    $.couch.urlPrefix = strings.link.dbConnection;

    var mapFunction = function(doc) {
        emit(null, doc);
    };
    $.couch.db(strings.database.attributes).query(mapFunction, "_count", "javascript", {
        success: function(data) {
            try {
                var attributes = data["rows"];
                callBackFunction(true, attributes);
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

/**
 * /**
 * Returns an attribute object identified by its name
 *
 * @param {Function} callBackFunction            - necessary callBackFunction
 * @param {String} attributeName                 - name which identifies the needed attribute object
 * @returns {Attribute}                          - returns the attribute, which is identified by attributeName
 * @author Marcel Gross
 */
function loadAttributeByName(attributeName, callBackFunction){
    try{
        var link = strings.link.dbConnection+"/"+strings.database.attributes+"/"+attributeName;
        var result = $.ajax({type: "GET", url: link, async: false});
    } catch (err){
        console.log(err);
    }
    if(result.status !== 200){
        console.log("not Found");
        callBackFunction(false);
    } else {
        result = result.responseText;
        callBackFunction(true, result);
    }

    return result;
}
