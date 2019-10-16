/**
 * js-aload
 * @ver v1.2.3.
 * @link https://github.com/pazguille/aload
 */
function aload(t) {
    "use strict";
    var e = "data-aload";
    return t = t || window.document.querySelectorAll("[" + e + "]"), void 0 === t.length && (t = [t]), [].forEach.call(t, function (t) {
        t["LINK" !== t.tagName ? "src" : "href"] = t.getAttribute(e), t.removeAttribute(e)
    }), t;
}


/**
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * @link https://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
 */
function updateViewportDimensions() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;
    return {
        width: x,
        height: y,
        print: 'viewport(w,h): ' + x + ',' + y
    };
}

/** Setting the viewport width */
window.viewport = updateViewportDimensions();
window.preViewport = viewport;
window.breakpointMobileDesktop = 960; /* browser:960, monitor:1024 */
window.breakpointTabletDesktop = 1184; /* browser:1184, monitor:1280 */
console.log(viewport.print);


/**
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * @link https://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed
 */
window.waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();
/** How long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok. */
window.timeToWaitForLast = 300;


/** SlideOut.js */
function initSlideOutJS() {
    console.log('start SlideOut.js');
    if (typeof Slideout !== 'undefined') {
        let slideoutPanel = document.getElementById('js-slideout-panel');
        let leftSlideoutMenu = document.getElementById('js-slideout-left-menu');
        let leftSlideoutToggleButtons = document.querySelectorAll('.js-slideout-toggle-left');

        window.leftSlideout = new Slideout({
            'menu': leftSlideoutMenu,
            'panel': slideoutPanel,
            'padding': 206, /* (--slideout-menu-width) - (--slideout-panel-margin-left) */
            'tolerance': 70 /* sensitivity */
        });

        Array.prototype.forEach.call(leftSlideoutToggleButtons, function (el, i) {
            el.addEventListener('click', function () {
                leftSlideout.toggle();
            });
        });
    } else {
        setTimeout(initSlideOutJS, 1000);
    }
}


/** FullPage.js selectorManager */
function selectorManager() {
    let fullpageSlidesWrap = document.querySelectorAll('.js-fullpage-slide-wrap');
    let fullpageSlides = document.querySelectorAll('.js-fullpage-slide');

    Array.prototype.forEach.call(fullpageSlidesWrap, function (el, i) {
        if (viewport.width < breakpointMobileDesktop) {
            el.classList.remove("o-grid");
            el.classList.remove("o-grid--wrap");
        } else {
            el.classList.add("o-grid");
            el.classList.add("o-grid--wrap");
        }
    });
    Array.prototype.forEach.call(fullpageSlides, function (el, i) {
        if (viewport.width < breakpointMobileDesktop) {
            el.classList.remove("o-grid__cell");
            el.classList.remove("o-grid__cell--width-100");
            el.classList.remove("o-grid__cell--width-33@large");
            el.classList.add("slide");
        } else {
            el.classList.remove("slide");
            el.classList.add("o-grid__cell");
            el.classList.add("o-grid__cell--width-100");
            el.classList.add("o-grid__cell--width-33@large");
        }
    });
}


/** FullPage.js */
function initFullPageJS() {
    console.log('start FullPage.js');
    if (typeof fullpage !== 'undefined') {
        selectorManager();

        new fullpage('#js-fullpage-sections', {
            licenseKey: '263DXXXX-B839XXXX-AE67XXXX-F398XXXX',
            menu: '#js-fullpage-menu',
            anchors: ['about', 'services', 'channels', 'reviews', 'reasons'],
            continuousVertical: true,
            verticalCentered: false,
            afterLoad: function(origin, destination, direction) {
            //  console.log('origin: '+origin.anchor+', destination: '+destination.anchor);
                if (destination.anchor === 'reviews') {
                    let reviewDrawers = document.querySelectorAll('.js-slide-down-toggle');
                    Array.prototype.forEach.call(reviewDrawers, function (el, i) {
                        el.parentNode.parentNode.parentNode.classList.remove("hide");
                        el.classList.remove("tcon-transform");
                    });
                }
            },
        });
    } else {
        setTimeout(initFullPageJS, 1000);
    }
}


/** TransformIcons.js */
function initTransformIconsJS() {
    console.log('start TransformIcons.js');
    if (typeof transformicons !== 'undefined') {
        transformicons.add('.tcon');

        // init toggle button
        let slideDownToggleButtons = document.querySelectorAll('.js-slide-down-toggle');
        Array.prototype.forEach.call(slideDownToggleButtons, function (el, i) {
            el.addEventListener('click', function () {
                el.parentNode.parentNode.parentNode.classList.toggle("hide");
            });
        });

        // desktop behaviour
        if (viewport.width >= breakpointTabletDesktop) {
            transformicons.transform('.tcon-menu--xcross');
        }
    } else {
        setTimeout(initTransformIconsJS, 1000);
    }
}


