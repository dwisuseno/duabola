<?php
/**
 * A unique identifier is defined to store the options in the database and reference them from the theme.
 * By default it uses the theme name, in lowercase and without spaces, but this can be changed if needed.
 * If the identifier changes, it'll appear as if the options have been reset.
 */

function optionsframework_option_name() {

	// This gets the theme name from the stylesheet
	$themename = wp_get_theme();
	$themename = preg_replace("/\W/", "_", strtolower($themename) );

	$optionsframework_settings = get_option( 'optionsframework' );
	$optionsframework_settings['id'] = $themename;
	update_option( 'optionsframework', $optionsframework_settings );
}

/**
 * Defines an array of options that will be used to generate the settings page and be saved in the database.
 * When creating the 'id' fields, make sure to use all lowercase and no spaces.
 *
 * If you are making your theme translatable, you should replace 'pepmagazine'
 * with the actual text domain for your theme.  Read more:
 * http://codex.wordpress.org/Function_Reference/load_theme_textdomain
 */

function pepmagazine_options() {

	// Test data
	$test_array = array(
		'one' => __('One', 'pepmagazine'),
		'two' => __('Two', 'pepmagazine'),
		'three' => __('Three', 'pepmagazine'),
		'four' => __('Four', 'pepmagazine'),
		'five' => __('Five', 'pepmagazine')
	);

	// Multicheck Array
	$multicheck_array = array(
		'one' => __('French Toast', 'pepmagazine'),
		'two' => __('Pancake', 'pepmagazine'),
		'three' => __('Omelette', 'pepmagazine'),
		'four' => __('Crepe', 'pepmagazine'),
		'five' => __('Waffle', 'pepmagazine')
	);

	// Multicheck Defaults
	$multicheck_defaults = array(
		'one' => '1',
		'five' => '1'
	);

	// Background Defaults
	$background_defaults = array(
		'color' => '',
		'image' => '',
		'repeat' => 'repeat',
		'position' => 'top center',
		'attachment'=>'scroll' );

	// Typography Defaults
	$typography_defaults = array(
		'size' => '15px',
		'face' => 'georgia',
		'style' => 'bold',
		'color' => '#bada55' );

	// Typography Options
	$typography_options = array(
		'sizes' => array( '6','12','14','16','20' ),
		'faces' => array( 'Helvetica Neue' => 'Helvetica Neue','Arial' => 'Arial' ),
		'styles' => array( 'normal' => 'Normal','bold' => 'Bold' ),
		'color' => false
	);

	// Pull all the categories into an array
	$options_categories = array();
	$options_categories_obj = get_categories();
	foreach ($options_categories_obj as $category) {
		$options_categories[$category->cat_ID] = $category->cat_name;
	}

	// Pull all tags into an array
	$options_tags = array();
	$options_tags_obj = get_tags();
	foreach ( $options_tags_obj as $tag ) {
		$options_tags[$tag->term_id] = $tag->name;
	}


	// Pull all the pages into an array
	$options_pages = array();
	$options_pages_obj = get_pages('sort_column=post_parent,menu_order');
	$options_pages[''] = 'Select a page:';
	foreach ($options_pages_obj as $page) {
		$options_pages[$page->ID] = $page->post_title;
	}

	// If using image radio buttons, define a directory path
	$imagepath =  get_template_directory_uri() . '/images/';

	$options = array();

	$options[] = array(
		'name' => __('Social Networks', 'pepmagazine'),
		'type' => 'heading');

	$options[] = array(
		'name' => __('Facebook account', 'pepmagazine'),
		'desc' => __('Enter Facebook account (e.g. pepthemes) or leave empty if you dont wish to use Facebook', 'pepmagazine'),
		'id' => 'facebook_link',
		'std' => '',
		'type' => 'text');
	
	$options[] = array(
		'name' => __('Twitter account', 'pepmagazine'),
		'desc' => __('Enter Twitter account (e.g. pepthemes) or leave empty if you dont wish to use Twitter', 'pepmagazine'),
		'id' => 'twitter_link',
		'std' => '',
		'type' => 'text');

	$options[] = array(
		'name' => __('Google+ account', 'pepmagazine'),
		'desc' => __('Enter Google+ account (e.g. 12345667890123) or leave empty if you dont wish to use Google+','pepmagazine'),
		'id' => 'google_link',
		'std' => '',
		'type' => 'text');

	$options[] = array(
		'name' => __('YouTube Account', 'pepmagazine'),
		'desc' => __('Enter YouTube account (e.g. pepthemes) or leave empty if you dont wish to use YouTube','pepmagazine'),
		'id' => 'youtube_link',
		'std' => '',
		'type' => 'text');

	$options[] = array(
		'name' => __('RSS Feed Link', 'pepmagazine'),
		'desc' => __('Enter url of RSS feed you want to use. WordPress default is www.yoursite.com/feed/ or leave it empty if you dont wish rss link in your header', 'pepmagazine'),
		'id' => 'rss_link',
		'std' => '',
		'type' => 'text');

	


	return $options;
}