<?php 
    /* Display a notice that can be dismissed */

add_action('admin_notices', 'xevents_nag_ignore');

function xevents_admin_notice() {
	global $current_user ;
        $user_id = $current_user->ID;
        /* Check that the user hasn't already clicked to ignore the message */
	if ( ! get_user_meta($user_id, 'xevent_ignore_notice') ) {
        echo '<div class="updated"><p>'; 
        printf(__('Check out <a target="_blank" href="http://wpmeal.com/xevent_theme/"> the Premium Version Of Xevent Theme</a> ( Unlimited HomePages, Live Customizer, Slider Revolution, Massive Visual Builder..etc) | <a href="%1$s">Hide Notice</a>'), '?xevents_nag_ignore=0');
        echo "</p></div>";
	}
}

add_action('admin_init', 'xevents_nag_ignore');

function xevents_nag_ignore() {
	global $current_user;
        $user_id = $current_user->ID;
        /* If user clicks to ignore the notice, add that to their user meta */
        if ( isset($_GET['xevents_nag_ignore']) && '0' == $_GET['xevents_nag_ignore'] ) {
             add_user_meta($user_id, 'xevent_ignore_notice', 'true', true);
	}
}
?>