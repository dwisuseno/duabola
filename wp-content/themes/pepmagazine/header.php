<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package pepmagazine
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">
	<?php do_action( 'before' ); ?>
	<header id="masthead" class="site-header" role="banner">
		<div class="site-branding">
		<?php if ( get_theme_mod( 'pepmagazine_logo' ) ) : ?>
	<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home">
		<img src="<?php echo esc_attr(get_theme_mod( 'pepmagazine_logo' )); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>">
	</a>
		<?php else : ?>
			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<h2 class="site-description"><?php bloginfo( 'description' ); ?></h2>

			<?php endif; // End header image check. ?>
		</div>
		<div class="top-banner">
			<?php if ( is_active_sidebar( 'top_banner' ) ) : ?>
				<?php dynamic_sidebar( 'top_banner' ); ?>
			<?php endif; ?>
		</div>
		<nav id="site-navigation" class="main-navigation" role="navigation">
			<h1 class="menu-toggle"><?php _e( 'Menu', 'pepmagazine' ); ?></h1>
			<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'pepmagazine' ); ?></a>

			<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>

			<div id="search-navi">
			<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>"> 
	
			<input type="search" class="search-field"  value="" name="s">
			</form>
			</div>
		</nav><!-- #site main navigation -->
		<div id="under-menu-bar"> 
			<div id="second-menu">
				<?php wp_nav_menu(array('theme_location' => 'secondary', 'depth' => '1')); ?>
			</div>
			<div class="social-networks">
				<?php if(of_get_option('facebook_link')): ?>
				<a href="<?php echo esc_url('http://facebook.com/'. of_get_option('facebook_link')); ?>" title="Facebook"><img src="<?php echo get_template_directory_uri();?>/images/Facebook-icon.png" alt="Facebook"></a>
				<?php endif; ?>
				<?php if (of_get_option('twitter_link')):?>
				<a href="<?php echo esc_url('http://twitter.com/'. of_get_option('twitter_link')); ?>" title="Twitter"> <img src="<?php echo get_template_directory_uri();?>/images/Twitter-icon.png" alt="Twitter"></a>
				<?php endif; ?>
				<?php if(of_get_option('google_link')) :?>
				<a href="<?php echo esc_url('http://plus.google.com/'. of_get_option('google_link'));?>" title="GooglePlus"><img src="<?php echo get_template_directory_uri();?>/images/GooglePlus-icon.png" alt="GooglePlus"></a>
				<?php endif; ?>
				<?php if(of_get_option('youtube_link')):?>
				<a href="<?php echo esc_url('http://youtube.com/' . of_get_option('youtube_link')); ?>" title="YouTube"><img src="<?php echo get_template_directory_uri();?>/images/YouTube-icon.png" alt="Youtube"></a>
				<?php endif; ?>
				<?php if(of_get_option('rss_link')) :?>
				<a href="<?php echo esc_attr(of_get_option('rss_link')); ?>" title="RSS"><img src="<?php echo get_template_directory_uri();?>/images/Rss-icon.png" alt="RSS"></a>
				<?php endif; ?>
			</div>
		</div>
		<!-- Second Navigation -->
	</header><!-- #masthead -->

	<div id="content" class="site-content">
