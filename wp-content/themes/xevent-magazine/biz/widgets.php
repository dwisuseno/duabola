<?php
/*
 * Xevents WIDGETS.
 * Xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */
add_action('admin_enqueue_scripts', 'xevents_wp_enqueue_color_picker');

function xevents_wp_enqueue_color_picker($hook_suffix) {
    wp_enqueue_style('wp-color-picker');
    wp_enqueue_script('wp-color-picker');
}
/* * *************************************** Tags Widget********************************************** */

class xevents_tags_widget extends WP_Widget {

    function xevents_tags_widget() {
        $widget_ops = array('classname' => 'xevents_tags_widget', 'description' => __('Display Posts Tags', 'xevents'));
        $this->WP_Widget('xevents_tags_widget', __('Xevents Display Posts Tags', 'xevents'), $widget_ops);
    }

    function form($instance) {
        //Set up some default widget settings.
        $defaults = array('title' => __('Tags', 'xevents'), 'number' => __('10', 'xevents'), 'fontcolor' => 'red', 'hcolor' => 'blue', 'bgcolor' => '');
        $instance = wp_parse_args((array) $instance, $defaults);
        ?>
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title', 'xevents'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" value="<?php echo $instance['title']; ?>" style="width:100%;" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('number'); ?>"><?php _e('Tags Number', 'xevents'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('number'); ?>" name="<?php echo $this->get_field_name('number'); ?>" value="<?php echo $instance['number']; ?>" style="width:100%;" />
        </p>

        <?php
    }

    function update($new_instance, $old_instance) {
        $instance = $old_instance;

        //Strip tags from title and name to remove HTML
        $instance['title'] = strip_tags($new_instance['title']);
        $instance['number'] = strip_tags($new_instance['number']);
        return $instance;
    }

    function widget($args, $instance) {
        $title = apply_filters('widget_title', $instance['title']);
// before and after widget arguments are defined by themes
        echo $args['before_widget'];
        if (!empty($title))
            echo $args['before_title'] . '<h2 class="pw_title"><span class="w_title_makeup">' . $title . '</span></h2>' . $args['after_title'];
// This is where you run the code and display the output
        ?>
        <?php
        $tags = get_tags(array('number' => $instance['number']));
        // $html = '<div class="post_tags">';
        foreach ($tags as $tag) {
            $tag_link = get_tag_link($tag->term_id);
            ?>
            <span >
                <a class="widget_tags" style="background-color: #B1B1B1"  rel="tag" href="<?php echo $tag_link; ?>" onMouseOver="this.style.background = '#C2C0C0'" onMouseOut="this.style.background = '#B1B1B1'"><?php echo $tag->name; ?></a></span>
        <?php
        }
        //       }
        ?>
        <?php
        echo $args['after_widget'];
    }

}

/* * ***************************************Tags Widget End********************************************** */

/* * ***************************************Facebook widget********************************************** */

class xevents_fb_widget extends WP_Widget {

    function xevents_fb_widget() {
        $widget_ops = array('classname' => 'xevents_fb_widget', 'description' => __('Facebook Like', 'xevents'));
        $this->WP_Widget('xevents_fb_widget', __('Xevents Facebook Like', 'xevents'), $widget_ops);
    }

