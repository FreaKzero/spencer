window.onload = function () {

    function addClass(element, htmlClass) {
        if (element.className) {
            element.className = element.className + " " + htmlClass;
        } else {
            element.setAttribute('class', htmlClass);
        }
    }
    /*
.parent:hover .child
*/
    function injectCSS() {
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".spencerError:hover .spencerErrorInfo{display:block;}.spencerError{background: rgba(255,0,0,0.2); border: 1px solid red; } .spencerErrorInfo {color:white;font-size:11px;font-family:Monospace;width:260px;padding:5px;margin:5px 0 0 5px;border:1px solid grey;border-radius: 3px; background:linear-gradient(to bottom, #ec4458 0%, #c31c3a 100%);display:none;}";
        document.body.appendChild(css);
    }

    function checkElements(maxWidth) {
        var elements = document.body.getElementsByTagName("*"),
            i = 0,
            infoStr = '',
            eWidth = '';

        while (elements[i]) {
            var element = elements[i],
                cssWidth = window.getComputedStyle(element, null).getPropertyValue("width");

            cssWidth = parseInt(cssWidth.substr(0, cssWidth.length - 2));

            if (element.scrollWidth > maxWidth) {

                var info = document.createElement('div');

                addClass(element, 'spencerError');
                info.setAttribute('class', 'spencerErrorInfo');

                infoStr = "&lt;" + element.nodeName + "&gt; ";

                if (element.getAttribute('id')) {
                    infoStr += '#' + element.getAttribute('id') + ' ';
                }

                if (element.getAttribute('class')) {
                    var htmlClass = element.getAttribute('class').replace(/spencerError/, "");

                    if (htmlClass !== "") {
                        infoStr += '.' + htmlClass + ' ';
                    }
                }

                if (cssWidth > maxWidth) {
                    eWidth = '<br>Stylewidth: ' + cssWidth + 'px';
                }


                info.innerHTML = "<b>" + infoStr + "</b>" + "<br>Renderwidth: " + element.scrollWidth + 'px' + eWidth;
                element.insertBefore(info, element.firstChild);
            }

            i++;
        }
    }

    function receiveMessage(e) {
        var d = e.data.split(';'),
            loc = window.location.href,
            bodywidth = document.body.scrollWidth;

        if (d[0] === 'SPENCER') {
            injectCSS();
            e.source.postMessage(bodywidth + ';' + d[2] + ';' + loc, e.origin);
            checkElements(d[1]);
        }

    }

    window.addEventListener('message', receiveMessage);
}