<?php
/**
 * Elazi Lite Customization
 *
 * Setup options Theme Customization API.
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */

add_action('after_setup_theme', 'elazi_lite_init');

function elazi_lite_init(){
	add_filter('kopa_customization_init_options', 'elazi_lite_init_options');
}

function elazi_lite_init_options($options){

	#Sections
	$options['sections'][] = array(
    'id'    => 'elazi_lite_section_favicon',
    'title' => esc_html__('Favicon', 'elazi-lite'));

	$options['sections'][] = array(
    'id'    => 'elazi_lite_section_headline',
    'title' => esc_html__('Headline', 'elazi-lite'));

	$options['sections'][] = array(
    'id'    => 'elazi_lite_section_logo',
    'title' => esc_html__('Logo', 'elazi-lite'));

    $options['sections'][] = array(
    'id'    => 'elazi_lite_section_banner',
    'title' => esc_html__('Banner', 'elazi-lite'));

    $options['sections'][] = array(
    'id'    => 'elazi_lite_section_sticky_menu',
    'title' => esc_html__('Sticky Menu', 'elazi-lite'));

    $options['sections'][] = array(
    'id'    => 'elazi_lite_section_single',
    'title' => esc_html__('Single', 'elazi-lite'));

    $options['sections'][] = array(
    'id'    => 'elazi_lite_section_socials',
    'title' => esc_html__('Socials', 'elazi-lite'));

    $options['sections'][] = array(
    'id'    => 'elazi_lite_section_copyright',
    'title' => esc_html__('Copyright', 'elazi-lite'));

    $options['sections'][] = array(
    'id'    => 'elazi_lite_section_custom_css',
    'title' => esc_html__('Custom CSS', 'elazi-lite'));

    #FAVICON
	#1. Favicon
	$options['settings'][] = array(
		'settings'    => 'favicon',
		'label'       => esc_html__('Logo Top', 'elazi-lite'),
		'default'     => '',
		'type'        => 'image',
		'section'     => 'elazi_lite_section_favicon',
		'transport'   => 'refresh');

	#HEADLINE
	#1. Status
	$options['settings'][] = array(
		'settings'    => 'headline_status',
		'label'       => esc_html__('Status', 'elazi-lite'),
		'default'     => 'show',
		'choices'     => array(
			'show' => 'Show',
			'hide' => 'Hide'
		),
		'type'        => 'radio',
		'section'     => 'elazi_lite_section_headline',
		'transport'   => 'refresh');
	#2. Number posts
	$options['settings'][] = array(
		'settings'    => 'headline_number_posts',
		'label'       => esc_html__('Number of posts headline', 'elazi-lite'),
		'default'     => '',
		'type'        => 'text',
		'section'     => 'elazi_lite_section_headline',
		'transport'   => 'refresh');

	#LOGO
	#1. Top Logo
	$options['settings'][] = array(
		'settings'    => 'logo_top',
		'label'       => esc_html__('Logo Top', 'elazi-lite'),
		'default'     => '',
		'description' => esc_html__('Recommend size ( 385 x 62 ).', 'elazi-lite'),
		'type'        => 'image',
		'section'     => 'elazi_lite_section_logo',
		'transport'   => 'refresh');
	#2. Bottom Logo
	$options['settings'][] = array(
		'settings'    => 'logo_bottom',
		'label'       => esc_html__('Logo Bottom', 'elazi-lite'),
		'default'     => '',
		'description' => esc_html__('Recommend size ( 291 x 74 ).', 'elazi-lite'),
		'type'        => 'image',
		'section'     => 'elazi_lite_section_logo',
		'transport'   => 'refresh');

	#BANNER
	#1. Banner Image
	$options['settings'][] = array(
		'settings'    => 'banner_img',
		'label'       => esc_html__('Banner Image', 'elazi-lite'),
		'default'     => '',
		'description' => esc_html__('Recommend size ( 728 x 90 ).', 'elazi-lite'),
		'type'        => 'image',
		'section'     => 'elazi_lite_section_banner',
		'transport'   => 'refresh');
	#2. Banner URL
	$options['settings'][] = array(
		'settings'    => 'banner_url',
		'label'       => esc_html__('Banner URL', 'elazi-lite'),
		'default'     => '',
		'type'        => 'text',
		'section'     => 'elazi_lite_section_banner',
		'transport'   => 'refresh');
	#3. Target
	$options['settings'][] = array(
		'settings'    => 'banner_target',
		'label'       => esc_html__('Target', 'elazi-lite'),
		'default'     => '_blank',
		'choices'     => array(
			'_self'  => 'Open link in current tab',
			'_blank' => 'Open link in new tab'
		),
		'type'        => 'radio',
		'section'     => 'elazi_lite_section_banner',
		'transport'   => 'refresh');

	#SINGLE
	#1. Featured Image
	$options['settings'][] = array(
		'settings'    => 'sticky_menu',
		'label'       => esc_html__('Sticky Menu', 'elazi-lite'),
		'default'     => 'enable',
		'choices'     => array(
			'enable'  => 'Enable',
			'disable' => 'Disable'
		),
		'type'        => 'radio',
		'section'     => 'elazi_lite_section_sticky_menu',
		'transport'   => 'refresh');

	#SINGLE
	#1. Featured Image
	$options['settings'][] = array(
		'settings'    => 'single_featured_image',
		'label'       => esc_html__('Featured Image', 'elazi-lite'),
		'default'     => 'show',
		'choices'     => array(
			'show' => 'Show',
			'hide' => 'Hide'
		),
		'type'        => 'radio',
		'section'     => 'elazi_lite_section_single',
		'transport'   => 'refresh');
	#2. About Author
	$options['settings'][] = array(
		'settings'    => 'single_about_author',
		'label'       => esc_html__('About Author', 'elazi-lite'),
		'default'     => 'show',
		'choices'     => array(
			'show' => 'Show',
			'hide' => 'Hide'
		),
		'type'        => 'radio',
		'section'     => 'elazi_lite_section_single',
		'transport'   => 'refresh');
	#3. Navigation
	$options['settings'][] = array(
		'settings'    => 'single_navigation',
		'label'       => esc_html__('Other Posts', 'elazi-lite'),
		'default'     => 'show',
		'choices'     => array(
			'show' => 'Show',
			'hide' => 'Hide'
		),
		'type'        => 'radio',
		'section'     => 'elazi_lite_section_single',
		'transport'   => 'refresh');
	#4. Related Posts
	$options['settings'][] = array(
		'settings'    => 'single_related_posts',
		'label'       => esc_html__('Related Posts', 'elazi-lite'),
		'default'     => 'show',
		'choices'     => array(
			'show' => 'Show',
			'hide' => 'Hide'
		),
		'type'        => 'radio',
		'section'     => 'elazi_lite_section_single',
		'transport'   => 'refresh');

	#SOCIALS
	#1. Facebook
	$options['settings'][] = array(
		'settings'    => 'facebook_url',
		'label'       => esc_html__('Facebook URL', 'elazi-lite'),
		'default'     => '',
		'type'        => 'text',
		'section'     => 'elazi_lite_section_socials',
		'transport'   => 'refresh');
	#2. Twitter
	$options['settings'][] = array(
		'settings'    => 'twitter_url',
		'label'       => esc_html__('Twitter URL', 'elazi-lite'),
		'default'     => '',
		'type'        => 'text',
		'section'     => 'elazi_lite_section_socials',
		'transport'   => 'refresh');
	#3. Google +
	$options['settings'][] = array(
		'settings'    => 'google_plus_url',
		'label'       => esc_html__('Google+ URL', 'elazi-lite'),
		'default'     => '',
		'type'        => 'text',
		'section'     => 'elazi_lite_section_socials',
		'transport'   => 'refresh');
	#4. Tumblr
	$options['settings'][] = array(
		'settings'    => 'tumblr_url',
		'label'       => esc_html__('Tumblr URL', 'elazi-lite'),
		'default'     => '',
		'type'        => 'text',
		'section'     => 'elazi_lite_section_socials',
		'transport'   => 'refresh');

	#COPYRIGHT
	#1. Copyright
	$options['settings'][] = array(
		'settings'    => 'copyright',
		'label'       => esc_html__('Copyright', 'elazi-lite'),
		'default'     => '',
		'type'        => 'text',
		'section'     => 'elazi_lite_section_copyright',
		'transport'   => 'refresh');

	#CUSTOM CSS
	#1. Custom CSS
	$options['settings'][] = array(
		'settings'    => 'custom_css',
		'label'       => esc_html__('Custom CSS', 'elazi-lite'),
		'default'     => '',
		'type'        => 'textarea',
		'section'     => 'elazi_lite_section_custom_css',
		'transport'   => 'refresh');

	return $options;
}