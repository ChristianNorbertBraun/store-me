/**
 * Created by captainluma on 23.06.15.
 */

var session = new Session("captainLuma", "cherrybanana");
console.log(currentSessions.length === 1);
setTimeout("console.log(isValidSession(session.sessionID) === false)", 700000); // test with 1 min expire time and 70s of waiting worked
console.log("hi");
getSessionIDFromURL();