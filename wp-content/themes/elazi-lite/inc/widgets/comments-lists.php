<?php
/**
 * Elazi Lite Widget
 *
 * Sets up widget list comments extend class Elazi_Widget_Master.*
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */

add_action( 'widgets_init', array('Elazi_Widget_Comments_Lists', 'register'));

class Elazi_Widget_Comments_Lists extends Elazi_Widget_Master{

    function __construct() {
        $widget_ops = array('classname' => 'kopa-comment-widget', 'description' => esc_html__( 'Display recent comment of your site.', 'elazi-lite' ));
        $control_ops = array('width' => 'auto', 'height' => 'auto');
        parent::__construct('kopa-comment-widget', esc_html__( '[Elazi - Lite] Comments Lists', 'elazi-lite' ), $widget_ops, $control_ops);
    }

    public static function register(){
        register_widget('Elazi_Widget_Comments_Lists');
    }

    public function update($new_instance, $old_instance) {
        $instance = $old_instance;

        $instance['title']  = strip_tags($new_instance['title']);
        $instance['order']  = strip_tags($new_instance['order']);
        $instance['number'] = strip_tags($new_instance['number']);

        return $instance;
    }

    public function form($instance) {
        $default = array(
            'title' => '',
            'order' => '',
            'number' => ''
        );
        $instance = wp_parse_args((array) $instance, $default);
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>"><?php esc_html_e('Title:', 'elazi-lite'); ?></label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>" name="<?php echo esc_attr($this->get_field_name('title')); ?>" type="text" value="<?php echo esc_attr(strip_tags($instance['title'])); ?>" />
        </p>

        <p>
            <label for="<?php echo esc_attr($this->get_field_id('order')); ?>"><?php esc_html_e('Order:', 'elazi-lite'); ?></label>
            <select class="widefat" id="<?php echo esc_attr($this->get_field_id('order')); ?>" name="<?php echo esc_attr($this->get_field_name('order')); ?>">
                <?php
                $orderbys = array(
                    'ASC'  => esc_html__( 'ASC', 'elazi-lite' ),
                    'DESC' => esc_html__( 'DESC', 'elazi-lite' )
                );
                foreach ($orderbys as $value => $title) {
                    ?>
                    <option value="<?php echo esc_attr($value); ?>" <?php selected($instance['order'], $value); ?>><?php echo esc_attr($title); ?></option>
                    <?php
                }
                ?>
            </select>
        </p>

        <p>
            <label for="<?php echo esc_attr($this->get_field_id('number')); ?>"><?php esc_html_e('Number of Comments:', 'elazi-lite'); ?></label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('number')); ?>" name="<?php echo esc_attr($this->get_field_name('number')); ?>" type="text" value="<?php echo esc_attr(strip_tags($instance['number'])); ?>" />
        </p> 

        <?php
    }

    public function widget( $args, $instance ) {

		extract( $args );

		$instance = wp_parse_args((array) $instance, $this->get_default());

		extract( $instance );

		echo wp_kses_post( $before_widget );

		$title = apply_filters('widget_title', empty($instance['title']) ? '' : $instance['title'], $instance, $this->id_base);
		if ( $title ) {
            echo wp_kses_post( $before_title . '<i class="fa fa-comments-o pull-left"></i><span class="pull-left">' . $title . '</span>' . $after_title );
        }
            $comments_args = array(
                'order' => $instance['order'],
                'number' => $instance['number']
            );
            $comments_query = new WP_Comment_Query();
            $comments = $comments_query->query( $comments_args );
            if ( $comments ) {
               $index = 0;
                echo '<ul class="clearfix">';
                foreach ( $comments as $comment ) {
                    $index++;
                    ?>
                    <li>
                        <article class="entry-item">
                            <header class="clearfix">
                                <span class="entry-number pull-left"><?php echo wp_kses_post( $index ); ?></span>
                                <div class="pull-left">
                                    <?php if( $user = get_userdata( $comment->user_id ) ) :?>
                                        <h5 class="comment-author"><a href="<?php the_author_meta( 'user_url', $comment->user_id ) ?>"><?php echo wp_kses_post( $comment->comment_author ); ?></a></h5>
                                    <?php else : ?>
                                        <h5 class="comment-author"><a href="<?php echo esc_url( $comment->comment_author_url ); ?>"><?php echo wp_kses_post( $comment->comment_author ); ?></a></h5>
                                    <?php endif; ?>
                                    <h6 class="entry-title"><span><?php esc_html_e( 'On', 'elazi-lite' ); ?></span><a href="<?php echo get_comment_link( $comment->comment_ID ); ?>" title="<?php echo get_the_title( $comment->comment_post_ID ); ?>"><?php echo get_the_title( $comment->comment_post_ID ); ?></a></h6>
                                </div>
                                <div class="comment-avatar"><?php echo get_avatar( $comment->comment_author_email, 42 ); ?></div>
                            </header>
                            <div class="entry-content">
                                <p><?php echo wp_kses_post( $comment->comment_content ); ?></p>
                                <span class="comment-time">
                                    <?php echo human_time_diff( strtotime( $comment->comment_date ), current_time('timestamp') ) . ' ago'; ?>
                                </span>
                            </div>
                        </article>
                    </li>
                    <?php
                }
                echo '</ul>';
            } else {
                esc_html_e( 'No comments.', 'elazi-lite' );
            }

		echo wp_kses_post( $after_widget );

	}

}