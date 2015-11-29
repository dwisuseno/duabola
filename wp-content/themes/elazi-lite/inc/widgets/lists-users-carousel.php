<?php
/**
 * Elazi Lite Widget
 *
 * Sets up widget extend class Elazi_Widget_Master.*
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */


add_action( 'widgets_init', array('Elazi_Widget_Lists_Users_Carousel', 'register'));

class Elazi_Widget_Lists_Users_Carousel extends Elazi_Widget_Master{
    function __construct() {
        $widget_ops = array('classname' => 'kopa-author-widget', 'description' => esc_html__( 'Display list users carousel.', 'elazi-lite' ));
        $control_ops = array('width' => 'auto', 'height' => 'auto');
        parent::__construct('kopa-author-widget', esc_html__( '[Elazi - Lite] List User Carousel', 'elazi-lite' ), $widget_ops, $control_ops);
    }

    public static function register(){
        register_widget('Elazi_Widget_Lists_Users_Carousel');
    }

    public function update($new_instance, $old_instance) {
        $instance = $old_instance;

        $instance['title'] = strip_tags($new_instance['title']);
        $instance['role']  = strip_tags($new_instance['role']);

        return $instance;
    }

    public function form($instance) {
        $default = array(
            'title' => '',
            'role' => ''
        );
        $instance = wp_parse_args((array) $instance, $default);
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>"><?php esc_html_e('Title:', 'elazi-lite'); ?></label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>" name="<?php echo esc_attr($this->get_field_name('title')); ?>" type="text" value="<?php echo esc_attr(strip_tags($instance['title'])); ?>" />
        </p>

        <p>
            <label for="<?php echo esc_attr($this->get_field_id('role')); ?>"><?php esc_html_e('Select group', 'elazi-lite'); ?></label>
            <select class="widefat" id="<?php echo esc_attr($this->get_field_id('role')); ?>" name="<?php echo esc_attr($this->get_field_name('role')); ?>">
                <?php
                $relations = array(
                    'all'           => esc_html__( 'All', 'elazi-lite' ),
                    'administrator' => esc_html__( 'Administrator', 'elazi-lite' ),
                    'author'        => esc_html__( 'Author', 'elazi-lite' ),
                    'editor'        => esc_html__( 'Editor', 'elazi-lite' ),
                    'contributor'   => esc_html__( 'Contributor', 'elazi-lite' ),
                    'subscriber'    => esc_html__( 'Subscriber', 'elazi-lite' )
                );
                foreach ($relations as $value => $title) {
                    ?>
                    <option value="<?php echo esc_attr($value); ?>" <?php selected($instance['role'], $value); ?>><?php echo esc_attr($title); ?></option>
                    <?php
                }
                ?>
            </select>
        </p>

        <?php
    }

    public function widget( $args, $instance ) {

		extract( $args );

		$instance = wp_parse_args((array) $instance, $this->get_default());

		extract( $instance );

		echo wp_kses_post( $before_widget );

		$title = apply_filters('widget_title', empty($instance['title']) ? '' : $instance['title'], $instance, $this->id_base);

		if( $title )
            echo wp_kses_post( $before_title . '<i class="fa fa-users pull-left"></i><span class="pull-left">' . $title . '</span>' . $after_title );
		?>
            <div class="kopa-carousel-wrapper">
                <div class="owl-carousel kopa-author-carousel">
                    <?php 
                    if( $role == 'all'){
                        $blogusers = get_users();
                    }
                    else{
                        $blogusers = get_users( 'role='.$role.'' );
                    }
                    $index = 1;
                    $count = 0;
                    $num_user = count( $blogusers );
                    foreach ( $blogusers as $user ) : 
                        if( $index  == 1 ){
                            echo '<div class="item">
                                    <ul>';
                        }
                    ?>
                        <li><a href="<?php echo get_author_posts_url( $user->ID ); ?>"><?php echo get_avatar( $user->user_email, 70 ); ?></a></li>
                    <?php 
                        if( $index  == 2 || $count == $num_user-1 ){
                            echo '</ul>
                                </div>';
                            $index = 0;
                        }
                        $index++;
                        $count++;
                    endforeach; ?>
                </div>
            </div>
		<?php
		echo wp_kses_post( $after_widget );

	}

}