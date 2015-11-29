<?php
/**
 * Elazi Lite Widget
 *
 * Sets up widget extend class Elazi_Widget_Master.*
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */

add_action( 'widgets_init', array('Elazi_Widget_Contact_Information', 'register'));

class Elazi_Widget_Contact_Information extends Elazi_Widget_Master{

    function __construct() {
        $widget_ops = array('classname' => 'kopa-contact-info-widget', 'description' => esc_html__( 'Display your contact information.', 'elazi-lite' ));
        $control_ops = array('width' => 'auto', 'height' => 'auto');
        parent::__construct('kopa-contact-information', esc_html__( '[Elazi - Lite] Contact Information', 'elazi-lite' ), $widget_ops, $control_ops);
    }

    public static function register(){
        register_widget('Elazi_Widget_Contact_Information');
    }

    public function update($new_instance, $old_instance) {
        $instance = $old_instance;

		$instance['title']   = strip_tags($new_instance['title']);
		$instance['address'] = strip_tags($new_instance['address']);
		$instance['phone']   = strip_tags($new_instance['phone']);
		$instance['email']   = strip_tags($new_instance['email']);

        return $instance;
    }

    public function form($instance) {
        $default = array(
            'title' => '',
            'address' => '',
            'phone' => '',
            'email' => ''
        );
        $instance = wp_parse_args((array) $instance, $default);
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>"><?php esc_html_e('Title:', 'elazi-lite'); ?></label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>" name="<?php echo esc_attr($this->get_field_name('title')); ?>" type="text" value="<?php echo esc_attr(strip_tags($instance['title'])); ?>" />
        </p>

        <p>
            <label for="<?php echo esc_attr($this->get_field_id('address')); ?>"><?php esc_html_e('Address:', 'elazi-lite'); ?></label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('address')); ?>" name="<?php echo esc_attr($this->get_field_name('address')); ?>" type="text" value="<?php echo esc_attr(strip_tags($instance['address'])); ?>" />
        </p>

        <p>
            <label for="<?php echo esc_attr($this->get_field_id('phone')); ?>"><?php esc_html_e('Phone:', 'elazi-lite'); ?></label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('phone')); ?>" name="<?php echo esc_attr($this->get_field_name('phone')); ?>" type="text" value="<?php echo esc_attr(strip_tags($instance['phone'])); ?>" />
        </p>

        <p>
            <label for="<?php echo esc_attr($this->get_field_id('email')); ?>"><?php esc_html_e('Email:', 'elazi-lite'); ?></label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('email')); ?>" name="<?php echo esc_attr($this->get_field_name('email')); ?>" type="text" value="<?php echo esc_attr(strip_tags($instance['email'])); ?>" />
        </p>

        <?php
    }

    public function widget( $args, $instance ) {

		extract( $args );

		$instance = wp_parse_args((array) $instance, $this->get_default());

		extract( $instance );

		echo wp_kses_post( $before_widget );

		$title = apply_filters('widget_title', empty($instance['title']) ? '' : $instance['title'], $instance, $this->id_base);

		if($title)
			echo wp_kses_post( $before_title . $title .$after_title );
		?>

        <?php if( $phone ) : ?>
            <p class="contact-phone"><a href="call:<?php echo esc_attr( $phone ); ?>"><?php echo wp_kses_post( $phone ); ?></a></p>
        <?php endif;?>
        <?php if( $email ) : ?>
            <p class="contact-email"><a href="mailto:<?php echo esc_attr( $email );?>"><?php echo wp_kses_post( $email ); ?></a></p>
        <?php endif;?>
        <?php if( $address ) : ?>
            <p class="contact-address"><?php echo wp_kses_post( $address ); ?></p>
        <?php endif;?>

		<?php
		echo wp_kses_post( $after_widget );

	}

}