<?php
/*
 * Xevents SETTINGS PAGE.
 * Xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */



function xevents_theme_admin_menus() {
    $itg_admin_menu = add_theme_page('Xevent Theme settings', 'Xevent Theme', 'manage_options', 'xevents_theme_settings', 'xevents_settings_page');
    add_action('admin_print_styles-' . $itg_admin_menu, 'xevents_enq_bootstrap');
}

function xevents_settings_page() {

    if (!current_user_can('edit_theme_options')) {
        die("You don't have permission to access this page !");
    }
    $c = 0;
    ?>

    <script>jQuery(function($) {
            $('.allday-colorpicker').spectrum({
                allowEmpty: true,
                preferredFormat: "hex"
            });

        })</script>

    <!-- Nav tabs -->
    <div class="tabs-left">
        <div class="midday_logo"></div>
        <ul class="nav nav-tabs col-sm-3" role="tablist" id="biz_tabs">
            <li><a href="#biz_general" role="tab" data-toggle="tab"><?php echo __('General', 'xevents'); ?></a></li>
            <li><a href="#biz_home" role="tab" data-toggle="tab"><?php echo __('Home Page', 'xevents'); ?></a></li>
            <li><a href="#biz_slider" role="tab" data-toggle="tab"><?php echo __('XEvents Slider', 'xevents'); ?></a></li>
            <li><a href="#biz_article" role="tab" data-toggle="tab"><?php echo __('Article', 'xevents'); ?></a></li>
            <li><a href="#biz_review" role="tab" data-toggle="tab"><?php echo __('Review', 'xevents'); ?></a></li>
            <li><a href="#biz_ads" role="tab" data-toggle="tab"><?php echo __('Ads', 'xevents'); ?></a></li>
            <li><a href="#biz_social_links" role="tab" data-toggle="tab"><?php echo __('Social Links', 'xevents'); ?></a></li>
            <li><a href="#biz_live_customizer" role="tab" data-toggle="tab"><?php echo __('Live Customizer', 'xevents'); ?></a></li>

        </ul>

        <!-- Tab panes -->
        <div class="col-sm-6 tab-content">

            <?php
            $data = xevents_settings_data();
            global $allowedposttags;
            foreach ($data as $head => $head_data) {
                ?>
                <div class="tab-pane fade col-sm-12" id="biz_<?php echo $head; ?>">
                    <form class="form-horizontal" role="form" method="POST" >    

                        <?php
                        $update = 'xevents_' . $head;
                        if (isset($_POST['update'])) {
                            if (isset($_POST[$update])) {
                                ?>
                                <script>jQuery(function($) {
                                        $('a[href="#<?php echo 'biz_' . $head; ?>"]').tab('show');
                                    });
                                </script>


                                <div id="message" class="updated">Settings saved</div>

                                <?php
                                // }   
                            }
                        } else {
                            ?><script> jQuery(function($) {
                                    $('#biz_tabs a[href=#biz_general]').tab('show');
                                });
                            </script>
                        <?php } foreach ($head_data as $section) { ?>
                            <div class="setting_head"> <div class="col-sm-7"><?php echo $section['name']; ?></div></div>
                            <?php
                            if ($section['type'] != 'multifields') {
                                foreach ($section as $sec_details)
                                    $setting_name = null;
                                foreach ($sec_details as $setting_name => $setting_vals) {
                                    ?>
                                    <div class="form-group">    
                                        <div for="review" class="col-sm-4 control-label"><?php echo $setting_vals['name']; ?></div>
                                        <div class="col-sm-11">
                                            <?php
                                            $optin_key = 'xevents_' . $head . '_' . $setting_name;
                                            if (isset($_POST[$update])) {
                                                if (isset($_POST[$optin_key])) {
                                                    if (!is_array($_POST[$optin_key])) {
                                                        if (isset($setting_vals['link']))
                                                        //   $new_val = esc_url($_POST[$optin_key]);
                                                            $new_val = wp_filter_nohtml_kses($_POST[$optin_key]);
                                                        else if ($setting_name == 'code')
                                                            $new_val = wp_kses($_POST[$optin_key], $allowedposttags);
                                                        else   //     $new_val = $_POST[$optin_key];  
                                                            $new_val = wp_filter_nohtml_kses($_POST[$optin_key]);
                                                    }
                                                    else {
                                                        $new_val = $_POST[$optin_key];

                                                        $new_val = implode(',', $new_val);
                                                        // $new_val=esc_attr($new_val);
                                                        $new_val = wp_filter_nohtml_kses($new_val);
                                                    }
                                                }
                                                else
                                                    $new_val = '';
                                                $result = update_option($optin_key, $new_val);
                                            }
                                            $value = get_option($optin_key);
                                            if ($value === false) {
                                                $value = $setting_vals['default'];
                                                update_option($optin_key, $value);
                                            }
                                            ?>
                                            <?php $status = ($setting_vals['status'] == false) ? 'readonly' : '' ?> 
                                            <?php if ($setting_vals['type'] == "text") { ?>
                                                <input type="text" class="form-control"  name="<?php echo $optin_key; ?>" value="<?php echo esc_attr($value); ?>" <?php echo $status; ?> >
                                                <?php
                                            } else if ($setting_vals['type'] == "select") {
                                                if ($setting_vals['multi'] == 'true')
                                                    $value = explode(',', $value);
                                                ?> <label>
                                                    <select name="<?php echo $optin_key . '[]'; ?>"  class="form-control"  value="" <?php if ($setting_vals['multi'] == 'true') echo ' multiple'; ?> <?php echo $status; ?>>
                                                        <?php foreach ($setting_vals['values'] as $val) {
                                                            ?>
                                                            <?php
                                                            if (is_array($value)) {
                                                                if (in_array($val, $value))
                                                                    $selected = "selected";
                                                                else
                                                                    $selected = "";
                                                            }else if ($value == $val)
                                                                $selected = "selected";
                                                            else
                                                                $selected = "";
                                                            if ($head == 'skin' && $setting_name == 'options')
                                                                $attr = ' data-img-src="' . get_template_directory_uri() . '/biz/images/skins/' . $val . '.jpg" ';
                                                            else
                                                                $attr = '';
                                                            ?>
                                                            <option <?php
                                                            echo esc_attr($attr);
                                                            echo $selected;
                                                            ?>><?php echo esc_attr($val); ?></option>

                        <?php } ?>
                                                    </select> </label>   
                                                <script>jQuery(function($) {
                                                        $('select[name="biz_skin_options[]"]').imagepicker();
                                                    });</script>  
                                            <?php }else if ($setting_vals['type'] == "checkbox") {
                                                ?>


                                                <?php
                                                if (!empty($value))
                                                    $selected = "checked";
                                                else
                                                    $selected = "";
                                                ?>  
                                                <div class="input_styled checklist pull-left">
                                                    <div class="rowCheckbox checkbox-large checkbox-white">
                                                        <input type="checkbox" id="invoice<?php echo $k = $c++; ?>" name="<?php echo $optin_key; ?>"   value="<?php echo esc_attr($setting_vals['values'][0]); ?>"   <?php echo $selected; ?> <?php echo $status; ?>>
                                                        <label for="invoice<?php echo $k; ?>"></label>
                                                    </div>
                                                </div>


                                                <?php //}    ?>

                    <?php } else if ($setting_vals['type'] == "color") { ?>
                                                <input class="allday-colorpicker"  type="text" name="<?php echo $optin_key; ?>"   value="<?php echo esc_attr($value); ?>" <?php echo $status; ?>>

                    <?php } else if ($setting_vals['type'] == "image") { ?>
                                                <a class="<?php echo ($status == 'readonly') ? '' : 'xevents_select_images'; ?>">Select Image</a>
                                                <input type="hidden" name="<?php echo $optin_key; ?>"  class="form-control"  value="<?php echo esc_attr($value); ?>" <?php echo $status; ?>>
                                                <div class="biz_images_container">
                                                        <?php if ($value) { ?>
                                                        <div  class='mvb_thumb small' ><img height='150px' width='60%' title='image for ads'  src="<?php
                                                            $args = array(
                                                                'post_type' => 'attachment',
                                                                'numberposts' => -1,
                                                                'post_status' => null,
                                                                'post_parent' => null);
                                                            $posts = get_posts($args);
                                                            if ($posts) {
                                                                foreach ($posts as $post)
                                                                    if ($post->ID == $value) {
                                                                        $img_url = $post->guid;
                                                                        $img_title = $post->post_title;
                                                                        echo $img_url;
                                                                    }
                                                            }
                                                            ?>"><div id="<?php echo $value; ?>" class='mvb_image_delete'>&times;</div></div>
                        <?php } ?>
                                                </div>

                    <?php } else if ($setting_vals['type'] == "textarea") { ?>
                                                <textarea name="<?php echo $optin_key; ?>" class="form-control" rows="2" <?php echo $status; ?>><?php echo esc_textarea(stripslashes($value)); ?></textarea>

                    <?php } ?>

                                        </div>
                                    </div> 


                                    <?php
                                }
                            } else { /*                             * ************************multiple******************************* */
                                ?>
                                <?php $status = (!$setting_vals['status']) ? 'readonly' : '' ?> 
                                <?php
                                foreach ($section as $sec_details)
                                    $setting_name = null; $aa = array();
                                $val_so = array();
                                $ss = array();
                                $j = 0;
                                foreach ($sec_details as $setting_name => $setting_vals) {

                                    $optin_key = 'xevents_' . $head . '_' . $setting_name;

                                    if (isset($_POST[$update])) {

                                        $new_val = $_POST[$optin_key];
                                        $m = 0;
                                        foreach ($new_val as $update_attr_key => $update_attr_vals)
                                            foreach ($update_attr_vals as $update_value) {
                                                $new_val[$update_attr_key][$m] = wp_kses($update_value, $allowedposttags);
                                                $m++;
                                            }
                                        $result = update_option($optin_key, $new_val);
                                    }


                                    if (get_option($optin_key) === false) {
                                        $val_so[] = $default = array($setting_name => array($setting_vals['default']));
                                        update_option($optin_key, $default);
                                    }
                                    else
                                        $val_so[] = get_option($optin_key);
                                }
                                $i = 0;
                                $j = 0;

                                foreach ($val_so as $val_so1) {

                                    $j = 0;
                                    if (is_array($val_so1))
                                        foreach ($val_so1 as $setting_name => $vals) {
                                            foreach ($vals as $val) {

                                                $ss[$j][$setting_name] = $val_so[$i][$setting_name][$j];


                                                $num = count($vals);

                                                $j++;
                                            }
                                        }
                                    $i++;
                                }

                                update_option('biz-' . $head . '-' . $section['prefix'], $ss);

                                if (is_array($ss)) {
                                    ?>
                    <?php foreach ($ss as $se) { ?>
                                        <div  class="form-group mvb_main_inline <?php echo $head . '-' . $section['prefix'] . '-add-div'; ?>"> 
                                            <div class="brick small"><div class="mvb_barname"><?php echo $section['name'] ?><span class="fa fa-chevron-down"></span></div></div>
                                            <div class="inline_shortcode_options" style="display: none;">
                                                <?php
                                                foreach ($se as $setting_name => $value) {

                                                    $optin_key = 'xevents_' . $head . '_' . $setting_name;


                                                    $setting_vals['name'] = $sec_details[$setting_name]['name'];
                                                    $setting_vals['type'] = $sec_details[$setting_name]['type'];
                                                    $setting_vals['values'] = $sec_details[$setting_name]['values'];

                                                    if ($setting_vals['type'] == 'select')
                                                        $setting_vals['multi'] = $sec_details[$setting_name]['multi'];
                                                    ?>
                                                    <div class="form-group">
                                                        <div for="review" class="col-sm-4 control-label"><?php echo $setting_vals['name']; ?></div>
                                                        <div class="col-sm-11">

                                                            <?php if ($setting_vals['type'] == "text") { ?>
                                                                <input type="text" class="form-control"  name="<?php echo $optin_key; ?>[<?php echo $setting_name; ?>][]" value="<?php echo esc_attr($value); ?>" <?php echo $status; ?>>
                                                                <?php
                                                            } else if ($setting_vals['type'] == "select") {
                                                                if ($setting_vals['multi'] == 'true')
                                                                    $value = explode(',', $value);

                                                                // var_dump($value);
                                                                ?>
                                                                <select name="<?php echo $optin_key; ?>[<?php echo $setting_name; ?>][]"  class="form-control"  value="<?php esc_attr($value); ?>" <?php if ($setting_vals['multi'] == 'true') echo ' multiple'; ?> <?php echo $status; ?>>
                                                                    <?php
                                                                    foreach ($setting_vals['values'] as $val) {
                                                                        //  foreach($value as $user_val)
                                                                        ?>
                                                                        <?php
                                                                        if (is_array($value)) {
                                                                            if (in_array($val, $value))
                                                                                $selected = "selected";
                                                                            else
                                                                                $selected = "";
                                                                        }else if ($value == $val)
                                                                            $selected = "selected";
                                                                        else
                                                                            $selected = "";
                                                                        ?>  
                                                                        <option <?php echo $selected; ?>><?php echo esc_attr($val); ?></option>

                                <?php } ?>
                                                                </select>    

                            <?php } else if ($setting_vals['type'] == "color") { ?>
                                                                <input class="allday-colorpicker" type="text" name="<?php echo $optin_key; ?>[<?php echo $setting_name; ?>][]"  value="<?php echo esc_attr($value); ?>" <?php echo $status; ?>>

                            <?php } else if ($setting_vals['type'] == "image") { ?>
                                                                <a class="<?php (!$status) ? '' : 'biz_select_images' ?>">Select Image</a>
                                                                <input type="hidden" name="<?php echo $optin_key; ?>[<?php echo $setting_name; ?>][]"  class="form-control"  value="<?php echo esc_attr($value); ?>" <?php echo $status; ?>>
                                                                <div class="biz_images_container">
                                                                        <?php if ($value) { ?>
                                                                        <div  class='mvb_thumb small' ><img height='150px' width='60%' title='image for ads'  src="<?php
                                                                            $args = array(
                                                                                'post_type' => 'attachment',
                                                                                'numberposts' => -1,
                                                                                'post_status' => null,
                                                                                'post_parent' => null);
                                                                            $posts = get_posts($args);
                                                                            if ($posts) {
                                                                                foreach ($posts as $post)
                                                                                    if ($post->ID == $value) {
                                                                                        $img_url = $post->guid;
                                                                                        $img_title = $post->post_title;
                                                                                        echo $img_url;
                                                                                    }
                                                                            }
                                                                            ?>"><div id="<?php echo $value; ?>" class='mvb_image_delete'>&times;</div></div>
                                <?php } ?>
                                                                </div>

                            <?php } else if ($setting_vals['type'] == "textarea") { ?>
                                                                <textarea name="<?php echo $optin_key; ?>[<?php echo $setting_name; ?>][]" class="form-control" rows="2" <?php echo $status; ?>> <?php echo esc_textarea(stripslashes($value)); ?></textarea>

                            <?php } ?>

                                                        </div>
                                                    </div>


                                                    <?php // }    ?>

                        <?php } ?>
                                            </div></div>

                                    <?php } ?>

                                    <?php
                                }
                            }/*                             * ****************************multiple******************************** */
                            if ($section['type'] == 'multifields') {
                                ?>

                                <div class="col-sm-12">     <a id="<?php echo $head . '-' . $section['prefix'] . '-add'; ?>">Add</a></div>
                                <script>jQuery(document).ready(function($) {
                                        $(document).on("click", '#<?php echo $head . '-' . $section['prefix'] . '-add'; ?>', function(event) {
                                            event.preventDefault();

                                            var eltoclone = $('.<?php echo $head . '-' . $section['prefix'] . '-add-div'; ?>').last();
                                            var content = eltoclone.clone();
                                            eltoclone.after(content);
                                            var cloned = $('.<?php echo $head . '-' . $section['prefix'] . '-add-div'; ?>').last();
                                            if (cloned.find(".mvb_delete_inline").attr("class") == undefined)
                                                cloned.find(".mvb_barname").after('<a class="mvb_delete_inline" >&times;</a>');
                                        });


                                        var multi_div = $('.<?php echo $head . '-' . $section['prefix'] . '-add-div'; ?>:not(:first)');
                                        if (multi_div.find(".mvb_delete_inline").attr("class") == undefined)
                                            multi_div.find(".mvb_barname").after('<a class="mvb_delete_inline" >&times;</a>');


                                        $('select[name="biz_slider_elemnet[elemnet][]"]').each(function() {

                                            if ($(this).val() == 'text') {
                                                $(this).parent().next('label').hide();
                                                $(this).parent().next('label').next('.col-sm-7').hide();
                                            } else {
                                                $(this).parent().next('label').show();
                                                $(this).parent().next('label').next('.col-sm-7').show();
                                            }
                                            $(this).change(function() { //alert('yes'); 
                                                if ($(this).val() == 'text') {
                                                    $(this).parent().next('label').hide();
                                                    $(this).parent().next('label').next('.col-sm-7').hide();
                                                } else {
                                                    $(this).parent().next('label').show();
                                                    $(this).parent().next('label').next('.col-sm-7').show();
                                                }
                                            });
                                        });


                                    });</script>
                                <?php
                            }
                        }
                        ?>
                        <div class="form-group">
                            <div class="col-sm-11">
                                <input  type="hidden" class="form-control" name="update" value="Y" />         

                                <input class="biz_submit" type="hidden" class="form-control" name="<?php echo $update; ?>" value="Y" />         
                                <input  type="submit" class="form-control btn-primary"  value="Save Settings" />    
                            </div>
                        </div> 
                    </form>   
                </div>

    <?php } ?>

            <script>jQuery(document).ready(function($) {

                    $(document).on("click", ".mvb_barname", function(event) {

                        $(this).parent(".brick").next(".inline_shortcode_options").slideToggle();
                    });

                    $(document).on("click", ".mvb_delete_inline", function(e) {
                        $(this).parent(".brick").parent().remove();
                    });
                });
            </script>


            <!--**********************************************Articles Settings**********************************************-->
            <div class="tab-pane fade col-sm-12" id="biz_live_customizer">
                <form class="form-horizontal" role="form" method="POST" >
                    <div class="setting_head"> <div class="col-sm-7">FrontEnd Live Customizer</div></div>
                    <div class="form-group">    


                        <div for="review" class="col-sm-4 control-label"></div>
                        <div class="col-sm-11">
                            <a  href="<?php echo admin_url() . 'customize.php' ?>">FrontEnd Live Customizer</a> :customize style of each element of Xevent and live preview to each customizing action( Full Options with Google Fonts available via Premium Version).
                            <a href="<?php echo admin_url() . 'customize.php' ?>"> Go To Live Customizer Panel</a>

                        </div>  
                    </div>
                </form>
            </div>

        </div>
    </div>
    <?php
}

