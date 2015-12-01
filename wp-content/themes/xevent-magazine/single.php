<?php
/**
 * The Template for displaying all single posts
 * xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */
get_header();
?>
<div class="container">    
    <?php
    $sidebar1 = get_option('xevents_general_sidebar');
    $sidebar2 = get_option('xevents_general_sidebar2');
    if ($sidebar1 == 'no' && $sidebar2 == 'no')
        $class_ch = 'col-md-12';
//else if($sidebar1 =='no' || $sidebar2=='no' )  $class_ch='col-xs-9';
    else if ($sidebar1 == 'no' && $sidebar2 != 'no')
        $class_ch = 'col-md-12';
    else if ($sidebar1 != 'no' && $sidebar2 == 'no')
        $class_ch = 'col-md-9';

    else if ($sidebar1 != 'no' && $sidebar2 != 'no')
        $class_ch = 'col-md-9';
    if ($sidebar1 == 'left')
        $ch_style = 'right';
    if ($sidebar1 == 'right')
        $ch_style = 'left';
    ?>        
    <div id="allday-con-sidebar" class="<?php if (isset($class_ch)) echo $class_ch; ?>" style="float:<?php if (isset($ch_style)) echo $ch_style; ?>">    


        <?php
        if ($sidebar1 == 'no' && $sidebar2 == 'no')
            $class_ch = 'col-md-12';
