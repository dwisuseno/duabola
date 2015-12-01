<?php
/**
 * The Sidebar containing the main widget area
 * xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */
$sidebar1 = get_option('xevents_general_sidebar');

$sidebar2 = get_option('xevents_general_sidebar2');

if (is_active_sidebar('sidebar-1')) :

    if ($sidebar1 != 'no') {



        //    if( $sidebar2=='no' )  $class_ch='col-md-4';
// else 
        $class_ch = 'col-md-3';
        ?>                

        <div id="sidebar-one" class="<?php echo $class_ch; ?> sidebarone" style="float:<?php echo $sidebar1; ?>;">

            <?php dynamic_sidebar('sidebar-1'); ?>

        </div>

    <?php
    }

endif;
?>





<!--end container -->