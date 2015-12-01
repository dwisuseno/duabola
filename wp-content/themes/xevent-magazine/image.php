<?php
/**
 * The template for displaying image attachments
 * xevents WordPress Theme 
 * Theme URI: http:/www.wpmeal.com/xevents
 */
// Retrieve attachment metadata.
$metadata = wp_get_attachment_metadata();

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
// Start the Loop.
                    while (have_posts()) : the_post();
                        ?>
                        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                            <header class="entry-header">
                                <?php the_title('<h1 class="entry-title">', '</h1>'); ?>

                                <div class="entry-meta">

                                    <span class="entry-date"><time class="entry-date" datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date()); ?></time></span>

                                    <span class="full-size-link"><a href="<?php echo wp_get_attachment_url(); ?>"><?php echo $metadata['width']; ?> &times; <?php echo $metadata['height']; ?></a></span>

                                    <span class="parent-post-link"><a href="<?php echo get_permalink($post->post_parent); ?>" rel="gallery"><?php echo get_the_title($post->post_parent); ?></a></span>
                                    <?php edit_post_link(__('Edit', 'xevents'), '<span class="edit-link">', '</span>'); ?>
                                </div><!-- .entry-meta -->
                            </header><!-- .entry-header -->

                            <div class="entry-content">
                                <div class="entry-attachment">
                                    <div class="attachment">
                                        <?php   xevents_the_attached_image(); ?>
                                    </div><!-- .attachment -->

                                    <?php if (has_excerpt()) : ?>
                                        <div class="entry-caption">
                                            <?php   the_excerpt(); ?>
                                        </div><!-- .entry-caption -->
                                    <?php endif; ?>
                                </div><!-- .entry-attachment -->

                                <?php
                                the_content();
                                ?>
                            </div><!-- .entry-content -->
                        </article><!-- #post-## -->

                        <nav id="image-navigation" class="navigation image-navigation">
                            <div class="nav-links">
                                <?php previous_image_link(false, '<div class="pp_link"><span class="fa fa-angle-double-left"></span>' . __('Previous Image', 'xevents') . '</div>'); ?>
                                <?php next_image_link(false, '<div class="pp_link"><span class="fa fa-angle-double-left"></span>' . __('Next Image', 'xevents') . '</div>'); ?>
                            </div><!-- .nav-links -->
                        </nav><!-- #image-navigation -->

                        <?php comments_template(); ?>

                    <?php endwhile; // end of the loop. ?>

                </div><!-- #content -->
            </div>
        </section><!-- #primary -->
        <?php get_sidebar('secondary'); ?>
    </div>
    <?php get_sidebar('primary'); ?>
</div>
<?php
get_footer();