    function form($instance) {
        //Set up some default widget settings.
        $defaults = array('title' => __('Facebook Like', 'xevents'), 'height' => '300', 'faces' => '1', 'colorscheme' => 'light', 'stream' => '0', 'border' => '0', 'header' => '0', 'link' => '');
        $instance = wp_parse_args((array) $instance, $defaults);
        ?>
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title', 'xevents'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" value="<?php echo $instance['title']; ?>" style="width:100%;" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('link'); ?>"><?php _e('Link', 'xevents'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('link'); ?>" name="<?php echo $this->get_field_name('link'); ?>" value="<?php echo $instance['link']; ?>" style="width:100%;" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('height'); ?>"><?php _e('Height', 'xevents'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('height'); ?>" name="<?php echo $this->get_field_name('height'); ?>" value="<?php echo $instance['height']; ?>" style="width:100%;" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('faces'); ?>"><?php _e('Show Faces', 'xevents'); ?></label>
            <select id="<?php echo $this->get_field_id('faces'); ?>" name="<?php echo $this->get_field_name('faces'); ?>" >
                <option value="1" <?php if ($instance['faces'] == '1')
                    echo ' selected="selected"';
                else
                    echo '';
                ?> >On</option>
                <option value="0" <?php if ($instance['faces'] == '0')
                    echo ' selected="selected"';
                else
                    echo '';
                ?>>Off</option>
            </select>  

        <p>
            <label for="<?php echo $this->get_field_id('stream'); ?>"><?php _e('Show Stream', 'xevents'); ?></label>
            <select id="<?php echo $this->get_field_id('stream'); ?>" name="<?php echo $this->get_field_name('stream'); ?>" >
                <option value="1" <?php if ($instance['stream'] == '1')
                    echo ' selected="selected"';
                else
                    echo '';
                ?> >On</option>
                <option value="0" <?php if ($instance['stream'] == '0')
                    echo ' selected="selected"';
                else
                    echo '';
        ?>>Off</option>
            </select> </p>
        <p>
            <label for="<?php echo $this->get_field_id('border'); ?>"><?php _e('Show Border', 'xevents'); ?></label>
            <select id="<?php echo $this->get_field_id('border'); ?>" name="<?php echo $this->get_field_name('border'); ?>" >
                <option value="1" <?php if ($instance['border'] == '1')
            echo ' selected="selected"';
        else
            echo '';
        ?> >On</option>
                <option value="0" <?php if ($instance['border'] == '0')
            echo ' selected="selected"';
        else
            echo '';
        ?>>Off</option>
            </select> </p>
        <p>
            <label for="<?php echo $this->get_field_id('header'); ?>"><?php _e('Show Header', 'xevents'); ?></label>
            <select id="<?php echo $this->get_field_id('header'); ?>" name="<?php echo $this->get_field_name('header'); ?>" >
                <option value="1" <?php if ($instance['header'] == '1')
            echo ' selected="selected"';
        else
            echo '';
        ?> >On</option>
                <option value="0" <?php if ($instance['header'] == '0')
            echo ' selected="selected"';
        else
            echo '';
        ?>>Off</option>
            </select> </p>


        <?php
    }

    function update($new_instance, $old_instance) {
        $instance = $old_instance;

        //Strip tags from title and name to remove HTML
        $instance['title'] = strip_tags($new_instance['title']);
        $instance['link'] = esc_url($new_instance['link']);
        $instance['height'] = strip_tags($new_instance['height']);
        $instance['faces'] = $new_instance['faces'];
        $instance['colorscheme'] = $new_instance['colorscheme'];
        $instance['stream'] = $new_instance['stream'];
        $instance['border'] = strip_tags($new_instance['border']);
        $instance['header'] = strip_tags($new_instance['header']);
        return $instance;
    }

    function widget($args, $instance) {
        wp_enqueue_script('xevents-fb');
        extract($instance);
        $title = apply_filters('widget_title', $instance['title']);
// before and after widget arguments are defined by themes
        echo $args['before_widget'];
        if (!empty($title))
            echo $args['before_title'] . '<h2 class="pw_title"><span class="w_title_makeup">' . $title . '</span></h2>' . $args['after_title'];
// This is where you run the code and display the output
        echo '<div id="fb-root"></div><div class="fb-like-box" data-href="' . $link . '" data-width="260px" data-height="' . $height . 'px"  data-show-faces="' . $faces . '" data-stream="' . $stream . '" data-show-border="' . $border . '" data-header="' . $header . '"></div>';
        echo $args['after_widget'];
    }

}

/* * ***************************************Facebook widget********************************************** */

/* * ***************************************Social Icons Widget********************************************** */

class xevents_social_widget extends WP_Widget {

    function xevents_social_widget() {
        $widget_ops = array('classname' => 'xevents_social_widget', 'description' => __('Display Social Icons', 'xevents'));
        $this->WP_Widget('xevents_social_widget', __('Xevents Social Icons', 'xevents'), $widget_ops);
    }

