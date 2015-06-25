/**
 * Created by christian on 14.05.15.
 */
var registerContainer = Ractive.extend({

    template:'\
      <div class="loginFrame container">\
          <div class="panel panel-default login-panel center-block">\
            <div class="panel-body">\
                <h3 class="text-center">Sign Up</h3>\
                <div class="login-group center-block">\
                    <div class="input-group">\
                        <input id="register-username" class="form-control login-input" type="text" placeholder="Username"/>\
                    </div>\
                    <div class="input-group">\
                        <input id="register-password" class="form-control login-input" type="password" placeholder="Password"/>\
                    </div>\
                    <div class="input-group">\
                        <input id="confirmed-password" class="form-control login-input" type="password" placeholder="Confirm Password" onkeypress="keyHandlerRegister(event)"/>\
                    </div>\
                </div>\
                <button type="button" class="btn btn-primary login-btn center-block" onclick="register()">Sign Up</button>\
            </div>\
          </div>\
          <div class="create-account center-block">\
            <p class="text-center">Already have a StoreMe account?<br>\
            <a id="sign-up" href="index.html">Login!</a> </p>\
          </div>\
    </div>\ ',

    data: {},
    oninit: function() {
    }


});