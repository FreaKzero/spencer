window.onload = function () {

    function checkElements(maxwidth) {
        var elements = document.body.getElementsByTagName("*"),
            count = elements.length;

        
        for (var i = 0; i < count; i++) {
            var element = elements[i];
            if (element.scrollWidth > maxwidth) {
                element.style.border = '1px solid red';
                element.style.backgroundColor = 'rgba(255,0,0,0.2)';
            }                            
        }
    }

    function receiveMessage(e) {
        var d = e.data.split(';'),
            loc = window.location.href,
            bodywidth = document.body.scrollWidth;

        if (d[0] === 'SPENCER') {
            e.source.postMessage(bodywidth + ';' + d[2] + ';' + loc, e.origin);
            checkElements(d[1]);
        }

    }

    window.addEventListener('message', receiveMessage);
}