    function form($instance) {
        //Set up some default widget settings.
        $defaults = array('title' => __('Social Networks', 'xevents'), 'social' => 'on');
        $instance = wp_parse_args((array) $instance, $defaults);
        ?>
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title', 'xevents'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" value="<?php echo $instance['title']; ?>" style="width:100%;" />
        </p>
        <p>
            <input class="checkbox" type="checkbox" <?php checked($instance['social'], 'on'); ?> id="<?php echo $this->get_field_id('social'); ?>" name="<?php echo $this->get_field_name('social'); ?>"  />
            <label for="<?php echo $this->get_field_id('social'); ?>"><?php _e('Display Social Icons', 'xevents'); ?></label>
        </p>
        <?php
    }

    function update($new_instance, $old_instance) {
        $instance = $old_instance;

        //Strip tags from title and name to remove HTML
        $instance['title'] = strip_tags($new_instance['title']);
        $instance['social'] = strip_tags($new_instance['social']);

        return $instance;
    }

    function widget($args, $instance) {
        //wp_enqueue_style('social-icons');
        $title = apply_filters('widget_title', $instance['title']);
// before and after widget arguments are defined by themes
        echo $args['before_widget'];
        if (!empty($title))
            echo $args['before_title'] . '<h2 class="pw_title"><span class="w_title_makeup">' . $title . '</span></h2>' . $args['after_title'];
// This is where you run the code and display the output
        $tw = get_option('xevents_social_links_twitter');
        $fb = get_option('xevents_social_links_facebook');
        $gp = get_option('xevents_social_links_google');
        $pt = get_option('xevents_social_links_pinterest');
        $li = get_option('xevents_social_links_linkedin');
        $su = get_option('xevents_social_links_stumbleupon');
        ?>
        <div class="soial_w_side">
            <div class="s_f"><a href="<?php echo $fb; ?>"><i class='fa fa-facebook'></i></a></div>
            <div class="s_t"><a href="<?php echo $tw; ?>"><i class='fa fa-twitter'></i></a></div>
            <div class="s_g"><a href="<?php echo $gp; ?>"><i class='fa fa-google-plus'></i></a></div>
            <div class="s_l"><a href="<?php echo $li; ?>"><i class='fa fa-linkedin'></i></a></div>
            <div class="s_s"><a href="<?php echo $su; ?>"><i class='fa fa-stumbleupon'></i></a></div>
            <div class="s_p"><a href="<?php echo $pt; ?>"><i class='fa fa-pinterest'></i></a></div>

        </div>
        <?php
        echo $args['after_widget'];
    }

}

/* * ***************************************Social Icons Widget End********************************************** */
/* * ***************************************Media Widget********************************************** */

function xevents_get_media($media_url, $width, $height, $jwplayer = false) {
    // Youtube video
    $video_url = parse_url($media_url);
    if ($video_url['host'] == 'youtube.com' || $video_url['host'] == 'www.youtube.com') {
        parse_str($video_url['query'], $youtube);
        $id = uniqid('', false);
        $return = '
					<iframe width="' . $width . '" height="' . $height . '" src="http://www.youtube.com/embed/' . $youtube['v'] . '" allowfullscreen></iframe>
				';
    }
    // Vimeo video
    $video_url = parse_url($media_url);
    if ($video_url['host'] == 'vimeo.com' || $video_url['host'] == 'www.vimeo.com') {
        $vimeo_id = mb_substr($video_url['path'], 1);
        $return = '<iframe src="http://player.vimeo.com/video/' . $vimeo_id . '?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="' . $width . '" height="' . $height . '" frameborder="0"></iframe>';
    }
    // Images (bmp/jpg/jpeg/png/gif)
    $images = array('.bmp', '.BMP', '.jpg', '.JPG', '.png', '.PNG', 'jpeg', 'JPEG', '.gif', '.GIF');
    $image_ext = mb_substr($media_url, -4);
    if (in_array($image_ext, $images)) {
        $return = '<img src="' . $media_url . '" alt="" width="' . $width . '" height="' . $height . '" />';
    }
    return $return;
}

