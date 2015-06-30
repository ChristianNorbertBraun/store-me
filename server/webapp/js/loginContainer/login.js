/**
 * Created by Waleska on 03.06.2015.
 */
var loginName, loginPassword;


/**
 * This functions tries to log the user in. It validates Username and Password and sends them via GET-Request to the backend.
 * The Backend responses with 200 and an valid sessionID if the login was successful, status code 400 if the password was wrong
 * and 404 if there is no such user stored in the database.
 * If there is one of such errors it will be displayed via alert.
 *
 * @function
 * @author Marcel Waleska, Marcel Gross
 */
var tryLogin = function(){
    try{
        getLoginValues();
        checkNullLoginValues();
        var encryptedUserData = storeMeEncrypt(loginName + ":" + CryptoJS.SHA1(loginPassword));

        $.ajax({
            url: strings.link.backendConnection+":"+strings.link.port+"/login",
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
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
/**
 * This function takes the username and password from the input form and saves it to the variables loginName and loginPassword
 *
 * @function
 * @author Marcel Waleska
 */
var getLoginValues = function () {
    loginName = $('#login-username').val();
    loginPassword = $('#login-password').val();
};

/**
 * This function listens for the key event enter.
 * After enter is pressed it starts the method trylogin
 * @function
 * @param {Number} event    - value of the key which is pressed
 * @author Marcel Waleska
 */
var keyHandlerLogin = function(event){
    var key = event.keyCode;
    if(key == 13) tryLogin();
};

/**
 * This function checks if the given username and password is not null.
 * If one of it is null it throws an exception
 * @function
 * @author Marcel Waleska
 */
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
