<?php
/* Xevent Home Template
 * Xevent WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 * Author URI: http:/www.wpmeal.com/
 */

get_header();
?>

<!-- featured posts slider -->

<?php
if (strcmp(get_option('xevents_home_template'), 'HomePage with Features Posts') == 0)
    if (get_option('xevents_general_fullwidth') == 'yes') {
        ?>


        <div id="slider-wrapper3" class="container align_col">
            <?php
            $fposts = get_option('xevents_home_fposts');
            ?>  

            <?php
            if ($fposts) {
                $fposts_arr = explode(',', $fposts);
                ?>
                <div class="col-xs-8 col-md-8">
                    <div class="flexslider4">
                        <ul class="slides">
                            <?php
                            $feature = 0;
                            if (is_array($fposts_arr))
                                for ($i = 0; $i < count($fposts_arr) / 3; $i++) {
                                    $args = array('post_type' => 'post', 'p' => $fposts_arr[$i]);
                                    $query = new WP_Query($args);
                                    if ($query->have_posts()) {
                                        $array_content = $query->posts;
                                        $biz_post = $array_content[0];
                                        $size = array();

                                        //$attr= array('class'=>'img-post-ver'); 
                                        $img = get_the_post_thumbnail($biz_post->ID, 'large');
                                        $category = get_the_category($biz_post->ID);
                                        ?>   
                                        <li><a href="<?php echo get_permalink($biz_post->ID); ?>"><?php echo $img; ?></a>
                                            <div class="flextitle_overlay"><div class="flextitle_makeup">
                                                    <p><?php
                        if (mb_strlen($biz_post->post_title) > 50) {
                            // truncate string
                            $stringCut = substr($biz_post->post_title, 0, 50);
                            $string = substr($stringCut, 0, strrpos($stringCut, ' '));
                            echo $string;
                        }
                        else
                            echo $biz_post->post_title;
                                        ?>
                                                    </p>
                                                    <span class="flextitle_cat"><a title="" href="<?php echo esc_url(get_category_link($category[0]->term_id)); ?>"><?php echo $category[0]->cat_name; ?></a></span>
                                                </div></div> 
                                        </li>

                                        <?php
                                        //if($feature >2) break;
                                        $feature++;
                                    }
                                }
                            ?>

                        </ul>
                    </div>
                </div>
                <div class="col-xs-4 col-md-4">
                    <div class="row">
                        <div class="flexslider5">
                            <ul class="slides">
                                <?php
                                if (is_array($fposts_arr))
                                    for ($j = $i; $j < (count($fposts_arr) / 3) * 2; $j++) {
                                        $args = array('post_type' => 'post', 'p' => $fposts_arr[$j]);
                                        $query = new WP_Query($args);
                                        if ($query->have_posts()) {
                                            $array_content = $query->posts;
                                            $biz_post = $array_content[0];
                                            $size = array();

                                            //$attr= array('class'=>'img-post-ver'); 
                                            $img = get_the_post_thumbnail($biz_post->ID, 'medium');
                                            $category = get_the_category($biz_post->ID);
                                            ?> 
                                            <li><a href="<?php echo get_permalink($biz_post->ID); ?>"><?php echo $img; ?></a> 
                                                <div class="flextitle_overlay"><div class="flextitle_makeup">
                                                        <p><?php
                        if (mb_strlen($biz_post->post_title) > 50) {
                            // truncate string
                            $stringCut = substr($biz_post->post_title, 0, 50);
                            $string = substr($stringCut, 0, strrpos($stringCut, ' '));
                            echo $string;
                        }
                        else
                            echo $biz_post->post_title;
                                            ?></p>
                                                        <span class="flextitle_cat"><a title="" href="<?php echo esc_url(get_category_link($category[0]->term_id)); ?>"><?php echo $category[0]->cat_name; ?></a></span>
                                                    </div></div> 
                                            </li>

                                            <?php
                                        }
                                    }
                                ?> 
                            </ul>
                        </div></div>
                    <div class="row">
                        <div class="flexslider6">
                            <ul class="slides">
                                <?php
                                if (is_array($fposts_arr))
                                    for ($k = $j; $k < (count($fposts_arr) / 3) * 3; $k++) {
                                        $args = array('post_type' => 'post', 'p' => $fposts_arr[$k]);
                                        $query = new WP_Query($args);
                                        if ($query->have_posts()) {
                                            $array_content = $query->posts;
                                            $biz_post = $array_content[0];
                                            $img = get_the_post_thumbnail($biz_post->ID, 'medium');
                                            $category = get_the_category($biz_post->ID);

                                            $size = array();
                                            ?>
                                            <li><a href="<?php echo get_permalink($biz_post->ID); ?>"><?php echo $img; ?></a> 
                                                <div class="flextitle_overlay"><div class="flextitle_makeup">
                                                        <p><?php
                        if (mb_strlen($biz_post->post_title) > 50) {
                            // truncate string
                            $stringCut = substr($biz_post->post_title, 0, 50);
                            $string = substr($stringCut, 0, strrpos($stringCut, ' '));
                            echo $string;
                        }
                        else
                            echo $biz_post->post_title;
                                            ?></p>
                                                        <span class="flextitle_cat"><a title="" href="<?php echo esc_url(get_category_link($category[0]->term_id)); ?>"><?php echo $category[0]->cat_name; ?></a></span>
                                                    </div></div>
                                            </li>
                                            <?php
                                        }
                                    }
                                ?> 
                            </ul>
                        </div>
                    </div>
                </div>
                <?php
            }
            else
                echo __('Please Insert Featured Posts IDs to Display Here !!', 'xevents');
            ?>
        </div>      

    <?php } ?>    