class xevents_media_widget extends WP_Widget {

    function xevents_media_widget() {
        $widget_ops = array('classname' => 'xevents_media_widget', 'description' => __('Display Media Stream', 'xevents'));
        $this->WP_Widget('xevents_media_widget', __('Xevents Media', 'xevents'), $widget_ops);
    }

    function form($instance) {
        //Set up some default widget settings.
        $defaults = array('title' => __('Media', 'xevents'), 'width' => '200', 'height' => '200', 'url' => '');
        $instance = wp_parse_args((array) $instance, $defaults);
        ?>
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title', 'xevents'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" value="<?php echo $instance['title']; ?>" style="width:100%;" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('url'); ?>"><?php _e('Media URL', 'xevents'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('url'); ?>" name="<?php echo $this->get_field_name('url'); ?>" value="<?php echo $instance['url']; ?>" style="width:100%;" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('width'); ?>"><?php _e('Width', 'xevents'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('width'); ?>" name="<?php echo $this->get_field_name('width'); ?>" value="<?php echo $instance['width']; ?>" style="width:100%;" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('height'); ?>"><?php _e('Height', 'xevents'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('height'); ?>" name="<?php echo $this->get_field_name('height'); ?>" value="<?php echo $instance['height']; ?>" style="width:100%;" />
        </p>
        <?php
    }

    function update($new_instance, $old_instance) {
        $instance = $old_instance;

        //Strip tags from title and name to remove HTML
        $instance['title'] = strip_tags($new_instance['title']);
        $instance['url'] = esc_url($new_instance['url']);
        $instance['width'] = strip_tags($new_instance['width']);
        $instance['height'] = strip_tags($new_instance['height']);

        return $instance;
    }

    function widget($args, $instance) {
        extract($instance);
        $title = apply_filters('widget_title', $instance['title']);
// before and after widget arguments are defined by themes
        echo $args['before_widget'];
        if (!empty($title))
            echo $args['before_title'] . '<h2 class="pw_title"><span class="w_title_makeup">' . $title . '</span></h2>' . $args['after_title'];
// This is where you run the code and display the output
        $return = '<div class="media_wid" >';
        $return .= ( $url ) ? xevents_get_media($url, $width, $height, false) : __('Please specify media url', 'xevents');
        $return .= '</div>';
        echo $return;
        echo $args['after_widget'];
    }

}

/* * ***************************************Media Widget End********************************************** */
/* * ***************************************archives Widget********************************************** */

class xevents_archives_widget extends WP_Widget {

    function xevents_archives_widget() {
        $widget_ops = array('classname' => 'xevents_archives_widget', 'description' => __('Display Archives', 'xevents'));
        $this->WP_Widget('xevents_archives_widget', __('Xevents Archives', 'xevents'), $widget_ops);
    }

    function widget($args, $instance) {
        extract($args);
        $c = !empty($instance['count']) ? '1' : '0';
        $d = !empty($instance['dropdown']) ? '1' : '0';
        /** This filter is documented in wp-includes/default-widgets.php */
        $title = apply_filters('widget_title', empty($instance['title']) ? __('Archives', 'xevents') : $instance['title'], $instance, $this->id_base);
        echo $before_widget;
        if ($title)
            echo $before_title . '<h2 class="pw_title"><span class="w_title_makeup">' . $title . '</span></h2>' . $after_title;
        if ($d) {
            ?>
            <select name="archive-dropdown" onchange='document.location.href = this.options[this.selectedIndex].value;'>
                <option value=""><?php echo esc_attr(__('Select Month', 'xevents')); ?></option>
            <?php
            wp_get_archives(apply_filters('widget_archives_dropdown_args', array(
                'type' => 'monthly',
                'format' => 'option',
                'show_post_count' => $c
            )));
            ?>
            </select>
            <?php
        } else {
            ?>
            <div class="arch_hold">
                <ul class="archive_wid">
            <?php
            wp_get_archives(apply_filters('widget_archives_args', array(
                'type' => 'monthly',
                'show_post_count' => $c
            )));
            ?>
                </ul>
            </div>
            <?php
        }
        echo $after_widget;
    }

