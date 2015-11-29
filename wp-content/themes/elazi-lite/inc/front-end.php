<?php
/**
 * Elazi Lite functions and definitions
 *
 * Sets up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality. *
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */

add_action('after_setup_theme', 'elazi_lite_front_after_setup_theme');

function elazi_lite_front_after_setup_theme() {
    add_theme_support('title-tag');
    add_theme_support('html5');
    add_theme_support('post-thumbnails');
    add_theme_support('loop-pagination');
    add_theme_support('automatic-feed-links');

    global $content_width;
    if ( ! isset( $content_width ) ) {
        $content_width = 860;
    }

    register_nav_menus(array(
		'top-menu'    => esc_html__( 'Top Menu', 'elazi-lite' ),
		'main-menu'   => esc_html__( 'Main Menu', 'elazi-lite' ),
		'bottom-menu' => esc_html__( 'Bottom Menu', 'elazi-lite' )
    ));

    if (!is_admin()) {
        add_action( 'wp_enqueue_scripts', 'elazi_lite_enqueue_script' );
        add_action( 'body_class', 'elazi_lite_body_class', 10, 2 );
        add_action( 'wp_head', 'elazi_lite_print_favicon' );
        add_action('wp_enqueue_scripts', 'elazi_lite_customize_css_enqueue_scripts', 20);
    }
    add_action( 'widgets_init', 'elazi_lite_widgets_init' );

    load_theme_textdomain('elazi-lite', get_template_directory() . '/languages');

    add_image_size( 'kopa-blog-thumb', 342, 246, true );
	add_image_size( 'kopa-single-thumb', 860, 484, true );
	add_image_size( 'kopa-vertical-widget', 300, 165, true );
	add_image_size( 'kopa-article-list-4-widget-small', 127, 85, true );
	add_image_size( 'kopa-related-posts-big', 286, 302, true );
	add_image_size( 'kopa-related-posts-small', 285, 150, true );
	add_image_size( 'kopa-article-list-5-widget', 101, 68, true );
    add_image_size( 'kopa-masonry-list-1-widget-1', 267, 205, true );
    add_image_size( 'kopa-masonry-list-1-widget-2', 344, 430, true );
    add_image_size( 'kopa-masonry-list-1-widget-3', 209, 130, true );
}

function elazi_lite_enqueue_script() {
	if ( !is_admin() ) {

		$dir = get_template_directory_uri();

		//LOAD CSS
		wp_enqueue_style( 'elazi-lite-bootstrap', $dir . '/css/bootstrap.min.css', array(), null );
		wp_enqueue_style( 'elazi-lite-font-awesome', $dir . '/css/font-awesome.min.css', array(), null );
		wp_enqueue_style( 'elazi-lite-superfish', $dir . '/css/superfish.css', array(), null );
		wp_enqueue_style( 'elazi-lite-carousel', $dir . '/css/owl.carousel.css', array(), null );
		wp_enqueue_style( 'elazi-lite-theme', $dir . '/css/owl.theme.css', array(), null );
		wp_enqueue_style( 'elazi-lite-navgoco', $dir . '/css/jquery.navgoco.css', array(), null );
		wp_enqueue_style( 'elazi-lite-bxslider', $dir . '/css/jquery.bxslider.css', array(), null );
		wp_enqueue_style( 'elazi-lite-style', get_stylesheet_uri(), array(), null );
        wp_enqueue_style( 'elazi-lite-fonts', elazi_lite_fonts_url(), array(), null );
		wp_enqueue_style( 'elazi-lite-responsive', $dir . '/css/responsive.css', array(), null );

		//LOAD JS
		wp_enqueue_script( 'elazi-lite-modernizr', $dir . '/js/modernizr.custom.js' );
		wp_enqueue_script( 'elazi-lite-bootstrap-js', $dir . '/js/bootstrap.js', array( 'jquery' ), null, true );
		wp_enqueue_script( 'elazi-lite-custom-js', $dir . '/js/custom.js', array( 'jquery' ), null, true );
		wp_localize_script( 'elazi-lite-custom-js', 'elazi_lite_custom_variable', elazi_lite_front_localize_script() );
	}

	if ( is_single() || is_page() ) {
		wp_enqueue_script( 'comment-reply' );
	}
}

