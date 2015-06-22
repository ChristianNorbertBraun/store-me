/**
 * Created by Marcel on 15.06.2015.
 */

function createStore() {
 try {
  var store = initStore();
  saveStore(store, function (created) {
   if (created) {
    console.log("is created");
   } else {
    console.log("could not create");
   }
  });
 } catch (err) {
  console.log(err);
 }
};

function initStore() {

 var store = new Container("store");
 var shelf1 = new Container("shelf10");
 var shelf2 = new Container("shelf2");
 var subshelf1_1 = new Container("subschelf1_1");
 var subshelf1_2 = new Container("subschelf1_2");
 var subshelf2_1 = new Container("subschelf2_1");
 var subshelf2_2 = new Container("subschelf2_2");

 addSubContainer(store, shelf1);
 addSubContainer(store, shelf2);
 addSubContainer(shelf1, subshelf1_1);
 addSubContainer(shelf1, subshelf1_2);
 addSubContainer(shelf2, subshelf2_1);
 addSubContainer(shelf2, subshelf2_2);

 addItem(shelf1, 0, 200);
 addItem(subshelf1_1, 1, 200);
 addItem(subshelf1_2, 2, 30);
 addItem(subshelf2_1, 3, 100);
 addItem(subshelf2_2, 4, 82);
 addItem(subshelf1_1, 5, 200);
 addItem(subshelf1_1, 6, 200);

 return store;
};



createStore();


