/**
 * Created by Marvin Therolf on 23.06.15.
 */

console.log("Creating Session");
var session = new Session("captainLuma", "cherrybanana");
console.log(currentSessions.length === 1);
var oldExpireDate = currentSessions[0].expires;
//setTimeout("console.log(isValidSession(session.sessionID) === false)", 700000); // test with 1 min expire time and 70s of waiting worked perfectly

console.log("Testing sub functions");
var timeStamp = 0;
console.log(digitSum(timeStamp) === 0);
console.log(getCheckStamp("marvintherolf") === "69");
console.log(getHashCode("marvintherolfcherrybanana", timeStamp) === "39111936");
console.log(getSessionID("marvintherolf", "cherrybanana", timeStamp) === "6939111936");

console.log("Valid session handling");
console.log(isValidSession(session.sessionID));
var newExpireDate = currentSessions[0].expires;
console.log(oldExpireDate < newExpireDate);

console.log("Get user name by session");
console.log(getUserNameBySessionID(session.sessionID) === "captainLuma");

console.log("End session");
endSession(session.sessionID);
console.log(currentSessions.length === 0);
console.log(!isValidSession(session.sessionID));

