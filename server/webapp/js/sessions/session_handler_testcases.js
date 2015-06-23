/**
 * Created by captainluma on 23.06.15.
 */

var session = new Session("captainLuma", "cherrybanana");
console.log(currentSessions.length === 1);
//setTimeout("console.log(isValidSession(session.sessionID) === false)", 700000); // test with 1 min expire time and 70s of waiting worked perfectly

var timeStamp = 0;
console.log(digitSum(timeStamp) === 0);
console.log(getCheckStamp("marvintherolf") === "69");
console.log(getHashCode("marvintherolfcherrybanana", timeStamp) === "39111936");
console.log(getSessionID("marvintherolf", "cherrybanana", timeStamp) === "6939111936");

// TODO: test multiple sessions
// TODO: test end session