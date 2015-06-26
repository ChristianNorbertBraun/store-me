/**
 * Created by Marvin Therolf on 23.06.15.
 */
var currentSessions = [];
var EXPIRE_TIME = 600000; //milliseconds
var CHECK_STAMP_LENGTH = 2;
var HASH_CODE_LENGTH = 8;

/**
 * A Session object contains a session id and an expire timestamp (10 min after creation). A session id is created
 * during a successful login process. The session id is build by hashing the username, the password and the current
 * time. All active sessions are stored in a static array called currentSessions. Every time a function iterates over
 * this array it will delete all expired sessions. <br>
 * <br>Never use this constructor! Use function newSession instead! Otherwise the session will not be pushed to the
 * array of valid sessions. <br>
 * <br> The Session ID does contain the username and is Base64-encoded.
 * @constructor
 * @param userName {String} - The username of a successfully logged in user
 * @param password {String} - The password of the given user
 * @prop userName {String}  - Username
 * @prop sessionID {String} - 10 digit session id plus username encoded with Base64
 * @prop expires {Number}   - Long integer representing the expire date
 * @author Marvin Therolf
 */
function Session(userName, password)
{
    this.userName = userName;
    var timeStamp = Date.now();
    this.sessionID = getSessionID(userName, password, timeStamp);
    this.expires = getExpireTimeStamp(timeStamp);
}

var newSession = function(username, password)
{
    var session = new Session(username, password);
    currentSessions.push(session);
    return session;
};

/**
 * Generates a session id out of a name, a password and a time stamp. The first two digits of the session id will
 * correspond to the username and will always be the same for the same username. The following eight digits are the
 * session hash code.
 * @function
 * @param userName {String}     - Name of the given user
 * @param password {String}     - This users password
 * @param timeStamp {Number}    - The given timestamp
 * @returns {String} Session ID
 * @author Marvin Therolf
 */
var getSessionID = function(userName, password, timeStamp)
{
    var key = userName + password;
    var hashCode = getHashCode(key, timeStamp);
    var prefix = getCheckStamp(userName);
    var sessionID = userName + prefix + hashCode;
    var sessionID64 = btoa(sessionID);
    return sessionID64;
};

/**
 * Returns an 8-digit long hash code built by a given key and seed.
 * @function
 * @param key {String}  - The key to build the hash code for
 * @param seed {Number} - Long integer corresponding to the given timestamp
 * @returns {String} Hash code
 * @author Marvin Therolf
 */
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

/**
 * Returns the digit sum of a given number.
 * @function
 * @param {Number} number      - A number
 * @returns {Number} The digit sum of the given number
 * @author Marvin Therolf
 */
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

/**
 * Return a 2-digit check stamp for a given username.
 * @function
 * @param userName {String}     - The given username
 * @returns {String} The check stamp. A two digit number as its string representation.
 * @author Marvin Therolf
 */
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

/**
 * Calculates the expire time of a given timestamp.
 * @param timeStamp {Number}    - Long integer representing the timestamp
 * @returns {Number} Long integer representing the expire time
 * @author Marvin Therolf
 */
var getExpireTimeStamp = function(timeStamp)
{
    return timeStamp + EXPIRE_TIME;
};

/**
 * Checks if a session id is valid. Checks for existence as well es valid expire timestamp. Deletes expired session ids
 * in the process. Will refresh a valid session id for another 10 minutes.
 * @param sessionID
 * @returns {boolean}
 * @author Marvin Therolf
 */
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
            currentSessions[i].expires = getExpireTimeStamp(Date.now());
            break;
        }
    }
    return valid;
};

/**
 * Builds an url containing the given session id.
 * @function
 * @param page {String}         - URL of the screen the built url should refer to
 * @param sessionID {String}    - id of the current session
 * @returns {String} Next URL including the current session id
 * @author Marvin Therolf
 */
var urlBuilder = function(page, sessionID)
{
    return page + "?" + strings.fixeddata.queryparams + "=" + sessionID;
};

/**
 * Deletes a given session from the list of valid sessions by searching for the session id. Deletes expired session ids
 * in the process.
 * @function
 * @param sessionID {String}    -
 * @author Marvin Therolf
 */
var endSession = function(sessionID)
{
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
            removeFromArray(currentSessions, i);
            break;
        }
    }
};

/**
 * Extracts the session id from the url.
 * @function
 * @returns {String} The current session id.
 * @author Marvin Therolf
 */
var getSessionIDFromURL = function()
{
    var query = location.search;
    var queryParams = query.substring(1, query.length);
    var queryParamsArray = queryParams.split('&');
    var querySessionID = queryParamsArray[0].split('=');
    var sessionID = querySessionID[1];
    return sessionID;
};

/**
 * Returns a username corresponding to a given session id if the session id is valid. Returns null otherwise;
 * @function
 * @param sessionID {String}        - session id to search for
 * @returns {String} Username
 * @author Marvin Therolf
 */
var getUserNameBySessionID = function(sessionID)
{
    var userName = "none";

    if (sessionID !== "") {
        var decodedSessionID = atob(sessionID);
        userName = decodedSessionID.substring(0, decodedSessionID.length - 10);
    }
    return userName;
};

/**
 * Function to quickly remove an object from an array by providing the array and the object's index.
 * @function
 * @param {Array} array     - Array to remove object from
 * @param index             - Index of the object to remove
 * @author Marvin Therolf
 */
var removeFromArray = function(array, index)
{
    var hold = array[index];
    array[index] = array[array.length-1];
    array[array.length-1] = hold;
    array.pop();
};

if (typeof exports !== "undefined")
{
    exports.newSession = function(username, password)
    {
        return newSession(username, password);
    };

    exports.isValidSession = function(sessionID)
    {
        return isValidSession(sessionID);
    };

    exports.endSession = function(sessionID)
    {
        return endSession(sessionID);
    }
}

if (typeof require !== "undefined")
{
    var btoa = require('btoa');
}
