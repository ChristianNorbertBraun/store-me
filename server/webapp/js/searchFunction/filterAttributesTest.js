/**
 * Created by Marcel on 22.06.2015.
 */
function tester(){
   var text = "[{\"id\":\"height\",\"key\":null,\"value\":{\"_id\":\"height\",\"_rev\":\"2-ff64b14b8d2fc943198f864ed3228734\",\"unit\":\"cm\",\"type\":\"unit of length\"}},{\"id\":\"length\",\"key\":null,\"value\":{\"_id\":\"length\",\"_rev\":\"1-68c4c1538c7699c5839c1a07c5fd2b53\",\"unit\":\"m\",\"type\":\"unit of length\"}},{\"id\":\"line\",\"key\":null,\"value\":{\"_id\":\"line\",\"_rev\":\"1-68c4c1538c7699c5839c1a07c5fd2b53\",\"unit\":\"m\",\"type\":\"unit of length\"}},{\"id\":\"width\",\"key\":null,\"value\":{\"_id\":\"width\",\"_rev\":\"1-68c4c1538c7699c5839c1a07c5fd2b53\",\"unit\":\"m\",\"type\":\"unit of length\"}}]";
    var allAttributes = JSON.parse(text);


    var result = filterAttributesByInput(allAttributes, "l");
    console.log(result);

}

tester();