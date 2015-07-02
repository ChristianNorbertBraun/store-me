/**
 * Created by Waleska on 02.06.2015.
 */
var name, pass, passwordConfirmed;

/**
 * This function registers and saves a user into our database
 * @function
 * @author Marcel Waleska, Marcel Gross
 */
function register() {
    console.log('register()');
    try
    {
        getValues();
        checkNull();
        checkIfUserAlreadyExist(function(exists, data){
            console.log('check User existence');
            if (exists) {
                window.alert(strings.registration.userExist);
                throw 'User already exists';
            }
            checkSafePassword();
            checkPasswordConfirmation();
            createUser(function(created, sessionID){
                if(created)
                {
                    location.href = urlBuilder(strings.link.toDashboard, sessionID);
                }
                else
                {
                    window.alert(strings.registration.creatingError);
                }
            });
        });

    }
    catch(err)
    {
        console.dir(err);
    }
}
/**
 * This function listens for the key event enter.
 * After enter is pressed it starts the method register
 * @function
 * @param {Number} event    - value of the key which is pressed
 * @author Marcel Waleska
 */
function keyHandlerRegister(e)
{
    var key = e.keyCode;
    if(key == 13) register();
}

/**
 * Ensures that the given password has a minimum of safety requirements.
 * It has to have at least a length of 7 characters, contains at least one small, big letter and one number
 * @function
 * @author Marcel Waleska
 */
function checkSafePassword()
{
    if (this.pass.length < 7) notSafe();
    var passwordArray = pass.split("");
    var containBigLetter = false;
    var containSmallLetter = false;
    var containNumber = false;
    for(var i = 0; i<this.pass.length; i++)
    {
        if(passwordArray[i] >= 'A' && passwordArray[i] <= 'Z') containBigLetter = true;
        if(passwordArray[i] >= 'a' && passwordArray[i] <= 'z') containSmallLetter = true;
        if(passwordArray[i] >= '0' && passwordArray[i] <= '9') containNumber = true;
    }
    if(!containBigLetter || !containSmallLetter || !containNumber) notSafe();
}
/**
 * Is called if the password requirements are not adhered
 * @function
 * @author Marcel Waleska
 */
function notSafe()
{
    window.alert(strings.registration.PasswordNotSafe);
    throw "Password not Safe";
}
/**
 * This function takes the username,  password and confirmed-password from the input form and saves it to the variables loginName, loginPassword and passwordConfirmed
 *
 * @function
 * @author Marcel Waleska
 */
function getValues()
{
    name = $('#register-username').val();
    pass = $('#register-password').val();
    passwordConfirmed = $('#confirmed-password').val();
}

/**
 * Starts a GET-request to ensure that no other user with the same username exits
 * @param {Function} callBackFunction       - necessary callBackFunction
 * @function
 * @author Marcel Waleska, Marcel Gross
 */
var checkIfUserAlreadyExist = function(callBackFunction){
    $.couch.urlPrefix = strings.link.dbConnection;
    $.couch.db(strings.database.user).openDoc(name, {
        success: function(data) {
            callBackFunction(true);
        },
        error: function(status) {
            console.log(status);
            callBackFunction(false);
        }
    });
};
/**
 * Checks if the username and password is filled into the form, otherwise it throws an exception.
 * @function
 * @author Marcel Waleska
 */
function checkNull()
{
    if(!name) {
        window.alert(strings.registration.noUsername);
        throw "missing username";
    }
    else if(!pass)
    {
        window.alert(strings.registration.noPassword);
        throw "missing password"
    }
}
/**
 * Checks if password and passwordConfirmed are the same, otherwise it throws an exception.
 * @function
 * @author Marcel Waleska
 */
function checkPasswordConfirmation()
{
    console.log('check password confirmation');
    if(pass != passwordConfirmed)
    {
        window.alert(strings.registration.passwordDontMatch);
        throw "Password doesn't match the confirmation";
    }
}
/**
 * Creates an user via POST request, username and password are encrypted with storeMeEncrypt and additionally the password is SHA1 encrypted
 * @param {function} callBackFunction       - necessary callBackFunction
 * @author Marcel Waleska, Marcel Gross
 */
var createUser = function(callBackFunction){
    var formData = {userType:"User",stores:""};
    var encryptedUserData = storeMeEncrypt(name + ":" + CryptoJS.SHA1(pass));
    $.ajax({
        url : strings.link.backendConnection + ":" + strings.link.port + "/registeruser",
        type: "POST",
        crossDomain: true,
        dataType: 'json',
        headers: {
            'authorization': encryptedUserData,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        data : formData,
        success: function(data, textStatus, jqXHR)
        {
            callBackFunction(true, data.sessionID);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            callBackFunction(false);
        }
    });
};