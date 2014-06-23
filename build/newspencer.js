/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, browser: true */
/*global define, brackets, $, Mustache */

var spencerUtils = function() {};

spencerUtils.prototype.injectCSS = function() {
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".spencerError:hover .spencerErrorInfo {display: block;position:absolute;left: 10px;}.spencerError {cursor:pointer;background: rgba(255, 0, 0, 0.2);border: 1px solid red;}.spencerErrorInfo {color: white;font-size: 11px;font-family: Monospace;width: 260px;padding: 5px;margin: 5px 0 0 5px;border: 1px solid grey;border-radius: 3px;background: linear-gradient(to bottom, #ec4458 0%, #c31c3a 100%);display: none;}";
    document.body.appendChild(css);
};

spencerUtils.prototype.getComputedStyle = function(element) {
    var cssWidth = window.getComputedStyle(element, null).getPropertyValue("width");
    return parseInt(cssWidth.substr(0, cssWidth.length - 2));
};

spencerUtils.prototype.addClass = function(element, newClass) {
    var elemClass = element.getAttribute('class');

    if (elemClass && elemClass !== '') {
        var regex = new RegExp("/" + newClass + "/", "g");
        newClass = elemClass.replace(regex, "") + " " + newClass;
    }

    element.setAttribute('class', newClass);
};

spencerUtils.prototype.makeDebugInfo = function(element, viewPort, scrollWidth, computedWidth) {
    var info = document.createElement('div'),
        dbgInfo = "&lt;" + element.nodeName + "&gt; ";

    info.setAttribute('class', 'spencerErrorInfo');

    if (element.getAttribute('id')) {
        dbgInfo += '#' + element.getAttribute('id') + ' ';
    }

    if (element.getAttribute('class')) {
        var htmlClass = element.getAttribute('class').replace(/spencerError/, "");

        if (htmlClass !== "") {
            dbgInfo += '.' + htmlClass + ' ';
        }
    }

    dbgInfo = "<b>" + dbgInfo + "</b>" + "<br>Renderwidth: " + computedWidth + 'px';
    
    if (computedWidth > viewPort) {
        dbgInfo += '<br>Stylewidth: ' + scrollWidth + 'px';
    }
    
    info.innerHTML = dbgInfo;
    element.insertBefore(info, element.firstChild);
};

spencerUtils.prototype.checkErrors = function(viewPort) {
    var elements = document.body.getElementsByTagName("*"),
        i = 0,
        errorCount = 0;

    this.injectCSS();
    
    // Not the most elegant solution - but the fastest
    while (elements[i]) {
        var scrollWidth = elements[i].scrollWidth,
            computedWidth = this.getComputedStyle(elements[i]);

        if (scrollWidth > viewPort && elements[i].getAttribute('class') !== 'spencerErrorInfo') {
            errorCount++;
            this.addClass(elements[i], 'spencerError');
            this.makeDebugInfo(elements[i], viewPort, scrollWidth, computedWidth);
        }

        i++;
    }

    return errorCount;
};

/* ================================================================================================ */

function receiveMessage(event) {
    var message = JSON.parse(event.data);

    if (message.source === 'SPENCER') {
        var spencer = new spencerUtils();
        
        switch (message.action) {

            case 'reCheck':
                document.location.reload(true);                
            break;

            default:
                var errors = spencer.checkErrors(message.viewPort);

                event.source.postMessage(JSON.stringify({
                    source: "SPENCER",
                    currentLocation: window.location.href,
                    frameID: message.frameID,
                    errorCount: errors,
                    token: message.token
                }), event.origin);
            
            break;
        }
    }
}

window.onload = function() {
    window.addEventListener('message', receiveMessage);
};