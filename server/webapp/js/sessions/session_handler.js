/**
 * Created by Marvin Therolf on 23.06.15.
 */

var currentSessions = [];
var EXPIRE_TIME = 600000; //milliseconds
var CHECK_STAMP_LENGTH = 2;
var HASH_CODE_LENGTH = 8;

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
    var hashCode = getHashCode(key, timeStamp);
    var prefix = getCheckStamp(userName);
    return prefix + hashCode;
};

var getHashCode = function(key, seed)
{
    var hashCode = "";
    var offSet = digitSum(seed);

    for (var i = 0; i < key.length; i++)
    {
        hashCode += (key.charCodeAt(i) + offSet) % 10;
    }
    hashCode %= 9 * Math.pow(10, HASH_CODE_LENGTH - 1);
    hashCode += Math.pow(10, HASH_CODE_LENGTH - 1);
    return "" + hashCode;
};

var digitSum = function(number)
{
    var rest = number;
    var digitSum = 0;

    while (rest > 0)
    {
        digitSum += rest % 10;
        rest = Math.floor(rest/10);
    }
    return digitSum;
};

var getCheckStamp = function(userName)
{
    var checkStamp = 0;

    for (var i = 0; i < userName.length; i++)
    {
        checkStamp += userName.charCodeAt(i);
    }
    checkStamp %= 9 * Math.pow(10, CHECK_STAMP_LENGTH - 1);
    checkStamp += Math.pow(10, CHECK_STAMP_LENGTH - 1);
    return "" + checkStamp;
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

        if (currentSession.expires < Date.now())
        {
            removeFromArray(currentSessions, i);
            i--;
            continue;
        }

        if (currentSession.sessionID === sessionID)
        {
            valid = true;
            currentSession.expires = getExpireTimeStamp(Date.now());
            break;
        }
    }
    return valid;
};

var urlBuilder = function(page, sessionID)
{
    return page + "?" + strings.fixeddata.queryparams + "=" + sessionID;
}

if (typeof exports !== "undefined")
{
    exports.newSession = function(username, password)
    {
        return new Session(username, password);
    };

    exports.isValidSession = function(sessionID)
    {
        return isValidSession(sessionID);
    }
}