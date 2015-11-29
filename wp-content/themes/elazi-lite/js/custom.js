/**
 * http://kopatheme.com
 * Copyright (c) 2014 Kopatheme
 *
 * Licensed under the GPL license:
 *  http://www.gnu.org/licenses/gpl.html
  **/

/**
 *   1- Main menu
 *   2- Mobile menu
 *   3- Breadking News
 *   4- Owl Carousel
 *   5- Search box
 *   7- BXSlider
 *   11- Create footer mobile menu
 *   12- Masonry
 *   13- Validate form 
 *   15- Sticky menu
 
 *-----------------------------------------------------------------
 **/

/* =========================================================
1. Main Menu
============================================================ */
Modernizr.load([
  {
    load: elazi_lite_custom_variable.url.template_directory_uri + '/js/superfish.js',
    complete: function () {

        //Top menu
        jQuery('#top-menu').superfish({
            delay: 100,
            speed: 'fast',
            cssArrows: false
        });

        jQuery("#top-menu > li").each(function() {
            if(jQuery(this).has("ul").length > 0) {
                jQuery(this).addClass('has-child');
            }
        });

        //Main menu
        jQuery('#main-menu').superfish({
            delay: 100,
            speed: 'fast',
            cssArrows: true
        });

    }
  }
]);

/* =========================================================
2. Mobile Menu
============================================================ */
Modernizr.load([
  {
    load: elazi_lite_custom_variable.url.template_directory_uri + '/js/jquery.navgoco.js',
    complete: function () {

        jQuery('#mobile-menu').navgoco({accordion: true});
        jQuery( "#main-nav i" ).click(function(){
            jQuery( "#mobile-menu" ).slideToggle( "slow" );
        });

        jQuery('.kopa-tabs-2 li a').click(function (e) {
          e.preventDefault()
          jQuery(this).tab('show')
        })
    }
  }
]);

/* =========================================================
3. Breadking News
============================================================ */
if (jQuery('.ticker-1').length > 0) {
    Modernizr.load([{
        load: elazi_lite_custom_variable.url.template_directory_uri + '/js/jquery.carouFredSel-6.2.1.js',
        complete: function () {
            var _scroll = {
                delay: 1000,
                easing: 'linear',
                items: 1,
                duration: 0.07,
                timeoutDuration: 0,
                pauseOnHover: 'immediate'
            };
            jQuery('.ticker-1').carouFredSel({
                width: 800,
                align: false,
                items: {
                    width: 'variable',
                    height: 40,
                    visible: 1
                },
                scroll: _scroll
            });
        }
    }]);
}

/* =========================================================
4. Owl Carousel
============================================================ */
if (jQuery('.kopa-author-carousel').length > 0) {

    Modernizr.load([
      {
        load: elazi_lite_custom_variable.url.template_directory_uri + '/js/owl.carousel.js',
        complete: function () {
            jQuery('.kopa-author-carousel').owlCarousel({
                items : 5,
                itemsDesktop : [979,5],
                itemsDesktopSmall : [767,5],
                itemsTablet : [639,5],
                itemsMobile : [479,5],
                lazyLoad : true,
                navigation : true,
                pagination: false,
                navigationText : false
            });
        }
      }
    ]);
};

/* =========================================================
5. Search box
============================================================ */
if (jQuery('#sb-search').length > 0) {
    Modernizr.load([{
        load: [ elazi_lite_custom_variable.url.template_directory_uri + '/js/uisearch.js', elazi_lite_custom_variable.url.template_directory_uri + '/js/classie.js'],
        complete: function() {
            new UISearch(document.getElementById('sb-search'));
        }
    }]);
};

/* =========================================================
7. Bx slider
============================================================ */
if (jQuery('.kopa-bxslider').length > 0) {

    Modernizr.load([
      {
        load: elazi_lite_custom_variable.url.template_directory_uri + '/js/jquery.bxslider.js',
        complete: function () {
            jQuery('.kopa-bxslider').bxSlider({
                mode: 'vertical',
                pager: false,
                prevText: '',
                nextText: '',
                minSlides: 4,
                slideMargin: 1
            });
        }
      }
    ]);
};

