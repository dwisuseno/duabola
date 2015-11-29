<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that other
 * 'pages' on your WordPress site will use a different template.
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
                <header class="page-header">
                    <h1 class="page-title"><span><?php the_title(); ?></span></h1>
                </header>
                <div class="entry-box standard-post">
                    <?php if(have_posts()) : while(have_posts()) : the_post(); ?>
                        <?php if( get_theme_mod( 'single_featured_image', 'show' ) == 'show' ) : ?>
                            <?php if(has_post_thumbnail()) : ?>
                                <div class="entry-thumb">

                                    <span class="entry-icon"></span>

                                    <?php $first_category = elazi_lite_get_post_first_category( get_the_id() ); ?>
                                    <a href="<?php echo esc_url( $first_category['url'] ); ?>" class="entry-categories"><?php echo wp_kses_post( $first_category['name'] );?></a>

                                    <?php the_post_thumbnail( 'kopa-single-thumb' );?>

                                    <div class="entry-content-inner">
                                        <h6 class="entry-title entry-title-s1"><span><span><?php the_title(); ?></span></span></h6>
                                        <footer class="clearfix">
                                            <?php if( comments_open() ) : ?>
                                                <?php comments_popup_link( '<i class="fa fa-comments pull-left"></i>span class="pull-left">0</span>', '<i class="fa fa-comments pull-left"></i><span class="pull-left">1</span>', '<i class="fa fa-comments pull-left"></i><span class="pull-left">%</span>', 'entry-comments pull-left clearfix'); ?> 
                                            <?php endif; ?>
                                        </footer>
                                    </div>
                                    <!-- entry-content-inner -->

                                </div>
                            <?php endif; ?>
                            <!-- entry-thumb -->
                        <?php endif; ?>

                        <div class="entry-content">

                            <?php the_content(); ?>

                        </div>
                        <!-- entry-content -->

                        <?php if( has_tag() ) : ?>
                            <div class="tag-box">

                                <span><?php esc_html_e('Tag', 'elazi-lite'); ?></span>

                                <?php the_tags( '', ' ', '' ); ?>

                            </div>
                        <?php endif; ?>
                        <!-- tag-box -->
                    <?php endwhile; endif; ?>

                </div>
                <!-- entry-box -->

                <?php comments_template(); ?>

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