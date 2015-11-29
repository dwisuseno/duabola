<?php
/**
 * Elazi Lite Widget
 *
 * Sets up widget list posts extend class Elazi_Widget_Master.*
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */
 
add_action( 'widgets_init', array('Elazi_Widget_Articles_Lists_Vertical_Slider', 'register'));

class Elazi_Widget_Articles_Lists_Vertical_Slider extends Elazi_Widget_Master{

    function __construct() {
        $widget_ops = array('classname' => 'kopa-vertical-widget', 'description' => esc_html__( 'Display articles lists vertical slider.', 'elazi-lite' ));
        $control_ops = array('width' => 'auto', 'height' => 'auto');
        parent::__construct('kopa-vertical-widget', esc_html__( '[Elazi - Lite] Articles Lists - Vertical Slider', 'elazi-lite' ), $widget_ops, $control_ops);
    }

    public static function register(){
        register_widget('Elazi_Widget_Articles_Lists_Vertical_Slider');
    }

    function widget($args, $instance) {

        extract($args);

        $instance   = wp_parse_args((array) $instance, $this->get_default());

        $title      = apply_filters('widget_title', empty($instance['title']) ? '' : $instance['title'], $instance, $this->id_base);

        $query      = $this->get_query($instance);

        $excerpt_widget = $instance['excerpt_widget'];

        $result_set = new WP_Query($query);

        echo  wp_kses_post( $before_widget);

        if( $title )
            echo wp_kses_post( $before_title . '<i class="fa fa-th-list pull-left"></i><span class="pull-left">' . $title . '</span>' . $after_title );

        if ( $result_set->have_posts() ) :
            echo '<ul class="kopa-bxslider">';
                while ( $result_set->have_posts() ):
                    $result_set->the_post();
                        ?>
                        <li>
                            <?php the_post_thumbnail( 'kopa-vertical-widget' );?>
                            <div class="entry-content text-center">
                                <div class="entry-content-inner">
                                    <h6 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h6>
                                    <?php global $post; ?>
                                    <p><?php echo elazi_lite_get_the_excerpt_for_widget($post->post_excerpt, $post->post_content, $excerpt_widget); ?></p>
                                    <a href="<?php the_permalink(); ?>" class="more-link fa fa-angle-double-right"></a>
                                    <?php if( comments_open() ) : ?>
                                        <?php comments_popup_link( '<i class="fa fa-comments pull-left"></i>span class="pull-left">0</span>', '<i class="fa fa-comments pull-left"></i><span class="pull-left">1</span>', '<i class="fa fa-comments pull-left"></i><span class="pull-left">%</span>', 'entry-comments pull-left clearfix'); ?> 
                                    <?php endif; ?>
                                </div>
                            </div>
                        </li>
                        <?php
                endwhile;
            echo '</ul>';
        endif;

        wp_reset_postdata();

        echo wp_kses_post( $after_widget );
    }

}