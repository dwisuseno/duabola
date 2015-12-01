<?php
/**
 * @package pepmagazine
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<h1 class="entry-title"><?php the_title(); ?></h1>

		<div class="entry-meta">
			<div class="entry-data"><?php pepmagazine_posted_on(); ?></div>
			<div class="comments-link">
				<?php comments_popup_link( '<span class="leave-reply">' . __( '0 Comments', 'pepmagazine' ) . '</span>', __( '1 Comment', 'pepmagazine' ), __( '% Comments', 'pepmagazine' ) );?>
			</div>
		</div><!-- .entry-meta -->
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php if ( has_post_thumbnail() ) {
		the_post_thumbnail('medium alignleft'); 
				} 
		the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'pepmagazine' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-meta">
		<?php
			/* translators: used between list items, there is a space after the comma */
			$category_list = get_the_category_list( __( ', ', 'pepmagazine' ) );

			/* translators: used between list items, there is a space after the comma */
			$tag_list = get_the_tag_list( '', __( ', ', 'pepmagazine' ) );

			if ( ! pepmagazine_categorized_blog() ) {
				// This blog only has 1 category so we just need to worry about tags in the meta text
				if ( '' != $tag_list ) {
					$meta_text = __( 'Tagged %2$s. Bookmark the <a href="%3$s" rel="bookmark">permalink</a>.', 'pepmagazine' );
				} else {
					$meta_text = __( 'Bookmark the <a href="%3$s" rel="bookmark">permalink</a>.', 'pepmagazine' );
				}

			} else {
				// But this blog has loads of categories so we should probably display them here
				if ( '' != $tag_list ) {
					$meta_text = __( 'Posted in %1$s and tagged %2$s. <a href="%3$s" rel="bookmark">Bookmark</a>.', 'pepmagazine' );
				} else {
					$meta_text = __( 'Posted in in %1$s. <a href="%3$s" rel="bookmark">Bookmark</a>.', 'pepmagazine' );
				}

			} // end check for categories on this blog

			printf(
				$meta_text,
				$category_list,
				$tag_list,
				get_permalink()
			);
		?>

		<?php edit_post_link( __( 'Edit', 'pepmagazine' ), '<span class="edit-link">', '</span>' ); ?>
	</footer><!-- .entry-meta -->
</article><!-- #post-## -->
