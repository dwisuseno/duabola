<?php
/**
 * The template for displaying related posts
 *
 * Used for both single.
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */

if ( get_theme_mod( 'single_related_posts', 'show' ) == 'hide' ) {
	return;
}

$get_by = get_theme_mod( 'related_post_get_by', 'category' );
$limit = (int) get_theme_mod( 'related_post_limit', 5 );
if ( $limit > 0 ) {
	global $post;
	$taxs = array();
	if ( 'category' == $get_by ) {
		$cats = get_the_category( ($post->ID ) );
		if ( $cats ) {
			$ids = array();
			foreach ( $cats as $cat ) {
				$ids[] = $cat->term_id;
			}
			$taxs [] = array(
				'taxonomy' => 'category',
				'field' => 'id',
				'terms' => $ids
			);
		}
	} else {
		$tags = get_the_tags( $post->ID );
		if ( $tags ) {
			$ids = array();
			foreach ( $tags as $tag ) {
				$ids[] = $tag->term_id;
			}
			$taxs [] = array(
				'taxonomy' => 'post_tag',
				'field' => 'id',
				'terms' => $ids
			);
		}
	}

	if ( $taxs ) {
		$related_args = array(
			'tax_query'      => $taxs,
			'post__not_in'   => array( $post->ID ),
			'posts_per_page' => $limit
		);
		$related_posts = new WP_Query( $related_args );
		$count_post = count($related_posts->posts);
		if ( $related_posts->have_posts() ) :
			?>
			<div id="related-post">

				<h3 class="clearfix">
					<i class="fa fa-file-text-o pull-left"></i>
					<span class="pull-left"><?php esc_html_e( 'Related Post','elazi-lite' ); ?></span>
				</h3>

				<div class="row">
					<?php $count = 0; $next = true; while ( $related_posts->have_posts() ) : $related_posts->the_post(); ?>
						<?php if($count == 0) :  ?>
							<div class="col-md-4 col-sm-4 bigger-item">
								<article class="entry-item">
									<div class="entry-thumb">
										<a href="<?php the_permalink(); ?>">
											<?php the_post_thumbnail( 'kopa-related-posts-big' ); ?>
										</a>
									</div>
									<div class="entry-content">
										<h6 class="entry-title entry-title-s1"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h6>
									</div>
								</article>
							</div>
							<!-- col-md-4 -->
						<?php else: ?>
							<?php 
								if($next) {
			                        echo '<div class="col-md-8 col-sm-8 smaller-item"><ul class="clearfix">';
			                        $next = false;
			                    }
							?>
									<li>
										<article class="entry-item">
											<div class="entry-thumb">
												<a href="<?php the_permalink(); ?>">
													<?php the_post_thumbnail( 'kopa-related-posts-small' ); ?>
												</a>
											</div>
											<div class="entry-content">
												<h6 class="entry-title entry-title-s1"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h6>
											</div>
										</article>
									</li>
							<?php
				                if($count == $count_post-1) {
			                    	echo '</ul></div>';
			                    }
			                ?>
							<!-- col-md-8 -->
						<?php endif;  $count++; ?>
					<?php endwhile; ?>
				</div>
				<!-- row -->
			</div>
			<!-- related-post -->
			<?php
		endif;
		wp_reset_postdata();
	}
}
?>