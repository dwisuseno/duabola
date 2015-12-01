<?php

/*
 * Xevent LIVE  CUSTOMIZER.
 * Xevent WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */

function xevents_add_custom_sections($wp_customize) {
    /*     * ********** General Section************* */
    $wp_customize->add_section('xevents_general', array('title' => __('Xevent General', 'xevents'), 'description' => __('Xevent General', 'xevents'), 'priority' => 50));
    $wp_customize->add_setting('xevents_general_linkcolor', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize, 'xevents_general_linkcolor', array('label' => __('Links Color', 'xevents'), 'section' => 'xevents_general', 'settings' => 'xevents_general_linkcolor')));
    $wp_customize->add_setting('xevents_general_linkhcolor', array('default' => '', 'transport' => 'refresh', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize, 'xevents_general_linkhcolor', array('label' => __('Links Hover Color', 'xevents'), 'section' => 'xevents_general', 'settings' => 'xevents_general_linkhcolor')));
    $wp_customize->add_setting('xevents_general_linkdeco', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('xevents_general_linkdeco', array('label' => __('Links Decoration', 'xevents'), 'section' => 'xevents_general', 'type' => 'select', 'choices' => array('none' => __('none', 'xevents'), 'underline' => __('underline', 'xevents'), 'overline' => __('overline', 'xevents'), 'line-through' => __('line-through', 'xevents'), 'initial' => __('initial', 'xevents'), 'inherit' => __('inherit', 'xevents'))));
//   $wp_customize->add_setting('xevents_general_bodycolor',array('default' => ''));
    // $wp_customize->add_control(new WP_Customize_Color_Control(
    //  $wp_customize,'xevents_general_bodycolor',array('label' => __('Body Color', 'xevents'),'section' => 'xevents_general','settings' => 'xevents_general_bodycolor' )));


    $wp_customize->add_setting('xevents_general_headline_color', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize, 'xevents_general_headline_color', array('label' => __('Headline Color', 'xevents'), 'section' => 'xevents_general', 'settings' => 'xevents_general_headline_color')));


    $wp_customize->add_setting('xevents_general_bg_container', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize, 'xevents_general_bg_container', array('label' => __('Container Bg Color', 'xevents'), 'section' => 'xevents_general', 'settings' => 'xevents_general_bg_container')));

    /* General Typography Settings */
    $wp_customize->add_setting('xevents_general_typog_color', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize, 'xevents_general_typog_color', array('label' => __('Font Color', 'xevents'), 'section' => 'xevents_general', 'settings' => 'xevents_general_typog_color')));
    $wp_customize->add_setting('xevents_general_typog_tcolor', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize, 'xevents_general_typog_tcolor', array('label' => __('Font Title Color', 'xevents'), 'section' => 'xevents_general', 'settings' => 'xevents_general_typog_tcolor')));
    $wp_customize->add_setting('xevents_general_typog_scolor', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize, 'xevents_general_typog_scolor', array('label' => __('Rate Star Color', 'xevents'), 'section' => 'xevents_general', 'settings' => 'xevents_general_typog_scolor')));
    // $wp_customize->add_setting('xevents_general_typog_tsize',array('default' => ''));
    //$wp_customize->add_control('xevents_general_typog_tsize',array('label' => __('Title Font Size', 'xevents'),'section' => 'xevents_general','type' => 'text' ));
    //$wp_customize->add_setting('xevents_general_typog_psize',array('default' => ''));
    //$wp_customize->add_control('xevents_general_typog_psize',array('label' => __('Paragraph Font Size', 'xevents'),'section' => 'xevents_general','type' => 'text' ));


    $wp_customize->add_setting('xevents_general_fontstyle', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('xevents_general_fontstyle', array('label' => __('Font Style', 'xevents'), 'section' => 'xevents_general', 'type' => 'select', 'choices' => array('normal' => __('normal', 'xevents'), 'italic' => __('italic', 'xevents'), 'oblique' => __('oblique', 'xevents'))));

    $wp_customize->add_setting('xevents_general_weight', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('xevents_general_weight', array('label' => __('Font Weight', 'xevents'), 'section' => 'xevents_general', 'type' => 'select', 'choices' => array('normal' => __('normal', 'xevents'), 'bold' => __('bold', 'xevents'), 'bolder' => __('bolder', 'xevents'), 'lighter' => __('lighter', 'xevents'), '100' => '100', '200' => '200', '300' => '300', '400' => '400', '500' => '500', '600' => '600', '700' => '700', '800' => '800', '900' => '900')));

    /*     * ********************************************** */
    /*     * **********Header Section************* */
    $wp_customize->add_section('xevents_header', array('title' => __('Xevent Header', 'xevents'), 'description' => __('Xevent Header Settings', 'xevents'), 'priority' => 51));
    $wp_customize->add_setting('xevents_header_logoimage', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control(new WP_Customize_Image_Control(
            $wp_customize, 'xevents_header_logoimage', array('label' => __('Logo Image', 'xevents'), 'section' => 'xevents_header', 'settings' => 'xevents_header_logoimage')));
    $wp_customize->add_setting('xevents_header_logomargin', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('xevents_header_logomargin', array('label' => __('Logo Margin', 'xevents'), 'section' => 'xevents_header', 'type' => 'text'));
    $wp_customize->add_setting('xevents_header_logopadding', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('xevents_header_logopadding', array('label' => __('Logo Padding', 'xevents'), 'section' => 'xevents_header', 'type' => 'text'));

    $wp_customize->add_setting('header_image', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control(new WP_Customize_Image_Control(
            $wp_customize, 'header_image', array('label' => __('Header Background Image', 'xevents'), 'section' => 'xevents_header', 'settings' => 'header_image')));

    // $wp_customize->get_control('header_image')->section="xevents_header";
 //   $wp_customize->get_setting('header_image')->transport = 'postMessage';
   // $wp_customize->get_control('blogname')->section = "xevents_general";
  //  $wp_customize->get_control('blogdescription')->section = "xevents_general";
    //$wp_customize->get_control('header_textcolor')->section = "xevents_header";
    // $wp_customize->get_setting('header_textcolor')->transport = 'postMessage';

  //  $wp_customize->get_control('background_color')->section = "xevents_general";
  //  $wp_customize->get_control('background_repeat')->section = "xevents_general";
  //  $wp_customize->get_control('background_image')->section = "xevents_general";

    $wp_customize->add_setting('xevents_header_linkcolor', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize, 'xevents_header_linkcolor', array('label' => __('Link Color', 'xevents'), 'section' => 'xevents_header', 'settings' => 'xevents_header_linkcolor')));

    $wp_customize->add_setting('xevents_header_linkhcolor', array('default' => '', 'transport' => 'refresh', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize, 'xevents_header_linkhcolor', array('label' => __('Links Hover Color', 'xevents'), 'section' => 'xevents_header', 'settings' => 'xevents_header_linkhcolor')));

    $wp_customize->add_setting('xevents_header_backcolor', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize, 'xevents_header_backcolor', array('label' => __('Background Color', 'xevents'), 'section' => 'xevents_header', 'settings' => 'xevents_header_backcolor')));

    $wp_customize->add_setting('xevents_header_backmenucolor', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize, 'xevents_header_backmenucolor', array('label' => __('Menu Background Color', 'xevents'), 'section' => 'xevents_header', 'settings' => 'xevents_header_backmenucolor')));



    /* header Typography Settings */
    $wp_customize->add_setting('xevents_header_typog_color', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    //  $wp_customize->add_control(new WP_Customize_Color_Control(
    // $wp_customize,'xevents_header_typog_color',array('label' => __('Font Color', 'xevents' ),'section' => 'xevents_header','settings' => 'xevents_header_typog_color' )));
    $wp_customize->add_setting('xevents_header_typog_size', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('xevents_header_typog_size', array('label' => __('Font Size', 'xevents'), 'section' => 'xevents_header', 'type' => 'text'));

    $wp_customize->add_setting('xevents_header_fontstyle', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('xevents_header_fontstyle', array('label' => __('Font Style', 'xevents'), 'section' => 'xevents_header', 'type' => 'select', 'choices' => array('normal' => __('normal', 'xevents'), 'italic' => __('italic', 'xevents'), 'oblique' => __('oblique', 'xevents'))));

    $wp_customize->add_setting('xevents_header_weight', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('xevents_header_weight', array('label' => __('Font Weight', 'xevents'), 'section' => 'xevents_header', 'type' => 'select', 'choices' => array('normal' => __('normal', 'xevents'), 'bold' => __('bold', 'xevents'), 'bolder' => __('bolder', 'xevents'), 'lighter' => __('lighter', 'xevents'), '100' => '100', '200' => '200', '300' => '300', '400' => '400', '500' => '500', '600' => '600', '700' => '700', '800' => '800', '900' => '900')));
    /*     * ********************************************** */
    /*     * **********Footer Section************* */
    $wp_customize->add_section('xevents_footer', array('title' => __('Xevent Footer', 'xevents'), 'description' => '', 'priority' => 53));
    // $wp_customize->add_setting('xevents_footer_layout',array('default' => '1/3+2/3','transport'   => 'refresh'));
    // $wp_customize->add_control('xevents_footer_layout',array('label' => __('Footer Layout', 'xevents'),'section' => 'xevents_footer','type' => 'select','choices'=>array('1/1'=>'1/1','1/2+1/2'=>'1/2+1/2','1/3+1/3+1/3'=>'1/3+1/3+1/3','1/4+1/4+1/4+1/4'=>'1/4+1/4+1/4+1/4')));


    $wp_customize->add_setting('xevents_footer_backimage', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control(new WP_Customize_Image_Control(
            $wp_customize, 'xevents_footer_backimage', array('label' => __('Background Image', 'xevents'), 'section' => 'xevents_footer', 'settings' => 'xevents_footer_backimage')));
    $wp_customize->add_setting('xevents_footer_backcolor', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize, 'xevents_footer_backcolor', array('label' => __('Background Color', 'xevents'), 'section' => 'xevents_footer', 'settings' => 'xevents_footer_backcolor')));
    $wp_customize->add_setting('xevents_footer_textcolor', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize, 'xevents_footer_textcolor', array('label' => __('Text Color', 'xevents'), 'section' => 'xevents_footer', 'settings' => 'xevents_footer_textcolor')));
    $wp_customize->add_setting('xevents_footer_linkcolor', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize, 'xevents_footer_linkcolor', array('label' => __('Link Color', 'xevents'), 'section' => 'xevents_footer', 'settings' => 'xevents_footer_linkcolor')));
    $wp_customize->add_setting('xevents_footer_linkhcolor', array('default' => '', 'transport' => 'refresh', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize, 'xevents_footer_linkhcolor', array('label' => __('Link Hover Color', 'xevents'), 'section' => 'xevents_footer', 'settings' => 'xevents_footer_linkhcolor')));




    /* Typography Settings */
    $wp_customize->add_setting('xevents_footer_typog_color', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_hex_color', 'sanitize_js_callback' => 'maybe_hash_hex_color'));
    //  $wp_customize->add_control(new WP_Customize_Color_Control(
//   $wp_customize,'xevents_footer_typog_color',array('label' => __('Font Color', 'xevents' ),'section' => 'xevents_footer','settings' => 'xevents_footer_typog_color' )));
    $wp_customize->add_setting('xevents_footer_typog_size', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_text_field'
    ));
    $wp_customize->add_control('xevents_footer_typog_size', array('label' => __('Font Size', 'xevents'), 'section' => 'xevents_footer', 'type' => 'text'));

    $wp_customize->add_setting('xevents_footer_fontstyle', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('xevents_footer_fontstyle', array('label' => __('Font Style', 'xevents'), 'section' => 'xevents_footer', 'type' => 'select', 'choices' => array('normal' => __('normal', 'xevents'), 'italic' => __('italic', 'xevents'), 'oblique' => __('oblique', 'xevents'))));

    $wp_customize->add_setting('xevents_footer_weight', array('default' => '', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('xevents_footer_weight', array('label' => __('Font Weight', 'xevents'), 'section' => 'xevents_footer', 'type' => 'select', 'choices' => array('normal' => __('normal', 'xevents'), 'bold' => __('bold', 'xevents'), 'bolder' => __('bolder', 'xevents'), 'lighter' => __('lighter', 'xevents'), '100' => '100', '200' => '200', '300' => '300', '400' => '400', '500' => '500', '600' => '600', '700' => '700', '800' => '800', '900' => '900')));

    /*     * ********************************************** */
}


//validate_footer_layout();
add_action('customize_register', 'xevents_add_custom_sections');

function xevents_enq_xevents_livepreview() {
    wp_register_script('xevents_livepreview', get_template_directory_uri() . '/biz/js/livepreview-customizer.js', array('jquery', 'customize-preview'));
    wp_enqueue_script('xevents_livepreview');
}

add_action('customize_preview_init', 'xevents_enq_xevents_livepreview');
?>
