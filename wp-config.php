<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'db_duabola');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'pCti11T&vAkA%Wg|WG)L`7|r,h|?dpFF?hdV`g9(l#z9&yaJNi80||4{YWPQt@!>');
define('SECURE_AUTH_KEY',  'X;ve:9*OCoqAY/>IfM@c7OgIUp%qDoqG6!3>uv*2[#K?GBxtf5@;ihS ^o3NHj;N');
define('LOGGED_IN_KEY',    'QWL>,)^%E2zF*w;7m-)`aWK:*j}(Hv&k7BZXHhzbFS jx&2r}$ov_?E<+ICW=u%q');
define('NONCE_KEY',        '=X|gW:In(d2iN~`,l}J-NMLnt[+F~@5j&!ch:MYK&9wj8Oq]M(O^i.C()U+P2}if');
define('AUTH_SALT',        '+%1]kG~&OFjrhScYY8|5j|ov-C>F=|{D}S%-CRm^ENn{+*+A^asRi3|KfD#E/+sm');
define('SECURE_AUTH_SALT', '-:*2*OkqF{5]]$XFT|Tj8$efq%=Jy].29zm4&~]qhlS|w6yd}O$!]NmfimZdor`0');
define('LOGGED_IN_SALT',   '%q7YR$*+k+iFiQ&L7@Py#yM:zfo^71|Yl4v=#x]W[>UMd=0r?r[e5*OW(hRg9%IC');
define('NONCE_SALT',       '%jjFdWAi~*@]!-/_5=,o{1EEQ 68[~yuSf<d!Qd9]Uv@%ZMs:nhq+Xkr|PD8xAQP');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
