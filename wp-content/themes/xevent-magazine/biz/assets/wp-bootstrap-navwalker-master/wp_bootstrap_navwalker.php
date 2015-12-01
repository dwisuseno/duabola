<?php

/**
 * Class Name: xevents_wp_bootstrap_navwalker
 * GitHub URI: https://github.com/twittem/wp-bootstrap-navwalker
 * Description: A custom WordPress nav walker class to implement the Bootstrap 3 navigation style in a custom theme using the WordPress built in menu manager.
 * Version: 2.0.4
 * Author: Edward McIntyre - @twittem
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */
class xevents_wp_bootstrap_navwalker extends Walker_Nav_Menu {

    /**
     * @see Walker::start_lvl()
     * @since 3.0.0
     *
     * @param string $output Passed by reference. Used to append additional content.
     * @param int $depth Depth of page. Used for padding.
     */
    public function start_lvl(&$output, $depth = 0, $args = array()) {
        $indent = str_repeat("\t", $depth);
        $output .= "\n$indent<ul role=\"menu\" class=\"dropdown-menu\">\n";
    }

    /**
     * @see Walker::start_el()
     * @since 3.0.0
     *
     * @param string $output Passed by reference. Used to append additional content.
     * @param object $item Menu item data object.
     * @param int $depth Depth of menu item. Used for padding.
     * @param int $current_page Menu item ID.
     * @param object $args
     */
    public $def = false;

    public function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
        $indent = ( $depth ) ? str_repeat("\t", $depth) : '';
//var_dump($depth);
        /**
         * Dividers, Headers or Disabled
         * =============================
         * Determine whether the item is a Divider, Header, Disabled or regular
         * menu item. To prevent errors we use the strcasecmp() function to so a
         * comparison that is not case sensitive. The strcasecmp() function returns
         * a 0 if the strings are equal.
         */
        //     var_dump($item);

        if (strcasecmp($item->attr_title, 'divider') == 0 && $depth === 1) {
            $output .= $indent . '<li role="presentation" class="divider">';
        } else if (strcasecmp($item->title, 'divider') == 0 && $depth === 1) {
            $output .= $indent . '<li role="presentation" class="divider">';
        } else if (strcasecmp($item->attr_title, 'dropdown-header') == 0 && $depth === 1) {
            $output .= $indent . '<li role="presentation" class="dropdown-header">' . esc_attr($item->title);
        } else if (strcasecmp($item->attr_title, 'disabled') == 0) {
            $output .= $indent . '<li role="presentation" class="disabled"><a href="#">' . esc_attr($item->title) . '</a>';
        } else {

            $class_names = $value = '';

            $classes = empty($item->classes) ? array() : (array) $item->classes;
            $classes[] = 'menu-item-' . $item->ID;

            //$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );

            if ($args->has_children)
                $class_names .= 'dropdown';


            //    else if ( $args->has_children &&  $item->menu_item_parent =='0')

            if (in_array('current-menu-item', $classes)) {
                $class_names .= 'active';
                $def = true;
            }
            $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';






            $id = apply_filters('nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args);
            $id = $id ? ' id="' . esc_attr($id) . '"' : '';

            $output .= $indent . '<li ' . $class_names . '>';

            $atts = array();
            $atts['title'] = !empty($item->title) ? $item->title : '';
            $atts['target'] = !empty($item->target) ? $item->target : '';
            $atts['rel'] = !empty($item->xfn) ? $item->xfn : '';

            // If item has_children add atts to a.
            if ($args->has_children && $depth == 0) {
                $atts['href'] = '#';
                $atts['data-toggle'] = 'dropdown';
                $atts['class'] = 'dropdown-toggle';
                $atts['aria-haspopup'] = 'true';
            } else {
                $atts['href'] = !empty($item->url) ? $item->url : '';
            }
            if (in_array('current-menu-item', $classes))
                $atts['style'] = 'background-color:' . get_theme_mod('xevents_general_headline_bordercolor');

            $atts = apply_filters('nav_menu_link_attributes', $atts, $item, $args);

            $attributes = '';
            foreach ($atts as $attr => $value) {
                if (!empty($value)) {
                    $value = ( 'href' === $attr ) ? esc_url($value) : esc_attr($value);
                    $attributes .= ' ' . $attr . '="' . $value . '"';
                }
            }



            /*
             * Glyphicons
             * ===========
             * Since the the menu item is NOT a Divider or Header we check the see
             * if there is a value in the attr_title property. If the attr_title
             * property is NOT null we apply it as the class name for the glyphicon.
             */



            $item_output = $args->before;
            if (!empty($item->attr_title))
                $item_output .= '<a' . $attributes . '><span class="glyphicon ' . esc_attr($item->attr_title) . '"></span>&nbsp;';
            else
                $item_output .= '<a' . $attributes . '>';

            $item_output .= $args->link_before . apply_filters('the_title', $item->title, $item->ID) . $args->link_after;

            $thumbnail = '';



            $item_output .= ( $args->has_children && 0 === $depth ) ? ' <span class="caret"></span></a>' : '</a>';
            $item_output .= $args->after;
            if ($item->object == 'category' && $item->menu_item_parent != '0') {

                if (has_post_thumbnail($item->object_id)) {
                    // $item_output .= get_the_post_thumbnail( $item->object_id );
                }
                $num = get_option('xevents_general_num');
                $args_q = array('posts_per_page' => $num, 'cat' => $item->object_id);
                $query = new WP_Query($args_q);
                if ($query->have_posts()) {

                    $array_content = $query->posts;

                    $item_output .='<div class="yamm-content allday-clear-menu">';

                    if ($args->theme_location == 'xevents_primary')
                        if (strcmp(get_option('xevents_general_menu'), 'Small Thumbnails') == 0) {
// one menu category option small thumbaul
                            $item_output .='<ul class="media-list">';
                            foreach ($array_content as $biz_post) {
                                $string = strip_tags($biz_post->post_content);

                                if (strlen($string) > 100) {
                                    // truncate string
                                    $stringCut = substr($string, 0, 100);
                                    // make sure it ends in a word so assassinate doesn't become ass...
                                    $string = substr($stringCut, 0, strrpos($stringCut, ' '));
                                }
                                if (get_option('xevents_general_rtl') == 'yes')
                                    $media = 'pull-left';
                                else
                                    $media = 'pull-right';
                                $item_output .='<li class="media"><a href="' . get_permalink($biz_post->ID) . '" class="' . $media . '">' . get_the_post_thumbnail($biz_post->ID, array('80', '80'), array('class' => 'media-object')) . '</a>
                        <div class="media-body">
                        <a href="' . get_permalink($biz_post->ID) . '"> <h4 class="media-heading">' . $biz_post->post_title . '</h4>
                          <p>' . $string . '...</p> </a>
                      </div>
                      </li> ';
                            }
                            $item_output .='</ul></div>';
                            // one menu category option small thumbaul
                        }

                    if ($args->theme_location == 'xevents_primary')
                        if (strcmp(get_option('xevents_general_menu'), 'Big Thumbnails') == 0) {

                            // two menu category option big thumbaul
                            $item_output .='<div class="row">';
                            foreach ($array_content as $biz_post) {
                                $format = get_post_format($biz_post->ID);
                                $item_output .=' <div class="col-xs-6 col-sm-4 cat_bigthumb"><a href="' . get_permalink($biz_post->ID) . '" class="thumbnail">' . get_the_post_thumbnail($biz_post->ID, 'medium') . '
                    <h3>' . $biz_post->post_title . '</h3></a>
                    </div>';
                            }
                            $item_output .='</div></div>';
                            // two menu category option big thumbaul
                        }

                    //    if(strcmp($item->post_title,'No Thumbnails Menu')==0){ 
                    if ($args->theme_location == 'xevents_primary')
                        if (strcmp(get_option('xevents_general_menu'), 'No Thumbnails') == 0) {

                            // three menu category option link list

                            $item_output .='<div class="row"><ul class="list-unstyled" >';
                            foreach ($array_content as $biz_post) {
                                $item_output .='<li><a href="' . get_permalink($biz_post->ID) . '">' . $biz_post->post_title . ' </a></li>';
                            }

                            $item_output .=' </ul></div></div>';



                            // three menu category option  link list
                        }
                }
            } //else {

            $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
        }
    }

