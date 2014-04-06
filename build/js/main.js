/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global requirejs, require */

requirejs.config({
    paths: {
        'jquery': 'vendor/jquery-1.10.2.min',
        'uikit': 'uikit',
        'spencerFrames': 'spencer/Frames',
        'spencerDevices': 'spencer/DeviceLoader',
        'spencerErrors': 'spencer/ErrorMessenger'
    }
});


require(['jquery', 'spencerDevices', 'spencerFrames', 'spencerErrors', 'uikit'],
    function ($, spencerDevices, spencerFrames, spencerErrors, uikit) {

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

        // Register the Errorchecker
        spencerErrors.register(selectors);

        // Fill up the DevicesList
        spencerDevices.register(selectors);

        // Register Event Handlers for the Frames
        spencerFrames.registerEvents(selectors);

        $('#go').on('click', function () {
            $('.uk-icon-spin').removeClass('uk-icon-spin');
            var url = $('#url').val();

            $('.frame iframe').each(function (i, obj) {
                var id = $(this).prop('id');
                if (id !== "") {
                    $(this).prop('src', url);
                }
            });
        });
    });