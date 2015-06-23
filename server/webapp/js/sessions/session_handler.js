/**
 * Created by Marvin Therolf on 23.06.15.
 */

var currentSessions = [];
var EXPIRE_TIME = 600000; //milliseconds


function Session(userName, password)
{
    var timeStamp = Date.now();
    this.sessionID = getSessionID(userName, password, timeStamp);
    this.expires = getExpireTimeStamp(timeStamp);
    currentSessions.push(this);
}

var getSessionID = function(userName, password, timeStamp)
{
    var key = userName + password;
    var seed = timeStamp;
    return hashCode(key, seed);
};

var hashCode = function(key, seed)
{
    var hashCode = "";
    var offSet = digitSum(seed);

    for (var i = 0; i < key.length; i++)
    {
        hashCode += (key.charCodeAt(i) + offSet) % 10;
    }
    return hashCode;
};

var digitSum = function(seed)
{
    var digitSum = 0;

    for (var i = 0; i < seed.length; i++)
    {
        digitSum += seed.charCodeAt(i);
    }
    return digitSum;
};

var getExpireTimeStamp = function(timeStamp)
{
    return timeStamp + EXPIRE_TIME;
};

var isValidSession = function(sessionID)
{
    var valid = false;

    for (var i = 0; i < currentSessions.length; i++)
    {
        var currentSession = currentSessions[i];

        if (currentSession.sessionID === sessionID)
        {
            if (currentSession.expires < Date.now())
            {
                removeFromArray(currentSessions, i);
            }
            else
            {
                valid = true;
                currentSession.expires = getExpireTimeStamp(Date.now());
            }
            break;
        }
    }
    return valid;
};

var getSessionIDFromURL = function()
{
    console.dir(location);
};

if (typeof exports !== "undefined")
{
    exports.newSession = function(username, password)
    {
        return new Session(username, password);
    };
}