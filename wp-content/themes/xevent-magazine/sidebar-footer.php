<?php
/**
 * The Footer Sidebar
 * xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */
if (!is_active_sidebar('sidebar-3')) {
    return;
}
?>

<div class="row">
    <?php dynamic_sidebar('sidebar-3'); ?>
</div><!-- #footer-sidebar -->
