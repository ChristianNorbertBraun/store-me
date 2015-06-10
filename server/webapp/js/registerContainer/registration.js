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
            createUser(function(created){
                if(created)
                {
                    location.href = strings.link.toDashboard;
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

//have to be changed if final DB is ready
function checkIfUserAlreadyExist(cbFn)
{
    var mapFunction = function (doc)
    {
        if(doc.username) {
            emit("username", doc.username);
        }
    };

    $.couch.db("storeme").query(mapFunction, "_count", "javascript", {
        success: function (data) {
            console.log(data);
            var x = data["rows"];
            var i;
            for (i = 0; i < data["total_rows"]; i++) {
                if (x[i].value == name) {
                    cbFn(true);
                }
            }
            cbFn(false, data);
        },
        error: function (status) {
            console.log(status);
        },
        reduce: false
    });

}

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

function createUser(cbFn)
{
    var user =
    {
        _id: this.name,
        "type": "User",
        "username": this.name,
        "password": this.pass
    };
    $.couch.db("storeme").saveDoc(user, {
        success: function(data) {
            cbFn(true);
            console.log(data);
        },
        error: function(status) {
            console.log(status);
            cbFn(false);
        }
    });
}

