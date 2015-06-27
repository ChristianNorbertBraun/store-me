/**
 * Created by Waleska on 02.06.2015.
 */
var name, pass, passwordConfirmed;

function register() {
    try
    {
        $.couch.urlPrefix = strings.link.dbConnection;
        getValues();
        checkNull();
        checkIfUserAlreadyExist(function(exists, data){
            if (exists) {
                window.alert(strings.registration.userExist);
                throw 'User already exists';
            }

            // work with data
            //console.log(data);
            // end work with data
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

            //TODO: secure Data transaction; maybe with https
            //TODO: check if password safe
        });

    }
    catch(err)
    {
    }
}

function keyHandlerRegister(e)
{
    var key = e.keyCode;
    if(key == 13) register();
}

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

function notSafe()
{
    window.alert(strings.registration.PasswordNotSafe);
    throw "Password not Safe";
}

function getValues()
{
    name = $('#register-username').val();
    pass = $('#register-password').val();
    passwordConfirmed = $('#confirmed-password').val();
}

var checkIfUserAlreadyExist = function(callBackFunction){

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

function checkPasswordConfirmation()
{
    if(pass != passwordConfirmed)
    {
        window.alert(strings.registration.passwordDontMatch);
        throw "Password doesn't match the confirmation";
    }
}

var createUser = function(callBackFunction){
    var formData = {userType:"User",stores:""};
//    var base64 = "Basic " + btoa(name+":"+pass);
    var encryptedUserData = storeMeEncrypt(name + ":" + pass);
    $.ajax({
        url : strings.link.backendConnection + ":" + strings.link.port + "/registeruser",
        type: "POST",
        crossDomain: true,
        dataType: 'json',
        headers: {'authorization': encryptedUserData, 'Access-Control-Allow-Origin': '*'},
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