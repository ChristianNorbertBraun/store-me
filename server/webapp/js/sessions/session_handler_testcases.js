/**
 * Created by captainluma on 23.06.15.
 */

var session = new Session("captainLuma", "cherrybanana");
console.log(currentSessions.length === 1);
//setTimeout("console.log(isValidSession(session.sessionID) === false)", 700000); // test with 1 min expire time and 70s of waiting worked

var timeStamp = 1435083694726;
console.log(digitSum(timeStamp));
console.log(getCheckStamp("marvintherolf"));
console.log(getHashCode("marvintherolfcherrybanana", timeStamp));
console.log(getSessionID("marvintherolf", "cherrybanana", timeStamp));

// TODO: test multiple sessions