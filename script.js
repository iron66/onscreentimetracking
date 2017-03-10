
function triggerVisability( options ) {
    if (!options.selector) {
        return null;
    }
    var element = document.querySelector(options.selector);
    var interval = options.interval || 1000;
    var percent = options.percentOnScreen || 100;
    var data = {
        counter: 0,
        visiablePart: 0,
    };
    var counter = 0;

    if(options.selector.indexOf('#'))

        function incCounter() {
            return counter++;
        }
    function getCoordsSize(el) { // кроме IE8-
        var box = el.getBoundingClientRect();
        var elwidth = el.offsetWidth;
        var elheight = el.offsetHeight;

        return {
            width: elwidth,
            height: elheight,
            top: box.top,
            left: box.left,
            bottom: (box.top) + elheight,
            right: (box.left) + elwidth
        };
    }
    function checkVisability(el, expectedPercent) {
        // Viewport height and width:
        var vwidth = document.documentElement.clientWidth || window.innerWidth;
        var vheight= document.documentElement.clientHeight|| window.innerHeight;

        // Element height,width and coordinates:
        var elParams = getCoordsSize(el);

        // Checking
        var visiablePart;
        var visiablePartPersent;
        if (elParams.top >= 0 && elParams.bottom <= vheight || elParams.top < 0 && elParams.bottom > vheight) {
            data.visiablePart = '100%';
            return true;
        } else if (elParams.top < 0 && elParams.bottom < vheight) {
            visiablePart = elParams.height - elParams.bottom;
            if (visiablePart > 0) {
                visiablePartPersent = 100 - (100 / (elParams.height / visiablePart));
                if (visiablePartPersent >= expectedPercent) {
                    data.visiablePart = visiablePartPersent + '%';
                    return true;
                }
            }
        } else if (elParams.top > 0 && elParams.bottom > vheight) {
            visiablePart = vheight - elParams.top;
            if (visiablePart > 0) {
                visiablePartPersent =  100 / (elParams.height / visiablePart);
                if (visiablePartPersent >= expectedPercent) {
                    data.visiablePart = visiablePartPersent + '%';
                    return true;
                }
            }
        } else return false;
    }

    return function (){
        window.setInterval(function () {
            var isVisiable = checkVisability(element, percent);
            if (isVisiable) {
                data.counter++;
                if(options.callback) {
                    options.callback(data);
                }
            }
        }, interval);
    }
}
