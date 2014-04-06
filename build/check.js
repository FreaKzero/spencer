window.onload = function () {
    function receiveMessage(e) {
        var d = e.data.split(';'),
            loc = window.location.href;

        if (d[0] === 'SPENCER') {
            e.source.postMessage(document.body.scrollWidth + ';' + d[1] + ';' + loc, e.origin);
        }

    }
    window.addEventListener('message', receiveMessage);
}