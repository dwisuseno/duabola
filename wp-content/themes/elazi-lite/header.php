<?php
/**
 * The Header template for our theme
 *
 * Displays all of the <head> section.
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo('charset'); ?>" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
        <?php wp_head(); ?>
    </head>
<body <?php body_class(); ?>>

    <div id="kopa-page-header">
        <?php if( has_nav_menu( 'top-menu' )  || get_theme_mod( 'headline_status', 'show') ==  'show') : ?>
            <div id="kopa-header-top">
                <div class="wrapper clearfix">

                    <?php elazi_lite_headline(); ?>
                    <!-- kp-headline-wrapper -->
                    <?php if(has_nav_menu( 'top-menu' )) : ?>
                        <div class="right-col pull-right clearfix">

                            <?php
                                $args = array(
                                    'theme_location'  => 'top-menu',
                                    'container'       => 'nav',
                                    'container_class' => 'pull-left',
                                    'container_id'    => 'top-nav',
                                    'menu_class'      => 'clearfix',
                                    'menu_id'         => 'top-menu',
                                    'depth'           => -1
                                );
                                wp_nav_menu( $args );
                            ?>
                            <!-- top-nav -->

                        </div>
                        <!-- right-col -->
                    <?php endif; ?>

                </div>
                <!-- wrapper -->

            </div>
            <!-- kopa-header-top -->
        <?php endif; ?>

        <div id="kopa-header-middle">

            <div class="wrapper clearfix">

                <div id="logo-image" class="pull-left">
                    <?php if( $logo = get_theme_mod( 'logo_top' ) ) : ?>
                        <a href="<?php echo esc_url(home_url()); ?>"><img src="<?php echo esc_url( $logo ); ?>" alt=""></a>  
                    <?php else : ?>
                        <h1><a href="<?php echo esc_url(home_url()); ?>"><?php bloginfo( 'name' ); ?></a></h1>
                    <?php endif; ?>
                </div>
                <!-- logo-image -->
                <?php if( $banner_img = get_theme_mod( 'banner_img' ) ) : ?>
                    <div class="top-banner pull-right">
                        <a href="<?php echo esc_url( get_theme_mod( 'banner_url' , '#') ); ?>" target="<?php echo get_theme_mod( 'banner_target', '_self' );?>"><img src="<?php echo esc_url( $banner_img ); ?>" alt=""></a>
                    </div>
                <?php endif; ?>
                <!-- top-banner -->

            </div>
            <!-- wrapper -->

        </div>
        <!-- kopa-header-middle -->

        <div id="kopa-header-bottom">

            <div class="wrapper clearfix">
                <?php if(has_nav_menu( 'main-menu' )) : ?>
                    <nav id="main-nav">
                        <?php
                            $args = array(
                                'theme_location' => 'main-menu',
                                'container'      => false,
                                'menu_class'     => 'clearfix',
                                'menu_id'        => 'main-menu'
                            );
                            wp_nav_menu( $args );
                        ?>


                        <i class='fa fa-align-justify'></i>

                        <div class="mobile-menu-wrapper">
                            <?php
                                $args = array(
                                    'theme_location' => 'main-menu',
                                    'container'      => false,
                                    'menu_class'     => '',
                                    'menu_id'        => 'mobile-menu'
                                );
                                wp_nav_menu( $args );
                            ?>
                        </div>
                        <!-- mobile-menu-wrapper -->
                    </nav>
                    <!-- main-nav -->
                <?php endif; ?>
                <div class="sb-search-wrapper">
                    <div id="sb-search" class="sb-search">
                        <form action="<?php echo esc_url( home_url( '/' ) ); ?>">
                            <input class="sb-search-input" placeholder="<?php esc_html_e('Enter your search term...', 'elazi-lite'); ?>" type="text" value="<?php echo get_search_query(); ?>" name="s" id="s" id="search">
                            <input class="sb-search-submit" type="submit" value="">
                            <span class="sb-icon-search"></span>
                        </form>
                    </div><!--sb-search-->
                </div><!--sb-search-wrapper-->

            </div>
            <!-- wrapper -->

        </div>
        <!-- kopa-header-bottom -->

    </div>
    <!-- kopa-page-header -->