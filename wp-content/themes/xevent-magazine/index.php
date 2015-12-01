<?php
/* xevent index template
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

        <section id="content_holder" class="<?php if (isset($class_ch)) echo $class_ch; ?>" style="float:<?php if (isset($ch_style)) echo $ch_style; ?>;"  >
            <div id="primary" class="content_area">
                <div id="content" class="site-content" role="main">


                    <?php
                    if (have_posts()) {

                        // Start the Loop.
                        while (have_posts()) : the_post();


                            get_template_part('content', get_post_format());

                        endwhile;

                        // Previous/next post navigation.
                        xevents_paging_nav();
                    }
                    else
                    // If no content, include the "No posts found" template.
                        get_template_part('content', 'none');
                    ?>

                </div><!-- #content -->
            </div><!-- #primary -->
        </section>
        <?php get_sidebar('secondary'); ?>
    </div>
    <?php get_sidebar('primary'); ?>	
</div><!-- #main-content -->

<?php
get_footer();
