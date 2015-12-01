<?php
/**
 * The template used for displaying page content
 * xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header class="entry-header">    
        <?php
        the_title('<header class="entry-header"><h1 class="entry-title">', '</h1></header><!-- .entry-header -->');
        ?>
    </header>
    <div class="thumb_post_img"><?php the_post_thumbnail(array('635px', '370px'), array('class' => '', 'alt' => '')) ?></div>
    <div class="entry-content">
        <?php
        the_content();
        edit_post_link(__('Edit', 'xevents'), '<span class="edit-link">', '</span>');
        ?>
    </div><!-- .entry-content -->
</article><!-- #post-## -->
