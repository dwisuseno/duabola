<?php

/**
 * Xevent functions and definitions
 * xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */
require get_template_directory() . '/include/interface-files.php';


/**
 * All-Day only works in WordPress 3.6 or later.
 */
if (version_compare($GLOBALS['wp_version'], '3.6', '<')) {
    require get_template_directory() . '/inc/back-compat.php';
}

if (!function_exists('xevents_setup')) :

    function xevents_setup() {

        /*
         * Make All-Day available for translation.
         *
         * Translations can be added to the /languages/ directory.
         */
        load_theme_textdomain('xevents', get_template_directory() . '/languages');


        // Add RSS feed links to <head> for posts and comments.
        add_theme_support('automatic-feed-links');

        // Enable support for Post Thumbnails, and declare two sizes.
        add_theme_support('post-thumbnails');
        //set_post_thumbnail_size( 672, 372, true );
        //add_image_size( 'xevents-full-width', 1038, 576, true );
        // This theme uses wp_nav_menu() in two locations.
        register_nav_menus(array(
            'xevents_primary' => __('XEvents Top Primary Menu', 'xevents'),
            'xevents_secondary' => __('XEvents Max Top Secondary Menu', 'xevents'),
            'xevents_nav_footer' => __('XEvents Footer Menu', 'xevents'),
        ));

        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support('html5', array(
            'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
        ));

        /*
         * Enable support for Post Formats.
         * See http://codex.wordpress.org/Post_Formats
         */
        add_theme_support('post-formats', array(
            'aside', 'image', 'video', 'audio', 'quote', 'link', 'gallery'
        ));

        // This theme allows users to set a custom background.
        add_theme_support('custom-background', apply_filters('xevents_custom_background_args', array(
            'default-color' => 'f5f5f5',
        )));
        add_theme_support('woocommerce');
        $defaults = array(
            'default-image' => '',
            'random-default' => false,
            'width' => 0,
            'height' => 0,
            'flex-height' => false,
            'flex-width' => false,
            'default-text-color' => '',
            'header-text' => true,
            'uploads' => true,
            'wp-head-callback' => '',
            'admin-head-callback' => '',
            'admin-preview-callback' => '');
        add_theme_support('custom-header', $defaults);

        add_theme_support('title-tag', $defaults);

        add_editor_style();
        
        if ( ! isset( $content_width ) ) $content_width = 900;
        
        wp_link_pages(array('echo' => 0));
    }

endif; // xevents_setup
add_action('after_setup_theme', 'xevents_setup');

function xevents_col($layout) {
    if ($layout) {
        $cols = explode('+', $layout);
        $bm = array();
        foreach ($cols as $col)
            $bm[] = explode('/', $col);

        $col_m = ($bm[0][0] * 12) / $bm[0][1];
        return($col_m);
    }
}

function xevents_widgets_init() {


    register_sidebar(array(
        'name' => __('Primary Sidebar', 'xevents'),
        'id' => 'sidebar-1',
        'description' => __('Main sidebar that appears on the left.', 'xevents'),
        'before_widget' => ' <section class="sidebar_holder clearfix"><div class="center col-xs-12">',
        'after_widget' => '</div></section>',
        'before_title' => '',
        'after_title' => '',
    ));
    register_sidebar(array(
        'name' => __('Secondary Sidebar', 'xevents'),
        'id' => 'sidebar-2',
        'description' => __('Main sidebar that appears on the left.', 'xevents'),
        'before_widget' => ' <section class="sidebar_holder clearfix"><div class="center col-xs-12">',
        'after_widget' => '</div></section>',
        'before_title' => '',
        'after_title' => '',
    ));
    $col = xevents_col(get_option('xevents_general_footer_layout'));
    register_sidebar(array(
        'name' => __('Footer Widget Area', 'xevents'),
        'id' => 'sidebar-3',
        'description' => __('Appears in the footer section of the site.', 'xevents'),
        'before_widget' => ' <div class="col-sm-' . $col . '">',
        'after_widget' => '</div>',
        'before_title' => '',
        'after_title' => '',
    ));
    register_sidebar(array(
        'name' => __('Xevent Woocommerce Sidebar (Pro Only)', 'xevents'),
        'id' => 'sidebar-4',
        'description' => __('Appears in the woocommerce section of the site.', 'xevents'),
        'before_widget' => ' <section class="sidebar_holder clearfix"><div class="center col-xs-12">',
        'after_widget' => '</div></section>',
        'before_title' => '',
        'after_title' => '',
    ));
}

add_action('widgets_init', 'xevents_widgets_init');



