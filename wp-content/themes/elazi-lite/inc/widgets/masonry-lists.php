<?php
/**
 * Elazi Lite Widget
 *
 * Sets up widget extend class Elazi_Widget_Master.*
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */

add_action( 'widgets_init', array('Elazi_Widget_Masonry_Lists', 'register'));

class Elazi_Widget_Masonry_Lists extends Elazi_Widget_Master{

    function __construct() {
        $widget_ops = array('classname' => 'kopa-masonry-list-1-widget', 'description' => esc_html__( 'Display articles masonry.', 'elazi-lite' ));
        $control_ops = array('width' => 'auto', 'height' => 'auto');
        parent::__construct('kopa-masonry-list-1-widget', esc_html__( '[Elazi - Lite] Masonry Lists', 'elazi-lite' ), $widget_ops, $control_ops);
    }

    public static function register(){
        register_widget('Elazi_Widget_Masonry_Lists');
    }

    function widget($args, $instance) {

        extract($args);

        $instance   = wp_parse_args((array) $instance, $this->get_default());

        $title      = apply_filters('widget_title', empty($instance['title']) ? '' : $instance['title'], $instance, $this->id_base);

        $query      = $this->get_query($instance);

        $result_set = new WP_Query($query);

        $style = array('width-1', 'width-2', 'width-3', 'width-1', 'width-3', 'width-3');

        $index = 0;

        echo  wp_kses_post( $before_widget);

        if( $title )
        echo wp_kses_post( $before_title . '<i class="fa fa-photo pull-left"></i><span class="pull-left">' . $title . '</span>' . $after_title );

        echo '<div class="masonry-list-wrapper">';
            if ( $result_set->have_posts() ) :
                echo '<ul class="clearfix">';
                    while ( $result_set->have_posts() ):
                        $result_set->the_post();
                            ?>
                                <li class="masonry-item <?php echo esc_attr( $style[$index] ); ?>">
                                    <article class="entry-item standard-post">
                                        <span class="entry-icon"></span>
                                        <?php $first_category = elazi_lite_get_post_first_category( get_the_id() ); ?>
                                        <a href="<?php echo esc_url( $first_category['url'] ); ?>" class="entry-categories"><?php echo wp_kses_post( $first_category['name'] );?></a>
                                        <?php if( has_post_thumbnail() ) : ?>
                                            <div class="entry-thumb">
                                                <?php if( $index == 0 || $index == 3) : ?>
                                                    <?php the_post_thumbnail( 'kopa-masonry-list-1-widget-1' ); ?>
                                                <?php endif; ?>
                                                <?php if( $index == 1 ) : ?>
                                                    <?php the_post_thumbnail( 'kopa-masonry-list-1-widget-2' ); ?>
                                                <?php endif; ?>
                                                <?php if( $index == 2 || $index == 4 || $index == 5) : ?>
                                                    <?php the_post_thumbnail( 'kopa-masonry-list-1-widget-3' ); ?>
                                                <?php endif; ?>
                                            </div>
                                        <?php endif; ?>
                                        <div class="entry-content">
                                            <h6 class="entry-title entry-title-s1"><a href="<?php the_permalink(); ?>"><span><?php the_title(); ?></span></a></h6>
                                            <footer class="clearfix">
                                                <?php if( comments_open() ) : ?>
                                                    <?php comments_popup_link( '<i class="fa fa-comments pull-left"></i>span class="pull-left">0</span>', '<i class="fa fa-comments pull-left"></i><span class="pull-left">1</span>', '<i class="fa fa-comments pull-left"></i><span class="pull-left">%</span>', 'entry-comments pull-left clearfix'); ?> 
                                                <?php endif; ?>
                                            </footer>
                                        </div>
                                    </article>
                                </li>
                            <?php
                        $index++;
                        if($index == 6){
                            $index = 0;
                        }
                    endwhile;
                echo '</ul>';
            endif;
        echo '</div>';

        wp_reset_postdata();

        echo wp_kses_post( $after_widget );
    }

}