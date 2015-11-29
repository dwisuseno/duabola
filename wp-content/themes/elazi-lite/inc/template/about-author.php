<?php
/**
 * The template for displaying about author.
 *
 * Used for both single.
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */

if(  get_theme_mod('single_about_author', 'show') == 'hide'){
	return;
}
?>
<div class="about-author clearfix">

	<div class="about-author-title">
		<h3 class="clearfix">
			<i class="fa fa-user pull-left"></i>
			<span class="pull-left"><?php esc_html_e('About the author', 'elazi-lite'); ?></span>
		</h3>
	</div>

	<div class="author-avatar pull-left">
		<a href="<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>"><?php echo get_avatar( get_the_author_meta( 'ID' ), 110 ); ?></a>
	</div>
	<div class="author-content">
		<h5><?php the_author_posts_link(); ?></h5>
		<p><?php the_author_meta( 'description' ); ?></p>
	</div>

</div>