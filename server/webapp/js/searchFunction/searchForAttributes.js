/**
 * Created by Marcel on 22.06.2015.
 */
/**
 * Returns an array with attributes-object which matches to the given input
 *
 * @param {Attributes} attributes   - array with the given Attributes for the search
 * @param {String} input            - given name to filter the attributes
 * @returns {Array}                 - array filled with matched attributes
 * @author Marcel Gross
 */
function filterAttributesByInput(attributes, input){
    var attributenames = getAttributeNames(attributes);
    var results = $(attributenames)
        .map(function(i,v){
            if(v.toLowerCase().indexOf(input.toLowerCase())!=-1){return v}
        }).get();
    var resultAttributes = [];

    for(var i = 0; i < results.length; i++){
        if($.inArray(results[i], attributenames)){
            resultAttributes.push(returnAttributeByName(attributes, results[i]));
        }
    }
    return resultAttributes;
}
/**
 * Returns an string array with the name of the given attributes
 *
 * @param {Attributes} attributes   - array with thegiven Attributes
 * @returns {Array}                 - array filled with all attribute names
 * @author Marcel Gross
 */
function getAttributeNames(attributes){
    var result = [];
    for(var i = 0; i < attributes.length; i++){
        result.push(attributes[i].value._id);
    }
    return result;
}
/**
 * Return an Attribute out of an array of attributes by a given name
 *
 * @param {Attribute} attributes    - array with the given attributes
 * @param {String} name             - name which identifies the requested attribute
 * @returns {Attribute}             - attribute which matches to the given name
 * @author Marcel Gross
 */
function returnAttributeByName(attributes, name){
    var result;
    for(var i = 0; i < attributes.length; i++){
        if(attributes[i].value._id == name){

            result = attributes[i];
            break;
        }
    }
    return result;
}