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
                        \
                        <ul class="nav navbar-nav navbar-right">\
                            <li>\
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Christian\
                                <span class="caret"></span></a>\
                                \
                                <ul class="dropdown-menu" role="menu">\
                                    <li><a href="{{dashboardLink}}">Dashboard</a></li>\
                                    <li><a href="{{managerLink}}">Manager</a></li>\
                                    <li><a href="{{coredataLink}}">Coredata</a></li>\
                                    <li><a href="{{inventoryLink}}">Inventory</a></li>\
                                    <li class="divider"></li>\
                                    <li><a href="#">Logout</a></li>\
                                </ul>\
                            </li>\
                        </ul>\
                    </div>\
                </nav>\
                ',
   data: {
        dashboardLink: '',
        managerLink: '',
        coredataLink: '',
        inventoryLink: ''

    },

   oncomplete: function() {
        dashboardLink = urlBuilder(strings.link.toDashboard, getSessionIDFromURL());
        managerLink = urlBuilder(strings.link.toManager, getSessionIDFromURL());
        coredataLink = urlBuilder(strings.link.toCoredata, getSessionIDFromURL());
        inventoryLink = urlBuilder(strings.link.toInventory, getSessionIDFromURL());

        this.set('coredataLink', coredataLink);
        this.set('managerLink', managerLink);
        this.set('coredataLink', coredataLink);
        this.set('inventoryLink', inventoryLink);
   },

   loadCoredata: function() {

   }
});