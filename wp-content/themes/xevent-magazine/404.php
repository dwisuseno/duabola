<?php
/*
 * xevents 404 template.
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



        <section id="content_holder" class="<?php if (isset($class_ch)) echo $class_ch; ?>" style="float:<?php if (isset($ch_style)) echo $ch_style; ?>"  >



            <div id="primary" class="content-area">

                <div id="content" class="site-content" role="main">



                    <header class="page-header">

                        <h1 class="page-title"><?php _e('Ooops ... Error 404', 'xevents'); ?></h1>

                    </header>



                    <div class="page-content">

                        <p><?php _e('It looks like nothing was found at this location. Maybe try a search?', 'xevents'); ?></p>



                        <?php get_search_form(); ?>

                    </div><!-- .page-content -->



                </div><!-- #content -->

            </div><!-- #primary -->

        </section>

        <?php get_sidebar('secondary'); ?>

    </div>

    <?php get_sidebar('primary'); ?>

</div>

<?php
get_footer();