/** MicroModal.js */
function initMicroModalJS() {
    console.log('start MicroModal.js');
    if (typeof MicroModal !== 'undefined') {
        MicroModal.init();
    } else {
        setTimeout(initMicroModalJS, 1000);
    }
}


/** Email.js */
function initEmailJS() {
    console.log('start Email.js');
    if (typeof emailjs !== 'undefined') {
        document.getElementById('js-form-submit').removeAttribute('disabled');
        emailjs.init('user_BkYf4axbHW7CKGMye6bab');

        document.getElementById('js-form').addEventListener('submit', function(event) {
            event.preventDefault();
            document.getElementById('js-form-submit').setAttribute('disabled', 'disabled');
            document.getElementById('js-form-submit').textContent = 'Отправляем...';

            // generate the contact number value
            this.contact_number.value = Math.random() * 100000 | 0;
            /** Yandex Maps API */
            if ( typeof YMaps !== 'undefined' ) {
                this.user_city.value = YMaps.location.city;
                this.user_region.value = YMaps.location.region;
                this.user_country.value = YMaps.location.country;
            }
            emailjs.sendForm('default_service', 'template_almatysputnik', this)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    document.getElementById('js-form-name').setAttribute('disabled', 'disabled');
                    document.getElementById('js-form-phone').setAttribute('disabled', 'disabled');
                    document.getElementById('js-form-submit').textContent = 'Спасибо!';
                    if (200 == response.status) {
                        document.getElementById('js-form-success').style.display = 'block';
                    } else {
                        document.getElementById('js-form-error').style.display = 'block';
                    }
                }, function(error) {
                    console.log('FAILED...', error);
                    document.getElementById('js-form-error').style.display = 'block';
                });
        });
    } else {
        setTimeout(initEmailJS, 1000);
    }
}


/** initSVGMap */
function initSVGMap() {
    let countriesInputs = document.querySelectorAll('.js-channels-tab');
    let countries = Object.values(countriesInputs).map(function(el, i) {
        return el.getAttribute('data-country');
    });
    let countriesIds = Object.values(countriesInputs).map(function(el, i) {
        return el.getAttribute('id');
    });

    var counter = 0;
    let start = setInterval(checkNext, 2000);

    function disablePrev() {
        if (counter === 0) {
            document.getElementById(countries[countries.length - 1]).style.fill = '';
        } else {
            document.getElementById(countries[counter - 1]).style.fill = '';
        }
    }
    function checkNext() {
        disablePrev();
        document.getElementById(countriesIds[counter]).checked = true;
        document.getElementById(countries[counter]).style.fill = '#ee0202';
        counter++;
        if (counter >= countries.length) {
            counter = 0;
        }
    }
    function checkThis(el, i) {
        disablePrev();
        document.getElementById(el.getAttribute('data-country')).style.fill = '#ee0202';
        counter = i + 1;
        if (counter >= countries.length) {
            counter = 0;
        }
    }
    Array.prototype.forEach.call(countriesInputs, function (el, i) {
        el.addEventListener('click', function () {
            clearInterval(start);
            checkThis(el, i);
        });
    });
}


/**
 * Init functions
 */
initSlideOutJS();
initFullPageJS();
initTransformIconsJS();
initMicroModalJS();
initEmailJS();
initSVGMap();
window.onload = function () {
    aload();
};


/**
 * Resize functions
 */
window.onresize = (function () {
    waitForFinalEvent(function () {
        preViewport = viewport;
        viewport = updateViewportDimensions(); /* update the viewport, in case the window size has changed */
        console.log(viewport.print);

        // if we not stepped over the breakpointTabletDesktop
        if ((preViewport.width >= breakpointTabletDesktop && viewport.width >= breakpointTabletDesktop) ||
            (preViewport.width  < breakpointTabletDesktop && viewport.width  < breakpointTabletDesktop) ) {

        } else {
            if (typeof transformicons !== 'undefined') {
                transformicons.revert('.tcon-menu--xcross');
            }
            if (typeof leftSlideout !== 'undefined') {
                if (leftSlideout.isOpen()) {
                    leftSlideout.close();
                }
            }
        }

        // if we not stepped over the breakpointMobileDesktop
        if ((preViewport.width >= breakpointMobileDesktop && viewport.width >= breakpointMobileDesktop) ||
            (preViewport.width  < breakpointMobileDesktop && viewport.width  < breakpointMobileDesktop) ) {
            if (typeof fullpage_api !== 'undefined') {
                fullpage_api.reBuild();
            }
        } else {
            if (typeof fullpage_api !== 'undefined') {
                fullpage_api.destroy('all');
                initFullPageJS();
            }
        }

    }, timeToWaitForLast, 'start-when-resize-window');
});


/**
 * Leave functions
 */
window.isShowLeaveModal = true;
window.timerStart = Date.now();
document.body.onmouseleave = (function () {
    waitForFinalEvent(function () {

        if ((Date.now() - timerStart) > 5000 && isShowLeaveModal === true && typeof MicroModal !== 'undefined') {
            MicroModal.show('modal-1');
            isShowLeaveModal = false;
        }

    }, 50, 'start-when-leave-body');
});