function elazi_lite_front_localize_script() {
	$templateUrl = array(
		'url' => array(
			'template_directory_uri' => get_template_directory_uri(),
		),
        'sticky_menu' => get_theme_mod( 'sticky_menu', 'enable' ),
	);
	return $templateUrl;
}

function elazi_lite_widgets_init() {
    register_sidebar( array(
        'name'          => esc_html__( 'Top Sidebar', 'elazi-lite' ),
        'id'            => 'top-sidebar',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title widget-title-s2 clearfix">',
        'after_title'   => '</h3>',
    ) );

    register_sidebar( array(
        'name'          => esc_html__( 'Right Sidebar', 'elazi-lite' ),
        'id'            => 'right-sidebar',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title widget-title-s3 clearfix">',
        'after_title'   => '</h3>',
    ) );

    register_sidebar( array(
        'name'          => esc_html__( 'Footer Left Sidebar', 'elazi-lite' ),
        'id'            => 'footer-left-sidebar',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h5 class="widget-title widget-title-s4">',
        'after_title'   => '</h5>'
    ) );

    register_sidebar( array(
        'name'          => esc_html__( 'Footer Center Sidebar', 'elazi-lite' ),
        'id'            => 'footer-center-sidebar',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h5 class="widget-title widget-title-s4">',
        'after_title'   => '</h5>'
    ) );

    register_sidebar( array(
        'name'          => esc_html__( 'Footer Right Sidebar', 'elazi-lite' ),
        'id'            => 'footer-right-sidebar',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h5 class="widget-title widget-title-s4">',
        'after_title'   => '</h5>'
    ) );
}

function elazi_lite_customize_css_enqueue_scripts(){
    if($css = get_theme_mod('custom_css')){
        wp_add_inline_style('elazi-lite-style', $css);
    }
}

function elazi_lite_print_favicon(){
    if ( ! function_exists( 'has_site_icon' ) || ! has_site_icon() ) {
        if( $favicon = get_theme_mod('favicon') ){
            printf( '<link rel="shortcut icon" type="image/x-icon"  href="%s">', $favicon );
        }
    }
}

function elazi_lite_body_class( $wp_classes, $extra_classes ){
    if( is_category() || is_home() || is_archive() ){
        $wp_classes[] = 'kopa-sub-page kopa-blog-page';
    }

    if( is_single() ){
        $wp_classes[] = 'kopa-sub-page kopa-single-video';
    }

    return $wp_classes;
}

function elazi_lite_fonts_url() {
    $fonts_url = '';
    $fonts     = array();
    $subsets   = 'latin,latin-ext';

    /*
     * Translators: If there are characters in your language that are not supported
     * by Roboto Condensed, translate this to 'off'. Do not translate into your own language.
     */
    if ( 'off' !== _x( 'on', 'Roboto Condensed font: on or off', 'elazi-lite' ) ) {
        $fonts[] = 'Roboto Condensed:400,700,400italic,300';
    }

    /*
     * Translators: If there are characters in your language that are not supported
     * by Lato, translate this to 'off'. Do not translate into your own language.
     */
    if ( 'off' !== _x( 'on', 'Lato font: on or off', 'elazi-lite' ) ) {
        $fonts[] = 'Lato:400,700';
    }

    /*
     * Translators: To add an additional character subset specific to your language,
     * translate this to 'greek', 'cyrillic', 'devanagari' or 'vietnamese'. Do not translate into your own language.
     */
    $subset = _x( 'no-subset', 'Add new subset (greek, cyrillic, devanagari, vietnamese)', 'elazi-lite' );

    if ( 'cyrillic' == $subset ) {
        $subsets .= ',cyrillic,cyrillic-ext';
    } elseif ( 'greek' == $subset ) {
        $subsets .= ',greek,greek-ext';
    } elseif ( 'devanagari' == $subset ) {
        $subsets .= ',devanagari';
    } elseif ( 'vietnamese' == $subset ) {
        $subsets .= ',vietnamese';
    }

    if ( $fonts ) {
        $fonts_url = add_query_arg( array(
            'family' => urlencode( implode( '|', $fonts ) ),
            'subset' => urlencode( $subsets ),
        ), 'https://fonts.googleapis.com/css' );
    }

    return $fonts_url;
}

