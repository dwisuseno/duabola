<?php
/**
 * Elazi Lite Widget Master
 *
 * define Elazi_Widget_Master
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */

class Elazi_Widget_Master extends WP_Widget {

    public function update($new_instance, $old_instance) {
        $instance = $old_instance;

        $instance['title']          = strip_tags($new_instance['title']);
        $instance['posts_per_page'] = (int) strip_tags($new_instance['posts_per_page']);
        $instance['excerpt_widget'] = (int) strip_tags($new_instance['excerpt_widget']);
        $instance['orderby']        = isset($new_instance['orderby']) && in_array($new_instance['orderby'], array('date', 'popular', 'comment_count', 'rand')) ? $new_instance['orderby'] : 'date';
        $instance['category']       = (isset($new_instance['category']) && is_array($new_instance['category'])) ? array_filter($new_instance['category']) : array();
        $instance['post_tag']       = (isset($new_instance['post_tag']) && is_array($new_instance['post_tag'])) ? array_filter($new_instance['post_tag']) : array();
        $instance['post_format']    = (isset($new_instance['post_format']) && is_array($new_instance['post_format'])) ? array_filter($new_instance['post_format']) : array();
        $instance['relation']       = isset($new_instance['relation']) && in_array($new_instance['relation'], array('AND', 'OR')) ? $new_instance['relation'] : 'OR';
        $instance['in']             = strip_tags($new_instance['in']);

        return $instance;
    }

    public function form($instance) {
        $instance = wp_parse_args((array) $instance, $this->get_default());
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>"><?php esc_html_e('Title:', 'elazi-lite'); ?></label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>" name="<?php echo esc_attr($this->get_field_name('title')); ?>" type="text" value="<?php echo esc_attr(strip_tags($instance['title'])); ?>" />
        </p>

        <p>
            <label for="<?php echo esc_attr($this->get_field_id('posts_per_page')); ?>"><?php esc_html_e('Number of posts:', 'elazi-lite'); ?></label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('posts_per_page')); ?>" name="<?php echo esc_attr($this->get_field_name('posts_per_page')); ?>" type="text" value="<?php echo esc_attr((int) $instance['posts_per_page']); ?>" />
        </p>

