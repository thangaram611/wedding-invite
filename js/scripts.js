let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt is called');
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    $('.install-section').each(function () {
        $(this).show();
    });
});

window.addEventListener('appinstalled', () => {
    // Hide the app-provided install promotion
    // Hide the app provided install promotion
    $('.install-section').each(function () {
        $(this).hide();
    });
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
});

$(document).ready(function () {

    $('#btn-install').on('click', () => {
        console.log('button clicked');
        // Show the install prompt
        if (deferredPrompt === null) {
            alert("This device is not compatible!!!");
        } else {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(({ outcome }) => {
                console.log('outcome is ::::: ', outcome);
                if (outcome === 'accepted') {
                    deferredPrompt = null;
                }
            });
        }
    });

    /***************** Waypoints ******************/

    $('.wp1').waypoint(function () {
        $('.wp1').addClass('animated bounceInLeft');
    }, {
        offset: '75%'
    });
    $('.wp2').waypoint(function () {
        $('.wp2').addClass('animated bounceInRight');
    }, {
        offset: '75%'
    });
    $('.wp3').waypoint(function () {
        $('.wp3').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp4').waypoint(function () {
        $('.wp4').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp5').waypoint(function () {
        $('.wp5').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp6').waypoint(function () {
        $('.wp6').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp7').waypoint(function () {
        $('.wp7').addClass('animated fadeInUp');
    }, {
        offset: '75%'
    });
    $('.wp8').waypoint(function () {
        $('.wp8').addClass('animated bounceInLeft');
    }, {
        offset: '75%'
    });
    $('.wp9').waypoint(function () {
        $('.wp9').addClass('animated bounceInRight');
    }, {
        offset: '75%'
    });

    /***************** Initiate Flexslider ******************/
    $('.flexslider').flexslider({
        animation: "slide"
    });

    /***************** Initiate Fancybox ******************/

    $('.single_image').fancybox({
        padding: 4
    });

    $('.fancybox').fancybox({
        padding: 4,
        width: 1000,
        height: 800
    });

    /***************** Tooltips ******************/
    $('[data-toggle="tooltip"]').tooltip();

    /***************** Nav Transform icon ******************/

    /* When user clicks the Icon */
    $('.nav-toggle').on('click', function (e) {
        $(this).toggleClass('active');
        $('.header-nav').toggleClass('open');
        e.preventDefault();
    });
    /* When user clicks a link */
    $('.header-nav li a').on('click', function () {
        $('.nav-toggle').toggleClass('active');
        $('.header-nav').toggleClass('open');

    });

    /********************** Social Share buttons ***********************/
    const share_bar = document.getElementsByClassName('share-bar');
    for (let i = 0; i < share_bar.length; i++) {
        const html = '<iframe allowtransparency="true" frameborder="0" scrolling="no" ' +
            'title="Twitter share button"' +
            'src="https://platform.twitter.com/widgets/tweet_button.html?url=' + encodeURIComponent(window.location) + '&amp;text=' + encodeURIComponent(document.title) + '&amp;via=thangaram611&amp;hashtags=RashmiThangaram,wedding,invite&amp;count=horizontal" ' +
            'style="width:105px; height:21px;"> ' +
            '</iframe>' +
            '<iframe title="Facebook share button" allowtransparency="true" frameborder="0" scrolling="no" src="https://www.facebook.com/plugins/share_button.php?href=' + encodeURIComponent(window.location) + '&layout=button_count&size=small&width=105&height=21&appId" width="105" height="21" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>';

        share_bar[i].innerHTML = html;
    }

    /********************** Embed youtube video *********************/
    $('.player').YTPlayer();
    $('.video-bg').on('click', (e) => {
        e.preventDefault();
        const desktopFallback = "https://youtube.com/watch?v=u9Z7JALkZ3s";
        const app = "vnd.youtube://u9Z7JALkZ3s";

        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            setTimeout(function () {
                window.location.href = desktopFallback;
            }, 25);
            window.location.href = app;
        } else {
            window.open(desktopFallback, "_blank");
        }

        function killPopup() {
            window.removeEventListener('pagehide', killPopup);
        }

        window.addEventListener('pagehide', killPopup);
    });


    /********************** Toggle Map Content **********************/
    $('.btn-show-map').on('click', function () {
        $(this).parents('.map-content').first().toggleClass('toggle-map-content');
        $(this).parents('.container').first().find('.btn-show-content').toggleClass('toggle-map-content');
    });
    $('.btn-show-content').on('click', function () {
        $(this).parents('.container').first().find('.map-content').toggleClass('toggle-map-content');
        $(this).toggleClass('toggle-map-content');
    });

    startTyping();
});

/********************** Extras **********************/
/* --------------------------
 * GLOBAL VARS
 * -------------------------- */
// The date you want to count down to
const targetDate = new Date("2022/06/03 10:00:00");

