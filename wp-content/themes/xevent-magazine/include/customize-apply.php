<style>   
    /*
    * Xevent CUSTOMIZING APPLY.
    * Xevent WordPress Theme 
    * Theme URI: http:/www.wpmeal.com/xevents
    */

    /*******************slider *******************/ 

    .iviewSlider{width:<?php echo get_option('xevents_slider_width'); ?>px !important}

    /********************slider*********************/   

    /******************************rtl****************************/

    <?php if (get_option('xevents_general_rtl') == 'yes') { ?>

        .cat_makeup{ border-right:2px solid #FF0000 !important; }

    <?php } ?>

    /******************************rtl****************************/   

    body{       

        font-style:<?php echo get_theme_mod('xevents_general_fontstyle'); ?>!important;

        font-size:<?php echo get_theme_mod('xevents_general_typog_psize'); ?>px !important;

        background-color:<?php echo get_theme_mod('background_color'); ?>!important;

    }

    *{

        font-weight:<?php echo get_theme_mod('xevents_general_weight'); ?>!important

    }

    body,h2,a{  font-family:<?php echo get_theme_mod('xevents_general_fontfamily'); ?>!important}

    p{

        fontt-size:<?php echo get_theme_mod('xevents_general_typog_psize'); ?>!important;

        color:<?php echo get_theme_mod('xevents_general_typog_color'); ?>!important;

    }

    body a{

        color:<?php echo get_theme_mod('xevents_general_linkcolor'); ?> !important; 

        text-decoration:<?php echo get_theme_mod('xevents_general_linkdeco'); ?>!important;

    }     

    a:hover, a:focus ,.mid-post-title a:hover,.mid-post-title a:focus {

        color:<?php echo get_theme_mod('xevents_general_linkhcolor'); ?>!important;   



    }

    .mid-post-title{color:<?php echo get_theme_mod('xevents_general_typog_tcolor'); ?>!important;  }

    .mid-post-title a, .vertical-ticker h1 a, #header .marquee a{ color:<?php echo get_theme_mod('xevents_general_typog_tcolor'); ?>!important; } 

    .entry-title{ color:<?php echo get_theme_mod('xevents_general_typog_tcolor'); ?>!important; } 
    .entry-title a{ color:<?php echo get_theme_mod('xevents_general_typog_tcolor'); ?>!important; } 


    .star-fg .fa-star{color:<?php echo get_theme_mod('xevents_general_typog_scolor'); ?>!important;} 

    .title_makeup, #header .top-nav .navbar-nav > li > a, #search i{ color:<?php echo get_theme_mod('xevents_general_headline_color'); ?>!important;}

    .w_title_makeup{color: <?php echo get_theme_mod('xevents_general_headline_color'); ?>!important;}



    <?php
    /*     * ****************************skin*************************** */

    if (get_theme_mod('xevents_general_headline_bordercolor')) {
        ?>



    <?php if (get_option('xevents_general_rtl') == 'yes') { ?>

            .cat_makeup{ border-right:2px solid <?php echo get_theme_mod('xevents_general_headline_bordercolor'); ?>!important; }

    <?php } else { ?>

            .cat_makeup{ border-left:2px solid <?php echo get_theme_mod('xevents_general_headline_bordercolor'); ?>!important;}

    <?php } ?>

       /* .pw_title{ border-bottom:1px solid <?php //echo get_theme_mod('xevents_general_headline_bordercolor'); ?>!important;}*/

        .w_title_makeup{border-bottom:5px solid <?php echo get_theme_mod('xevents_general_headline_bordercolor'); ?>!important;}

        /*.pmodule1_title{ border-bottom:1px solid <?php //echo get_theme_mod('xevents_general_headline_bordercolor'); ?>!important;}*/

        .title_makeup{border-bottom:5px solid <?php echo get_theme_mod('xevents_general_headline_bordercolor'); ?>!important;}

        .cat_link{border-left:2px solid <?php echo get_theme_mod('xevents_general_headline_bordercolor'); ?>!important;  }

        .comments-area .fn{color:<?php echo get_theme_mod('xevents_general_headline_bordercolor'); ?>!important; }

        #comments .reply{border-bottom:1px solid <?php echo get_theme_mod('xevents_general_headline_bordercolor'); ?>!important;}

        .author_box .a_title h3{color:<?php echo get_theme_mod('xevents_general_headline_bordercolor'); ?>!important;}

        #content_holder .featured{color:<?php echo get_theme_mod('xevents_general_headline_bordercolor'); ?>!important;}

        #content_holder .news{color:<?php echo get_theme_mod('xevents_general_headline_bordercolor'); ?>!important;}

        #content_holder .cat_link{color:<?php echo get_theme_mod('xevents_general_headline_bordercolor'); ?>!important;} 
		
		.ui-slider-tabs-list li{border-color:<?php echo get_theme_mod('xevents_general_bg_container'); ?>!important; border-bottom-color:<?php echo get_theme_mod('xevents_header_backcolor'); ?>!important; border-top-color:<?php echo get_theme_mod('xevents_header_backcolor'); ?>!important;}

		.navbar-nav li a:hover,.navbar-nav li a:focus{background-color:<?php echo get_theme_mod('xevents_general_headline_bordercolor'); ?>!important;}

        .navbar-inverse .navbar-nav > .active > a{background-color:<?php echo get_theme_mod('xevents_general_headline_bordercolor'); ?>!important; }

        .share-style > li > a:hover, .share-style > li > a:focus, .tabs a.current{background-color:<?php echo get_theme_mod('xevents_general_headline_bordercolor'); ?>!important;} 



        .form-submit input{background:none repeat scroll 0 0 <?php echo get_theme_mod('xevents_general_headline_bordercolor'); ?> !important;}

        <?php
    }

    /*     * ****************************skin*************************** */
    ?>

    .container, .ui-slider-tabs-list li.selected, .newsline_holder{background-color:<?php echo get_theme_mod('xevents_general_bg_container'); ?>!important; }



    /************************************header settings****************************************/



    #header{

        /*color:#<?php //echo get_theme_mod('header_textcolor'); ?>!important;*/

        font-family:<?php echo get_theme_mod('xevents_header_fontfamily'); ?>!important;

        font-style:<?php echo get_theme_mod('xevents_header_fontstyle'); ?>!important;

        font-size:<?php echo get_theme_mod('xevents_header_typog_size'); ?>!important;

        font-weight:<?php echo get_theme_mod('xevents_header_weight'); ?>!important;



    }

    #header a{

        color:<?php echo get_theme_mod('xevents_header_linkcolor'); ?>!important;

        font-family:<?php echo get_theme_mod('xevents_header_fontfamily'); ?>!important;

        font-style:<?php echo get_theme_mod('xevents_header_fontstyle'); ?>!important;

        font-size:<?php echo get_theme_mod('xevents_header_typog_size'); ?>!important;

        font-weight:<?php echo get_theme_mod('xevents_header_weight'); ?>!important;

    }

    #header a:hover,#header a:focus{

        color:<?php echo get_theme_mod('xevents_header_linkhcolor'); ?>!important; 

    }

   #header, #header .yamm, #header .head_wrapper, .ui-slider-left-arrow, .ui-slider-right-arrow, .ui-slider-left-arrow.edge:hover, .ui-slider-right-arrow.edge:hover, .ui-slider-tabs-list li, .tabs a{

        background-color:<?php echo get_theme_mod('xevents_header_backcolor'); ?>!important;

        background-image:url(<?php echo get_theme_mod('header_image'); ?>)!important;



    }
	<?php  var_dump(get_theme_mod('header_image'))?> 
	#header .nav_wrapper, .dropdown-menu{ background-color:<?php echo get_theme_mod('xevents_header_backmenucolor'); ?>!important;}

    /************************************footer settings****************************************/



    #footer{

        color:<?php echo get_theme_mod('xevents_footer_textcolor'); ?>!important;

        font-family:<?php echo get_theme_mod('xevents_footer_fontfamily'); ?>!important;

        font-style:<?php echo get_theme_mod('xevents_footer_fontstyle'); ?>!important;

        font-size:<?php echo get_theme_mod('xevents_footer_typog_size'); ?>!important;

        font-weight:<?php echo get_theme_mod('xevents_footer_weight'); ?>!important;

        background-color:<?php echo get_theme_mod('xevents_footer_backcolor'); ?>!important;    

        background-image:url(<?php echo get_theme_mod('xevents_footer_backimage'); ?>)!important;

    }

    #footer a{

        color:<?php echo get_theme_mod('xevents_footer_linkcolor'); ?>!important;

        font-family:<?php echo get_theme_mod('xevents_footer_fontfamily'); ?>!important;

        font-style:<?php echo get_theme_mod('xevents_footer_fontstyle'); ?>!important;

        font-size:<?php echo get_theme_mod('xevents_footer_typog_size'); ?>!important;

        font-weight:<?php echo get_theme_mod('xevents_footer_weight'); ?>!important;

    }

    #footer a:hover,#footer a:focus{

        color: <?php echo get_theme_mod('xevents_footer_linkhcolor'); ?>!important; 

    }

    #footer .widget-title{

        color:  <?php echo get_theme_mod('xevents_footer_textcolor'); ?>!important; 

        font-family:<?php echo get_theme_mod('xevents_footer_fontfamily'); ?>!important; 

        font-size:<?php echo get_theme_mod('xevents_footer_typog_size'); ?>!important; 

        font-weight:<?php echo get_theme_mod('xevents_footer_weight'); ?>!important; 

    }

    /************************************footer settings****************************************/


</style>

