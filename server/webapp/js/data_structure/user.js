/**
 * Created by Marcel on 24.06.2015.
 */
function User(username, password){
    this._id = username;
    this.name = username;
    this.password = password;
    this.userType = "User";
    this.stores = [];
}


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
