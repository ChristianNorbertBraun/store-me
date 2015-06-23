/**
 * Created by Marvin Therolf on 23.06.15.
 */

var currentSessions = [];

function Session(userName, password)
{
    var timeStamp = Date.now();
    this.sessionID = getSessionID(userName, password, timeStamp);
    this.expires = getExpireTimeStamp(timeStamp);
    currentSessions.push(this);
}

var getSessionID = function(userName, password, timeStamp)
{
    var seed = userName + password + timeStamp;
    return hashCode(seed);
};

var hashCode = function(seed)
{
    var hashCode = "0";

    for (var i = 0; i < seed.length; i++)
    {
        hashCode = (seed.charCodeAt(i) + i) % 10;
    }
    return hashCode;
};

var getExpireTimeStamp = function(timeStamp)
{
    return timeStamp + templates.expireTime;
};

var newSession = function(username, password)
{
    return new Session(username, password);
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
    console.log(valid);
    return valid;
};