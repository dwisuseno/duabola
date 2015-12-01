<?php

/*
 * Xevents ADS Sys.
 * Xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */

function xevents_ads_div($content) {
    global $post;
    $biz_ads_widget_position = get_option("xevents_ads_widget_position");
    $biz_ads_image = get_option("xevents_ads_image");
    $biz_ads_link = get_option("xevents_ads_link");
    $biz_ads_alt = get_option("xevents_ads_alt");
    $biz_ads_code = get_option("xevents_ads_code");
    $biz_ads_include = get_option("xevents_ads_include");

    $biz_ads_exclude = get_option("xevents_ads_exclude");
    $img_url = wp_get_attachment_image_src($biz_ads_image, 'full');

    if (empty($biz_ads_code))
        $ad = '<div class="ban1"><a href="' . $biz_ads_link . '" target="_blank"><img src="' . $img_url[0] . '" alt="' . $biz_ads_alt . '"></a></div>';
    else
        $ad = '<div class="ban1">' . stripslashes($biz_ads_code) . '</div>';



    if ($content != false) {

        $include = explode(',', $biz_ads_include);
        $post_type = $post->post_type;
        $exclude = explode(',', $biz_ads_exclude);
        if (isset($include[0]))
            $include0 = $include[0];
        else
            $include0 = null;
        if (isset($include[1]))
            $include1 = $include[1];
        else
            $include1 = null;

        if (($include0 == $post_type) || $include1 == $post_type) {

            if (!in_array($post->ID, $exclude)) {
                if (strcmp($biz_ads_widget_position, "Above Article") == 0)
                    $ouput = $ad . $content;
                else if (strcmp($biz_ads_widget_position, "Below Article") == 0)
                    $ouput = $content . $ad;
            }
            else
                $ouput = $content;
        }
        else
            $ouput = $content;
    }
    else
        $ouput = $ad;
    return $ouput;
}

?>