jQuery(document).ready(function() {

/* =========================================================
11. Create footer mobile menu
============================================================ */
	jQuery(document).ready(function(){
		if(jQuery('#bottom-nav').length > 0){
			createMobileMenu('#bottom-nav','bottom-responsive-menu');
		}
	});

});

function createMobileMenu(menu_id, mobile_menu_id){
    // Create the dropdown base
    jQuery("<select />").appendTo(menu_id);
    jQuery(menu_id).find('select').first().attr("id",mobile_menu_id);

    // Populate dropdown with menu items
    jQuery(menu_id).find('a').each(function() {
        var el = jQuery(this);

        var selected = '';
        if (el.parent().hasClass('current-menu-item') == true){
            selected = "selected='selected'";
        }

        var depth = el.parents("ul").size();
        var space = '';
        if(depth > 1){
            for(i=1; i<depth; i++){
                space += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            }
        }

        jQuery("<option "+selected+" value='"+el.attr("href")+"'>"+space+el.text()+"</option>").appendTo(jQuery(menu_id).find('select').first());
    });
    jQuery(menu_id).find('select').first().change(function() {
        window.location = jQuery(this).find("option:selected").val();
    });
}

/* =========================================================
12. Masonry
============================================================ */
Modernizr.load([{
    load: [ elazi_lite_custom_variable.url.template_directory_uri + '/js/masonry.pkgd.js', elazi_lite_custom_variable.url.template_directory_uri + '/js/imagesloaded.js'],
    complete: function () {
        var $masonry1 = jQuery('.kopa-masonry-list-1-widget .masonry-list-wrapper > ul');
        imagesLoaded($masonry1, function () {
            $masonry1.masonry({
                columnWidth: 1,
                itemSelector: '.masonry-item'
            });
            $masonry1.masonry('bindResize')
        });
    }
}]);

if (jQuery('.masonry-container').length > 0) {
    Modernizr.load([{
        load: [ elazi_lite_custom_variable.url.template_directory_uri + '/js/imagesloaded.js', elazi_lite_custom_variable.url.template_directory_uri + '/js/wookmark.js'],
        complete: function() {
            $('.masonry-container .container-masonry').imagesLoaded(function() {
                // Prepare layout options.
                var options = {
                    autoResize: true, // This will auto-update the layout when the browser window is resized.
                    container: $('.masonry-container .container-masonry'), // Optional, used for some extra CSS styling
                    offset: -1, // Optional, the distance between grid items
                    fillEmptySpace: true // Optional, fill the bottom of each column with widths of flexible height
                };
                // Get a reference to your grid items.
                var handler = $('.masonry-container .item'),
                    filters = $('.filters li');
                // Call the layout function.
                handler.wookmark(options);
                /**
                 * When a filter is clicked, toggle it's active state and refresh.
                 */
                var onClickFilter = function(event) {
                    var item = $(event.currentTarget),
                        activeFilters = [];
                    if (!item.hasClass('active')) {
                        filters.removeClass('active');
                    }
                    item.toggleClass('active');
                    // Filter by the currently selected filter
                    if (item.hasClass('active')) {
                        activeFilters.push(item.data('filter'));
                    }
                    handler.wookmarkInstance.filter(activeFilters);
                }
                // Capture filter click events.
                filters.click(onClickFilter);
            });
        }
    }]);
};

jQuery( window ).resize(function(){
    if (jQuery('.masonry-container').length > 0) {                      
        jQuery('.masonry-container .item').wookmark();        
    };
});

/* =========================================================
15. Sticky menu
============================================================ */ 
if(elazi_lite_custom_variable.sticky_menu == 'enable'){
    Modernizr.load([{
    	load: [ elazi_lite_custom_variable.url.template_directory_uri + '/js/waypoints.js', elazi_lite_custom_variable.url.template_directory_uri + '/js/waypoints-sticky.js'],
    	complete: function () {
    		jQuery('#kopa-header-bottom').waypoint('sticky');
    	}
    }]);
}