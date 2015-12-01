<?php
/**
 * The template for displaying the footer
 * xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */
?>   
<div style="clear:both"></div>
<footer id="footer" class="footer_makeup <?php // if($_GET['fullwidth']=='no') echo '';  ?>boxed_layout">
    <div class="container">
        <?php get_sidebar('footer'); ?>
    </div>
    <div class="footer_copyright">
        <div class="row">
            <div class="col-sm-6">
        <?php// if(!get_option('xevents_general_footer_copyright')) { ?>
                Designed By &nbsp;<a href='http://wpmeal.com/xevent_theme'>WP MEAL</a>&nbsp;|&nbsp;
        <?php if(get_option('xevents_general_footer_copyright')) {
            echo esc_attr(get_option('xevents_general_footer_copyright'));
        } ?>      
            </div>
            <div class="col-sm-6">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'xevents_nav_footer',
                    'container' => 'div',
                    'container_class' => 'collapse navbar-collapse navbar-ex2-collapse',
                    'menu_class' => 'nav navbar-nav',
                    'echo' => true,
                    'before' => '',
                    'after' => '',
                    'link_before' => '',
                    'link_after' => '',
                    'depth' => 0,
                ));
                ?>
            </div>
        </div>
    </div>
    <a href="#" class="scrollToTop"></a>

</footer>


<?php
//   wp_enqueue_script('xevents-jquery'); 
wp_enqueue_script('xevents-jquery.sliderTabs');
wp_enqueue_script('xevents-bootstrap.min');
wp_enqueue_script('xevents-jquery.prettyPhoto');
// wp_enqueue_script('xevents-jquery.fractionslider'); 
wp_enqueue_script('xevents-main');
wp_enqueue_script('xevents-wow.min');
wp_enqueue_script('xevents-jquery.slicknav');
wp_enqueue_script('xevents-jquery.marquee');
wp_enqueue_script('xevents-jquery.flexslider');
wp_enqueue_script('xevents-tabs');
wp_enqueue_script('xevents-jquery.sticky');
//wp_enqueue_script('xevents-jquery.infinitecarousel3');
wp_enqueue_script('xevents-jquery.smallipop');
wp_enqueue_script('xevents-jquery.wookmark');
wp_enqueue_script('xevents-jquery.imagesloaded');
wp_enqueue_script('xevents-fotorama');
wp_enqueue_script('xevents-raphael');
//    wp_enqueue_script('xevents-matchMedia-addListener'); 
//  wp_enqueue_script('xevents-matchMedia'); 
wp_enqueue_script('xevents-calls');
?>
<?php if (is_home()) { ?>    
    <script>

        jQuery(document).ready(function($) {
            if ($('.navbar-nav.pri').find('li').hasClass('active') == true)
                var dd = null;
            else
                $('.pri').find('li').first().addClass('active');

        });

    </script>
<?php } ?>

<?php wp_footer(); ?>   

</body>
</html>