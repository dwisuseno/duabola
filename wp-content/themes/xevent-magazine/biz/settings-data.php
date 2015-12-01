<?php

/*
 * Xevents SETTINGS DATA.
 * Xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */

function xevents_settings_data() {
    $settings = array('social_links' => array(array('name' => __('Social Links', 'xevents'), 'type' => 'single', 'settings' => array(
                    'twitter' => array('name' => __('Twitter Link', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(), 'link' => 'true','status' => true),
                    'facebook' => array('name' => __('Facebook Link', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(), 'link' => 'true','status' => true),
                    'google' => array('name' => __('Google+ Link', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(), 'link' => 'true','status' => true),
                    'linkedin' => array('name' => __('Linkedin Link', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(), 'link' => 'true','status' => true),
                    'stumbleupon' => array('name' => __('StumbleUpon Link', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(), 'link' => 'true','status' => true),
                    'pinterest' => array('name' => __('Pinterest Link', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(), 'link' => 'true','status' => true),
                )
            )
        ),
        'article' => array(array('name' => __('Post & Archives Meta Settings', 'xevents'), 'type' => 'single', 'settings' => array(
                    'postmeta' => array('name' => __('Post Meta', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    'authormeta' => array('name' => __('Author Meta', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    'datemeta' => array('name' => __('Date Meta', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    'catmeta' => array('name' => __('Categories Meta', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    'commentmeta' => array('name' => __('Comments Meta', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    'tagmeta' => array('name' => __('Tags Meta', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    'visits' => array('name' => __('Viewers Meta', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true)
                )
            ),
            array('name' => __('Related Posts Settings', 'xevents'), 'type' => 'single', 'settings' => array(
                    'relatedpost' => array('name' => __('Related Posts', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    'relatedboxtitle' => array('name' => __('Related Posts Box Title', 'xevents'), 'default' => 'Related Posts', 'type' => 'text', 'values' => array(),'status' => true),
                    'relatedpostnumber' => array('name' => __('Number of posts to show', 'xevents'), 'default' => '5', 'type' => 'text', 'values' => array(),'status' => true),
                    'displayby' => array('name' => __('Display By', 'xevents'), 'default' => 'category', 'type' => 'select', 'values' => array('author', 'category', 'tag'), 'multi' => 'false','status' => true),
                )
            ),
            array('name' => __('Share Post Settings', 'xevents'), 'type' => 'single', 'settings' => array(
                    'shareicons' => array('name' => __('Show Sharing Icons', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                )
            ),
            array('name' => __('Other Settings', 'xevents'), 'type' => 'single', 'settings' => array(
                    'authorinfo' => array('name' => __('Display Author Info', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    'pagination' => array('name' => __('Next/Prev Article Pagination', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                )
            )
        ),
        'review' => array(array('name' => __('Review Settings (Premium Version Only)', 'xevents'), 'type' => 'single', 'settings' => array(
                    'sys_enable' => array('name' => __('Display Review', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'), 'status' => false),
                    'widget_position' => array('name' => __('Review Widget Position', 'xevents'), 'default' => 'Bottom Page', 'type' => 'select', 'values' => array('Top Page', 'Bottom Page'), 'multi' => 'false', 'status' => false),
                    'include' => array('name' => __('Include In', 'xevents'), 'default' => 'post', 'type' => 'select', 'values' => array('post', 'page'), 'multi' => 'true', 'status' => false),
                    'exclude' => array('name' => __('Exclude Posts By IDs(14,16,...)', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(),'status' => false),
                    'header' => array('name' => __('Review Header', 'xevents'), 'default' => 'REVIEW HEADER', 'type' => 'text', 'values' => array(), 'status' => false),
                    'desc' => array('name' => __('Review Description', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(), 'status' => false),
                    'style' => array('name' => __('Review Style', 'xevents'), 'default' => 'bar', 'type' => 'select', 'values' => array('bar', 'star'), 'multi' => 'false', 'status' => false),
                    'scale' => array('name' => __('Review Scale', 'xevents'), 'default' => '1-5', 'type' => 'select', 'values' => array('1-5', '1-10', '1-100'), 'multi' => 'false', 'status' => false),
                    'userrev' => array('name' => __('User Review', 'xevents'), 'default' => 'enable', 'type' => 'checkbox', 'values' => array('enable'), 'status' => false),
                )
            ),
            array('name' => __('Elements Settings (Pro only)', 'xevents'), 'prefix' => 'revf', 'type' => 'multifields', 'settings' => array(
                    'featurename' => array('name' => __('Feature Name', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(), 'status' => false),
                    'featureval' => array('name' => __('Feature Value', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(), 'status' => false),
                )
            ),
            array('name' => __('Review Skin (Pro only)', 'xevents'), 'type' => 'single', 'settings' => array(
//  'color'=>array('name'=>__('Review Color','xevents'),'default'=>'','type'=>'color','values'=>array()),
                    'fontcolor' => array('name' => __('Font Color', 'xevents'), 'default' => '', 'type' => 'color', 'values' => array(), 'status' => false),
//  'hbgcolor'=>array('name'=>__('Header Background Color','xevents'),'default'=>'','type'=>'color','values'=>array()),
                    'bgcolor' => array('name' => __('Background Color', 'xevents'), 'default' => '', 'type' => 'color', 'values' => array(), 'status' => false),
                    //'bordercolor'=>array('name'=>__('Border Color','xevents'),'default'=>'','type'=>'color','values'=>array()),
                    'barcolor' => array('name' => __('Bar Color', 'xevents'), 'default' => '', 'type' => 'color', 'values' => array(), 'status' => false),
                    'barbgcolor' => array('name' => __('Bar Background Color', 'xevents'), 'default' => '', 'type' => 'color', 'values' => array(), 'status' => false),
//  'starcolor'=>array('name'=>__('Star Color','xevents'),'default'=>'','type'=>'color','values'=>array()),
                )
            )
        ),
        'ads' => array(array('name' => __('Ads Settings', 'xevents'), 'type' => 'single', 'settings' => array(
                    'enable' => array('name' => __('Display Ads', 'xevents'), 'default' => '', 'type' => 'checkbox', 'values' => array('yes'),'status' => true), // alterrrrrr
                    'widget_position' => array('name' => __('Ad Position', 'xevents'), 'default' => 'Top Page', 'type' => 'select', 'values' => array('Above Article', 'Below Article'), 'multi' => 'false','status' => true),
                    'header' => array('name' => __('Display in Header', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes', 'no'),'status' => true),
                    'image' => array('name' => __('Ad Image', 'xevents'), 'default' => '', 'type' => 'image', 'values' => array(),'status' => true),
                    'link' => array('name' => __('Ad Link', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(), 'link' => 'true','status' => true),
                    'alt' => array('name' => __('Image Alternative Text', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(),'status' => true),
                    'code' => array('name' => __('Custom Ads Code', 'xevents'), 'default' => '', 'type' => 'textarea', 'values' => array(),'status' => true),
                    'include' => array('name' => __('Include In', 'xevents'), 'default' => 'post,page', 'type' => 'select', 'values' => array('post', 'page'), 'multi' => 'true','status' => true),
                    'exclude' => array('name' => __('Exclude Posts By IDs(16,14,...)', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(),'status' => true),
                )
            )
        ),
        'home' => array(array('name' => __('HomePage Settings', 'xevents'), 'type' => 'single', 'settings' => array(
                    //array('name'=>__('HomePage Template Options','xevents'),'settings'=>array(
                    'template' => array('name' => __('HomePage Template', 'xevents'), 'default' => 'HomePage with Features Posts', 'type' => 'select', 'values' => array('HomePage with Revolution Slider (Pro only)', 'HomePage with Xevents Slider (Pro only)', 'HomePage with Features Posts'), 'multi' => 'false','status' => true),
                    'revo_slider' => array('name' => __('Revolution Slider Alias (Pro only)', 'xevents'), 'default' => '', 'type' => 'text','status' => false)
                )
            ),
            array('name' => __('Feature Posts', 'xevents'), 'type' => 'single', 'settings' => array(
                    'fposts' => array('name' => __('Feature Posts ID(1,2,..)', 'xevents'), 'default' => '', 'type' => 'text','status' => true)
                )
            ),
            array('name' => __('Contents', 'xevents'), 'type' => 'single', 'settings' => array(
                    'rposts' => array('name' => __('RECENT POSTS', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    'ppcat' => array('name' => __('POPULAR POSTS CATEGORY (Pro only)', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'), 'status' => false),
                    'ptags' => array('name' => __('POSTS By TAGS', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    'topposts' => array('name' => __('TOP POSTS (Pro only)', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'), 'status' => false),
                    'lvposts' => array('name' => __('LATEST VIDEO POSTS (Pro only)', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'), 'status' => false),
                    'aposts' => array('name' => __('AUTHOR POSTS  (Pro only)', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'), 'status' => false),
                    'rpcats' => array('name' => __('RECENT POSTS CATEGORY', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    'riposts' => array('name' => __('RECENT IMAGES POSTS (Pro only)', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'), 'status' => false),
                )
            ),
            array('name' => __('HomePage Meta', 'xevents'), 'type' => 'single', 'settings' => array(
                    // 'postmeta'=>array('name'=>__('Post Meta','xevents'),'default'=>'yes','type'=>'checkbox','values'=>array('yes')),
                    'authormeta' => array('name' => __('Author Meta', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    // 'datemeta'=>array('name'=>__('Date Meta','xevents'),'default'=>'yes','type'=>'checkbox','values'=>array('yes')),
                    'catmeta' => array('name' => __('Categories Meta', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    'commentmeta' => array('name' => __('Comments Meta', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    'rate' => array('name' => __('Rate Meta', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    'visits' => array('name' => __('Viewers Meta', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true)
                )
            ),
        ),
        'slider' => array(array('name' => __('General Slider Settings(Premium Version Only)', 'xevents'), 'type' => 'single', 'settings' => array(
                    'fx' => array('name' => __('Effect Type', 'xevents'), 'default' => 'random', 'type' => 'select', 'values' => array('random', 'strip-down-right', 'strip-down-left', 'strip-up-right', 'strip-up-left', 'strip-up-down', 'strip-up-down-left', 'strip-left-right', 'strip-left-right-down', 'left-curtain', 'right-curtain', 'top-curtain', 'bottom-curtain', 'fade', 'slide-in-right', 'slide-in-left', 'slide-in-up', 'slide-in-down', 'block-random', 'block-fade', 'block-fade-reverse', 'block-expand', 'block-expand-reverse', 'block-expand-random', 'block-drop-random', 'zigzag-top', 'zigzag-bottom', 'zigzag-grow-top', 'zigzag-grow-bottom', 'zigzag-drop-top', 'zigzag-drop-bottom', 'strip-left-fade', 'strip-right-fade', 'strip-top-fade', 'strip-bottom-fade'), 'multi' => 'false', 'status' => false),
                    'width' => array('name' => __('Slider Width', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(), 'status' => false),
                    'ctrlnav' => array('name' => __('Controle Navigation', 'xevents'), 'default' => 'true', 'type' => 'checkbox', 'values' => array('true'), 'status' => false)
                )
            ),
            array('name' => __('Layer Settings (Pro only)', 'xevents'), 'prefix' => 'fslayer', 'type' => 'multifields', 'settings' => array(
                    'layerids' => array('name' => __('Slide ID', 'xevents'), 'default' => '1', 'type' => 'text', 'values' => array(), 'status' => false),
                    'image' => array('name' => __('Image', 'xevents'), 'default' => '', 'type' => 'image', 'values' => array(), 'status' => false),
                    'thumb' => array('name' => __('Thumbnail', 'xevents'), 'default' => '', 'type' => 'image', 'values' => array(), 'status' => false),
                    'video' => array('name' => __('Video Link', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(''), 'status' => false),
                    'pause' => array('name' => __('Pause Time', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(''), 'status' => false),
                )
            ),
            array('name' => __('Elements Settings (Pro only)', 'xevents'), 'prefix' => 'flayer', 'type' => 'multifields', 'settings' => array(
                    'layerid' => array('name' => __('Slide ID', 'xevents'), 'default' => '1', 'type' => 'text', 'values' => array(), 'status' => false),
                    // 'elemnet'=>array('name'=>__('Element Type','xevents'),'default'=>'image','type'=>'select','values'=>array('image','text')),
                    'caption' => array('name' => __('Caption', 'xevents'), 'default' => '', 'type' => 'textarea', 'values' => array(''), 'status' => false),
                    'data-transition' => array('name' => __('Transition Type', 'xevents'), 'default' => 'fade', 'type' => 'select', 'values' => array('fade', 'wipeleft', 'wiperight', 'wipeup', 'wipedown', 'expandleft', 'expandright', 'expandup', 'expanddown'), 'multi' => 'false', 'status' => false),
                    //'data-out'=>array('name'=>__('Out-Animation Type','xevents'),'default'=>'','type'=>'select','values'=>array('','fade','none','left','right','top','topLeft','bottomLeft','topRight','bottomRight','bottomTop')),
                    // 'data-special'=>array('name'=>__('Prev Out-Animation','xevents'),'default'=>'','type'=>'select','values'=>array('','cycle')),
                    //'data-position'=>array('name'=>__('Element Position','xevents'),'default'=>'30,90','type'=>'text','values'=>array('')),
                    'data-easing' => array('name' => __('Animation Easing', 'xevents'), 'default' => '', 'type' => 'select', 'values' => array('linear', 'swing', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint', 'easeOutQuint', 'easeInOutQuint', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInExpo', 'easeOutExpo', 'easeInOutExpo', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc', 'easeInElastic', 'easeOutElastic', 'easeInOutElastic', 'easeInBack', 'easeOutBack', 'easeInOutBack', 'easeInBounce', 'easeOutBounce', 'easeInOutBounce'), 'multi' => 'false', 'status' => false),
                    'data-speed' => array('name' => __('Transition Speed(milliseconds)', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(''), 'status' => false),
                    'data-x' => array('name' => __('Caption x position in pixel', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(''), 'status' => false),
                    'data-y' => array('name' => __('Caption y position in pixel', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(''), 'status' => false),
                    'data-width' => array('name' => __('Caption width in pixel', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(''), 'status' => false),
                    'data-height' => array('name' => __('Caption Height in pixel', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array('')),
                    'class' => array('name' => __('Caption Class', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array(''), 'status' => false),
                )
            ),
        ),
        /* 'skin'=>array(array('name'=>__('Skin Options','xevents'),'settings'=>array(
          'options'=>array('name'=>__('Select a Pre-defined Skin','xevents'),'default'=>'red','type'=>'select','values'=>array('blue','green','red')),

          )
          )
          ), */
        'general' => array(array('name' => __('General Settings', 'xevents'), 'type' => 'single', 'settings' => array(
                    'fullwidth_template' => array('name' => __('Full Width', 'xevents'), 'default' => '', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    'fullwidth' => array('name' => __('Full Width Slider (Pro only)', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'), 'status' => false),
                    'rtl' => array('name' => __('Rigth To Left (Pro only)', 'xevents'), 'default' => '', 'type' => 'checkbox', 'values' => array('yes'), 'status' => false),
                    'breaknews' => array('name' => __('Breaking News', 'xevents'), 'default' => 'yes', 'type' => 'checkbox', 'values' => array('yes'),'status' => true),
                    'sidebar' => array('name' => __('Primary SideBar', 'xevents'), 'default' => 'right', 'type' => 'select', 'values' => array('left', 'right', 'no'), 'multi' => 'false','status' => true),
                    'sidebar2' => array('name' => __('Secondary SideBar', 'xevents'), 'default' => 'right', 'type' => 'select', 'values' => array('left', 'right', 'no'), 'multi' => 'false','status' => true),
                    'footer_layout' => array('name' => __('Footer Layout', 'xevents'), 'default' => '1/3+1/3+1/3', 'type' => 'select', 'values' => array('1/1' => '1/1', '1/2+1/2' => '1/2+1/2', '1/3+1/3+1/3' => '1/3+1/3+1/3', '1/4+1/4+1/4+1/4' => '1/4+1/4+1/4+1/4'), 'multi' => 'false','status' => true),
                    'footer_copyright' => array('name' => __('Footer Text', 'xevents'), 'default' => '', 'type' => 'text','status' => true),
                )
            ),
            array('name' => __('Background Show Type (Pro only)', 'xevents'), 'type' => 'single', 'settings' => array(
                    'bgshow_type' => array('name' => __('Background Show Type (Pro only)', 'xevents'), 'default' => 'Gallery', 'type' => 'select', 'values' => array('Gallery', 'Video', 'No Background Show'), 'multi' => 'false', 'status' => false),
                )
            ),
            array('name' => __('Background Gallery Slide Show (Pro only)', 'xevents'), 'type' => 'single', 'settings' => array(
                    'image_1' => array('name' => __('Background Image 1', 'xevents'), 'default' => '', 'type' => 'image', 'values' => array(), 'status' => false),
                    'image_2' => array('name' => __('Background Image 2', 'xevents'), 'default' => '', 'type' => 'image', 'values' => array(), 'status' => false),
                    'image_3' => array('name' => __('Background Image 3', 'xevents'), 'default' => '', 'type' => 'image', 'values' => array(), 'status' => false),
                    'image_4' => array('name' => __('Background Image 4', 'xevents'), 'default' => '', 'type' => 'image', 'values' => array(), 'status' => false),
                    'image_5' => array('name' => __('Background Image 5', 'xevents'), 'default' => '', 'type' => 'image', 'values' => array(), 'status' => false),
                    'image_6' => array('name' => __('Background Image 6', 'xevents'), 'default' => '', 'type' => 'image', 'values' => array(), 'status' => false),
                )
            ),
            array('name' => __('Background Video (Pro only)', 'xevents'), 'type' => 'single', 'settings' => array(
                    'video' => array('name' => __('Video Link in Your Server(.mp4,.webm)', 'xevents'), 'default' => '', 'type' => 'text', 'link' => 'true', 'status' => false)
                )
            ),
            array('name' => __('Menu Settings', 'xevents'), 'type' => 'single', 'settings' => array(
                    'menu' => array('name' => __('Category Content Display Type', 'xevents'), 'default' => 'right', 'type' => 'select', 'values' => array('Big Thumbnails', 'Small Thumbnails', 'No Thumbnails'), 'multi' => 'false','status' => true),
                    'num' => array('name' => __('Category Items Number', 'xevents'), 'default' => '3', 'type' => 'text', 'values' => array(''),'status' => true),
                )
            )
        )
    );



    return $settings;
}

function xevents_settings_shortcodes() {
    $settings = array('slider' => array(array('name' => __('Layer One Settings', 'xevents'), 'prefix' => 'flayer', 'type' => 'shortcode', 'settings' => array(
                    'data-in-1' => array('name' => __('In-Animation Type', 'xevents'), 'default' => 'left', 'type' => 'select', 'values' => array('fade', 'none', 'left', 'right', 'top', 'bottom', 'scrollLeft', 'scrollRight', 'scrollTop', 'scrollBottom')),
                    'data-out-1' => array('name' => __('Out-Animation Type', 'xevents'), 'default' => 'left', 'type' => 'select', 'values' => array('fade', 'none', 'left', 'right', 'top', 'bottom', 'scrollLeft', 'scrollRight', 'scrollTop', 'scrollBottom')),
                    'data-fixed-1' => array('name' => __('Element Fixed', 'xevents'), 'default' => '', 'type' => 'checkbox', 'values' => array('yes')),
                    'data-position-1' => array('name' => __('Element Position', 'xevents'), 'default' => '30,90', 'type' => 'text', 'values' => array('')),
                    'data-ease-in-1' => array('name' => __('Animation Easing In', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array('')),
                    'data-ease-out-1' => array('name' => __('Animation Easing Out', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array('')),
                    'data-time-1' => array('name' => __('Animation Time', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array('')),
                    'data-delay-1' => array('name' => __('Animation Delay', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array('')),
                    'data-step-1' => array('name' => __('Animation Step', 'xevents'), 'default' => '', 'type' => 'text', 'values' => array('')),
                )
            )
        )
    );
    return $settings;
}

?>