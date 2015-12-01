<?php
/**
 * The template for displaying Archive pages
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
        ?> 

        <section id="content_holder" class="<?php if (isset($class_ch)) echo $class_ch; ?>" style="float:<?php if (isset($ch_style)) echo $ch_style; ?>;"  >
            <div id="primary" class="content_area">
                <div id="content" class="site-content cato_list col-xs-12" role="main">

                    <?php if (have_posts()) : ?>

                        <h2 class="pmodule1_title">
                            <span class="title_makeup">
                                <?php
                                if (is_day()) :
                                    printf(__('%s', 'xevents'), get_the_date());

                                elseif (is_month()) :
                                    printf(__('%s', 'xevents'), get_the_date(_x('F Y', 'monthly archives date format', 'xevents')));

                                elseif (is_year()) :
                                    printf(__('%s', 'xevents'), get_the_date(_x('Y', 'yearly archives date format', 'xevents')));

                                elseif (is_tag()) :
                                    _e('', 'xevents');
                                    single_tag_title();

                                elseif (is_category()) :
                                    _e('', 'xevents');
                                    single_cat_title();

                                elseif (is_author()) :
                                    _e('', 'xevents');
                                    the_author();

                                else :
                                    _e('', 'xevents');

                                endif;
                                ?>
                            </span>
                        </h2><!-- .page-header -->
                        <ul class="cat_holder_p">
                            <?php
                            // Start the Loop.
                            while (have_posts()) : the_post();
                                $format = get_post_format(get_the_ID());
                                if ($format === false)
                                    $format = 'link';
                                else if ($format == 'image' || $format == 'gallery')
                                    $format = 'img';

                                /* load Posts Info */
                                ?>
                                <li class="cat_post_w col-xs-6"><a href="<?php echo esc_url(get_permalink()); ?>" class="title-link bubble_icon_<?php echo $format; ?> conf-icon">
                                        <?php the_post_thumbnail('medium', array('class' => '', 'alt' => '')); ?></a>
                                    <?php
                                    $title = get_the_title();
                                    if (mb_strlen($title) > 50) {
                                        $stringCut = substr($title, 0, 50);
                                        $string = substr($stringCut, 0, strrpos($stringCut, ' '));
                                        echo '<h1 class="entry-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">' . $string . '</a></h1>';
                                    }
                                    else
                                        echo '<h1 class="entry-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">' . $title . '</a></h1>';
                                    ?>
                                    <div class="entry_meta">
                                        <?php
                                        if (get_option('xevents_article_postmeta') == 'yes') {
                                            if (get_option('xevents_article_datemeta') == 'yes') {
                                                ?>
                                                <span class="entry_date"><span class="fa fa-clock-o"></span><a class="date_post" href="<?php echo esc_url(get_permalink()); ?>" rel="bookmark"><time class="entry-date" datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date()); ?></time></a></span> 
                                            <!--    <span class="byline"> -->
                                            <?php } if (get_option('xevents_article_authormeta') == 'yes') {
                                                ?>  
                                                <span class="author vcard"><span class="fa fa-user"></span><a class="author_post url fn n" href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>" rel="author"><?php echo get_the_author(); ?></a></span>

                                            <?php }   //    if(get_option('xevents_article_catmeta')=='yes') {
                                            ?>  
                                            <!--       </span> -->
                                            <?php if (get_option('xevents_article_visits') == 'yes') {
                                                ?>  
                                                <span class="entry_date"><span><span class="fa fa-eye"></span><a href="#" class="comment"><?php echo get_post_meta(get_the_ID(), "xevents_viewers_count", true); ?></a></span></span>
                                                <!--       </span> -->
                                                <?php
                                            }

                                            if (get_option('xevents_article_commentmeta') == 'yes') {
                                                ?>
                                                <span class="comments-link">
                                                    <span class="fa fa-comments-o"></span><a class="comment url fn n" href="<?php comments_link(); ?>"> <?php echo get_comments_number(); ?></a>

                                                </span>
                                                <?php
                                            }

                                            if (get_option('xevents_article_catmeta') == 'yes') {
                                                $categories = get_the_category(get_the_ID());
                                                ?><div class="cat_list_archive">
                                                        <?php foreach ($categories as $category) { ?>
                                                        <span> <a class="cat_link url fn n" href="<?php echo esc_url(get_category_link($category->term_id)); ?> " rel="category"><?php echo $category->cat_name; ?></a></span>  
                                                        <?php }
                                                        ?> </div>
                                                    <?php
                                                }
                                            }
                                            edit_post_link(__('Edit', 'xevents'), '<span class="edit-link">', '</span>');
                                            ?>
                                    </div><!-- .entry-meta -->
                                </li>               

                                <?php
                            /* load Posts Info */


                            //	get_template_part( 'content', get_post_format() );

                            endwhile;
                            ?>
                        </ul>
                        <?php
                        // Previous/next page navigation.
                        xevents_paging_nav();

                    else :
                        // If no content, include the "No posts found" template.
                        get_template_part('content', 'none');

                    endif;
                    ?>
                </div><!-- #content -->
            </div>
        </section><!-- #primary -->
    <?php get_sidebar('secondary'); ?>
    </div>
<?php get_sidebar('primary'); ?>
</div>
<?php
get_footer();