function xevents_enq_bootstrap() {

    //image picker

    wp_register_script('image-picker', get_template_directory_uri() . '/biz/assets/image-picker/image-picker.min.js', array('jquery'));
    wp_register_style('image-picker', get_template_directory_uri() . '/biz/assets/image-picker/image-picker.css');
    wp_enqueue_style('image-picker');
    wp_enqueue_script('image-picker');

    //

    wp_register_style('biz-css-set', get_template_directory_uri() . '/biz/css/set.css');
    wp_enqueue_style('biz-css-set');


    wp_register_script('biz-js-ghandler', get_template_directory_uri() . '/biz/js/gallery_handler.js', array('jquery'));
    wp_enqueue_script('jquery');
    wp_enqueue_media();
    wp_enqueue_script('biz-js-ghandler');



    wp_register_script('biz-js-spectrum', get_template_directory_uri() . '/biz/assets/spectrum/spectrum.js', array('jquery'));
    wp_register_style('biz-css-spectrum', get_template_directory_uri() . '/biz/assets/spectrum/spectrum.css');
    wp_enqueue_style('biz-css-spectrum');
    wp_enqueue_script('biz-js-spectrum');


    wp_register_script('biz-js-bootstrap', get_template_directory_uri() . '/biz/assets/bootstrap/js/bootstrap.min.js', array('jquery'));
    wp_register_style('biz-css-bootstrap', get_template_directory_uri() . '/biz/assets/bootstrap/css/bootstrap.css');
    wp_register_style('biz-css-theme-bootstrap', get_template_directory_uri() . '/biz/assets/bootstrap/css/bootstrap-theme.min.css');
    wp_enqueue_style('biz-css-bootstrap');
    wp_enqueue_style('biz-css-theme-bootstrap');
    wp_enqueue_script('biz-js-bootstrap');


    // radio style switcher
    wp_register_style('biz-radio-style', get_template_directory_uri() . '/biz/assets/postcontrol/check.css');
    wp_enqueue_style('biz-radio-style');
    wp_register_script('biz-js-radio', get_template_directory_uri() . '/biz/assets/postcontrol/jquery.customInput.js', array('jquery'));
    wp_enqueue_script('biz-js-radio');
    wp_register_script('biz-js-radio-call', get_template_directory_uri() . '/biz/assets/postcontrol/addcheck.js', array('jquery'));
    wp_enqueue_script('biz-js-radio-call');
}

add_action("admin_menu", "xevents_theme_admin_menus");
?>