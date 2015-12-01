/*
* xevents JS LIBS CALLS.
* xevents WordPress Theme 
* Theme URI: http:/www.wpmeal.com/xevents
* All Rights Reserved
*/
(function($) {
    'use strict';
    //goto top
    $(document).ready(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scrollToTop').fadeIn();
            } else {
                $('.scrollToTop').fadeOut();
            }
        });

        //Click event to scroll to top
        $('.scrollToTop').click(function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

 
    //Pretty Photo
    $("a[rel^='prettyPhoto']").prettyPhoto({
        social_tools: false
    });
     });
})(jQuery);