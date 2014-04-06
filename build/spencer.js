window.onload = function () {

    function checkElements(maxwidth, critical) {
        var elements = document.body.getElementsByTagName("*"),
            count = elements.length;


        for (var i = 0; i < count; i++) {
            var element = elements[i];
            if (element.scrollWidth > maxwidth) {
                if (critical === true) {
                    element.style.border = '1px solid red';
                    element.style.backgroundColor = 'rgba(255,0,0,0.2)';
                } else {
                    element.style.border = '1px solid #ff8c00';
                    element.style.backgroundColor = 'rgba(255,140,0,0.2)';
                }
            }
        }
    }

    function receiveMessage(e) {
        var d = e.data.split(';'),
            loc = window.location.href,
            bodywidth = document.body.scrollWidth,
            crit = false;

        if (d[0] === 'SPENCER') {

            if (bodywidth > d[1]) {
                crit = true;
            }

            e.source.postMessage(bodywidth + ';' + d[2] + ';' + loc, e.origin);
            checkElements(d[1], crit);
        }

    }

    window.addEventListener('message', receiveMessage);
}
