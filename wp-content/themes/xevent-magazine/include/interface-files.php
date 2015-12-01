<?php

/*
 * xevents REGISTER FILES.
 * xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */

function xevents_include_style_files() {



    wp_register_style('xevents-boot', get_template_directory_uri() . "/css/bootstrap.min.css");



    wp_register_style('xevents-main', get_template_directory_uri() . "/style.css");



    wp_register_style('xevents-yamm', get_template_directory_uri() . "/css/yamm.css");



    wp_register_style('xevents-jquery-marquee', get_template_directory_uri() . "/css/jquery.marquee.css");



    wp_register_style('xevents-flexslider', get_template_directory_uri() . "/css/flexslider.css");



    wp_register_style('xevents-tabs', get_template_directory_uri() . "/css/tabs.css");



    wp_register_style('xevents-wookmark', get_template_directory_uri() . "/css/wookmark.css");




    wp_register_style('xevents-fotorama', get_template_directory_uri() . "/css/fotorama.css");



    wp_register_style('xevents-fractionslider', get_template_directory_uri() . "/css/fractionslider.css");



    wp_register_style('xevents-font', get_template_directory_uri() . "/css/font-awesome.min.css");



    wp_register_style('xevents-animate-min', get_template_directory_uri() . "/css/animate.min.css");



    wp_register_style('xevents-prettyPhoto', get_template_directory_uri() . "/css/prettyPhoto.css");



    wp_register_style('xevents-responsive', get_template_directory_uri() . "/css/responsive.css");



    wp_register_style('xevents-slicknav', get_template_directory_uri() . "/css/slicknav.css");



    wp_register_style('xevents-jquery-smallipop', get_template_directory_uri() . "/css/jquery.smallipop.css");





    wp_register_style('xevents-flat-options', get_template_directory_uri() . "/css/flat-options.css");




 //   wp_register_style('hs_iv', get_template_directory_uri() . "/css/hs_iv.css");
}

/* * *******************************************include javascript files************************************************ */

//wp_register_script( 'xevents-jquery', get_template_directory_uri().'/js/jquery-1.11.1.min.js',array(),false,false );

function xevents_include_js_files() {




    wp_register_script('xevents-bootstrap.min', get_template_directory_uri() . '/js/bootstrap.min.js', array(), false, true);



    wp_register_script('xevents-jquery.prettyPhoto', get_template_directory_uri() . '/js/jquery.prettyPhoto.js', array(), false, true);






//wp_register_script( 'xevents-jquery.fractionslider', get_template_directory_uri().'/js/jquery.fractionslider.js',array(),false,true );



    wp_register_script('xevents-main', get_template_directory_uri() . '/js/main.js', array(), false, true);



    wp_register_script('xevents-wow.min', get_template_directory_uri() . '/js/wow.min.js', array(), false, true);



    wp_register_script('xevents-jquery.slicknav', get_template_directory_uri() . '/js/jquery.slicknav.js', array(), false, true);



    wp_register_script('xevents-jquery.marquee', get_template_directory_uri() . '/js/jquery.marquee.js', array(), false, true);



    wp_register_script('xevents-jquery.flexslider', get_template_directory_uri() . '/js/jquery.flexslider.js', array(), false, true);



    wp_register_script('xevents-tabs', get_template_directory_uri() . '/js/tabs.js', array(), false, true);



    wp_register_script('xevents-jquery.sticky', get_template_directory_uri() . '/js/jquery.sticky.js', array(), false, true);



    wp_register_script('xevents-jquery.smallipop', get_template_directory_uri() . '/js/jquery.smallipop.js', array(), false, true);



    wp_register_script('xevents-jquery.imagesloaded', get_template_directory_uri() . '/js/jquery.imagesloaded.js', array(), false, true);



    wp_register_script('xevents-fotorama', get_template_directory_uri() . '/js/fotorama.js', array(), false, true);



    wp_register_script('xevents-calls', get_template_directory_uri() . '/js/calls.js', array(), false, true);






    wp_register_script('xevents-raphael', get_template_directory_uri() . '/js/raphael-min.js', array(), false, false);


    wp_register_script('xevents-easing', get_template_directory_uri() . '/js/jquery.easing.min.js', array(), false, false);


}

?>