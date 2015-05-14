/**
 * Created by christian on 14.05.15.
 */
var loginContainer = Ractive.extend({

    template:'\
      <div class=loginFrame>\
        <input type="text" placeholder="Username"/>\
        <input type="text" placeholder="Password"/>\
      </div>\ ',

    data: {},
    oninit: function() {
    }
});