// Other date related variables
let days;
let hrs;
let min;
let sec;

/* --------------------------
 * ON DOCUMENT LOAD
 * -------------------------- */
$(function () {
    /***************** Smooth Scrolling ******************/
    $("a[href*='#'][href!='#']").on('click', function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
                return false;
            }
        }
    });

    /***************** Header BG Scroll ******************/
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 20) {
            $('section.navigation').addClass('fixed');
            $('header').css({
                "border-bottom": "none",
                "padding": "20px 0"
            });
            $('header .member-actions').css({
                "top": "20px",
            });
            $('header .navicon').css({
                "top": "34px",
            });
            $('header .logo img').css({
                "height": "40px",
            });
        } else {
            $('section.navigation').removeClass('fixed');
            $('header').css({
                "border-bottom": "solid 1px rgba(255, 255, 255, 0.2)",
                "padding": "35px 0"
            });
            $('header .member-actions').css({
                "top": "46px",
            });
            $('header .navicon').css({
                "top": "48px",
            });
            $('header .logo img').css({
                "height": "60px",
            });
        }
    });

    /***************** Counter ******************/
    // Calculate time until launch date
    timeToLaunch();
    // Transition the current countdown from 0 
    numberTransition('#days .number', days, 1000, 'easeOutQuad');
    numberTransition('#hours .number', hrs, 1000, 'easeOutQuad');
    numberTransition('#minutes .number', min, 1000, 'easeOutQuad');
    numberTransition('#seconds .number', sec, 1000, 'easeOutQuad');
    // Begin Countdown
    setTimeout(countDownTimer, 1001);
});

/* --------------------------
 * FIGURE OUT THE AMOUNT OF 
   TIME LEFT BEFORE LAUNCH
 * -------------------------- */
function timeToLaunch() {
    // Get the current date
    var currentDate = new Date();

    // Find the difference between dates
    var diff = (currentDate - targetDate) / 1000;
    var diff = Math.abs(Math.floor(diff));

    // Check number of days until target
    days = Math.floor(diff / (24 * 60 * 60));
    sec = diff - days * 24 * 60 * 60;

    // Check number of hours until target
    hrs = Math.floor(sec / (60 * 60));
    sec = sec - hrs * 60 * 60;

    // Check number of minutes until target
    min = Math.floor(sec / (60));
    sec = sec - min * 60;
}

/* --------------------------
 * DISPLAY THE CURRENT 
   COUNT TO LAUNCH
 * -------------------------- */
function countDownTimer() {

    // Figure out the time to launch
    timeToLaunch();

    // Write to countdown component
    $("#days .number").text(days);
    $("#hours .number").text(hrs);
    $("#minutes .number").text(min);
    $("#seconds .number").text(sec);

    // Repeat the check every second
    setTimeout(countDownTimer, 1000);
}

/* --------------------------
 * TRANSITION NUMBERS FROM 0
   TO CURRENT TIME UNTIL LAUNCH
 * -------------------------- */
function numberTransition(id, endPoint, transitionDuration, transitionEase) {
    // Transition numbers from 0 to the final number
    $({ numberCount: $(id).text() }).animate({ numberCount: endPoint }, {
        duration: transitionDuration,
        easing: transitionEase,
        step: function () {
            $(id).text(Math.floor(this.numberCount));
        },
        complete: function () {
            $(id).text(this.numberCount);
        }
    });
};

$.fn.isInViewport = function (container = $(window)) {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = container.offset().top;
    var viewportBottom = viewportTop + container.height();
    return elementBottom > viewportTop + 200 && elementTop < viewportBottom - 200;
};

var swiper = new Swiper('.blog-slider', {
    spaceBetween: 40,
    effect: 'fade',
    loop: false,
    mousewheel: {
        invert: false,
        releaseOnEdges: true
    },
    // autoHeight: true,
    pagination: {
        el: '.blog-slider__pagination',
        clickable: true
    },
    preventClicks: false
});

async function startTyping() {
    const node = document.querySelector("#type-text");

    await sleep(1000);
    node.innerText = "";
    await typeText(node, "❤️ We are getting, ");

    while (true) {
        await typeText(node, "Married! ❤️");
        await sleep(2000);
        await deleteText(node, "Married! ❤️");
        await typeText(node, "Engaged! ❤️");
        await sleep(2000);
        await deleteText(node, "Engaged! ❤️");
    }
}

// Source code 🚩

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

function typeInterval() {
    const randomMs = 200 * Math.random();
    return randomMs < 50 ? 10 : randomMs;
}

async function typeText(e, text) {
    for (let character of text) {
        e.innerText += character;
        await sleep(typeInterval());
    }
}

async function deleteText(e, text) {
    for (let character of text) {
        e.innerText = e.innerText.slice(0, e.innerText.length - 1);
        await sleep(typeInterval());
    }
}
