<?php
/**

 * The Header for our theme

 * Xevent WordPress Theme 

 * Theme URI: http:/www.wpmeal.com/xevents

 * Author URI: http:/www.wpmeal.com/
 
 */
?><!DOCTYPE html>

<html <?php language_attributes(); ?>>

    <head>

        <meta charset="<?php bloginfo('charset'); ?>">

        <meta name="viewport" content="width=device-width">

        <title><?php wp_title('|', true, 'right'); ?></title>

        <link rel="profile" href="http://gmpg.org/xfn/11">

        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

        <!--[if lt IE 9]>

        <script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>

        <![endif -->



        <?php
        $gfontf = get_theme_mod('xevents_general_fontfamily');

        $hfontf = get_theme_mod('xevents_header_fontfamily');

        $ffontf = get_theme_mod('xevents_footer_fontfamily');

        if ($gfontf) {

            $gfontf = str_replace(' ', '+', $gfontf);
            ?>

            <link href='http://fonts.googleapis.com/css?family=<?php echo $gfontf; ?>' rel='stylesheet' type='text/css'>

            <?php
        }

        if ($hfontf) {



            $hfontf = str_replace(' ', '+', $hfontf);

            if (strcmp($gfontf, $hfontf) != 0) {
                ?>

                <link href='http://fonts.googleapis.com/css?family=<?php echo $hfontf; ?>' rel='stylesheet' type='text/css'>

                <?php
            }
        }

        if ($ffontf) {

            $ffontf = str_replace(' ', '+', $ffontf);

            if (strcmp($ffontf, $gfontf) != 0 && strcmp($ffontf, $hfontf) != 0) {
                ?>

                <link href='http://fonts.googleapis.com/css?family=<?php echo $ffontf; ?>' rel='stylesheet' type='text/css'>

                <?php
            }
        }
        ?>

        <?php

        function xevents_call_ltr_style_files() {

            wp_enqueue_style('xevents-boot');

            wp_enqueue_style('xevents-main');

            wp_enqueue_style('xevents-yamm');

            wp_enqueue_style('xevents-jquery-marquee');

            wp_enqueue_style('xevents-flexslider');

            wp_enqueue_style('xevents-tabs');

            wp_enqueue_style('xevents-wookmark');

            wp_enqueue_style('xevents-sliderTabs');

            wp_enqueue_style('xevents-fotorama');
        }

        function xevents_call_general_style_files() {

            wp_enqueue_style('xevents-font');

            wp_enqueue_style('xevents-animate-min');

            wp_enqueue_style('xevents-prettyPhoto');

            wp_enqueue_style('xevents-responsive');

            wp_enqueue_style('xevents-slicknav');

            wp_enqueue_style('xevents-jquery-smallipop');

            wp_enqueue_style('xevents-flat-options');

           // wp_enqueue_style('woo_allday');

            wp_enqueue_script('jquery');

            wp_enqueue_script('xevents-easing');

          //  wp_enqueue_style('hs_iv');

            wp_enqueue_style('xevents-rate_style', get_template_directory_uri() . '/biz/rating/rates.css');
        }

        // if (get_option('biz_general_rtl') == 'yes') {
        //      add_action('wp_enqueue_scripts', 'allday_call_rtl_style_files');
        //   } else {

        add_action('wp_enqueue_scripts', 'xevents_call_ltr_style_files');
        //     }

        add_action('wp_enqueue_scripts', 'xevents_call_general_style_files');
        ?>



        <?php require get_template_directory() . '/include/customize-apply.php'; ?>


        <?php if (is_singular()) wp_enqueue_script('comment-reply'); ?>



        <?php wp_head(); ?>



    </head>

    <body <?php body_class(); ?>>




        <header id="header" class="<?php if (!get_option('xevents_general_fullwidth_template')) echo 'boxed_layout'; ?>" style="border-bottom:3px solid <?php echo get_theme_mod('xevents_general_headline_bordercolor'); ?>">



            <div class="top-nav">

                <div class="container topHead_wrapper">

                    <div class="row">

                        <div class="col-sm-6 col-md-7">

                            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex2-collapse">

                                <span class="sr-only">Toggle navigation</span>

                                <span class="icon-bar"></span>

                                <span class="icon-bar"></span>

                                <span class="icon-bar"></span>

                            </button>

                            <?php
                            wp_nav_menu(array(
                                'theme_location' => 'xevents_secondary',
                                //  'menu_class' => 'nav-menu',
                                'container' => 'div',
                                'container_class' => 'collapse navbar-collapse navbar-ex2-collapse',
                                //'container_id'    => 'sec-cont',
                                'menu_class' => 'nav navbar-nav',
                                //'menu_id'         => 'menu',
                                'echo' => true,
                                'fallback_cb' => 'xevents_wp_bootstrap_navwalker::fallback',
                                'before' => '',
                                'after' => '',
                                'link_before' => '',
                                'link_after' => '',
                                'depth' => 0,
                                'walker' => new xevents_wp_bootstrap_navwalker()
                            ));
                            ?>



                        </div>

                        <div class="col-sm-6 col-md-5">

                            <div class="share-btn">

                                <ul class="share-style">

                                    <?php
                                    $facebook = get_option('xevents_social_links_facebook');

                                    $twitter = get_option('xevents_social_links_twitter');

                                    $google = get_option('xevents_social_links_google');

                                    $linkedin = get_option('xevents_social_links_linkedin');

                                    $stumbleupon = get_option('xevents_social_links_stumbleupon');

                                    $pinterest = get_option('xevents_social_links_pinterest');



                                    if ($facebook) {
                                        ?>

                                        <li><a href="<?php echo $facebook; ?>"><i class="fa fa-facebook"></i></a></li> <?php } ?>

                                    <?php if ($twitter) { ?>

                                        <li><a href="<?php echo $twitter; ?>"><i class="fa fa-twitter"></i></a></li><?php } ?>

                                    <?php if ($google) { ?>                             

                                        <li><a href="<?php echo $google; ?>"><i class="fa fa-google-plus"></i></a></li><?php } ?> 

                                    <?php if ($linkedin) { ?>    

                                        <li><a href="<?php echo $linkedin; ?>"><i class="fa fa-linkedin"></i></a></li><?php } ?> 

                                    <?php if ($stumbleupon) { ?>   

                                        <li><a href="<?php echo $stumbleupon; ?>"><i class="fa fa-stumbleupon"></i></a></li><?php } ?> 

                                    <?php if ($pinterest) { ?>   

                                        <li><a href="<?php echo $pinterest; ?>"><i class="fa fa-pinterest"></i></a></li><?php } ?> 

                                </ul>

                                <div id="search_top"><i class="fa fa-search"></i></div>

                                <div id="search-form" class="search">

                                    <form action="<?php echo home_url('/'); ?>" method="get">

                             <!--       <input type="text" class="searching-box" autocomplete="on" placeholder="Search"> -->

                                        <input type="text" name="s" class="searching-box"  autocomplete="on" placeholder="Search" id="search" value="<?php the_search_query(); ?>" />



                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                </div><!--/.container-->

            </div><!--/.top-bar-->



            <nav class="navbar navbar-inverse yamm">

                <div class="container head_wrapper">

                    <div class="navbar-header">

                        <a id="logo" class="navbar-brand" href="<?php echo home_url(); ?>" style="margin:<?php echo get_theme_mod('xevents_header_logomargin'); ?>px; padding:<?php echo get_theme_mod('xevents_header_logopadding'); ?>px;"><img src="<?php echo  $logo =(get_theme_mod('xevents_header_logoimage')) ? get_theme_mod('xevents_header_logoimage') : get_template_directory_uri().'/images/xevent21.png' ?>" alt="logo"></a>

                    </div>

                    <?php
                    if (get_option("biz_ads_enable") == 'yes' && get_option('xevents_ads_header') == 'yes') {

                        echo xevents_ads_div(false);
                    }
                    ?>

                </div>

            </nav>

            <nav id="nav" class="navbar navbar-inverse yamm">

                <div class="container nav_wrapper">

                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">

                        <span class="sr-only">Toggle navigation</span>

                        <span class="icon-bar"></span>

                        <span class="icon-bar"></span>

                        <span class="icon-bar"></span>

                    </button>

                    <?php
                    if (get_option('xevents_general_rtl') == 'yes')
                        $class_rtl = 'navbar-right';
                    else
                        $class_rtl = 'navbar-left';
                    ?>



                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'xevents_primary',
                        //  'menu_class' => 'nav-menu',
                        'container' => 'div',
                        'container_class' => 'collapse navbar-collapse navbar-ex1-collapse ' . $class_rtl,
                        'container_id' => 'cont',
                        'menu_class' => 'nav navbar-nav pri',
//	'menu_id'         => 'sickm',
                        'echo' => true,
                        'fallback_cb' => 'xevents_wp_bootstrap_navwalker::fallback',
                        'before' => '',
                        'after' => '',
                        'link_before' => '',
                        'link_after' => '',
                        'depth' => 0,
                        'walker' => new xevents_wp_bootstrap_navwalker()
                    ));
                    ?>



                </div>





                <!--/.container-->



            </nav><!--/nav-->

            <?php if (get_option('xevents_general_breaknews') == 'yes') { ?>

                <div class="newsline_holder">

                    <div class="container newsline">

                        <div class="newscontrol">

                            <a href="#"><div class="breaking">BREAKING <?php if (get_option('xevents_general_rtl') == 'yes') { ?><i class="fa fa-chevron-left"></i> <?php } else { ?><i class="fa fa-chevron-right"></i> <?php } ?>  </div></a>

                        </div>

                        <ul id="marquee1" class="marquee">

                            <?php
                            $args = array('posts_per_page' => 20);

                            $query = new WP_Query($args);

                            if ($query->have_posts()) {

                                $array_content = $query->posts;

                                foreach ($array_content as $biz_post) {
                                    ?>

                                    <li><a href="<?php echo get_permalink($biz_post->ID); ?>"><?php echo $biz_post->post_title; ?></a></li>

                                    <?php
                                }
                            }
                            ?>



                        </ul>



                    </div>

                </div>

                <?php
            }



            wp_reset_query();
            ?>
        </header><!--/header-->



