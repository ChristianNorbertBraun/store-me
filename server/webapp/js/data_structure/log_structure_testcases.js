/**
 * Created by Marcel on 25.06.2015.
 */
console.log("Create a LogContainer");
var log = new LogContainer(true, "12.06.2015 15:45", "0-0-0", "Hammer", 5, "tester");
console.log(log.containerID === "0-0-0");

console.log("Save to DB");
saveLogContainer(log, function(created){
    console.log(created);
});

console.log("Load from DB");
loadAllLogContainer(function(loaded, data){
    console.log(loaded);
    console.log(data);
});