    function update($new_instance, $old_instance) {
        $instance = $old_instance;
        $new_instance = wp_parse_args((array) $new_instance, array('title' => '', 'count' => 0, 'dropdown' => ''));
        $instance['title'] = strip_tags($new_instance['title']);
        $instance['count'] = $new_instance['count'] ? 1 : 0;
        $instance['dropdown'] = $new_instance['dropdown'] ? 1 : 0;
        return $instance;
    }

    function form($instance) {
        $instance = wp_parse_args((array) $instance, array('title' => '', 'count' => 0, 'dropdown' => ''));
        $title = strip_tags($instance['title']);
        $count = $instance['count'] ? 'checked="checked"' : '';
        $dropdown = $instance['dropdown'] ? 'checked="checked"' : '';
        ?>
        <p><label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:', 'xevents'); ?></label> <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>" /></p>
        <p>
            <input class="checkbox" type="checkbox" <?php echo $dropdown; ?> id="<?php echo $this->get_field_id('dropdown'); ?>" name="<?php echo $this->get_field_name('dropdown'); ?>" /> <label for="<?php echo $this->get_field_id('dropdown'); ?>"><?php _e('Display as dropdown', 'xevents'); ?></label>
            <br/>
            <input class="checkbox" type="checkbox" <?php echo $count; ?> id="<?php echo $this->get_field_id('count'); ?>" name="<?php echo $this->get_field_name('count'); ?>" /> <label for="<?php echo $this->get_field_id('count'); ?>"><?php _e('Show post counts', 'xevents'); ?></label>
        </p>
        <?php
    }

}

/* * ***************************************archives Widget end********************************************** */





/* * ***************************************single Ad Widget********************************************** */

class xevents_sad_widget extends WP_Widget {

    function xevents_sad_widget() {
        $widget_ops = array('classname' => 'xevents_sad_widget', 'description' => __('Display Single Advertisment Banner', 'xevents'));
        $this->WP_Widget('xevents_sad_widget', __('Xevents Single Ad', 'xevents'), $widget_ops);
    }

    function form($instance) {
        //Set up some default widget settings.
        $defaults = array('title' => __('Single Ad', 'xevents'), 'image' => '', 'link' => '', 'alt' => '', 'code' => '');
        $instance = wp_parse_args((array) $instance, $defaults);
        ?>
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title', 'xevents'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" value="<?php echo $instance['title']; ?>" style="width:100%;" />
        </p>
        <?php // for($i=1;$i<9;$i++) { ?>
        <p>
            <label for="<?php echo $this->get_field_id('ads_head'); ?>"><?php _e('Ad', 'xevents'); ?></label>
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('image'); ?>"><?php _e('Image Path', 'xevents'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('image'); ?>" name="<?php echo $this->get_field_name('image'); ?>" value="<?php echo $instance['image']; ?>" style="width:100%;" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('link'); ?>"><?php _e('Ad Link', 'xevents'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('link'); ?>" name="<?php echo $this->get_field_name('link'); ?>" value="<?php echo $instance['link']; ?>" style="width:100%;" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('alt'); ?>"><?php _e('Image Alt', 'xevents'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('alt'); ?>" name="<?php echo $this->get_field_name('alt'); ?>" value="<?php echo $instance['alt']; ?>" style="width:100%;" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('code'); ?>"><?php _e('Alternative Ad Code', 'xevents'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('code'); ?>" name="<?php echo $this->get_field_name('code'); ?>" value="<?php echo $instance['code']; ?>" style="width:100%;" />
        </p>
        <?php
//}
    }

    function update($new_instance, $old_instance) {
        $instance = $old_instance;

        //Strip tags from title and name to remove HTML
        $instance['title'] = strip_tags($new_instance['title']);
        // for($i=1;$i<9;$i++) { 
        $instance['image'] = esc_url($new_instance['image']);
        $instance['link'] = esc_url($new_instance['link']);
        $instance['alt'] = $new_instance['alt'];
        $instance['code'] = $new_instance['code'];
        //    }
        return $instance;
    }

