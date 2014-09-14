/*jslint plusplus: true, vars: true, nomen: true, browser: true, strict: false */
/*global define */

define(function() {
    return {
        'frames': {
            'frame': '.frame',
            'iframes': '.frame iframe',
            'resize': '.resizeFrame',
            'rotate': '.rotateFrame',
            'close': '.closeFrame',
            'refresh': '.refreshFrame',
            'width': '.frame-width',
            'height': '.frame-height',
            'debug': '.debugFrame'
        },

        'main': {
            'stencil': '.stencil',
            'container': '#frames',
            'dropdown': '#spawn',
            'url': '#url',
            'submit': '#go',
            'spencerjs': '#spencerjsLink',
            'liveCSS' : '#autorefresh'
        },

        'settings': {
            'home': '#settings-home',
            'actualurl': '#settings-actualurl',
            'save': '#settings-save',
            'resetdefault': '#settings-reset-default',
            'cancel': '#settings-cancel',
            'growl': '#settings-growl',
            'scriptcheck': '#settings-scriptcheck',
            'notifysuccess': '#settings-notify-on-success',
            'notifynoscript': '#settings-notify-noscript',
            'growlValue': '#settings-growl-value',
            'scriptcheckValue': '#settings-scriptcheck-value'
        }
    };
});