function elazi_lite_headline(){
	if( get_theme_mod( 'headline_status', 'show' ) == 'hide' )
        return;

	$args = array(
        'post_type' => array('post'),
        'posts_per_page' => get_theme_mod( 'headline_number_posts', '5' ),
        'post_status' => array('publish'),
        'ignore_sticky_posts' => true
    );

    $posts = new WP_Query($args);

    if ($posts->have_posts()):
        ?>
            <div class="kp-headline-wrapper pull-left clearfix">
                <span class="kp-headline-title"><?php esc_html_e('Breaking News', 'elazi-lite'); ?></span>
                <div class="kp-headline clearfix">
                    <dl class="ticker-1 clearfix">
                        <?php
                        while ($posts->have_posts()):
                            $posts->the_post();

                            $post_url = get_permalink();
                            $post_title = get_the_title();

                            ?>
								<dd><a href="<?php echo esc_url($post_url); ?>"><?php echo $post_title; ?></a></dd>
                            <?php

                        endwhile;
                        ?>
                    </dl>
                    <!--ticker-1-->
                </div>
                <!--kp-headline-->
            </div>
        <?php
    endif;

    wp_reset_postdata();
}

function elazi_lite_get_post_first_category( $post_id ){
    $first_category = NULL;
    $terms = get_the_terms($post_id, 'category');

    if ($terms) {
        foreach($terms as $term){
            $first_category = array(
                'url' => esc_url( get_term_link($term, 'category') ),
                'name' => $term->name
            );
            break;
        }    }

    return $first_category;
}

