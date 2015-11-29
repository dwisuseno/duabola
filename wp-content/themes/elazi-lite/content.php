<?php
/**
 * The default template for displaying content
 *
 * Used for both single and index/archive/catefory.
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */
?>
<?php if(have_posts()) : ?>
    <ul>
        <?php while(have_posts()) : the_post(); ?>
            <li id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <article class="entry-item standard-post clearfix">

                    <?php if( has_post_thumbnail() ) : ?>
                        <?php if( is_sticky() ) : ?>
                            <span class="sticky-post"></span>
                        <?php else: ?>
                            <span class="entry-icon"></span>
                        <?php endif; ?>
                        <?php $first_category = elazi_lite_get_post_first_category( get_the_id() ); ?>
                        <a href="<?php echo esc_url( $first_category['url'] ); ?>" class="entry-categories"><?php echo wp_kses_post( $first_category['name'] );?></a>
                            <div class="entry-thumb pull-left">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail( 'kopa-blog-thumb' ); ?>
                                </a>
                            </div>
                    <?php endif; ?>

                    <div class="entry-content">
                        <header>
                            <span class="entry-date clearfix">
                                <i class="fa fa-calendar pull-left"></i>
                                <span class="pull-left"><?php echo get_the_date(); ?></span>
                            </span>
                            <h6 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h6>
                            <span class="entry-author clearfix"><span class="pull-left"><?php esc_html_e('By: ', 'elazi-lite'); ?></span> <?php the_author_posts_link(); ?></span>

                        </header>
                        <?php the_excerpt(); ?>
                        <footer class="clearfix">
                            <?php if( comments_open() ) : ?>
                                <?php comments_popup_link( '<i class="fa fa-comments pull-left"></i><span class="pull-left">0</span>', '<i class="fa fa-comments pull-left"></i><span class="pull-left">1</span>', '<i class="fa fa-comments pull-left"></i><span class="pull-left">%</span>', 'entry-comments pull-left clearfix'); ?> 
                            <?php endif; ?>
                        </footer>
                    </div>

                </article>
                <!-- entry-item -->
            </li>
        <?php endwhile; ?>
    </ul>
<?php endif; ?>