/**
 * Created by Marcel on 24.06.2015.
 */


console.log("New User");
var user = new User("Tester", "pw");
console.log(user.name === "Tester");

saveUserInDB(user, function(exists){
    if(exists){
        console.log("saved");
    }
});
/*
console.log("Add stores");
addStore("Tester", "hi", function(exists){
    if(exists){

    }
});



console.log("Remove spezifc store");
addStore("Tester", "remove", function(exists){
    if(exists){
        console.log("added remove");
    }
});

removeStore("Tester", "remove", function(exists){
    if(exists){
        console.log("remove remove");
    }
});

console.log("Change userType");
changeUserType("Tester", "Admin", function(exists){
    if(exists){
        console.log("changed usertype");
    }
});
*/
loadUserFromDB("Tester", function(exists, data){
    if(exists){
        console.log(data);
    }
});


