<?php
/**
 * The default template for displaying comment
 *
 * Used for both single.
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */

if ( post_password_required() )
	return;
if ( have_comments() && comments_open() ) {
	?>
	<div id="comments">
		<h3 class="clearfix">
			<i class="fa fa-comments pull-left"></i>
			<span class="pull-left"><?php comments_number(); ?></span>
		</h3>
		<ol class="comments-list clearfix">
			<?php
			wp_list_comments( array(
				'walker' => null,
				'style' => 'ul',
				'callback' => 'elazi_lite_comment',
				'end-callback' => null,
				'type' => 'all'
			) );
			?>
		</ol>

		<?php
		$prev_comments_link = get_previous_comments_link();
		$next_comments_link = get_next_comments_link();

		if ( '' !== $prev_comments_link . $next_comments_link ) {
			?>
			<div class="pagination kopa-comment-pagination pull-right"> <?php paginate_comments_links(); ?></div>
		<?php } // endif  ?>
		<div class="clear"></div>
	</div>
	<?php
}

	comment_form( elazi_lite_comment_form_args() );

?>

<div class="r-color"></div>


<?php

function elazi_lite_comment( $comment, $args, $depth ) {
	$GLOBALS['comment'] = $comment;

	if ( 'pingback' == get_comment_type() || 'trackback' == get_comment_type() ) {
		?>

		<li id="comment-<?php comment_ID(); ?>" class="comment clearfix">
			<article class="comment-wrap clearfix">
				<div class="comment-avatar pull-left">
					<?php echo get_avatar( $comment->comment_author_email, 50 ); ?>
				</div>
				<div class="comment-body clearfix">
					<header class="clearfix">
						<div class="pull-left">
							<h6><?php esc_html_e( 'Pingback', 'elazi-lite' ); ?></h6>
							<span class="entry-date pull-left"><?php comment_date( get_option( 'date_format' ) ); ?><?php esc_html_e( ' at ', 'elazi-lite' ); ?> <?php comment_time( get_option( 'time_format' ) ); ?></span>
						</div>
						<div class="comment-button pull-right">
							<?php
							if ( current_user_can( 'moderate_comments' ) ) {
								edit_comment_link( esc_html__( 'Edit', 'elazi-lite' ) );
							}
							?>
						</div>
						<div class="clear"></div>
					</header>
					<div class="comment-content">
						<?php comment_author_link(); ?>
					</div>
				</div><!--comment-body -->
			</article>
		</li>

	<?php } elseif ( 'comment' == get_comment_type() ) { ?>
		<li id="comment-<?php comment_ID(); ?>" class="comment clearfix">
			<article class="comment-wrap clearfix">
				<div class="comment-avatar pull-left">
					<?php echo get_avatar( $comment->comment_author_email, 50 ); ?>
				</div>
				<div class="comment-body clearfix">
					<header class="clearfix">
						<div class="pull-left">
							<h6><a href="<?php comment_author_url(); ?>"><?php comment_author(); ?></a></h6>
							<span class="entry-date pull-left"><?php comment_date( get_option( 'date_format' ) ); ?><?php esc_html_e( ' at ', 'elazi-lite' ); ?> <?php comment_time( get_option( 'time_format' ) ); ?></span>
						</div>
						<div class="comment-button pull-right">
							<?php
							if ( current_user_can( 'moderate_comments' ) ) {
								edit_comment_link( esc_html__( 'Edit', 'elazi-lite' ) );
								?> /
							<?php } ?>

							<?php comment_reply_link( array_merge( $args, array( 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) ); ?>
						</div>
						<div class="clear"></div>
					</header>
					<div class="comment-content">
						<?php comment_text(); ?>
					</div>
				</div><!--comment-body -->
			</article>
			<?php
		}
	}

	function elazi_lite_comment_form_args() {
		global $user_identity;
		$commenter = wp_get_current_commenter();
		$fields = array(
			'author' => '<p class="input-block">
                                <label for="comment_name" class="required"></label>
                                <input type="text" placeholder="'.esc_html__('Name', 'elazi-lite').'" id="comment_name" name="author" class="valid">
                            </p>',
			'email' => '<p class="input-block">
                                <label for="comment_email" class="required"></label>
                                <input type="text" placeholder="'.esc_html__('Email', 'elazi-lite').'" id="comment_email" name="email" class="valid">
                            </p>',
			'url' => '<p class="input-block">
                                <label for="comment_url" class="required"></label>
                                <input type="text" placeholder="'.esc_html__('Website', 'elazi-lite').'" name="url" class="valid" id="comment_url">
                            </p>',
		);

		$comment_field = '<p class="textarea-block">
                                <label for="comment_message" class="required"></label>
                                <textarea placeholder="'.esc_html__('Your comments*', 'elazi-lite').'" name="comment" id="comment_message" cols="88" rows="6"></textarea>
                            </p>';

		$args = array(
			'fields' => apply_filters( 'comment_form_default_fields', $fields ),
			'comment_field' => $comment_field,
			'logged_in_as' => '<p class="log-in-out">' . sprintf( __( 'Logged in as <a href="%1$s" title="%2$s">%2$s</a>.', 'elazi-lite' ), admin_url( 'profile.php' ), esc_attr( $user_identity ) ) . ' <a href="' . wp_logout_url( get_permalink() ) . '" title="' . esc_attr__( 'Log out of this account', 'elazi-lite' ) . '">' . __( 'Log out <i class="fa fa-angle-double-right"></i>', 'elazi-lite' ) . '</a></p>',
			'comment_notes_before' => '<span class="c-note">Your email address will not be published. Required fields are marked *</span>',
			'comment_notes_after' => '<div class="clear"></div>',
			'id_form' => 'comments-form',
			'id_submit' => 'submit-comment',
			'title_reply' => __( '<i class="fa fa-comments pull-left"></i><span class="pull-left">Leave a comment</span>', 'elazi-lite' ),
			'label_submit' => esc_html__( 'Post Comment', 'elazi-lite' ),
		);
		return $args;
	}