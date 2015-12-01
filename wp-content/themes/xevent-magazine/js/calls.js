/*
 * xevents JS LIBS CALLS.
 * xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 * All Rights Reserved
 */
(function($) {
    'use strict';
    jQuery("#mySliderTabs").show();
    jQuery(window).load(function() {
        jQuery('.flexslider2').flexslider({
            animation: "slide",
            animationLoop: false,
            itemWidth: 198,
            itemMargin: 7,
            minItems: 1,
            maxItems: 3,
            controlNav: false,
            slideshow: false,
            pausePlay: false,
        });
    });

    jQuery(function() {
        jQuery(".tabs").tabs(".pane", {
            effect: 'fade'
        });
    });

    jQuery(function() {
        window.prettyPrint && prettyPrint()
        jQuery(document).on('click', '.yamm .dropdown-menu', function(e) {
            e.stopPropagation()
        })
    })


    jQuery(document).ready(function() {
        jQuery(".marquee").marquee({});
    });


    jQuery('#nav').affix({
        offset: {
            top: jQuery('header').height()
        }
    });



    jQuery(window).load(function() {
        jQuery('.flexslider').flexslider({
            animation: "fade",
            pauseOnHover: true,
            directionNav: false,
            pausePlay: false,
            slideshow: false,
        });
    });


    jQuery(function() {
        jQuery('#vid_cor').infiniteCarousel({
            imagePath: 'images/',
            transitionSpeed: 300,
            displayTime: 6000,
            internalThumbnails: false,
            thumbnailType: 'images',
            customClass: 'myCarousel',
            progressRingColorOpacity: '0,0,0,.9',
            progressRingBackgroundOn: false,
            easeLeft: 'easeOutExpo',
            easeRight: 'easeOutQuart',
            inView: 1,
            advance: 1,
            autoPilot: false,
            prevNextInternal: true,
            autoHideCaptions: false
        });

    });

    jQuery('.otherpost-m4').smallipop();

    jQuery('.fotorama').fotorama({
        maxwidth: '100%',
        allowfullscreen: true,
        nav: 'thumbs',
        thumbwidth: 100,
        captions: true
    });


    jQuery('.mid-pop-cat.wp-post-image').attr('width', '100%');
    jQuery('.mid-pop-cat.wp-post-image').removeAttr('height');
    jQuery('.mid-img-posts.img-post-hor.wp-post-image').attr('width', '280');
    jQuery('.mid-img-posts.img-post-hor.wp-post-image').removeAttr('height');
    jQuery('.mid-recent-post.img-post-ver.wp-post-image').removeAttr('width');
    jQuery('.mid-recent-post.img-post-ver.wp-post-image').removeAttr('height');


    jQuery(window).load(function() {
        jQuery('.flexslider4').flexslider({
            animation: "fade",
            pauseOnHover: true,
            directionNav: true,
            pausePlay: false,
            slideshow: true,
            controlNav: false
        });
    });

    jQuery('.flexslider5').flexslider({
        animation: "fade",
        pauseOnHover: true,
        directionNav: true,
        pausePlay: false,
        slideshow: true,
        initDelay: 1000,
        controlNav: false
    });

    jQuery('.flexslider6').flexslider({
        animation: "fade",
        pauseOnHover: true,
        directionNav: true,
        pausePlay: false,
        slideshow: true,
        initDelay: 3000,
        controlNav: false
    });

    /******************flat style options for demo ********************/
    jQuery(document).ready(function($) {
        $('#skin').delay(800).animate({
            'left': '0px'
        }, 600).delay(2000).animate({
            'left': '-189px'
        }, 600);

        $(".skin-heading").click(function() {
            var pos = $('#skin').position();
            if (pos.left == 0)
                $('#skin').animate({
                    'left': '-189px'
                }, 600);
            else
                $('#skin').animate({
                    'left': '0px'
                }, 600);
        });
    });
    new WOW().init();

    /**************************************************/
})(jQuery);

jQuery(document).ready(function($) {
    $('#search_top i').click(function() {
        $('#search-form').slideToggle(300);
        $(this).toggleClass('close');
    }); 
});