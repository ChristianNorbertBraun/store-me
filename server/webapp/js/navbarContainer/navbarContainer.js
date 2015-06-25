/**
 * Created by christian on 6/9/15.
 */

var navbarContainer = Ractive.extend({
   template: '\
                <nav class="navbar navbar-default navbar-fixed-top navbar-inverse">\
                    <div class="container">\
                        <div class="navbar-header">\
                            <a class="navbar-brand">StoreMe</a>\
                        </div>\
                        {{#if loggedIn}}\
                            <ul class="nav navbar-nav navbar-right">\
                                <li>\
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{userName}}\
                                    <span class="caret"></span></a>\
                                    \
                                    <ul class="dropdown-menu" role="menu">\
                                        <li><a href="{{dashboardLink}}">Dashboard</a></li>\
                                        <li><a href="{{managerLink}}">Manager</a></li>\
                                        <li><a href="{{coredataLink}}">Coredata</a></li>\
                                        <li><a href="{{inventoryLink}}">Inventory</a></li>\
                                        <li class="divider"></li>\
                                        <li><a type="button" on-click="logout()">Logout</a></li>\
                                    </ul>\
                                </li>\
                            </ul>\
                        {{/if}}\
                    </div>\
                </nav>\
                ',
   data: {
        dashboardLink: '',
        managerLink: '',
        coredataLink: '',
        inventoryLink: '',
        userName: null,
        loggedIn: false
    },

   oncomplete: function() {
        var sessionid = getSessionIDFromURL();

        if (sessionid != null) {
            userName = getUserNameBySessionID(sessionid);

            if (userName != "none") {
                dashboardLink = urlBuilder(strings.link.toDashboard, sessionid);
                managerLink = urlBuilder(strings.link.toManager, sessionid);
                coredataLink = urlBuilder(strings.link.toCoredata, sessionid);
                inventoryLink = urlBuilder(strings.link.toInventory, sessionid);


                this.set('dashboardLink', dashboardLink);
                this.set('managerLink', managerLink);
                this.set('coredataLink', coredataLink);
                this.set('inventoryLink', inventoryLink);
                this.set('userName', userName);
                this.set('loggedIn', true);
            }
        }
   },

   logout: function() {
       debugger;

       $.ajax({
           url: strings.link.backendConnection + ":" + strings.link.port + "/logout",
           type: "GET",
           headers: {'sessionID': getSessionIDFromURL()},

           success: function(res, status, xhr) {
               location.href = strings.link.toLogin;

           },

           error: function(res, status, xhr) {
               alert("ERROR!");
           }
       });;
   }
});