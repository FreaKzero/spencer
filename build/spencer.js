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
            
            case 'livePreview':
                (function(){var e={array_filter:function(e,t){var n={};for(var r in e){if(t(e[r])){n[r]=e[r]}}return n},filemtime:function(e){var t=this.get_headers(e,1);return t&&t["Last-Modified"]&&Date.parse(t["Last-Modified"])/message.csspoll||false},get_headers:function(e,t){var n=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest;if(!n){throw new Error("XMLHttpRequest not supported.")}var r,i,s,o,u=0;try{n.open("HEAD",e,false);n.send(null);if(n.readyState<3){return false}r=n.getAllResponseHeaders();r=r.split("\n");r=this.array_filter(r,function(e){return e.toString().substring(1)!==""});i=t?{}:[];for(o in r){if(t){s=r[o].toString().split(":");i[s.splice(0,1)]=s.join(":").substring(1)}else{i[u++]=r[o]}}return i}catch(a){return false}}};var t=function(){this.reloadFile=function(t){for(var n=0,r=t.length;n<r;n++){var i=t[n],s=e.filemtime(this.getRandom(i.href));if(i.last){if(i.last!=s){i.elem.setAttribute("href",this.getRandom(i.href))}}i.last=s}setTimeout(function(){this.reloadFile(t)},message.csspoll)};this.getHref=function(e){return e.getAttribute("href").split("?")[0]};this.getRandom=function(e){return e+"?x="+Math.random()};var t=document.getElementsByTagName("link"),n=[];for(var r=0,i=t.length;r<i;r++){var s=t[r],o=s.rel;if(typeof o!="string"||o.length==0||o=="stylesheet"){n.push({elem:s,href:this.getHref(s),last:false})}}this.reloadFile(n)};t()})();
                break;

            default:
                var errors = spencer.checkErrors(message.viewPort);

                event.source.postMessage(JSON.stringify({
                    source: "SPENCER",
                    currentLocation: window.location.href,
                    frameID: message.frameID,
                    errorCount: errors
                }), event.origin);

                break;
        }
    }
}

window.onload = function() {
    window.addEventListener('message', receiveMessage);
};
