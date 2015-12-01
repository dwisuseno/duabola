<?php
/**
 * The template for displaying all pages
 * xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */
get_header();
?>

<div class="container">
    <?php
    $sidebar1 = get_option('xevents_general_sidebar');
    $sidebar2 = get_option('xevents_general_sidebar2');
    if ($sidebar1 == 'no' && $sidebar2 == 'no')
        $class_ch = 'col-md-12';
//else if($sidebar1 =='no' || $sidebar2=='no' )  $class_ch='col-xs-9';
    else if ($sidebar1 == 'no' && $sidebar2 != 'no')
        $class_ch = 'col-md-12';
    else if ($sidebar1 != 'no' && $sidebar2 == 'no')
        $class_ch = 'col-md-9';

    else if ($sidebar1 != 'no' && $sidebar2 != 'no')
        $class_ch = 'col-md-9';
    if ($sidebar1 == 'left')
        $ch_style = 'right';
    if ($sidebar1 == 'right')
        $ch_style = 'left';
    if (get_option("xevents_ads_enable") == 'yes')
        add_filter('the_content', 'xevents_ads_div', 999);
   // if (get_option("xevents_review_sys_enable") == "yes")
       // add_filter('the_content', 'xevents_review_div', 999);
    $woocommerce_my_account = has_shortcode(get_the_content(), 'woocommerce_my_account');
    $woocommerce_checkout = has_shortcode(get_the_content(), 'woocommerce_checkout');
    $woocommerce_cart = has_shortcode(get_the_content(), 'woocommerce_cart');
    $woocommerce_order_tracking = has_shortcode(get_the_content(), 'woocommerce_order_tracking');

    if ($woocommerce_my_account || $woocommerce_checkout || $woocommerce_cart || $woocommerce_order_tracking)
        $woocommerce = true;
    else
        $woocommerce = false;
    ?>        
    <div id="allday-con-sidebar" class="<?php if (isset($class_ch)) echo $class_ch; ?>" style="float:<?php if (isset($ch_style)) echo $ch_style; ?>">  

        <?php
        if ($sidebar1 == 'no' && $sidebar2 == 'no')
            $class_ch = 'col-md-12';
//else if($sidebar1 =='no' || $sidebar2=='no' )  $class_ch='col-xs-9';
        else if ($sidebar1 == 'no' && $sidebar2 != 'no')
            $class_ch = 'col-md-9';
        else if ($sidebar1 != 'no' && $sidebar2 == 'no')
            $class_ch = 'col-md-12';

        else if ($sidebar1 != 'no' && $sidebar2 != 'no')
            $class_ch = 'col-md-9';
        if ($sidebar2 == 'left')
            $ch_style = 'right';
        if ($sidebar2 == 'right')
            $ch_style = 'left';
        ?> 

        <section id="content_holder" class="<?php
        if ($woocommerce)
            echo 'col-md-12';
        else
            echo $class_ch;
        ?>" style="float:<?php echo $ch_style; ?>;"  >
            <div id="primary" class="content_area">
                <div id="content" class="site-content col-xs-12 col-md-12" role="main">

                    <?php
// Start the Loop.
                    while (have_posts()) : the_post();

                        // Include the page content template.
                        get_template_part('content', 'page');

                        // If comments are open or we have at least one comment, load up the comment template.
                        if (comments_open() || get_comments_number()) {
                            comments_template();
                        }
                    endwhile;
                    ?>

                </div><!-- #content -->
            </div><!-- #primary -->

        </section>
    <?php if (!$woocommerce) get_sidebar('secondary'); ?>
    </div>
    <?php
    if (!$woocommerce)
        get_sidebar('primary');

    else if (get_option('xevents_general_sidebar') != 'no')
        get_sidebar('shop');
    ?>
</div><!-- #main-content -->
<?php
// get_sidebar();
get_footer();