<!-- featured posts slider -->


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
    $ch_style = '';
    if ($sidebar1 == 'left')
        $ch_style = 'right';
    if ($sidebar1 == 'right')
        $ch_style = 'left';
    ?>        
    <div id="allday-con-sidebar" class="<?php if (isset($class_ch)) echo $class_ch; ?>" style="float:<?php if (isset($ch_style)) echo $ch_style; ?>">    
        <?php
//$sidebar1=get_option('xevents_general_sidebar');
//$sidebar2=get_option('xevents_general_sidebar2');
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

        <section id="content_holder" class="<?php if (isset($class_ch)) echo $class_ch; ?>" style="float:<?php if (isset($ch_style)) echo $ch_style; ?>;"  >
            <?php

            if (strcmp(get_option('xevents_home_template'), 'HomePage with Features Posts') == 0)
                if (get_option('xevents_general_fullwidth') != 'yes') {
                    ?>
                    <div id="slider-wrapper3" class="align_col boxed-fslider">
                        <?php
                        $fposts = get_option('xevents_home_fposts');
                        ?>  

                        <?php
                        if ($fposts) {
                            $fposts_arr = explode(',', $fposts);
                            ?>
                            <div class="col-xs-8 col-md-8">
                                <div class="flexslider4">
                                    <ul class="slides">
                                        <?php
                                        $feature = 0;
                                        if (is_array($fposts_arr))
                                            for ($i = 0; $i < count($fposts_arr) / 3; $i++) {
                                                $args = array('post_type' => 'post', 'p' => $fposts_arr[$i]);
                                                $query = new WP_Query($args);
                                                if ($query->have_posts()) {
                                                    $array_content = $query->posts;
                                                    $biz_post = $array_content[0];
                                                    $size = array();

                                                    //$attr= array('class'=>'img-post-ver'); 
                                                    $img = get_the_post_thumbnail($biz_post->ID, 'large');
                                                    $category = get_the_category($biz_post->ID);
                                                    ?>   
                                                    <li><a href="<?php echo get_permalink($biz_post->ID); ?>"><?php echo $img; ?></a>
                                                        <div class="flextitle_overlay"><div class="flextitle_makeup">
                                                                <p><?php
                            if (mb_strlen($biz_post->post_title) > 50) {
                                // truncate string
                                $stringCut = substr($biz_post->post_title, 0, 50);
                                $string = substr($stringCut, 0, strrpos($stringCut, ' '));
                                echo $string;
                            }
                            else
                                echo $biz_post->post_title;
                                                    ?></p>
                                                                <span class="flextitle_cat"><a title="" href="<?php echo esc_url(get_category_link($category[0]->term_id)); ?>"><?php echo $category[0]->cat_name; ?></a></span>
                                                            </div></div> 
                                                    </li>

                                                    <?php
                                                    //if($feature >2) break;
                                                    $feature++;
                                                }
                                            }
                                        ?>

                                    </ul>
                                </div>
                            </div>
                            <div class="col-xs-4 col-md-4">
                                <div class="row">
                                    <div class="flexslider5">
                                        <ul class="slides">
                                            <?php
                                            if (is_array($fposts_arr))
                                                for ($j = $i; $j < (count($fposts_arr) / 3) * 2; $j++) {
                                                    $args = array('post_type' => 'post', 'p' => $fposts_arr[$j]);
                                                    $query = new WP_Query($args);
                                                    if ($query->have_posts()) {
                                                        $array_content = $query->posts;
                                                        $biz_post = $array_content[0];
                                                        $size = array();

                                                        //$attr= array('class'=>'img-post-ver'); 
                                                        $img = get_the_post_thumbnail($biz_post->ID, 'medium');
                                                        $category = get_the_category($biz_post->ID);
                                                        ?> 
                                                        <li><a href="<?php echo get_permalink($biz_post->ID); ?>"><?php echo $img; ?></a> 
                                                            <div class="flextitle_overlay"><div class="flextitle_makeup">
                                                                    <p><?php
                                if (mb_strlen($biz_post->post_title) > 50) {
                                    // truncate string
                                    $stringCut = substr($biz_post->post_title, 0, 50);
                                    $string = substr($stringCut, 0, strrpos($stringCut, ' '));
                                    echo $string;
                                }
                                else
                                    echo $biz_post->post_title;
                                                        ?></p>
                                                                    <span class="flextitle_cat"><a title="" href="<?php echo esc_url(get_category_link($category[0]->term_id)); ?>"><?php echo $category[0]->cat_name; ?></a></span>
                                                                </div></div> 
                                                        </li>

                                                        <?php
                                                    }
                                                }
                                            ?> 
                                        </ul>
                                    </div></div>
                                <div class="row">
                                    <div class="flexslider6">
                                        <ul class="slides">
                                            <?php
                                            if (is_array($fposts_arr))
                                                for ($k = $j; $k < (count($fposts_arr) / 3) * 3; $k++) {
                                                    $args = array('post_type' => 'post', 'p' => $fposts_arr[$k]);
                                                    $query = new WP_Query($args);
                                                    if ($query->have_posts()) {
                                                        $array_content = $query->posts;
                                                        $biz_post = $array_content[0];
                                                        $img = get_the_post_thumbnail($biz_post->ID, 'medium');
                                                        $category = get_the_category($biz_post->ID);
                                                        $size = array();
                                                        ?>
                                                        <li><a href="<?php echo get_permalink($biz_post->ID); ?>"><?php echo $img; ?></a> 
                                                            <div class="flextitle_overlay"><div class="flextitle_makeup">
                                                                    <p><?php
                                if (mb_strlen($biz_post->post_title) > 50) {
                                    // truncate string
                                    $stringCut = substr($biz_post->post_title, 0, 50);
                                    $string = substr($stringCut, 0, strrpos($stringCut, ' '));
                                    echo $string;
                                }
                                else
                                    echo $biz_post->post_title;
                                                        ?></p>
                                                                    <span class="flextitle_cat"><a title="" href="<?php echo esc_url(get_category_link($category[0]->term_id)); ?>"><?php echo $category[0]->cat_name; ?></a></span>
                                                                </div></div>
                                                        </li>
                                                        <?php
                                                    }
                                                }
                                            ?> 
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <?php
                        }
                        else
                            echo __('Please Insert Featured Posts IDs to Display Here !!', 'xevents');
                        ?>
                    </div>      

                    <?php
                }


