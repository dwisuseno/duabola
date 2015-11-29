<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content.
 *
 * @package Elazi Lite
 * @since Elazi Lite 1.0.0
 */
?>
	<div id="bottom-sidebar">
        <div class="top-bottom-sidebar">
            <div class="wrapper">
                <?php if( $logo_bottom = get_theme_mod( 'logo_bottom' ) ) : ?>
                    <div id="bottom-logo-image">
                        <a href="<?php echo esc_url(home_url()); ?>"><img src="<?php echo esc_url( $logo_bottom ); ?>" alt=""></a>
                    </div>
                <?php endif; ?>
                <?php if(has_nav_menu( 'bottom-menu' )) : ?>
                    <nav id="bottom-nav">

                        <?php
                            $args = array(
                                'theme_location' => 'bottom-menu',
                                'container'      => false,
                                'menu_class'     => 'clearfix',
                                'menu_id'        => 'bottom-menu',
                                'depth'          => -1
                            );
                            wp_nav_menu( $args );
                        ?>

                    </nav>
                    <!-- bottom-nav -->
                <?php endif; ?>
            </div>
            <!-- wrapper -->
        </div>
        <!-- top-bottom-sidebar -->

        <div class="wrapper">

            <div class="row">

                <div class="col-md-3 col-sm-3">

                    <?php if(is_active_sidebar( 'footer-left-sidebar' )){
                            dynamic_sidebar( 'footer-left-sidebar' );
                        }
                    ?>

                </div>
                <!-- col-md-3 -->

                <div class="col-md-9 col-sm-9">
                    <div class="row">
                        <div class="col-md-6 col-sm-6">

                            <?php if(is_active_sidebar( 'footer-center-sidebar' )) {
                                    dynamic_sidebar( 'footer-center-sidebar' );
                                }
                            ?>

                        </div>
                        <!-- col-md-6 -->

                        <div class="col-md-6 col-sm-6">

                            <?php if(is_active_sidebar( 'footer-right-sidebar' )) {
                                    dynamic_sidebar( 'footer-right-sidebar' );
                                }
                            ?>

                        </div>
                        <!-- col-md-6 -->
                    </div>
                    <!-- row -->
                </div>
                <!-- col-md-9 -->

            </div>
            <!-- row -->

        </div>
        <!-- wrapper -->

    </div>
    <!-- bottom-sidebar -->

    <footer id="kopa-page-footer">

        <div class="wrapper clearfix text-center">
            <?php
                $facebook    = get_theme_mod( 'facebook_url' ); 
                $twitter     = get_theme_mod( 'twitter_url' );
                $google_plus = get_theme_mod( 'google_plus_url' );
                $tumblr      = get_theme_mod( 'tumblr_url' );
            ?>
            <?php if( $facebook || $twitter || $google_plus || $tumblr ) : ?>
                <ul class="social-links clearfix">
                    <?php if( $facebook ) : ?>
                        <li><a href="<?php echo esc_url( $facebook ); ?>" class="fa fa-facebook"></a></li>
                    <?php endif ; ?>
                    <?php if( $twitter ) : ?>
                        <li><a href="<?php echo esc_url( $twitter ); ?>" class="fa fa-twitter"></a></li>
                    <?php endif ; ?>
                    <?php if( $tumblr ) : ?>
                        <li><a href="<?php echo esc_url( $tumblr ); ?>" class="fa fa-tumblr"></a></li>
                    <?php endif ; ?>
                    <?php if( $google_plus ) : ?>
                        <li><a href="<?php echo esc_url( $google_plus ); ?>" class="fa fa-google-plus"></a></li>
                    <?php endif ; ?>
                </ul>
                <!-- social-links -->
            <?php endif; ?>
            <?php if( $copyright = get_theme_mod( 'copyright' ) ) : ?>
                <p id="copyright"><?php echo wp_kses_post( $copyright ); ?></p>
            <?php endif; ?>

        </div>
        <!-- wrapper -->

    </footer>
    <!-- kopa-page-footer -->

    <?php wp_footer(); ?>

</body>

</html>