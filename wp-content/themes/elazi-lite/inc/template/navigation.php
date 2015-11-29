<?php
/**
 * The template for displaying other post
 *
 * Used for both single.
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */

if ( get_theme_mod( 'single_navigation', 'show' ) == 'hide' ) {
	return;
}
$prev_post      = get_previous_post();
$next_post      = get_next_post();
$previous_title = esc_html__( 'Previous Article', 'elazi-lite' );
$next_title     = esc_html__( 'Next Article', 'elazi-lite' );
?>
<footer class="entry-box-footer clearfix">
	<?php
	if ( $prev_post ) {
		?>
		<div class="prev-article-item pull-left clearfix">
			<a href="<?php echo esc_url( get_permalink( $prev_post->ID ) ); ?>" class="prev-post"><i class="fa fa-angle-double-left"></i><?php echo wp_kses_post( $previous_title ); ?></a>

			<h4 class="entry-title"><a href="<?php echo esc_url( get_permalink( $prev_post->ID ) ); ?>"><?php echo ( $prev_post->post_title !== '' ? $prev_post->post_title : esc_html__( '(no_title)', 'elazi-lite' )); ?></a></h4>

			<span class="entry-date clearfix">
				<i class="fa fa-calendar pull-left"></i>
				<span class="pull-left"><?php echo get_the_time( get_option('date_format'), $prev_post->ID ); ?></span>
			</span>
		</div>
		<?php
	}
	if ( $next_post ) {
		?>
		<div class="next-article-item pull-left clearfix">
			<a href="<?php echo esc_url( get_permalink( $next_post->ID ) ); ?>" class="next-post"><?php echo wp_kses_post( $next_title ); ?><i class="fa fa-angle-double-right"></i></a>

			<h4 class="entry-title"><a href="<?php echo esc_url( get_permalink( $next_post->ID ) ); ?>"><?php echo ($next_post->post_title !== '' ? $next_post->post_title : esc_html__( '(no_title)', 'elazi-lite' )); ?></a></h4>

			<span class="entry-date clearfix">
				<i class="fa fa-calendar pull-left"></i>
				<span class="pull-left"><?php echo get_the_time( get_option('date_format'), $next_post->ID ); ?></span>
			</span>
		</div>
	<?php } ?>
</footer>