if (!function_exists('xevents_the_attached_image')) :

    function xevents_the_attached_image() {
        $post = get_post();
        /**
         * Filter the default All-Day attachment size.
         *
         * @since All-Day 1.0
         *
         * @param array $dimensions {
         *     An array of height and width dimensions.
         *
         *     @type int $height Height of the image in pixels. Default 810.
         *     @type int $width  Width of the image in pixels. Default 810.
         * }
         */
        $attachment_size = apply_filters('xevents_attachment_size', array(600, 600));
        $next_attachment_url = wp_get_attachment_url();

        /*
         * Grab the IDs of all the image attachments in a gallery so we can get the URL
         * of the next adjacent image in a gallery, or the first image (if we're
         * looking at the last image in a gallery), or, in a gallery of one, just the
         * link to that image file.
         */
        $attachment_ids = get_posts(array(
            'post_parent' => $post->post_parent,
            'fields' => 'ids',
            'numberposts' => -1,
            'post_status' => 'inherit',
            'post_type' => 'attachment',
            'post_mime_type' => 'image',
            'order' => 'ASC',
            'orderby' => 'menu_order ID',
        ));

        // If there is more than 1 attachment in a gallery...
        if (count($attachment_ids) > 1) {
            foreach ($attachment_ids as $attachment_id) {
                if ($attachment_id == $post->ID) {
                    $next_id = current($attachment_ids);
                    break;
                }
            }

            // get the URL of the next image attachment...
            if ($next_id) {
                $next_attachment_url = get_attachment_link($next_id);
            }

            // or get the URL of the first image attachment.
            else {
                $next_attachment_url = get_attachment_link(array_shift($attachment_ids));
            }
        }

        printf('<a href="%1$s" rel="attachment">%2$s</a>', esc_url($next_attachment_url), wp_get_attachment_image($post->ID, $attachment_size)
        );
    }

endif;

function xevents_wp_title($title, $sep) {
    global $paged, $page;

    if (is_feed()) {
        return $title;
    }

    // Add the site name.
    $title .= get_bloginfo('name', 'display');

    // Add the site description for the home/front page.
    $site_description = get_bloginfo('description', 'display');
    if ($site_description && ( is_home() || is_front_page() )) {
        $title = "$title $sep $site_description";
    }

    // Add a page number if necessary.
    if ($paged >= 2 || $page >= 2) {
        $title = "$title $sep " . sprintf(__('Page %s', 'xevents'), max($paged, $page));
    }

    return $title;
}

add_filter('wp_title', 'xevents_wp_title', 10, 2);


if (!function_exists('xevents_the_attached_image')) :

    /**
     * Print the attached image with a link to the next attached image.
     *
     * @since xevents 1.0
     */
    function xevents_the_attached_image() {
        $post = get_post();

        $attachment_size = apply_filters('xevents_attachment_size', array(810, 810));
        $next_attachment_url = wp_get_attachment_url();

        /*
         * Grab the IDs of all the image attachments in a gallery so we can get the URL
         * of the next adjacent image in a gallery, or the first image (if we're
         * looking at the last image in a gallery), or, in a gallery of one, just the
         * link to that image file.
         */
        $attachment_ids = get_posts(array(
            'post_parent' => $post->post_parent,
            'fields' => 'ids',
            'numberposts' => -1,
            'post_status' => 'inherit',
            'post_type' => 'attachment',
            'post_mime_type' => 'image',
            'order' => 'ASC',
            'orderby' => 'menu_order ID',
        ));

        // If there is more than 1 attachment in a gallery...
        if (count($attachment_ids) > 1) {
            foreach ($attachment_ids as $attachment_id) {
                if ($attachment_id == $post->ID) {
                    $next_id = current($attachment_ids);
                    break;
                }
            }

            // get the URL of the next image attachment...
            if ($next_id) {
                $next_attachment_url = get_attachment_link($next_id);
            }

            // or get the URL of the first image attachment.
            else {
                $next_attachment_url = get_attachment_link(array_shift($attachment_ids));
            }
        }

        printf('<a href="%1$s" rel="attachment">%2$s</a>', esc_url($next_attachment_url), wp_get_attachment_image($post->ID, $attachment_size)
        );
    }

endif;

require get_template_directory() . '/include/widgets-files.php';
require get_template_directory() . '/inc/template-tags.php';

// Add Theme Customizer functionality.
require get_template_directory() . '/biz/settings-data.php';
require get_template_directory() . '/biz/settings.php';
require get_template_directory() . '/biz/ads_sys.php';
require get_template_directory() . '/biz/custom-customizer.php';
require get_template_directory() . '/biz/widgets.php';
require get_template_directory() . '/biz/assets/wp-bootstrap-navwalker-master/wp_bootstrap_navwalker.php';  
require get_template_directory() . '/biz/assets/update/update-notifier.php';



add_action('wp_enqueue_scripts', 'xevents_include_js_files');
add_action('wp_enqueue_scripts', 'xevents_include_style_files');


add_filter('get_search_form', 'xevents_search_form');
add_action('wp_enqueue_scripts', 'xevents_dequeue_wowcommerce', 99);

function xevents_dequeue_wowcommerce() {
    if (is_home())
        wp_dequeue_style('woocommerce-general');
    // Now register your styles and scripts here
}

function xevents_search_form($form) {
    $form = '<div class="lighter"  >
        <form class="search_wid" method="get" action="' . home_url('/') . '" >
	<span><input type="text" class="search square" value="' . get_search_query() . '" name="s" id="s" ><input type="submit" value="' . esc_attr__('') . '" ><i class="fa fa-search"></i></span>
</form>
</div>        
';

    return $form;
}
/*****************Viewrs counter***************/
function xevents_viewers($post_id) {
          return 0;
}


/**********************************************/


function xevents_excerpt_length($length) {
    return 25;
}

add_filter('excerpt_length', 'xevents_excerpt_length', 999);

