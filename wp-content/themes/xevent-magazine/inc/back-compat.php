<?php

/**
 * xevents Theme back compat functionality
 *
 * Prevents Xevent Theme from running on WordPress versions prior to 3.6,
 * since this theme is not meant to be backward compatible beyond that
 * and relies on many newer functions and markup changes introduced in 3.6.
 * xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */

/**
 * Prevent switching to xevent Theme on old versions of WordPress.
 *
 * Switches to the default theme.
 *
 * @since xevent Theme 1.0
 */
function xevents_switch_theme() {
    switch_theme(WP_DEFAULT_THEME, WP_DEFAULT_THEME);
    unset($_GET['activated']);
    add_action('admin_notices', 'xevents_upgrade_notice');
}

add_action('after_switch_theme', 'xevents_switch_theme');

/**
 * Add message for unsuccessful theme switch.
 *
 * Prints an update nag after an unsuccessful attempt to switch to
 * Xevent Theme on WordPress versions prior to 3.6.
 *
 * @since Xevent Theme 1.0
 */
function xevents_upgrade_notice() {
    $message = sprintf(__('Xevent Theme requires at least WordPress version 3.6. You are running version %s. Please upgrade and try again.', 'xevents'), $GLOBALS['wp_version']);
    printf('<div class="error"><p>%s</p></div>', $message);
}

/**
 * Prevent the Theme Customizer from being loaded on WordPress versions prior to 3.6.
 *
 * @since Xevents Theme 1.0
 */
function xevents_customize() {
    wp_die(sprintf(__('Xevent Theme requires at least WordPress version 3.6. You are running version %s. Please upgrade and try again.', 'xevents'), $GLOBALS['wp_version']), '', array(
        'back_link' => true,
    ));
}

add_action('load-customize.php', 'xevents_customize');

/**
 * Prevent the Theme Preview from being loaded on WordPress versions prior to 3.4.
 *
 * @since Xevent Theme 1.0
 */
function xevents_preview() {
    if (isset($_GET['preview'])) {
        wp_die(sprintf(__('Xevent Theme requires at least WordPress version 3.6. You are running version %s. Please upgrade and try again.', 'xevents'), $GLOBALS['wp_version']));
    }
}

add_action('template_redirect', 'xevents_preview');
