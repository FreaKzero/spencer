/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

define(function(require) {
    var utils = require('js/lib/Utils.js'),
        selectors = require('js/config/selectors.js'),
        Settings = require('js/lib/SettingsManager.js');
    
    Settings.onStore(function() {
		$.growl.setDuration(Settings.get('growl'));
        $(selectors.main.url).val(Settings.get('home'));        
    });
    
    // Non configurable Settings
    $.UIkit.tooltip.defaults.delay = 600;
    $.UIkit.tooltip.defaults.animation = true;
    
    // selectors FTW
    $(selectors.main.spencerjs).val('<script type="text/javascript" src="' + utils.getScriptUrl() + '"></script>');

    $(selectors.main.url).val(Settings.get('home'));
    
    Settings.hydrateInputs();
    $.growl.setDuration(Settings.get('growl'));

    // Events for Modal
    $(selectors.settings.actualurl).on('click', function() {        
        $(selectors.settings.home).val($(selectors.main.url).val());        
    });

    $(selectors.settings.resetdefault).on('click', function() {        
		Settings.reset();
        Settings.hydrateInputs();
        
        $.growl.success({
            message: 'Default Settings recovered'
        });
        
    });
    
    $(selectors.settings.save).on('click', function() {                
        Settings.saveValues();        
        
        $.growl.success({            
            message: 'Settings saved'
        });
    });
});