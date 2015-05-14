/**
 * Created by christian on 14.05.15.
 */

function loadTemplate(template, components, dbdata) {
    $.ajax({
        url: template,
        async: true
    }).done(function (data) {

        window.app = new Ractive({
            el: $('#container'),
            template: data,
            components: components,
            data:dbdata
        });
    });
}