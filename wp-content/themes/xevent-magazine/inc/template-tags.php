<?php
/**
 * Custom template tags for xevents
 * xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */
if (!function_exists('xevents_paging_nav')) :

    /**
     * Display navigation to next/previous set of posts when applicable.
     *
     * @since Xevent 1.0
     */
    function xevents_paging_nav() {
        // Don't print empty markup if there's only one page.
        if ($GLOBALS['wp_query']->max_num_pages < 2) {
            return;
        }

        $paged = get_query_var('paged') ? intval(get_query_var('paged')) : 1;
        $pagenum_link = html_entity_decode(get_pagenum_link());
        $query_args = array();
        $url_parts = explode('?', $pagenum_link);

        if (isset($url_parts[1])) {
            wp_parse_str($url_parts[1], $query_args);
        }

        $pagenum_link = remove_query_arg(array_keys($query_args), $pagenum_link);
        $pagenum_link = trailingslashit($pagenum_link) . '%_%';

        $format = $GLOBALS['wp_rewrite']->using_index_permalinks() && !strpos($pagenum_link, 'index.php') ? 'index.php/' : '';
        $format .= $GLOBALS['wp_rewrite']->using_permalinks() ? user_trailingslashit('page/%#%', 'paged') : '?paged=%#%';

        // Set up paginated links.
        $links = paginate_links(array(
            'base' => $pagenum_link,
            'format' => $format,
            'total' => $GLOBALS['wp_query']->max_num_pages,
            'current' => $paged,
            'mid_size' => 1,
            'add_args' => array_map('urlencode', $query_args),
            'prev_text' => __('<div class="pp_link"><span class="fa fa-angle-double-left"></span>Previous Article</div>', 'xevents'),
            'next_text' => __('<div class="np_link">Next Article<span class="fa fa-angle-double-right"></span></div>', 'xevents'),
            'type' => 'array'
        ));

        if ($links) :
            ?>
            <nav class="navigation paging-navigation" role="navigation">
                <h1 class="screen-reader-text"><?php _e('', 'xevents'); ?></h1>
                <ul class="pagination loop-pagination">
                    <?php
                    foreach ($links as $link)
                        echo '<li>' . $link . '</li>';
                    ?>
                </ul><!-- .pagination -->
            </nav><!-- .navigation -->
            <?php
        endif;
    }

endif;

if (!function_exists('xevents_post_nav')) :

    /**
     * Display navigation to next/previous post when applicable.
     *
     * @since Xevent 1.0
     */
    function xevents_post_nav() {
        // Don't print empty markup if there's nowhere to navigate.
        $previous = ( is_attachment() ) ? get_post(get_post()->post_parent) : get_adjacent_post(false, '', true);
        $next = get_adjacent_post(false, '', false);

        if (!$next && !$previous) {
            return;
        }
        ?>
        <nav class="navigation post-navigation" role="navigation">
            <div class="nav-links">
                <ul class="pager">
                    <?php
                    if (is_attachment()) :
                        previous_post_link('%link', __('<span class="meta-nav">Published In</span>%title', 'xevents'));
                    else :
                        previous_post_link('<li class="previous meta-nav">%link</li>', __('<div class="pp_link"><span class="fa fa-angle-double-left"></span>Previous Article</div><span class="prev-post">%title</span>', 'xevents'));
                        next_post_link('<li class="next meta-nav">%link</li>', __('<div class="np_link">Next Article<span class="fa fa-angle-double-right"></span></div><span class="next-post">%title</span>', 'xevents'));
                    endif;
                    ?>
                </ul>
            </div><!-- .nav-links -->
        </nav><!-- .navigation -->
        <?php
    }




endif;
