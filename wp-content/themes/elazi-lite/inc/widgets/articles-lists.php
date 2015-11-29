<?php
/**
 * Elazi Lite Widget
 *
 * Sets up widget list posts extend class Elazi_Widget_Master.*
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */
 
add_action( 'widgets_init', array('Elazi_Widget_Articles_Lists', 'register'));

class Elazi_Widget_Articles_Lists extends Elazi_Widget_Master{
    function __construct() {
        $widget_ops = array('classname' => 'kopa-article-list-5-widget', 'description' => esc_html__( 'Display articles lists.', 'elazi-lite' ));
        $control_ops = array('width' => 'auto', 'height' => 'auto');
        parent::__construct('kopa-article-list-5-widget', esc_html__( '[Elazi - Lite] Articles Lists', 'elazi-lite' ), $widget_ops, $control_ops);
    }

    public static function register(){
        register_widget('Elazi_Widget_Articles_Lists');
    }

    function widget($args, $instance) {

        extract($args);

        $instance   = wp_parse_args((array) $instance, $this->get_default());

        $title      = apply_filters('widget_title', empty($instance['title']) ? '' : $instance['title'], $instance, $this->id_base);

        $query      = $this->get_query($instance);

        $result_set = new WP_Query($query);

        echo  wp_kses_post( $before_widget);

        if( $title )
            echo wp_kses_post( $before_title . $title . $after_title );

        if ( $result_set->have_posts() ) :
            echo '<ul class="clearfix">';
                while ( $result_set->have_posts() ):
                    $result_set->the_post();
                        ?>
                        <li>
                            <article class="entry-item clearfix">
                                <?php if( has_post_thumbnail() ) : ?>
                                    <div class="entry-thumb pull-left">
                                        <a href="<?php the_permalink(); ?>">
                                            <?php the_post_thumbnail( 'kopa-article-list-5-widget' );?>
                                        </a>
                                    </div>
                                <?php endif; ?>
                                <div class="entry-content">
                                    <h5 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
                                    <span class="entry-author clearfix">
                                        <span class="pull-left">
                                            <?php esc_html_e('By:', 'elazi-lite'); ?>
                                            <?php the_author_posts_link(); ?>
                                        </span>
                                    </span>
                                </div>
                            </article>
                        </li>
                        <?php
                endwhile;
            echo '</ul>';
        endif;

        wp_reset_postdata();

        echo wp_kses_post( $after_widget );
    }

}