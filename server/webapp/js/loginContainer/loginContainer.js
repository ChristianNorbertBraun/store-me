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
                        <input id="login-username" class="form-control login-input" type="text" placeholder="Username"/>\
                    </div>\
                    <div class="input-group">\
                        <input id="login-password" class="form-control login-input" type="password" placeholder="Password" onkeypress="keyHandlerLogin(event)"/>\
                    </div>\
                </div>\
                <button type="button" class="btn btn-primary login-btn center-block" onclick="tryLogin()">{{button}}</button>\
            </div>\
          </div>\
          <div class="create-account center-block">\
            <p class="text-center">{{question}}<br>\
            <a id="sign-up" href="register.html">{{signup}}</a> </p>\
          </div>\
    </div>\ ',

    data:{},
    oninit: function() {
    }


});