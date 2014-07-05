/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

define(function(require, exports) {
    var defaults = require('js/config/DefaultSettings.js'),
        sl = require('js/config/selectors.js'),
        selectors = sl.settings,
        storage = $.localStorage,
        settings = {},
        fnStore = false;

    // Get Settings from Storage or use Defaults when no Settings in Storage
    if (storage.get('settings')) {
        settings = storage.get('settings');
    } else {
        settings = defaults;
    }

    // Merge Defaults with Storage - So new Default Settings cant be bugged
    settings = $.extend({}, defaults, settings);

    // Store new Merged Settings Object in Storage
    storage.set('settings', settings);

    function onStore(fn) {
        fnStore = fn;
    }

    function store() {
        storage.set('settings', settings);

        if (fnStore) {
            (fnStore)();
        }
    }

    function get(key) {
        if (defaults[key]) {
            return settings[key];
        } else {
            return false;
        }
    }

    function set(key, value) {
        if (defaults[key]) {
            settings[key] = value;
        } else {
            return false;
        }
    }

    function hydrateInputs() {
        for (var s in settings) {
            if ($(selectors[s]).prop('type') === 'checkbox') {
                $(selectors[s]).prop('checked', settings[s]);
            } else {
                $(selectors[s]).val(settings[s]);
            }
        }
    }

    function saveValues() {
        for (var s in settings) {
            if ($(selectors[s]).prop('type') === 'checkbox') {
                set(s, $(selectors[s]).prop('checked'));
            } else {
                set(s, $(selectors[s]).val());
            }
        }
        store();
    }

    function reset() {
        settings = defaults;
        store();
    }

    exports.get = get;
    exports.set = set;
    exports.saveValues = saveValues;
    exports.hydrateInputs = hydrateInputs;
    exports.reset = reset;
    exports.onStore = onStore;
    exports.store = store;

});