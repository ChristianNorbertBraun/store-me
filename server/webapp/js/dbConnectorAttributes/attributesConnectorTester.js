/**
 * Created by Marcel on 22.06.2015.
 */
var addAttributes = function() {
    console.log("addAttributes");
    var names =["length", "width", "height", "line"];
    var unit = ["m", "m", "m", "m"];
    var type = ["unit of length", "unit of length", "unit of length", "unit of length"];

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
};

var getAllAttributes = function(){
    try {
        return loadAllAttributes(function (created, data) {
            if (created) {
                //console.log(data);
            } else {
                console.log("nothing loaded");
            }
        });
    } catch (err) {
        console.log(err);
    }
};
var getAttributeByName = function() {
    loadAttributeByName('width', function(created, data){
        if(created){
            console.dir(data);
        } else {
            console.log("nothing loaded");
        }
    });
};


//addAttributes();
//getAllAttributes();
getAttributeByName();