//else if($sidebar1 =='no' || $sidebar2=='no' )  $class_ch='col-xs-9';
        else if ($sidebar1 == 'no' && $sidebar2 != 'no')
            $class_ch = 'col-md-9';
        else if ($sidebar1 != 'no' && $sidebar2 == 'no')
            $class_ch = 'col-md-12';

        else if ($sidebar1 != 'no' && $sidebar2 != 'no')
            $class_ch = 'col-md-9';
        if ($sidebar2 == 'left')
            $ch_style = 'right';
        if ($sidebar2 == 'right')
            $ch_style = 'left';
        if (get_option("xevents_ads_enable") == 'yes')
            add_filter('the_content', 'xevents_ads_div', 999);
  
        ?> 

        <section id="content_holder" class="<?php if (isset($class_ch)) echo $class_ch; ?>" style="float:<?php if (isset($ch_style)) echo $ch_style; ?>;"  >
            <div id="primary" class="content_area">
                <div id="content" class="site-content col-xs-12 col-md-12" role="main">
                    <?php
                    // Start the Loop.
                    while (have_posts()) : the_post();

                        /*
                         * Include the post format-specific template for the content. If you want to
                         * use this in a child theme, then include a file called called content-___.php
                         * (where ___ is the post format) and that will be used instead.
                         */
                        get_template_part('content', get_post_format());

                        /*                         * ****************************** display related posts ******************************************** */

                        if (get_option('xevents_article_relatedpost') == 'yes') {
                            $related_postsnum = get_option('xevents_article_relatedpostnumber');
                            $args = array(
                                'post__not_in' => array($post->ID),
                                'posts_per_page' => $related_postsnum
                            );
                            if (get_option('xevents_article_displayby') == 'tag') {
                                $tags = wp_get_post_tags($post->ID);
                                if ($tags) {
                                    $i = 0;
                                    foreach ($tags as $arr_tag) {
                                        $tag[$i] = $arr_tag->term_id;
                                        $i++;
                                    }
                                    $args['tag__in'] = $tag;
                                }
                            }if (get_option('xevents_article_displayby') == 'author') {

                                $author = get_the_author_meta('ID');
                                $args['author'] = $author;
                            }
                            if (get_option('xevents_article_displayby') == 'category') {
                                $category = get_the_category(get_the_ID());
                                $args['cat'] = $category[0]->cat_ID;
                            }

                            $my_query = new WP_Query($args);

                            if ($my_query->have_posts()) {
                                $headline_border = get_theme_mod('xevents_general_headline_bordercolor');
                                ?> 
                                <h2 class="pmodule1_title"><span class="title_makeup" style="border-bottom:5px solid <?php
                                    if ($headline_border)
                                        echo $headline_border;
                                    else
                                        echo '#F00';
                                    ?>">
                                                                     <?php
                                                                     echo get_option('xevents_article_relatedboxtitle');
                                                                     ?>
                                    </span></h2>
                                <ul class="related_list">
            <?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
                                        <li><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></li>

                                        <?php
                                    endwhile;
                                    ?>
                                </ul>
                                <?php
                            }
                            wp_reset_query();
                        }
                        /*                         * ************************************************************************** */

                        /*                         * *****************************display author info******************************** */

                        if (get_option('xevents_article_authorinfo') == 'yes') {
                            ?>
                            <ul class="tabs related">
                                <li><a href="#" title="" class="retaled_tab"><?php echo __('Author Bio', 'xevents'); ?></a></li>
                                <li><a href="#" title="" class="retaled_tab"><?php echo __('Latest Posts', 'xevents'); ?></a></li>

                            </ul>
                            <div class="panes post_r_pane">
                                <div class="pane pane_contents">
                                    <div class="author_box">
                                        <a class="author-link" href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>" rel="author"><?php echo get_avatar(get_the_author_meta('user_email'), 70); ?></a>

                                        <div class="a_descrip">
                                            <div class="a_title">                        
                                                <h3><a class="author-link" href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>" rel="author"><?php the_author(); ?></a></h3>
                                            </div>
                                            <div class="vcard author">
                                                <span class="a_descrip_text"><?php the_author_meta('description'); ?></span>
                                                <div class="a_social">
                                                    <div class="icons">
                                                        <?php
                                                        // display social icons for author

                                                        $rss_url = get_the_author_meta('rss_url');
                                                        // echo $rss_url;
                                                        if ($rss_url != '') {
                                                            echo '<a href="' . esc_url($rss_url) . '"><i class="fa fa-rss"></i></a>';
                                                        }

                                                        $google_profile = get_the_author_meta('google_profile');
                                                        if ($google_profile && $google_profile != '') {
                                                            echo '<a href="' . esc_url($google_profile) . '" rel="author"><i class="fa fa-google-plus"></i></a>';
                                                        }

                                                        $twitter_profile = get_the_author_meta('twitter_profile');
                                                        if ($twitter_profile && $twitter_profile != '') {
                                                            echo '<a href="' . esc_url($twitter_profile) . '"><i class="fa fa-twitter"></i></a>';
                                                        }

                                                        $facebook_profile = get_the_author_meta('facebook_profile');
                                                        if ($facebook_profile && $facebook_profile != '') {
                                                            echo '<a href="' . esc_url($facebook_profile) . '"><i class="fa fa-facebook"></i></a>';
                                                        }

                                                        $linkedin_profile = get_the_author_meta('linkedin_profile');
                                                        if ($linkedin_profile && $linkedin_profile != '') {
                                                            echo '<a href="' . esc_url($linkedin_profile) . '"><i class="fa fa-linkedin"></i></a>';
                                                        }
                                                        ?>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pane pane_contents">
                                    <?php
                                    $args = array('posts_per_page' => 2, 'author' => get_the_author_meta('ID'));
                                    $query = new WP_Query($args);
                                    if ($query->have_posts()) {
                                        ?>
                                        <ul>
                                            <?php
                                            $array_content = $query->posts;
                                            foreach ($array_content as $biz_post) {
                                                $img = get_the_post_thumbnail($biz_post->ID, 'medium');
                                                ?>
                                                <li><div class="thumb_related"><a href="<?php echo get_permalink($biz_post->ID); ?>"><?php echo $img; ?></a></div>
                                                    <div class="title_related"><a href="<?php echo get_permalink($biz_post->ID); ?>"><?php echo $biz_post->post_title; ?></a></div></li>

            <?php } ?>

                                        </ul>
                                    <?php }
                                    ?>
                                </div>

                            </div><!--End tabs container--> 
                            <!--End tabs-->



                            <script>   jQuery(document).ready(function($) {

                                    $(".tabs").tabs(".pane", {effect: 'fade'});
                                });</script>


                        <?php }
                        ?>


                        <?php
                        /*                         * ************************************************************************** */
                        if (get_option("xevents_article_pagination") == 'yes')
                        // Previous/next post navigation.
                            xevents_post_nav();

                        // If comments are open or we have at least one comment, load up the comment template.
                        if (comments_open() || get_comments_number()) {
                            comments_template();
                        }
                    endwhile;
                    ?>
                </div><!-- #content -->
            </div><!-- #primary -->
        </section>
    <?php get_sidebar('secondary'); ?>
    </div>
<?php get_sidebar('primary'); ?>
</div>

<?php
//get_sidebar( 'content' );
get_footer();
