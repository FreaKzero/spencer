/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

define(function(require) {
    var utils = require('js/lib/Utils.js'),
        selectors = require('js/config/selectors.js'),
        Settings = require('js/lib/SettingsManager.js');

    function getSeconds(x) {
        return Math.round((x / 1000) * 100) / 100;
    }

    Settings.onStore(function() {
        $.growl.setDuration(Settings.get('growl'));
        $(selectors.main.url).val(Settings.get('home'));
        $(selectors.settings.growlValue).text(getSeconds(Settings.get('growl')));
        $(selectors.settings.scriptcheckValue).text(getSeconds(Settings.get('scriptcheck')));
    });

    $(selectors.settings.growl).on('change mousemove', function() {
        var sec = getSeconds($(this).val());
        $(selectors.settings.growlValue).text(sec);
    });

    $(selectors.settings.scriptcheck).on('change mousemove', function() {
        var sec = getSeconds($(this).val());
        $(selectors.settings.scriptcheckValue).text(sec);
    });

    // Non configurable Settings
    $.UIkit.tooltip.defaults.delay = 600;
    $.UIkit.tooltip.defaults.animation = true;

    // selectors FTW
    $(selectors.main.spencerjs).val('<script type="text/javascript" src="' + utils.getScriptUrl() + '"></script>');

    $(selectors.main.url).val(Settings.get('home'));

    Settings.hydrateInputs();
    $.growl.setDuration(Settings.get('growl'));

    $(selectors.settings.growlValue).text(getSeconds(Settings.get('growl')));
    if (!$(selectors.settings.notifynoscript).prop('checked')) {

        $('#settings-scriptcheck').prop('disabled', 'disabled').css({
            opacity: 0.3
        }).val(1);

    } else {
        $(selectors.settings.scriptcheckValue).text(getSeconds(Settings.get('scriptcheck')));
    }

    $(selectors.settings.notifynoscript).on('change', function() {
        if ($(this).prop('checked')) {
            $('#settings-scriptcheck').removeProp('disabled').css({
                opacity: 1
            });

        } else {
            $('#settings-scriptcheck').prop('disabled', 'disabled').css({
                opacity: 0.3
            }).val(1);
        }
    });

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