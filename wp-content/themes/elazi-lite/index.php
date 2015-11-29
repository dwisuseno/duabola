<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme and one of the
 * two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */

get_header(); ?>
    <div id="main-content">

        <div class="wrapper">

            <div class="main-col widget-area-4 pull-left">

                <?php echo elazi_lite_get_breadcrumb(); ?>
                <!-- breadcrumb -->

                <?php if(is_active_sidebar( 'top-sidebar' )){
                        dynamic_sidebar( 'top-sidebar' );
                    }
                ?>

                <div class="widget kopa-blog-list-widget">

                    <?php get_template_part( 'content' ); ?>

                    <?php get_template_part( 'pagination' ); ?>

                </div>
                <!-- kopa-blog-list-widget -->

            </div>
            <!-- widget-area-4 -->

            <?php if( is_active_sidebar( 'right-sidebar' ) ) : ?>
                <div class="sidebar widget-area-5 pull-left">
                <?php dynamic_sidebar( 'right-sidebar' ) ;?>
                </div>
            <?php endif; ?>

            <div class="clear"></div>

        </div>
        <!-- wrapper -->
    </div>
    <!-- main-content -->
<?php get_footer(); ?>