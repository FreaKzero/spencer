/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global requirejs, require */

requirejs.config({
    paths: {
        'jquery': 'vendor/jquery-1.10.2.min',
        'uikit': 'uikit',
        'spencerMain': 'spencer/Main',
        'spencerFrames': 'spencer/Frames',
        'spencerDevices': 'spencer/DeviceLoader',
        'spencerErrors': 'spencer/ErrorMessenger',
        'utils': 'spencer/Utils'
    }
});


require(['jquery', 'spencerDevices', 'spencerFrames', 'spencerErrors', 'spencerMain', 'uikit'],
    function ($, spencerDevices, spencerFrames, spencerErrors, spencerMain, uikit) {

        var selectors = {
            "frames": {
                'frame': '.frame',
                'resize': '.resizeFrame',
                'rotate': '.rotateFrame',
                'close': '.closeFrame',
                'refresh': '.refreshFrame',
                'width': '.frame-width',
                'height': '.frame-height'
            },
            "main": {
                'stencil': '.stencil',
                'container': '#frames',
                'dropdown': '#spawn',
                'url': '#url',
                'submit': '#go'
            }
        };

        // Register Mains
        spencerMain.register(selectors);

        // Register the Errorchecker
        spencerErrors.register(selectors);

        // Fill up the DevicesList
        spencerDevices.register(selectors);

        // Register Event Handlers for the Frames
        spencerFrames.registerEvents(selectors);

    });
