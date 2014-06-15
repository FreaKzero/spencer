/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

define(function(require) {
    var storage = $.localStorage,
        selectors = require('js/data/selectors.js'),
        ScriptUrl = window.location + "",
        ScriptSrc = ScriptUrl.substring(0, ScriptUrl.lastIndexOf('/')) + "/spencer.js",
        settings;

    if (storage.get('settings')) {
        settings = storage.get('settings');
        console.log(settings);
    } else {
        settings = {
            home: 'http://localhost',
            growl: 3200
        };
    }

    $(selectors.main.url).val(settings.home);
    $(selectors.settings.home).val(settings.home);
    $(selectors.settings.growl).val(settings.growl);

    $('#spencerjsLink').val('<script type="text/javascript" src="' + ScriptSrc + '"></script>');

    $.growl.setDuration(settings.growl);    

    $(selectors.settings.actualurl).on('click', function() {
        $(selectors.settings.home).val($(selectors.main.url).val());
    });

    $(selectors.settings.save).on('click', function() {

        storage.set('settings.home', $(selectors.settings.home).val());
        storage.set('settings.growl', $(selectors.settings.growl).val());        
        $.growl.setDuration(settings.growl);
        
        $.growl.success({
            message: 'Settings saved'
        });

        console.log($.growl);
    });
});