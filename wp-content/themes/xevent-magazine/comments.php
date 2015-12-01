<?php
/**
 * The template for displaying Comments
 * xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */
if (post_password_required()) {
    return;
}
?>

<div id="comments" class="comments-area">

    <?php if (have_comments()) : ?>

        <ol class="comment-list">
            <?php
            wp_list_comments(array(
                'style' => 'ol',
                'short_ping' => true,
                'avatar_size' => 45,
            ));
            ?>
        </ol><!-- .comment-list -->

        <?php if (get_comment_pages_count() > 1 && get_option('page_comments')) : ?>
            <nav id="comment-nav-below" class="navigation comment-navigation pager" role="navigation">
                <div class="nav-previous previous "><?php previous_comments_link(__('<span class="fa fa-angle-double-left"></span> Older Comments', 'xevents')); ?></div>
                <div class="nav-next next"><?php next_comments_link(__('Newer Comments <span class="fa fa-angle-double-right"></span>', 'xevents')); ?></div>
            </nav><!-- #comment-nav-below -->
        <?php endif; // Check for comment navigation.  ?>

        <?php if (!comments_open()) : ?>
            <p class="no-comments"><?php _e('Comments are closed.', 'xevents'); ?></p>
        <?php endif; ?>

    <?php endif; // have_comments()  ?>


    <?php
    // custom comment form 
    $comment_args = array('title_reply' => '<span class="pmodule1_title"><span class="title_makeup">' . __('Got Something To Say:', 'xevents') . '</span></span>',
        'fields' => apply_filters('comment_form_default_fields', array(
            'author' => '<div class="form-group">' . '<label class="control-label" for="author">' . __('Your Good Name', 'xevents') . '</label> ' . ( $req ? '<span>*</span>' : '' ) .
            '<input class="form-control" id="author" name="author" type="text" value="' . esc_attr($commenter['comment_author']) . '" size="30"/></div>',
            'email' => '<div class="form-group">' .
            '<label class="control-label" for="email">' . __('Your Email Please', 'xevents') . '</label> ' .
            ( $req ? '<span>*</span>' : '' ) .
            '<input class="form-control" id="email" name="email" type="text" value="' . esc_attr($commenter['comment_author_email']) . '" size="30"/>' . '</div>',
            'url' => '')),
        'comment_field' => '<p>' .
        '<label class="control-label" for="comment">' . __('Comment:', 'xevents') . '</label>' .
        '<textarea class="form-control" id="comment" name="comment" cols="45" rows="3" aria-required="true"></textarea>' .
        '</p>',
        'comment_notes_after' => '',
    );
    comment_form($comment_args);
    // custom comment form
    ?>



    <?php // comment_form(); ?>

</div><!-- #comments -->
