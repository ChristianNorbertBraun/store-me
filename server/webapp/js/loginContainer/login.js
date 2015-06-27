/**
 * Created by Waleska on 03.06.2015.
 */
var loginName, loginPassword;

var tryLogin = function(){
    try{
        getLoginValues();
        checkNullLoginValues();
//        var base64 = "Basic " + btoa(loginName+":"+loginPassword);
        var encryptedUserData = storeMeEncrypt(loginName + ":" + loginPassword);
        $.ajax({
            url: strings.link.backendConnection+":"+strings.link.port+"/login",
            type: "GET",
            headers: {'authorization': encryptedUserData, 'Access-Control-Allow-Origin': '*'},
            success: function(res, status, xhr) {
                location.href = urlBuilder(strings.link.toDashboard, res.sessionID);
            },
            error: function(res, status, xhr) {
                //wrongPassword
                if(res.status == 400){
                    window.alert(strings.login.wrongPassword);
                }
                //user does not exists
                else if(res.status == 404){
                    window.alert(strings.login.noUser);
                } else {
                    window.alert(strings.login.loginfailed);
                }
            }
        });

    } catch(err){
        console.log(err);
    }
};

var getLoginValues = function () {
    loginName = $('#login-username').val();
    loginPassword = $('#login-password').val();
};

var keyHandlerLogin = function(event){
    var key = event.keyCode;
    if(key == 13) tryLogin();
};

var checkNullLoginValues = function(){
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
};