    function widget($args, $instance) {

        //   extract($instance);
        $title = apply_filters('widget_title', $instance['title']);
// before and after widget arguments are defined by themes
        echo $args['before_widget'];
        if (!empty($title))
            echo $args['before_title'] . '<h2 class="pw_title"><span class="w_title_makeup">' . $title . '</span></h2>' . $args['after_title'];
        $output = null;
// This is where you run the code and display the output
//for($i=1;$i<9;$i++) {
        if (!$instance["code"]) {
            if (!empty($instance["link"]))
                $output.='<div class="biz_announce"><a href="' . $instance["link"] . '" target="_blank"><img src="' . $instance["image"] . '" alt="' . $instance["alt"] . '"></a></div>';
        }
        else
            $output.='<div class="biz_announce">' . $instance["code"] . '</div>';
//}
        echo $output;
        echo $args['after_widget'];
    }

}

/* * ***************************************single Ad Widget End********************************************** */





/* * ***************************************Search Widget********************************************** */

class xevents_search_widget extends WP_Widget {

    function __construct() {
        $widget_ops = array('classname' => 'widget_search', 'description' => __("Xevents Search Form.", 'xevents'));
        parent::__construct('search', __('Xevents Search Form', 'xevents'), $widget_ops);
    }

    function widget($args, $instance) {
        extract($args);

        /** This filter is documented in wp-includes/default-widgets.php */
        $title = apply_filters('widget_title', empty($instance['title']) ? '' : $instance['title'], $instance, $this->id_base);

        echo $before_widget;
        if ($title)
            echo $args['before_title'] . '<h2 class="pw_title"><span class="w_title_makeup">' . $title . '</span></h2>' . $args['after_title'];

        // Use current theme search form if it exists
        get_search_form();

        echo $after_widget;
    }

    function form($instance) {
        $instance = wp_parse_args((array) $instance, array('title' => ''));
        $title = $instance['title'];
        ?>
        <p><label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:', 'xevents'); ?> <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>" /></label></p>
        <?php
    }

    function update($new_instance, $old_instance) {
        $instance = $old_instance;
        $new_instance = wp_parse_args((array) $new_instance, array('title' => ''));
        $instance['title'] = strip_tags($new_instance['title']);
        return $instance;
    }

}

/* * ***************************************Search Widget end********************************************** */

function xevents_register_widget() {
    register_widget("xevents_tags_widget");
    register_widget("xevents_fb_widget");
    register_widget("xevents_social_widget");
    register_widget("xevents_media_widget");
    register_widget("xevents_archives_widget");
    register_widget("xevents_sad_widget");
    register_widget("xevents_search_widget");
}

add_action('widgets_init', 'xevents_register_widget');

function xevents_widgets_files() {
    //auto scroll post widget
    wp_register_style('xevents-css-wid-posts', get_template_directory_uri() . '/biz/css/widgets/posts.css');
    wp_register_style('xevents-css-wid-posts-rtl', get_template_directory_uri() . '/biz/css/widgets/posts_rtl.css');

   wp_enqueue_style('xevents-css-wid-posts');
    wp_register_script('xevents-js-wid-autoscrol', get_template_directory_uri() . '/biz/assets/totem/jquery.totemticker.min.js', array(), false, true);
    wp_enqueue_script('xevents-js-wid-autoscrol');

    //social files
  //  wp_register_script('gplus-js', get_template_directory_uri() . '/biz/assets/gplus_activity_widget/jquery.googleplus-activity-1.0.min.js', array(), false, true);
    wp_register_script('xevents-fb', get_template_directory_uri() . '/biz/js/fb.js', array(), false, true);
    wp_register_style('xevents-social-icons', get_template_directory_uri() . '/biz/assets/social/css/style.css');
}

add_action("wp_enqueue_scripts", "xevents_widgets_files");

?>
