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
                                    <li><a href="#">Dashboard</a></li>\
                                    <li><a href="#">Storage</a></li>\
                                    <li><a href="#">Settings</a></li>\
                                    <li class="divider"></li>\
                                    <li><a href="#">Logout</a></li>\
                                </ul>\
                            </li>\
                        </ul>\
                    </div>\
                </nav>\
                '
});