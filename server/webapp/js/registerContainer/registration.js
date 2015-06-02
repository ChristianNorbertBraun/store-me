/**
 * Created by Waleska on 02.06.2015.
 */
var name, pass, passwordConfirmed;

function register() {
    try
    {
        getValues();
        checkNull();
        checkIfUserAlreadyExist();
        checkPasswordConfirmation();
    }
    catch(err)
    {
    }
}

function getValues()
{
    name = $('#username').val();
    pass = $('#password').val();
    passwordConfirmed = $('#confirmed-password').val();
}

//have to be changed if final DB is ready
function checkIfUserAlreadyExist()
{
    var mapFunction = function (doc)
    {
        if(doc.username == name) {
            emit("username", doc.username);
        }
    };
    $.couch.db("storeme").query(mapFunction,"_count", "javascript", {
        success: function (data) {
            console.log(data);
            if(data.total_rows == 1) window.alert("true");
            else
            {
                window.alert(userExist);
                throw "User already exist";
            }
        },
        error: function (status) {

        },
        reduce: false
    });
}

function checkNull()
{
    if(!name) {
        window.alert(noUsername);
        throw "missing username";
    }
    else if(!pass)
    {
        window.alert(noPassword);
        throw "missing password"
}

function checkPasswordConfirmation()
{
    if(pass != passwordConfirmed)
    {
        window.alert(passwordDontMatch)
        throw "Password doesn't match the confirmation";
    }
}
}