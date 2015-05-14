/**
 * Created by christian on 14.05.15.
 */
var loginContainer = Ractive.extend({

    template:'\
      <div class="loginFrame container">\
          <div class="panel panel-default login-panel center-block">\
            <div class="panel-body">\
                <h3 class="text-center">Login</h3>\
                <div class="login-group center-block">\
                    <div class="input-group">\
                        <input class="form-control login-input" type="text" placeholder="Username"/>\
                    </div>\
                    <div class="input-group">\
                        <input class="form-control login-input" type="password" placeholder="Password"/>\
                    </div>\
                </div>\
                <button type="button" class="btn btn-primary login-btn center-block">Login</button>\
            </div>\
          </div>\
          <div class="create-account center-block">\
            <p class="text-center">Don\'t have a StoreMe account yet?<br>\
            <a id="sign-up" href="#">Sign up!</a> </p>\
          </div>\
    </div>\ ',

    data: {},
    oninit: function() {

    },

    oncomplete: function() {
        $("#sign-up").click(function(){
            loadTemplate("design/register.tpl");
        });
    }


});