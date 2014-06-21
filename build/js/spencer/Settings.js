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
    } else {
        // Default Settings
        settings = {
            home: 'http://localhost',
            growl: 3200,
            scriptCheck: 3200
        };
    }
    
    // Non configurable Settings
    $.UIkit.tooltip.defaults.delay = 600;
    $.UIkit.tooltip.defaults.animation = true;
    $('#spencerjsLink').val('<script type="text/javascript" src="' + ScriptSrc + '"></script>');
    
    // Configurable Settings
    $(selectors.main.url).val(settings.home);
    $(selectors.settings.home).val(settings.home);
    $(selectors.settings.growl).val(settings.growl);    
    $(selectors.settings.scriptcheck).val(settings.scriptCheck);    
    $.growl.setDuration(settings.growl);    

    // Events for Modal
    $(selectors.settings.actualurl).on('click', function() {
        $(selectors.settings.home).val($(selectors.main.url).val());
    });

    $(selectors.settings.save).on('click', function() {

        storage.set('settings.home', $(selectors.settings.home).val());
        storage.set('settings.growl', $(selectors.settings.growl).val());        
        storage.set('settings.scriptCheck', $(selectors.settings.scriptcheck).val());        
        $.growl.setDuration(settings.growl);
        
        $.growl.success({
            message: 'Settings saved'
        });        
    });
});