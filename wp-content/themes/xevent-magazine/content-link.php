<?php
/**
 * The template for displaying posts in the link post format
 * xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header class="entry-header">
        <?php
        if (is_single()) :
            the_title('<h1 class="entry-title">', '</h1>');
            //xevents_viewers(get_the_ID());
        else :
            the_title('<h1 class="entry-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h1>');
        endif;
        ?>

        <div class="entry_meta">
            <?php
            if (get_option('xevents_article_postmeta') == 'yes') {
                if (get_option('xevents_article_catmeta') == 'yes') {
                    $categories = get_the_category(get_the_ID());
                    foreach ($categories as $category) {
                        ?>
                        <span> <a class="cat_link url fn n" href="<?php echo esc_url(get_category_link($category->term_id)); ?> " rel="category"><?php echo $category->cat_name; ?></a></span>  
                        <?php
                    }
                }
                ?>

                <?php
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
                    <span class="entry_date"><span class="fa fa-eye"></span><a href="#" class="comment"><?php echo get_post_meta(get_the_ID(), "xevents_viewers_count", true); ?></a></span>
                    <!--       </span> -->
                    <?php
                }

                //    }       
                //	if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) :
                //if ( get_comments_number()) :

                if (get_option('xevents_article_commentmeta') == 'yes') {
                    ?>
                    <span class="comments-link">
                        <span class="fa fa-comments-o"></span><a class="comment url fn n" href="<?php comments_link(); ?>"> <?php echo get_comments_number(); ?></a>

                    </span>
                    <?php
                }
            }
            edit_post_link(__('Edit', 'xevents'), '<span class="edit-link">', '</span>');
            ?>
        </div><!-- .entry-meta -->
    </header><!-- .entry-header -->
    <div class="thumb_post_img">
        <?php the_post_thumbnail(array('635px', '370px'), array('class' => '', 'alt' => '')) ?></div>
    <div class="entry-content">
        <?php
        the_content(__('Continue reading <span class="meta-nav">&rarr;</span>', 'xevents'));
        ?>
    </div><!-- .entry-content -->
    <?php if (get_option('xevents_article_postmeta') == 'yes' && get_option('xevents_article_tagmeta') == 'yes'): ?>
        <ul class="list_tags clearfix" ><li class="tag_point">tags</li>
            <?php the_tags('<li class="tag-links">', '', '</li>'); ?>
        </ul>
    <?php endif; ?>
    <?php if (get_option('xevents_article_shareicons')) { ?>  
     <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo esc_url(get_permalink());  ?>" ><i class="fa fa-facebook-square" style="font-size:45px"></i></a>
     <a target="_blank" href="https://twitter.com/share?url=<?php echo esc_url(get_permalink());  ?>"><i class="fa fa-twitter-square" style="font-size:45px"></i></a>
     <a href="https://plus.google.com/share?url=<?php echo esc_url(get_permalink());  ?>" onclick='javascript:window.open(this.href,"", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600,target=_blank");return false;'><i class="fa fa-google-plus-square" style="font-size:45px"></i></a>
        <?php } ?>   

</article><!-- #post-## -->