function elazi_lite_get_breadcrumb(){
    global $post, $wp_query;
    $current_class = 'current-page';
    $prefix = ' <span>&nbsp;/&nbsp;</span> ';

    $breadcrumb_before = '<div class="breadcrumb clearfix">';
    $breadcrumb_before.= sprintf('<span class="breadcrumb-title">%s</span>', esc_html__('You are here: ', 'elazi-lite'));

    $breadcrumb_after = '</div>';

    $breadcrumb_home = '<span class="home-page" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">';
    $breadcrumb_home.= '<a itemprop="url" href="' . home_url() . '">';
    $breadcrumb_home.= '<span itemprop="title">' . esc_html__('Home', 'elazi-lite') . '</span>';
    $breadcrumb_home.= '</a>';
    $breadcrumb_home.= '</span>';

    $breadcrumb = '';

    if (is_archive()) {
        if (is_tag()) {
            $term = get_term(get_queried_object_id(), 'post_tag');
            $breadcrumb.= $prefix . sprintf('<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a class="%1$s" itemprop="url"><span itemprop="title">%2$s</span></a></span>', $current_class, $term->name);
        } else if (is_category()) {
            $category_parents = get_category_parents(get_queried_object_id(), TRUE, ',');
            if(!empty( $category_parents )){
                $terms_link = explode(',', substr( $category_parents, 0, -1));
                $n = count($terms_link);
                if ($n > 1) {
                    for ($i = 0; $i < ($n - 1); $i++) {
                        $breadcrumb.= $prefix . $terms_link[$i];
                    }
                }
            }

            $breadcrumb.= $prefix . sprintf('<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a class="%1$s" itemprop="url"><span itemprop="title">%2$s</span></a></span>', $current_class, get_the_category_by_ID(get_queried_object_id()));
        } else if (is_year() || is_month() || is_day()) {

            $m = get_query_var('m');
            $date = array('y' => NULL, 'm' => NULL, 'd' => NULL);
            if (strlen($m) >= 4)
                $date['y'] = substr($m, 0, 4);
            if (strlen($m) >= 6)
                $date['m'] = substr($m, 4, 2);
            if (strlen($m) >= 8)
                $date['d'] = substr($m, 6, 2);
            if ($date['y'])
                if (is_year())
                    $breadcrumb.= $prefix . sprintf('<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a class="%1$s" itemprop="url"><span itemprop="title">%2$s</span></a></span>', $current_class, $date['y']);
                else
                    $breadcrumb.= $prefix . sprintf('<span class="prev-page" itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a href="%1$s" itemprop="url"><span itemprop="title">%2$s</span></a></span>', get_year_link($date['y']), $date['y']);
            if ($date['m'])
                if (is_month())
                    $breadcrumb.= $prefix . sprintf('<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a class="%1$s" itemprop="url"><span itemprop="title">%2$s</span></a></span>', $current_class, date('F', mktime(0, 0, 0, $date['m'])));
                else
                    $breadcrumb.= $prefix . sprintf('<span class="prev-page" itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a href="%1$s" itemprop="url"><span itemprop="title">%2$s</span></a></span>', get_month_link($date['y'], $date['m']), date('F', mktime(0, 0, 0, $date['m'])));
            if ($date['d'])
                if (is_day())
                    $breadcrumb.= $prefix . sprintf('<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a class="%1$s" itemprop="url"><span itemprop="title">%2$s</span></a></span>', $current_class, $date['d']);
                else
                    $breadcrumb.= $prefix . sprintf('<span class="prev-page" itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a href="%1$s" itemprop="url"><span itemprop="title">%2$s</span></a></span>', get_day_link($date['y'], $date['m'], $date['d']), $date['d']);
        }else if (is_author()) {

            $author_id = get_queried_object_id();
            $breadcrumb.= $prefix . sprintf('<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a class="%1$s" itemprop="url"><span itemprop="title">%2$s</span></a></span>', $current_class, sprintf(esc_html__('Posts created by %1$s', 'elazi-lite'), get_the_author_meta('display_name', $author_id)));
        }
    } else if (is_search()) {
        $s = get_search_query();
        $c = $wp_query->found_posts;
        $breadcrumb.= $prefix . sprintf('<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a class="%1$s" itemprop="url"><span itemprop="title">%2$s</span></a></span>', $current_class, sprintf(esc_html__('Searched for "%s" return %s results', 'elazi-lite'), $s, $c));
    } else if (is_singular()) {
        if (is_page()) {
            if (is_front_page()) {
                $breadcrumb = NULL;
            } else {
                $post_ancestors = get_post_ancestors($post);
                if ($post_ancestors) {
                    $post_ancestors = array_reverse($post_ancestors);
                    foreach ($post_ancestors as $crumb)
                        $breadcrumb.= $prefix . sprintf('<span class="prev-page" itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a href="%1$s" itemprop="url"><span itemprop="title">%2$s</span></a></span>', get_permalink($crumb), esc_html(get_the_title($crumb)));
                }
                $breadcrumb.= $prefix . sprintf('<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a class="%1$s" itemprop="url" href="%2$s"><span itemprop="title">%3$s</span></a></span>', $current_class, get_permalink(get_queried_object_id()), esc_html(get_the_title(get_queried_object_id())));
            }
        } else if (is_single()) {
            $categories = get_the_category(get_queried_object_id());
            if ($categories) {
                foreach ($categories as $category) {
                    $breadcrumb.= $prefix . sprintf('<span class="prev-page" itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a href="%1$s" itemprop="url"><span itemprop="title">%2$s</span></a></span>', get_category_link($category->term_id), $category->name);
                }
            }
            $breadcrumb.= $prefix . sprintf('<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a class="%1$s" itemprop="url" href="%2$s"><span itemprop="title">%3$s</span></a></span>', $current_class, get_permalink(get_queried_object_id()), esc_html(get_the_title(get_queried_object_id())));
        }
    } else if (is_404()) {
        $breadcrumb.= $prefix . sprintf('<span  itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a class="%1$s" itemprop="url"><span itemprop="title">%2$s</span></a></span>', $current_class, esc_html__('Page not found', 'elazi-lite'));
    } else {
        $breadcrumb.= $prefix . sprintf('<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a class="%1$s" itemprop="url"><span itemprop="title">%2$s</span></a></span>', $current_class, esc_html__('Latest News', 'elazi-lite'));
    }


    echo $breadcrumb_before;
    echo $breadcrumb_home . apply_filters('elazi_lite_get_breadcrumb', $breadcrumb, $current_class, $prefix);
    echo $breadcrumb_after;
}

add_filter( 'pre_set_theme_mod_custom_css', 'elazi_lite_sanitize_custom_css' );

function elazi_lite_sanitize_custom_css( $value ) {
    return wp_strip_all_tags( $value );
}

function elazi_lite_get_the_excerpt_for_widget($excerpt, $content, $length = 0) {
    $temp_excerp = $excerpt;
    if ( empty($temp_excerp) ) {
        $temp_excerp =  strip_tags($content);
        $temp_excerp =  strip_shortcodes($temp_excerp);
    }

    $kopa_excerpt = wp_trim_words($temp_excerp, $length, $more = null);
    return $kopa_excerpt;
}