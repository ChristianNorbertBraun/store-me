/**
 * Created by Marcel on 22.06.2015.
 */
function addAttributes() {
    console.log("addAttributes");
    var names =["length", "width", "height"];
    var unit = ["m", "m", "m"];
    var type = ["unit of length", "unit of length", "unit of length"];

    try {
       for(var i = 0; i < names.length; i++){
           saveAttribute(function(created){
               if (created){
                   console.log("Attribute " + i + " saved");
               } else {
                   console.log("Attribute " + i + " not saved");
               }
           }, names[i], unit[i], type[i]);
       }
    } catch (err) {
        console.log(err);
    }
}


function getAllAttributes() {
    try {
        return loadAllAttributes(function (created, data) {
            if (created) {
                console.log(data);
            } else {
                console.log("nothing loaded");
            }
        });
    } catch (err) {
        console.log(err);
    }
}

function getAttributeByName() {
    try {
        console.log(loadAttributeByName("height"))
    } catch (err) {
        console.log(err);
    }
}


//addAttributes();
//getAllAttributes();
//getAttributeByName();

