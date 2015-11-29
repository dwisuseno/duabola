<?php
/**
 * Elazi Lite Widget
 *
 * Sets up widget list posts extend class Elazi_Widget_Master.*
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */

add_action( 'widgets_init', array('Elazi_Widget_Articles_Lists_First_Big_Thumb', 'register'));

class Elazi_Widget_Articles_Lists_First_Big_Thumb extends Elazi_Widget_Master{

    function __construct() {
        $widget_ops = array('classname' => 'kopa-article-list-4-widget', 'description' => esc_html__( 'Display articles list, first post big thumb.', 'elazi-lite' ));
        $control_ops = array('width' => 'auto', 'height' => 'auto');
        parent::__construct('kopa-article-list-4-widget', esc_html__( '[Elazi - Lite] Articles Lists - First Post Big Thumb', 'elazi-lite' ), $widget_ops, $control_ops);
    }

    public static function register(){
        register_widget('Elazi_Widget_Articles_Lists_First_Big_Thumb');
    }

    function widget($args, $instance) {

        extract($args);

        $instance   = wp_parse_args((array) $instance, $this->get_default());

        $excerpt_widget = $instance['excerpt_widget'];

        $title      = apply_filters('widget_title', empty($instance['title']) ? '' : $instance['title'], $instance, $this->id_base);

        $query      = $this->get_query($instance);

        $result_set = new WP_Query($query);

        echo  wp_kses_post( $before_widget);

        if( $title )
            echo wp_kses_post( $before_title . '<i class="fa fa-th-list pull-left"></i><span class="pull-left">' . $title . '</span>' . $after_title );

        if ( $result_set->have_posts() ) :
            $loop_index = 0;
                while ( $result_set->have_posts() ):
                    $result_set->the_post();

                    if(0 === $loop_index){
                        ?>
                        <article class="last-item">
                            <?php if(has_post_thumbnail()) : ?>
                                <div class="entry-thumb">
                                    <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail( 'kopa-vertical-widget' );?></a>
                                </div>
                            <?php endif; ?>
                            <div class="entry-content">
                                <header>
                                    <h6 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h6>
                                    <span class="entry-author clearfix">
                                        <span class="pull-left">
                                            <?php esc_html_e('By:', 'elazi-lite'); ?>
                                            <?php the_author_posts_link(); ?>
                                        </span>
                                    </span>
                                </header>
                                <?php global $post; ?>
                                <p><?php echo elazi_lite_get_the_excerpt_for_widget($post->post_excerpt, $post->post_content, $excerpt_widget); ?></p>
                            </div>
                        </article>
                        <?php
                        if($result_set->post_count > 1)
                            echo '<ul class="older-post">';
                    }else{
                        ?>
                        <li>
                            <article class="entry-item clearfix">
                                <?php if(has_post_thumbnail()) : ?>
                                    <div class="entry-thumb pull-left">
                                        <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail( 'kopa-article-list-4-widget-small' );?></a>
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
                    }
                    $loop_index++;
                endwhile;

                if($result_set->post_count > 1)
                            echo '</ul>';
        endif;

        wp_reset_postdata();

        echo wp_kses_post( $after_widget );
    }

}