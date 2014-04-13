/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global define */

define(function () {
    var selectors = {
        "frames": {
            'frame': '.frame',
            'iframes': '.frame iframe',
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

    return selectors;

});
