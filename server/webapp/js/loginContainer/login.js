/**
 * Created by Waleska on 03.06.2015.
 */
var loginName, loginPassword;

function tryLogin()
{
    try {
        $.couch.urlPrefix = strings.link.dbConnection;
        getLoginValues();
        checkNullLoginValues();
        LoginCheckUserValues(function(userExist, passwordCorrect){
            if(!userExist){
                window.alert(strings.login.noUser);
                throw "no User";
            }
            else if(!passwordCorrect){
                window.alert(strings.login.wrongPassword);
                throw "wrong password";
            }
            else{
                location.href = strings.link.toDashboard;
            }
        });
    }
    catch(err)
    {
    }
}

function getLoginValues()
{
    loginName = $('#login-username').val();
    loginPassword = $('#login-password').val();
}

function keyHandlerLogin(event)
{
    var key = event.keyCode;
    if(key == 13) tryLogin();
}

function checkNullLoginValues()
{
    if(!loginName)
    {
        window.alert(strings.login.noUsername);
        throw "no Username";
    }
    else if(!loginPassword)
    {
        window.alert(strings.login.noPassword);
        throw "no Password";
    }
}

function LoginCheckUserValues(cbFn)
{
    var mapFunction = function (doc)
    {
        if(doc.username) {
            emit("user", {Username: doc.username, Password: doc.password});
        }
    };

    $.couch.db("storeme").query(mapFunction, "_count", "javascript", {
        success: function (data) {
            //console.log(data);
            var x = data["rows"];
            var i;
            var temp = false;
            for (i = 0; i < data["total_rows"]; i++) {
                if (x[i].value["Username"] == loginName){
                    if(x[i].value["Password"] == loginPassword)
                    {
                        cbFn(true, true);
                        temp = true;
                    }
                    else{
                        cbFn(true, false);
                    }
                }
            }
            if(!temp) cbFn(false, false);
        },
        error: function (status) {
            console.log(status);
        },
        reduce: false
    });
}