    /**
     * Traverse elements to create list from elements.
     *
     * Display one element if the element doesn't have any children otherwise,
     * display the element and its children. Will only traverse up to the max
     * depth and no ignore elements under that depth.
     *
     * This method shouldn't be called directly, use the walk() method instead.
     *
     * @see Walker::start_el()
     * @since 2.5.0
     *
     * @param object $element Data object
     * @param array $children_elements List of elements to continue traversing.
     * @param int $max_depth Max depth to traverse.
     * @param int $depth Depth of current element.
     * @param array $args
     * @param string $output Passed by reference. Used to append additional content.
     * @return null Null on failure with no changes to parameters.
     */
    public function display_element($element, &$children_elements, $max_depth, $depth, $args, &$output) {
        if (!$element)
            return;

        $id_field = $this->db_fields['id'];

        // Display this element.
        if (is_object($args[0]))
            $args[0]->has_children = !empty($children_elements[$element->$id_field]);

        parent::display_element($element, $children_elements, $max_depth, $depth, $args, $output);
    }

    /**
     * Menu Fallback
     * =============
     * If this function is assigned to the wp_nav_menu's fallback_cb variable
     * and a manu has not been assigned to the theme location in the WordPress
     * menu manager the function with display nothing to a non-logged in user,
     * and will add a link to the WordPress menu manager if logged in as an admin.
     *
     * @param array $args passed from the wp_nav_menu function.
     *
     */
    public static function fallback($args) {
        if (current_user_can('manage_options')) {

            extract($args);

            $fb_output = null;

            if ($container) {
                $fb_output = '<' . $container;

                if ($container_id)
                    $fb_output .= ' id="' . $container_id . '"';

                if ($container_class)
                    $fb_output .= ' class="' . $container_class . '"';

                $fb_output .= '>';
            }

            $fb_output .= '<ul';

            if ($menu_id)
                $fb_output .= ' id="' . $menu_id . '"';

            if ($menu_class)
                $fb_output .= ' class="' . $menu_class . '"';

            $fb_output .= '>';
            $fb_output .= '<li><a href="' . admin_url('nav-menus.php') . '">Add a menu</a></li>';
            $fb_output .= '</ul>';

            if ($container)
                $fb_output .= '</' . $container . '>';

            echo $fb_output;
        }
    }

}
