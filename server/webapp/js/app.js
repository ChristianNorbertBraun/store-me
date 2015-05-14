/**
 * Created by christian on 14.05.15.
 */

$.ajax({
    url: 'design/page.tpl',
    async:true
}).done(function(data){

    window.app = new Ractive({
        el: $('#container'),
        template: data,
        components: {
            loginContainer:loginContainer
        }
    });
});
