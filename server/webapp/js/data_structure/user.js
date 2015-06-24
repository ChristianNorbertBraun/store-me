/**
 * Created by Marcel on 24.06.2015.
 */
/**
 * A basic user object which is stored in the database. A user is uniquely identified by its name
 *
 * @constructor
 * @param {String} username     - Name and id of the constructed user
 * @prop {String} password      - Password for the user
 * @prop {String} userType      - Identifies the user role (admin, user, ...)
 * @prop {Array} stores         - stores owned by the user
 * @author Marcel Gross
 */
function User(username, password){
    this._id = username;
    this.name = username;
    this.password = password;
    this.userType = "User";
    this.stores = [];
}

/**
 * Add a given store (referenced by its name) to a given user (referenced by its name)
 *
 * @function
 * @param {String} userName                 - the name of the user where to add the store
 * @param {String} store                    - the name of the store which to add to the user
 * @param {Function} callBackFunction       - necessary callBackFunction
 * @author Marcel Gross
 */
addStore = function(userName, store, callBackFunction){
    loadUserFromDB(userName, function(exists, data){
        if(exists){
            if($.inArray(store, data.stores )== true){
                data.stores.push(store);
                saveUserInDB(data, function(saved, status){
                    if(!saved) {
                        console.log(status);
                    }
                });
            }
            callBackFunction(true);
        } else {
            callBackFunction(false);
        }
    })
};

/**
 * Remove a given store (referenced by its name) from a given user (referenced by its name)
 *
 * @function
 * @param {String} userName                 - the name of the user where to remove the store
 * @param {String} store                    - the name of the store which to remove from the user
 * @param {Function} callBackFunction       - necessary callBackFunction
 * @author Marcel Gross
 */
removeStore = function(userName, store, callBackFunction){
    loadUserFromDB(userName, function(exists, data){
        if(exists){
            var index = -1;
            for(var i = 0; i < data.stores.length; i++){
                if(data.stores[i] === store){
                    index = i;
                    break;
                }
            }
            if(index > -1){
                removeFromArray(data.stores, index);
            }
            saveUserInDB(data, function(saved, status){
                if(!saved) {
                    console.log(status);
                }
            });
            callBackFunction(true);
        } else {
            callBackFunction(false);
        }
    })
};

/**
 * Change the userType of a given user (referenced by its name) to the given userType
 *
 * @function
 * @param {String} userName                 - the name of the user which userType should be changed
 * @param {String} newUserType              - the new type for the user
 * @param {Function} callBackFunction       - necessary callBackFunction
 * @author Marcel Gross
 */
changeUserType = function(userName, newUserType, callBackFunction){
    loadUserFromDB(userName, function(exists, data){
        if(exists){
            data.userType = newUserType;

            saveUserInDB(data, function(saved, status){
                if(!saved) {
                    console.log(status);
                }
            });
            callBackFunction(true);
        } else {
            callBackFunction(false);
        }
    })
};

/**
 * Load a user by its name from the database
 *
 * @function
 * @param {String} userName                 - the name of the user which should be loaded from the database
 * @param {Function} callBackFunction       - necessary callBackFunction
 * @author Marcel Gross
 */
loadUserFromDB = function(userName, callBackFunction){
    $.couch.urlPrefix = strings.link.dbConnection;
    $.couch.db(strings.database.user).openDoc(userName, {
        success: function(data) {
            callBackFunction(true, data);
        },
        error: function(status) {
            console.log("war heir");
            console.log(status);
            callBackFunction(false, status);
        }
    });
};

/**
 * Save or update a user into the database
 *
 * @function
 * @param {User} user                       - the user object to store into the database
 * @param {Function} callBackFunction       - necessary callBackFunction
 * @author Marcel Gross
 */
saveUserInDB = function(user, callBackFunction){
    $.couch.urlPrefix = strings.link.dbConnection;
    $.couch.db(strings.database.user).saveDoc(user, {
        success: function(data) {
            callBackFunction(true);
        },
        error: function(error){
            console.log(error);
            callBackFunction(false);
        }
    })
};

if(typeof exports !== "undefined"){
    exports.newUser = function(username, password){
        return new User(username, password);
    }
}
