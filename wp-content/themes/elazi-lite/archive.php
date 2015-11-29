<?php
/**
 * The template for displaying Archive pages
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * If you'd like to further customize these archive views, you may create a
 * new template file for each specific one. For example, Twenty Thirteen
 * already has tag.php for Tag archives, category.php for Category archives,
 * and author.php for Author archives.
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
                <header class="page-header">
                    <h1 class="page-title">
                        <span>
                            <?php
                                if ( is_day() ) :
                                    printf( esc_html__( 'Daily Archives: %s', 'elazi-lite' ), get_the_date() );

                                elseif ( is_month() ) :
                                    printf( esc_html__( 'Monthly Archives: %s', 'elazi-lite' ), get_the_date( _x( 'F Y', 'monthly archives date format', 'elazi-lite' ) ) );

                                elseif ( is_year() ) :
                                    printf( esc_html__( 'Yearly Archives: %s', 'elazi-lite' ), get_the_date( _x( 'Y', 'yearly archives date format', 'elazi-lite' ) ) );

                                else :
                                    esc_html_e( 'Archives', 'elazi-lite' );

                                endif;
                            ?>
                        </span>
                    </h1>
                </header>
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