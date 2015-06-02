/**
 * Created by Waleska on 02.06.2015.
 */
var name, pass, passwordConfirmed;

function register() {
    try
    {
        $.couch.urlPrefix = "http://localhost:5984";
        getValues();
        checkNull();
        checkIfUserAlreadyExist();
        checkPasswordConfirmation();
        createUser();
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
    //throw "hello";
}

//have to be changed if final DB is ready
function checkIfUserAlreadyExist()
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
                    window.alert("User already exist!");
                }
            }
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
        window.alert(noUsername);
        throw "missing username";
    }
    else if(!pass)
    {
        window.alert(noPassword);
        throw "missing password"
    }
}

function checkPasswordConfirmation()
{
    if(pass != passwordConfirmed)
    {
        window.alert(passwordDontMatch)
        throw "Password doesn't match the confirmation";
    }
}

function createUser()
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
            console.log(data);
        },
        error: function(status) {
            console.log(status);
            throw "can not create User";
        }
    });
}