        <p>
            <label for="<?php echo esc_attr($this->get_field_id('excerpt_widget')); ?>"><?php esc_html_e('Excerpt lenght:', 'elazi-lite'); ?></label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('excerpt_widget')); ?>" name="<?php echo esc_attr($this->get_field_name('excerpt_widget')); ?>" type="text" value="<?php echo esc_attr((int) $instance['excerpt_widget']); ?>" />
        </p>

        <p>
            <label for="<?php echo esc_attr($this->get_field_id('orderby')); ?>"><?php esc_html_e('Order by:', 'elazi-lite'); ?></label>
            <select class="widefat" id="<?php echo esc_attr($this->get_field_id('orderby')); ?>" name="<?php echo esc_attr($this->get_field_name('orderby')); ?>">
                <?php
                $orderbys = array(
                    'date'          => esc_html__('Latest news', 'elazi-lite'),
                    'comment_count' => esc_html__('Most comments', 'elazi-lite'),
                    'rand'          => esc_html__('Random', 'elazi-lite')
                );
                foreach ($orderbys as $value => $title) {
                    ?>
                    <option value="<?php echo esc_attr($value); ?>" <?php selected($instance['orderby'], $value); ?>><?php echo esc_attr($title); ?></option>
                    <?php
                }
                ?>
            </select>
        </p>

        <p>
            <label for="<?php echo esc_attr($this->get_field_id('category')); ?>"><?php esc_html_e('Categories:', 'elazi-lite'); ?></label>
            <select class="widefat" id="<?php echo esc_attr($this->get_field_id('category')); ?>" name="<?php echo esc_attr($this->get_field_name('category')); ?>[]" multiple="multiple" size="5">
                <option value="">&horbar; <?php esc_html_e('All', 'elazi-lite'); ?> &horbar;</option>
                <?php
                $terms = get_terms('category');
                if ($terms) {
                    foreach ($terms as $term) {
                        $selected = in_array($term->term_id, $instance['category']) ? 'selected="selected"' : '';
                        ?>
                        <option value="<?php echo esc_attr($term->term_id); ?>" <?php echo esc_attr($selected); ?>><?php echo esc_attr($term->name); ?></option>
                        <?php
                    }
                }
                ?>
            </select>
        </p>

        <p>
            <label for="<?php echo esc_attr($this->get_field_id('post_tag')); ?>"><?php esc_html_e('Tags:', 'elazi-lite'); ?></label>
            <select class="widefat" id="<?php echo esc_attr($this->get_field_id('post_tag')); ?>" name="<?php echo esc_attr($this->get_field_name('post_tag')); ?>[]" multiple="multiple" size="5">
                <option value="">&horbar; <?php esc_html_e('All', 'elazi-lite'); ?> &horbar;</option>
                <?php
                $terms = get_terms('post_tag');
                if ($terms) {
                    foreach ($terms as $term) {
                        $selected = in_array($term->term_id, $instance['post_tag']) ? 'selected="selected"' : '';
                        ?>
                        <option value="<?php echo esc_attr($term->term_id); ?>" <?php echo esc_attr($selected); ?>><?php echo esc_attr($term->name); ?></option>
                        <?php
                    }
                }
                ?>
            </select>
        </p>

        <p>
            <label for="<?php echo esc_attr($this->get_field_id('post_format')); ?>"><?php esc_html_e('Format:', 'elazi-lite'); ?></label>
            <select class="widefat" id="<?php echo esc_attr($this->get_field_id('post_format')); ?>" name="<?php echo esc_attr($this->get_field_name('post_format')); ?>[]" multiple="multiple" size="5">
                <option value=""><?php esc_html_e('-- All --', 'elazi-lite'); ?></option>
                <?php
                $terms = get_terms('post_format');
                if ($terms) {
                    foreach ($terms as $term) {
                        $selected = in_array($term->term_id, $instance['post_format']) ? 'selected="selected"' : '';
                        ?>
                        <option value="<?php echo esc_attr($term->term_id); ?>" <?php echo esc_attr($selected); ?>><?php echo esc_attr($term->name); ?></option>
                        <?php
                    }
                }
                ?>
            </select>
        </p>

        <p>
            <label for="<?php echo esc_attr($this->get_field_id('relation')); ?>"><?php esc_html_e('Combine condition by <i>Tags</i>, <i>Categories</i>, <i>Format</i>', 'elazi-lite'); ?></label>
            <select class="widefat" id="<?php echo esc_attr($this->get_field_id('relation')); ?>" name="<?php echo esc_attr($this->get_field_name('relation')); ?>">
                <?php
                $relations = array(
                    'AND' => esc_html__('And', 'elazi-lite'),
                    'OR'  => esc_html__('Or', 'elazi-lite'),
                );
                foreach ($relations as $value => $title) {
                    ?>
                    <option value="<?php echo esc_attr($value); ?>" <?php selected($instance['relation'], $value); ?>><?php echo esc_attr($title); ?></option>
                    <?php
                }
                ?>
            </select>
        </p>

        <p>
            <label for="<?php echo esc_attr($this->get_field_id('in')); ?>"><?php printf('%s <i>%s</i>', esc_html__('In:', 'elazi-lite'), esc_html__('(require Wordpress 3.7+)', 'elazi-lite')); ?></label>
            <select class="widefat" id="<?php echo esc_attr($this->get_field_id('in')); ?>" name="<?php echo esc_attr($this->get_field_name('in')); ?>">
                <?php
                $times = array(
                    ''          => esc_html__('-- All --', 'elazi-lite'),
                    '-1 week'   => esc_html__('1 week', 'elazi-lite'),
                    '-2 week'   => esc_html__('2 weeks', 'elazi-lite'),
                    '-3 week'   => esc_html__('3 weeks', 'elazi-lite'),
                    '-1 month'  => esc_html__('1 months', 'elazi-lite'),
                    '-2 month'  => esc_html__('2 months', 'elazi-lite'),
                    '-3 month'  => esc_html__('3 months', 'elazi-lite'),
                    '-4 month'  => esc_html__('4 months', 'elazi-lite'),
                    '-5 month'  => esc_html__('5 months', 'elazi-lite'),
                    '-6 month'  => esc_html__('6 months', 'elazi-lite'),
                    '-7 month'  => esc_html__('7 months', 'elazi-lite'),
                    '-8 month'  => esc_html__('8 months', 'elazi-lite'),
                    '-9 month'  => esc_html__('9 months', 'elazi-lite'),
                    '-10 month' => esc_html__('10 months', 'elazi-lite'),
                    '-11 month' => esc_html__('11 months', 'elazi-lite'),
                    '-1 year'   => esc_html__('1 year', 'elazi-lite'),
                    '-2 year'   => esc_html__('2 years', 'elazi-lite'),
                    '-3 year'   => esc_html__('3 years', 'elazi-lite'),
                    '-4 year'   => esc_html__('4 years', 'elazi-lite'),
                    '-5 year'   => esc_html__('5 years', 'elazi-lite')
                );
                foreach ($times as $value => $title) {
                    ?>
                    <option value="<?php echo esc_attr($value); ?>" <?php selected($instance['in'], $value); ?>><?php echo esc_attr($title); ?></option>
                    <?php
                }
                ?>
            </select>
        </p>

        <?php
    }

    public function get_query($instance, $args_extra = array()) {
        global $wp_version;

        $args = array(
            'post_type'           => array('post'),
            'posts_per_page'      => (int) $instance['posts_per_page'],
            'post_status'         => array('publish'),
            'ignore_sticky_posts' => true
        );

        if (!empty($instance['category'])) {
            $args['tax_query'][] = array(
                'taxonomy' => 'category',
                'field'    => 'id',
                'terms'    => $instance['category']
            );
        }

        if (!empty($instance['post_tag'])) {
            $args['tax_query'][] = array(
                'taxonomy' => 'post_tag',
                'field'    => 'id',
                'terms'    => $instance['post_tag']
            );
        }

        if (!empty($instance['post_format'])) {
            $args['tax_query'][] = array(
                'taxonomy' => 'post_format',
                'field'    => 'id',
                'terms'    => $instance['post_format']
            );
        }

        if (isset($args['tax_query']) && (count($args['tax_query']) >= 2)) {
            $args['tax_query']['relation'] = ('true' == $instance['relation']) ? 'AND' : 'OR';
        }

        if (isset($instance['orderby'])) {
            switch ($instance['orderby']) {
                case 'comment_count':
                    $args['orderby'] = 'comment_count';
                    break;
                case 'rand':
                    $args['orderby'] = 'rand';
                    break;
                default:
                    $args['orderby'] = 'date';
                    break;
            }
        } else {
            $args['orderby'] = 'date';
        }

        if (version_compare($wp_version, '3.7', '>=')) {
            if (isset($instance['in']) && !empty($instance['in'])) {
                $in = $instance['in'];
                $y = date('Y', strtotime($in));
                $m = date('m', strtotime($in));
                $d = date('d', strtotime($in));

                $args['date_query'] = array(
                    array(
                        'after' => array(
                            'year'  => (int) $y,
                            'month' => (int) $m,
                            'day'   => (int) $d
                        )
                    )
                );
            }
        }

        if (!empty($args_extra)) {
            return array_merge($args, $args_extra);
        } else {
            return $args;
        }
    }

    protected function get_default() {
        return array(
            'title'          => '',
            'posts_per_page' => 5,
            'excerpt_widget' => 10,
            'orderby'        => 'date',
            'category'       => array(),
            'post_tag'       => array(),
            'post_format'    => array(),
            'relation'       => 'OR',
            'in'             => ''
        );
    }

}