// revolution slider callback
            $headline_border = get_theme_mod('xevents_general_headline_bordercolor');
//   var_dump($headline_border);


            /*             * ******************************displaying sticky posts*************************************** */
            $sticky = get_option('sticky_posts');
// check if there are any
            if (!empty($sticky)) {
                ?>
                <div class="center col-xs-12 col-md-12">
                    <h2 class="pmodule1_title"><span class="title_makeup" style="border-bottom:5px solid <?php
            if ($headline_border)
                echo $headline_border;
            else
                echo '#F00';
                ?>"><?php echo __('Sticky Posts', 'xevents'); ?></span></h2>
                    <div class="postmodule-012 allday-wookmark"  role="main">
                        <ul class="tiles_holder">
                            <?php
                            $args = array('post__in' => $sticky);
                            $query = new WP_Query($args);
                            if ($query->have_posts()) {

                                $array_content = $query->posts;
                                foreach ($array_content as $biz_post) {
                                    //var_dump($biz_post->cat);
                                    $size = array();
                                    $attr = array('class' => 'mid-recent-post img-post-ver');
                                    $img = get_the_post_thumbnail($biz_post->ID, 'medium', $attr);
                                    $category = get_the_category($biz_post->ID);
                                    $format = get_post_format($biz_post->ID);
                                    if ($format === false)
                                        $format = 'link';
                                    else if ($format == 'image' || $format == 'gallery')
                                        $format = 'img';
                                    ?>

                                    <li class="titles_catcher"><a href="<?php echo get_permalink($biz_post->ID); ?>" class="bubble_icon_<?php echo $format; ?> conf-icon"><?php echo $img; ?> </a>
                                        <div class="post-enterblog">
                                            <div class="postinfo_w"><a class="pc_date" href="<?php echo get_permalink($biz_post->ID); ?>"> <?php echo mysql2date('F j', mysql2date('F j', $biz_post->post_date)); ?></a><?php if (get_option('xevents_home_rate') == 'yes') { ?>
                                                    <div class="pc_rate star-ctr" data-value="<?php
                            $rate = get_post_meta($biz_post->ID, 'xevents_rating_VL', true);
                            if (!$rate)
                                $rate = 0; echo $rate;
                                        ?>" data-type="static">
                                                        <ul><li class="star-ele"><a><span class="fa fa-star"></span></a></li><li class="star-ele"><a><span class="fa fa-star"></span></a></li>    <li class="star-ele"><a><span class="fa fa-star"></span></a></li>    <li class="star-ele"><a><span class="fa fa-star"></span></a></li><li class="star-ele"><a><span class="fa fa-star"></span></a></li>
                                                        </ul></div><?php } ?></div>
                                        </div>
                                        <p class="title-r12 mid-post-title"><a rel="" title="" href="<?php echo get_permalink($biz_post->ID); ?>"><?php
                                if (mb_strlen($biz_post->post_title) > 50) {
                                    // truncate string
                                    $stringCut = substr($biz_post->post_title, 0, 50);
                                    $string = substr($stringCut, 0, strrpos($stringCut, ' '));
                                    echo $string;
                                }
                                else
                                    echo $biz_post->post_title;
                                    ?></a></p>

                                        <span class="sub_elements">
                                            <?php if (get_option('xevents_home_commentmeta') == 'yes') { ?><span class="fa fa-comments-o"></span><a class="comment" title="" href="#"><?php echo $biz_post->comment_count; ?></a><?php } ?>
                                            <?php if (get_option('xevents_home_visits') == 'yes') { ?><span class="fa fa-eye"></span><a class="comment" title="" href="<?php echo get_permalink($biz_post->ID); ?>"> <?php echo get_post_meta($biz_post->ID, "biz_viewers_count", true); ?></a><?php } ?><?php if (get_option('xevents_home_authormeta') == 'yes') { ?><span class="fa fa-user"></span><a class="comment" title="" href="<?php echo esc_url(get_author_posts_url($biz_post->post_author)); ?>">  <?php echo get_the_author_meta('display_name', $biz_post->post_author); ?> 
                                                </a><?php } ?>
                                            <?php if (get_option('xevents_home_catmeta') == 'yes') { ?><a class="cat_makeup featured" href="<?php echo esc_url(get_category_link($category[0]->term_id)); ?>" title="Featured"><?php echo $category[0]->cat_name; ?></a><?php } ?>
                                        </span>

                                    </li>
                                    <?php
                                }
                            }
                            ?>
                        </ul>
                    </div>

                </div>



                <?php
            }
            /*             * ******************************displaying sticky posts*************************************** */

            if (get_option('xevents_home_rposts') == 'yes') {
                ?>      
                <div class="center col-xs-12 col-md-12">
                    <h2 class="pmodule1_title"><span class="title_makeup" style="border-bottom:5px solid <?php
            if ($headline_border)
                echo $headline_border;
            else
                echo '#F00';
                ?>"><?php echo __('Recent Posts', 'xevents'); ?></span></h2>
                    <div class="postmodule-012 allday-wookmark"  role="main">
                        <ul  class="tiles_holder">
                            <?php
                            $args = array('posts_per_page' => 4, 'ignore_sticky_posts' => true);
                            $query = new WP_Query($args);
                            if ($query->have_posts()) {

                                $array_content = $query->posts;
                                foreach ($array_content as $biz_post) {
                                    //var_dump($biz_post->cat);
                                    $size = array();
                                    $attr = array('class' => 'mid-recent-post img-post-ver');
                                    $img = get_the_post_thumbnail($biz_post->ID, 'medium', $attr);
                                    $category = get_the_category($biz_post->ID);
                                    $format = get_post_format($biz_post->ID);
                                    if ($format === false)
                                        $format = 'link';
                                    else if ($format == 'image' || $format == 'gallery')
                                        $format = 'img';
                                    ?>

                                    <li class="titles_catcher"><a href="<?php echo get_permalink($biz_post->ID); ?>" class="bubble_icon_<?php echo $format; ?> conf-icon"><?php echo $img; ?> </a>
                                        <div class="post-enterblog">
                                            <div class="postinfo_w"><a class="pc_date" href="<?php echo get_permalink($biz_post->ID); ?>"> <?php echo mysql2date('F j', mysql2date('F j', $biz_post->post_date)); ?></a><?php if (get_option('xevents_home_rate') == 'yes') { ?>
                                                    <div class="pc_rate star-ctr" data-value="<?php
                            $rate = get_post_meta($biz_post->ID, 'xevents_rating_VL', true);
                            if (!$rate)
                                $rate = 0; echo $rate;
                                        ?>" data-type="static">
                                                        <ul><li class="star-ele"><a><span class="fa fa-star"></span></a></li><li class="star-ele"><a><span class="fa fa-star"></span></a></li>    <li class="star-ele"><a><span class="fa fa-star"></span></a></li>    <li class="star-ele"><a><span class="fa fa-star"></span></a></li><li class="star-ele"><a><span class="fa fa-star"></span></a></li>
                                                        </ul></div><?php } ?></div>
                                        </div>
                                        <p class="title-r12 mid-post-title"><a rel="" title="" href="<?php echo get_permalink($biz_post->ID); ?>"><?php
                                if (mb_strlen($biz_post->post_title) > 50) {
                                    // truncate string
                                    $stringCut = substr($biz_post->post_title, 0, 50);
                                    $string = substr($stringCut, 0, strrpos($stringCut, ' '));
                                    echo $string;
                                }
                                else
                                    echo $biz_post->post_title;
                                    ?></a></p>

                                        <span class="sub_elements">
                                            <?php if (get_option('xevents_home_commentmeta') == 'yes') { ?><span class="fa fa-comments-o"></span><a class="comment" title="" href="#"><?php echo $biz_post->comment_count; ?></a><?php } ?>
                                            <?php if (get_option('xevents_home_visits') == 'yes') { ?><span class="fa fa-eye"></span><a class="comment" title="" href="<?php echo get_permalink($biz_post->ID); ?>"> <?php echo get_post_meta($biz_post->ID, "biz_viewers_count", true); ?></a><?php } ?><?php if (get_option('xevents_home_authormeta') == 'yes') { ?><span class="fa fa-user"></span><a class="comment" title="" href="<?php echo esc_url(get_author_posts_url($biz_post->post_author)); ?>">  <?php echo get_the_author_meta('display_name', $biz_post->post_author); ?> 
                                                </a><?php } ?>
                                            <?php if (get_option('xevents_home_catmeta') == 'yes') { ?><a class="cat_makeup featured" href="<?php echo esc_url(get_category_link($category[0]->term_id)); ?>" title="Featured"><?php echo $category[0]->cat_name; ?></a><?php } ?>
                                        </span>

                                    </li>
                                    <?php
                                }
                            }
                            ?>
                        </ul>
                    </div>

                </div>
            <?php } ?>
            <!--/.row--> 
            <!--/.container-->  


            <!--/.row--> 
            <!--/.container-->

 
            <?php if (get_option('xevents_home_ptags') == 'yes' || get_option('xevents_home_ptags') === false) { ?> 
                <div class="col-xs-12 col-md-12">
                    <div class="pmodule_ver">
                        <?php
                        $tags_array = get_tags(array('number' => 2, 'orderby' => 'count', 'order' => 'DESC'));
// var_dump($tags_array);
                        foreach ($tags_array as $tag) {
                            ?>
                            <div class="col-xs-12 col-md-6 pm_ver_holder">


                                <h2 class="pmodule1_title"><span class="title_makeup" style="border-bottom:5px solid <?php
                    if ($headline_border)
                        echo $headline_border;
                    else
                        echo '#F00';
                            ?>"><?php // echo __('TAG:', 'xevents'); ?><?php echo $tag->name; ?></span></h2>
                                                                 <?php
                                    $args = array('posts_per_page' => 4, 'tag_id' => $tag->term_id);
                                    $query = new WP_Query($args);
                                    if ($query->have_posts()) {

                                        $array_content = $query->posts;
                                        $biz_post = $array_content[0];
                                        //var_dump($biz_post->cat);
                                        $size = array();
                                        $attr = array('class' => 'img-post-ver');
                                        $img = get_the_post_thumbnail($biz_post->ID, 'medium', $attr);
                                        $category = get_the_category($biz_post->ID);
                                        $format = get_post_format($biz_post->ID);
                                        if ($format === false)
                                            $format = 'link';
                                        else if ($format == 'image' || $format == 'gallery')
                                            $format = 'img';
                                        ?> 
                                    <a href="<?php echo get_permalink($biz_post->ID); ?>" class="bubble_icon_<?php echo $format; ?> conf-icon p_v_clear"><?php echo $img; ?></a>
                                    <div class="pmodule_ver_title mid-post-title"><a href="<?php echo get_permalink($biz_post->ID); ?>"  ><?php
                            if (mb_strlen($biz_post->post_title) > 50) {
                                // truncate string
                                $stringCut = substr($biz_post->post_title, 0, 50);
                                $string = substr($stringCut, 0, strrpos($stringCut, ' '));
                                echo $string;
                            }
                            else
                                echo $biz_post->post_title;
                                        ?></a></div>
                                    <div class="bpost_info"><?php if (get_option('xevents_home_rate') == 'yes') { ?><div class="pc_rate star-ctr" data-value="<?php
                                $rate = get_post_meta($biz_post->ID, 'xevents_rating_VL', true);
                                if (!$rate)
                                    $rate = 0; echo $rate;
                                            ?>" data-type="static">     <ul><li class="star-ele"><a><span class="fa fa-star"></span></a></li>    <li class="star-ele"><a><span class="fa fa-star"></span></a></li>    <li class="star-ele"><a><span class="fa fa-star"></span></a></li>    <li class="star-ele"><a><span class="fa fa-star"></span></a></li><li class="star-ele"><a><span class="fa fa-star"></span></a></li> </ul></div><?php } ?>
                                        <div class="date_post"><span class="fa fa-clock-o"></span><a href="<?php echo get_permalink($biz_post->ID); ?>" class="module_bpost_date"><?php echo mysql2date('F j', mysql2date('F j', $biz_post->post_date)); ?></a></div>
                                    </div>
                                    <div class="pmodule_ver_subject">
                                        <p><?php
                                                                                                         $text = $biz_post->post_content;

                                                                                                         $text = strip_shortcodes($text);

                                                                                                         $text = apply_filters('the_content', $text);
                                                                                                         $text = str_replace(']]>', ']]&gt;', $text);


                                                                                                         //    $excerpt_length = apply_filters('excerpt_length', 150);

                                                                                                         $excerpt_more = apply_filters('excerpt_more', ' ' . '[&hellip;]');
                                                                                                         $text = wp_trim_words($text, 25, $excerpt_more);
                                                                                                         echo $text;
                                        ?> </p>
                                        <span class="sub_elements"><?php if (get_option('xevents_home_commentmeta') == 'yes') { ?><span class="fa fa-comments-o"></span><a class="comment" title="" href="<?php echo get_permalink($biz_post->ID); ?>
                                                                                                                                                                           "> <?php echo $biz_post->comment_count; ?></a><?php } ?>
                                            <?php if (get_option('xevents_home_visits') == 'yes') { ?><span class="fa fa-eye"></span><a class="comment" title="" href="<?php echo get_permalink($biz_post->ID); ?>"> <?php echo get_post_meta($biz_post->ID, "biz_viewers_count", true); ?>
                                                </a><?php } ?><?php if (get_option('xevents_home_authormeta') == 'yes') { ?><span class="fa fa-user"></span><a class="comment" title="" href="<?php echo esc_url(get_author_posts_url($biz_post->post_author)); ?>
                                                                                                                                                           "> <?php echo get_the_author_meta('display_name', $biz_post->post_author); ?> </a><?php } ?></span>
                                        <?php if (get_option('xevents_home_catmeta') == 'yes') { ?><a title="<?php echo $category[0]->cat_name; ?>" href="<?php echo esc_url(get_category_link($category[0]->term_id)); ?>" class="cat_makeup news"><?php echo $category[0]->cat_name; ?></a><?php } ?> 

                                    </div>
                                    <ul class="pm_ver_list">
                                        <?php
                                        $i = 0;
                                        foreach ($array_content as $biz_post) {
                                            if ($i > 0) {
                                                $size = array(110, 96);
                                                $attr = array('class' => '');
                                                $img = get_the_post_thumbnail($biz_post->ID, $size, $attr);
                                                $category = get_the_category($biz_post->ID);
                                                $format = get_post_format($biz_post->ID);
                                                if ($format === false)
                                                    $format = 'link';
                                                else if ($format == 'image' || $format == 'gallery')
                                                    $format = 'img';
                                                ?>
                                                <li class="pm_ver_sthumb"> <a href="<?php echo get_permalink($biz_post->ID); ?>" class="bubble_icon_<?php echo $format; ?> conf-icon"><?php echo $img; ?> </a>
                                                    <div class="pm_ver_content"><div class="mid-post-title"> <a title="" href="<?php echo get_permalink($biz_post->ID); ?>"><?php
                            if (mb_strlen($biz_post->post_title) > 50) {
                                $stringCut = substr($biz_post->post_title, 0, 50);
                                $string = substr($stringCut, 0, strrpos($stringCut, ' '));
                                echo $string;
                            }
                            else
                                echo $biz_post->post_title;
                                                ?></a></div>
                                                        <div class="bpost_info"><?php if (get_option('xevents_home_rate') == 'yes') { ?><div class="pc_rate star-ctr" data-value="<?php
                                            $rate = get_post_meta($biz_post->ID, 'xevents_rating_VL', true);
                                            if (!$rate)
                                                $rate = 0; echo $rate;
                                                    ?>" data-type="static">     <ul><li class="star-ele"><a><span class="fa fa-star"></span></a></li>    <li class="star-ele"><a><span class="fa fa-star"></span></a></li>    <li class="star-ele"><a><span class="fa fa-star"></span></a></li>    <li class="star-ele"><a><span class="fa fa-star"></span></a></li><li class="star-ele"><a><span class="fa fa-star"></span></a></li> </ul></div><?php } ?>
                                                            <div class="date_post"><span class="fa fa-clock-o"></span><a href="<?php echo get_permalink($biz_post->ID); ?>" class="module_bpost_date"><?php echo mysql2date('F j', mysql2date('F j', $biz_post->post_date)); ?>
                                                                </a></div>
                                                            <span class="sub_elements"><?php if (get_option('xevents_home_commentmeta') == 'yes') { ?><span class="fa fa-comments-o"></span><a class="comment" title="" href="#"> <?php echo $biz_post->comment_count; ?>
                                                                    </a><?php } ?>
                                                                <?php if (get_option('xevents_home_visits') == 'yes') { ?><span class="fa fa-eye"></span><a class="comment" title="" href="<?php echo get_permalink($biz_post->ID); ?>"> <?php echo get_post_meta($biz_post->ID, "biz_viewers_count", true); ?>
                                                                    </a><?php } ?> <?php if (get_option('xevents_home_authormeta') == 'yes') { ?><span class="fa fa-user"></span><a class="comment" title="" href="<?php echo esc_url(get_author_posts_url($biz_post->post_author)); ?>
                                                                                                                                                                                "> <?php echo get_the_author_meta('display_name', $biz_post->post_author); ?> 
                                                                    </a><?php } ?></span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <?php
                                            }
                                            $i++;
                                        }
                                        ?>

                                    </ul>

                                    <?php
                                }
                                else
                                    echo __('No Posts with Tags to display here !!', 'xevents');
                                ?>

                            </div>       
                        <?php }
                        ?>


                    </div>
                </div>
            <?php } ?>

            <?php if (get_option('xevents_home_rpcats') == 'yes' || get_option('xevents_home_rpcats') === false) { ?> 
                <div class="col-xs-12 col-md-12">
                    <h2 class="pmodule1_title" ><span class="title_makeup" style="border-bottom:5px solid <?php
            if ($headline_border)
                echo $headline_border;
            else
                echo '#F00';
                ?>"><?php echo __('RECENT POSTS CATEGORY', 'xevents'); ?></span></h2>


                    <ul class="tabs">
                        <?php
                        $categories = get_categories(array('number' => '5', 'orderby' => 'count', 'order' => 'desc'));
                        foreach ($categories as $cat) {
                            ?>
                            <li><a href="#"><?php echo $cat->name; ?></a></li> 

                        <?php } ?>
                    </ul>
                    <div class="panes">
                        <?php foreach ($categories as $cat) { ?>
                            <div class="pane"> 
                                <div class="pmodule_hor">
                                    <div class="col-xs-12 col-md-12 pm_hor_holder">
                                        <?php
                                        $args = array('posts_per_page' => 4, 'cat' => $cat->cat_ID);
                                        $query = new WP_Query($args);
                                        if ($query->have_posts()) {

                                            $array_content = $query->posts;
//var_dump($array_content);
                                            $biz_post = $array_content[0];
                                            //var_dump($biz_post->cat);
                                            $size = array();
                                            $attr = array('class' => 'img-post-hor');
                                            $img = get_the_post_thumbnail($biz_post->ID, 'medium', $attr);
                                            $format = get_post_format($biz_post->ID);
                                            if ($format === false)
                                                $format = 'link';
                                            else if ($format == 'image' || $format == 'gallery')
                                                $format = 'img';
                                            ?>
                                            <div class="pm_hor_col1"><a href="<?php echo get_permalink($biz_post->ID); ?>" class="bubble_icon_<?php echo $format; ?> conf-icon"><?php echo $img; ?> </a>
                                                <div class="pmodule_hor_title mid-post-title"><a href="<?php echo get_permalink($biz_post->ID); ?>"><?php
                                if (mb_strlen($biz_post->post_title) > 50) {
                                    $stringCut = substr($biz_post->post_title, 0, 50);
                                    $string = substr($stringCut, 0, strrpos($stringCut, ' '));
                                    echo $string;
                                }
                                else
                                    echo $biz_post->post_title;
                                            ?></a></div>
                                                <div class="bpost_info"><?php if (get_option('xevents_home_rate') == 'yes') { ?><div class="pc_rate star-ctr" data-value="<?php
                                            $rate = get_post_meta($biz_post->ID, 'xevents_rating_VL', true);
                                            if (!$rate)
                                                $rate = 0; echo $rate;
                                                ?>" data-type="static">     <ul><li class="star-ele"><a><span class="fa fa-star"></span></a></li>    <li class="star-ele"><a><span class="fa fa-star"></span></a></li>    <li class="star-ele"><a><span class="fa fa-star"></span></a></li>    <li class="star-ele"><a><span class="fa fa-star"></span></a></li><li class="star-ele"><a><span class="fa fa-star"></span></a></li> </ul></div><?php } ?><div class="date_post"><span class="fa fa-clock-o"></span><a href="<?php echo get_permalink($biz_post->ID); ?>" class="module_bpost_date"><?php echo mysql2date('F j', mysql2date('F j', $biz_post->post_date)); ?></a></div></div>

                                                <div class="pmodule_hor_subject">

                                                    <p><?php
                                        $text = $biz_post->post_content;

                                        $text = strip_shortcodes($text);

                                        $text = apply_filters('the_content', $text);
                                        $text = str_replace(']]>', ']]&gt;', $text);


                                        //       $excerpt_length = apply_filters('excerpt_length', 150);

                                        $excerpt_more = apply_filters('excerpt_more', ' ' . '[&hellip;]');
                                        $text = wp_trim_words($text, 25, $excerpt_more);
                                        echo $text;
                                            ?> </p>
                                                    <span class="sub_elements"><?php if (get_option('xevents_home_commentmeta') == 'yes') { ?><span class="fa fa-comments-o"></span><a class="comment" title="" href="#"> <?php echo $biz_post->comment_count; ?>
                                                            </a><?php } ?>
                                                        <?php if (get_option('xevents_home_visits') == 'yes') { ?><span class="fa fa-eye"></span><a class="comment" title="" href="<?php echo get_permalink($biz_post->ID); ?>"> <?php echo get_post_meta($biz_post->ID, "biz_viewers_count", true); ?>
                                                            </a><?php } ?>    <?php if (get_option('xevents_home_authormeta') == 'yes') { ?><span class="fa fa-user"></span><a class="comment" title="" href="<?php echo esc_url(get_author_posts_url($biz_post->post_author)); ?>"> <?php echo get_the_author_meta('display_name', $biz_post->post_author); ?> 
                                                            </a><?php } ?> </span><?php if (get_option('xevents_home_catmeta') == 'yes') { ?><a title="<?php echo $cat->cat_name; ?>" href="<?php echo esc_url(get_category_link($cat->term_id)); ?>" class="cat_makeup news"><?php echo $cat->cat_name; ?></a> <?php } ?>
                                                </div></div>
                                            <ul class="pm_hor_list">
                                                <?php
                                                $i = 0;
                                                foreach ($array_content as $biz_post) {
                                                    if ($i > 0) {
                                                        $size = array(110, 96);
                                                        $attr = array('class' => '');
                                                        $img = get_the_post_thumbnail($biz_post->ID, $size, $attr);
                                                        $format = get_post_format($biz_post->ID);
                                                        if ($format === false)
                                                            $format = 'link';
                                                        else if ($format == 'image' || $format == 'gallery')
                                                            $format = 'img';
                                                        ?>
                                                        <li class="pm_hor_sthumb">
                                                            <div class="pm_hor_thumb"> <a href="<?php echo get_permalink($biz_post->ID); ?>" class="bubble_icon_<?php echo $format; ?> conf-icon"><?php echo $img; ?> </a></div>
                                                            <div class="pm_hor_content"><div class="mid-post-title"> <a title="" href="<?php echo get_permalink($biz_post->ID); ?>"><?php
                                    if (mb_strlen($biz_post->post_title) > 50) {
                                        $stringCut = substr($biz_post->post_title, 0, 50);
                                        $string = substr($stringCut, 0, strrpos($stringCut, ' '));
                                        echo $string;
                                    }
                                    else
                                        echo $biz_post->post_title;
                                                        ?></a></div>
                                                                <div class="bpost_info"><?php if (get_option('xevents_home_rate') == 'yes') { ?><div class="pc_rate star-ctr" data-value="<?php
                                                    $rate = get_post_meta($biz_post->ID, 'xevents_rating_VL', true);
                                                    if (!$rate)
                                                        $rate = 0; echo $rate;
                                                            ?>" data-type="static">     <ul><li class="star-ele"><a><span class="fa fa-star"></span></a></li>    <li class="star-ele"><a><span class="fa fa-star"></span></a></li>    <li class="star-ele"><a><span class="fa fa-star"></span></a></li>    <li class="star-ele"><a><span class="fa fa-star"></span></a></li><li class="star-ele"><a><span class="fa fa-star"></span></a></li> </ul></div><?php } ?>
                                                                    <div class="date_post"><span class="fa fa-clock-o"></span><a href="<?php echo get_permalink($biz_post->ID); ?>" class="module_bpost_date"><?php echo mysql2date('F j', mysql2date('F j', $biz_post->post_date)); ?></a></div>

                                                                    <span class="sub_elements"><?php if (get_option('xevents_home_commentmeta') == 'yes') { ?><span class="fa fa-comments-o"></span><a href="<?php echo get_permalink($biz_post->ID); ?>" title="" class="comment"> <?php echo $biz_post->comment_count; ?>
                                                                            </a><?php } ?>
                                                                        <?php if (get_option('xevents_home_visits') == 'yes') { ?><span class="fa fa-eye"></span><a class="comment" title="" href="<?php echo get_permalink($biz_post->ID); ?>"><?php echo get_post_meta($biz_post->ID, "biz_viewers_count", true); ?>
                                                                            </a><?php } ?> <?php if (get_option('xevents_home_authormeta') == 'yes') { ?><span class="fa fa-user"></span><a href="<?php echo esc_url(get_author_posts_url($biz_post->post_author)); ?>" title="" class="comment"> <?php echo get_the_author_meta('display_name', $biz_post->post_author); ?> 
                                                                            </a><?php } ?></span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <?php
                                                    } $i++;
                                                }
                                                ?>
                                            </ul>
                                        </div>
                                    </div>


                                </div>
                                <?php
                            }
                        }
                        ?>

                    </div>
                </div>
            <?php } ?>

        </section>
        <?php get_sidebar('secondary'); ?>
    </div>
    <?php get_sidebar('primary'); ?>
</div>


<?php
add_filter('get_search_form', 'xevents_search_form');

get_footer();
?>