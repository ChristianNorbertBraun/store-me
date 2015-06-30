/**
 * Created by Marcel on 22.06.2015.
 */

/**
 * Save an attribute from given name, unit and type to the database
 *
 * @function
 * @param {Function} callBackFunction   - Necessary callBackFunction
 * @param {String} name                 - name of the attribute
 * @param {String} unit                 - type of unit for the current attribute
 * @param {String} type                 - describes the type of unit e.g. boolean
 * @author Marcel Gross
 */
var saveAttribute = function(callBackFunction, name, unit, type) {
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
};

/**
 * Returns an array with all saved attributes
 *
 * @function
 * @param {Function} callBackFunction   - Necessary callBackFunction
 * @author Marcel Gross
 */
var loadAllAttributes = function (callBackFunction) {
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
};

 /**
 * Returns an attribute object identified by its name
 *
 * @function
 * @param {Function} callBackFunction            - necessary callBackFunction
 * @param {String} attributeName                 - name which identifies the needed attribute object
 * @returns {Attribute}                          - returns the attribute, which is identified by attributeName
 * @author Marcel Gross
 */
var loadAttributeByName = function(attributeName, callBackFunction){
    $.couch.urlPrefix = strings.link.dbConnection;
    $.couch.db(strings.database.attributes).openDoc(attributeName, {
        success: function(data) {
            callBackFunction(true, data);
        },
        error: function(status) {
            console.log(status);
            callBackFunction(false);
        }
    });
};
