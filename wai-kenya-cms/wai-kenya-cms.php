<?php
/**
 * Plugin Name: WAI Kenya Headless CMS
 * Plugin URI:  https://waikenyachapter.com
 * Description: Registers Team, Events, Scholarships, Pioneers, Partners, and Gallery custom post types and exposes them to the WP REST API for the Next.js frontend.
 * Version:     1.3.0
 * Author:      WAI Kenya
 * License:     GPL2
 */

defined( 'ABSPATH' ) || exit;

/* ─────────────────────────────────────────────
   1. REGISTER CUSTOM POST TYPES
───────────────────────────────────────────── */
if ( ! function_exists( 'wai_kenya_register_cpts' ) ) {
    function wai_kenya_register_cpts() {
        $types = [
            'wai_team'        => [ 'Team Members',   'Team Member',   'dashicons-groups'          ],
            'wai_event'       => [ 'Events',          'Event',         'dashicons-calendar-alt'    ],
            'wai_scholarship' => [ 'Scholarships',    'Scholarship',   'dashicons-awards'          ],
            'wai_pioneer'     => [ 'Pioneers',        'Pioneer',       'dashicons-star-filled'     ],
            'wai_partner'     => [ 'Partners',        'Partner',       'dashicons-networking'      ],
            'wai_gallery'     => [ 'Gallery Images',  'Gallery Image', 'dashicons-format-gallery'  ],
        ];

        foreach ( $types as $slug => $info ) {
            $base_slug = str_replace( 'wai_', '', $slug );
            register_post_type( $slug, [
                'labels' => [
                    'name'          => $info[0],
                    'singular_name' => $info[1],
                    'menu_name'     => $info[0],
                    'add_new'       => 'Add New',
                    'add_new_item'  => 'Add New ' . $info[1],
                ],
                'public'       => true,
                'show_in_rest' => true,
                'menu_icon'    => $info[2],
                'supports'     => [ 'title', 'editor', 'thumbnail', 'custom-fields' ],
                'has_archive'  => true,
                'rewrite'      => [ 'slug' => $base_slug . 's' ],
            ] );
        }
    }
    add_action( 'init', 'wai_kenya_register_cpts' );
}

/* ─────────────────────────────────────────────
   2. REGISTER REST META FIELDS
───────────────────────────────────────────── */
if ( ! function_exists( 'wai_kenya_register_meta_fields' ) ) {
    function wai_kenya_register_meta_fields() {
        $schema = [
            'wai_team'        => [ 'role', 'company', 'linkedin_url', 'external_avatar' ],
            'wai_event'       => [ 'event_date', 'venue', 'wai_category', 'edition', 'hashtags', 'highlights', 'external_url' ],
            'wai_scholarship' => [ 'amount', 'deadline', 'wai_status', 'application_link' ],
            'wai_pioneer'     => [ 'note' ],
            'wai_partner'     => [ 'website_url' ],
        ];

        foreach ( $schema as $cpt => $fields ) {
            foreach ( $fields as $field ) {
                register_post_meta( $cpt, $field, [
                    'show_in_rest' => true,
                    'single'       => true,
                    'type'         => 'string',
                ] );
            }
        }
    }
    add_action( 'init', 'wai_kenya_register_meta_fields' );
}

/* ─────────────────────────────────────────────
   3. ADMIN META BOXES
───────────────────────────────────────────── */
if ( ! function_exists( 'wai_kenya_add_meta_boxes' ) ) {
    function wai_kenya_add_meta_boxes() {
        add_meta_box( 'wai_team_meta',        'Team Member Details',  'wai_kenya_render_team_meta',        'wai_team',        'normal', 'high' );
        add_meta_box( 'wai_event_meta',       'Event Details',        'wai_kenya_render_event_meta',       'wai_event',       'normal', 'high' );
        add_meta_box( 'wai_scholarship_meta', 'Scholarship Details',  'wai_kenya_render_scholarship_meta', 'wai_scholarship', 'normal', 'high' );
        add_meta_box( 'wai_pioneer_meta',     'Pioneer Details',      'wai_kenya_render_pioneer_meta',     'wai_pioneer',     'normal', 'high' );
        add_meta_box( 'wai_partner_meta',     'Partner Details',      'wai_kenya_render_partner_meta',     'wai_partner',     'normal', 'high' );
    }
    add_action( 'add_meta_boxes', 'wai_kenya_add_meta_boxes' );
}

/* ─────────────────────────────────────────────
   4. META BOX RENDER FUNCTIONS
───────────────────────────────────────────── */
if ( ! function_exists( 'wai_kenya_input' ) ) {
    function wai_kenya_input( $name, $label, $value, $type = 'text' ) {
        printf(
            '<p><label style="font-weight:bold;display:block;margin-bottom:5px;">%s</label>
             <input type="%s" name="%s" value="%s" style="width:100%%;max-width:100%%;"></p>',
            esc_html( $label ),
            esc_attr( $type ),
            esc_attr( $name ),
            esc_attr( $value )
        );
    }
}

if ( ! function_exists( 'wai_kenya_render_team_meta' ) ) {
    function wai_kenya_render_team_meta( $post ) {
        wp_nonce_field( 'wai_save_meta', 'wai_meta_nonce' );
        wai_kenya_input( 'role',            'Role (e.g. Founder & President)',         get_post_meta( $post->ID, 'role',            true ) );
        wai_kenya_input( 'company',         'Company (e.g. Kenya Airways)',             get_post_meta( $post->ID, 'company',         true ) );
        wai_kenya_input( 'linkedin_url',    'LinkedIn URL',                             get_post_meta( $post->ID, 'linkedin_url',    true ), 'url' );
        wai_kenya_input( 'external_avatar', 'External Avatar Image URL',               get_post_meta( $post->ID, 'external_avatar', true ), 'url' );
    }
}

if ( ! function_exists( 'wai_kenya_render_event_meta' ) ) {
    function wai_kenya_render_event_meta( $post ) {
        wp_nonce_field( 'wai_save_meta', 'wai_meta_nonce' );
        $cat = get_post_meta( $post->ID, 'wai_category', true );

        wai_kenya_input( 'event_date', 'Date (YYYY-MM-DD)', get_post_meta( $post->ID, 'event_date', true ), 'date' );
        wai_kenya_input( 'venue',      'Venue',             get_post_meta( $post->ID, 'venue',      true ) );

        echo "<p><label style='font-weight:bold;display:block;margin-bottom:5px;'>Category</label>
              <select name='wai_category' style='width:100%;max-width:400px;'>";
        foreach ( [ 'Girls in Aviation', 'Conference', 'Outreach' ] as $c ) {
            printf( "<option value='%s' %s>%s</option>", esc_attr( $c ), selected( $cat, $c, false ), esc_html( $c ) );
        }
        echo "</select></p>";

        wai_kenya_input( 'edition',      'Edition (e.g. 7th Annual)',                               get_post_meta( $post->ID, 'edition',      true ) );
        wai_kenya_input( 'hashtags',     'Hashtags (comma-separated, e.g. #GIAD2021)',              get_post_meta( $post->ID, 'hashtags',     true ) );
        wai_kenya_input( 'highlights',   'Highlights (comma-separated, e.g. Keynote speakers)',    get_post_meta( $post->ID, 'highlights',   true ) );
        wai_kenya_input( 'external_url', 'External Link URL',                                       get_post_meta( $post->ID, 'external_url', true ), 'url' );
    }
}

if ( ! function_exists( 'wai_kenya_render_scholarship_meta' ) ) {
    function wai_kenya_render_scholarship_meta( $post ) {
        wp_nonce_field( 'wai_save_meta', 'wai_meta_nonce' );
        $st = get_post_meta( $post->ID, 'wai_status', true );

        wai_kenya_input( 'amount',   'Amount / Value (e.g. Ksh 100,000)', get_post_meta( $post->ID, 'amount',   true ) );
        wai_kenya_input( 'deadline', 'Deadline (e.g. November 30, 2024)', get_post_meta( $post->ID, 'deadline', true ) );

        echo "<p><label style='font-weight:bold;display:block;margin-bottom:5px;'>Status</label>
              <select name='wai_status' style='width:100%;max-width:400px;'>";
        foreach ( [ 'Open', 'Upcoming', 'Closed' ] as $s ) {
            printf( "<option value='%s' %s>%s</option>", esc_attr( $s ), selected( $st, $s, false ), esc_html( $s ) );
        }
        echo "</select></p>";

        wai_kenya_input( 'application_link', 'Application URL', get_post_meta( $post->ID, 'application_link', true ), 'url' );
    }
}

if ( ! function_exists( 'wai_kenya_render_pioneer_meta' ) ) {
    function wai_kenya_render_pioneer_meta( $post ) {
        wp_nonce_field( 'wai_save_meta', 'wai_meta_nonce' );
        wai_kenya_input( 'note', 'Achievement / Note', get_post_meta( $post->ID, 'note', true ) );
    }
}

if ( ! function_exists( 'wai_kenya_render_partner_meta' ) ) {
    function wai_kenya_render_partner_meta( $post ) {
        wp_nonce_field( 'wai_save_meta', 'wai_meta_nonce' );
        wai_kenya_input( 'website_url', 'Partner Website URL', get_post_meta( $post->ID, 'website_url', true ), 'url' );
    }
}

/* ─────────────────────────────────────────────
   5. SAVE META BOX DATA
───────────────────────────────────────────── */
if ( ! function_exists( 'wai_kenya_save_meta' ) ) {
    function wai_kenya_save_meta( $post_id ) {
        if ( ! isset( $_POST['wai_meta_nonce'] ) ) return;
        if ( ! wp_verify_nonce( $_POST['wai_meta_nonce'], 'wai_save_meta' ) ) return;
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
        if ( ! current_user_can( 'edit_post', $post_id ) ) return;

        $fields = [
            'role', 'company', 'linkedin_url', 'external_avatar',
            'event_date', 'venue', 'wai_category', 'edition', 'hashtags', 'highlights', 'external_url',
            'amount', 'deadline', 'wai_status', 'application_link',
            'note', 'website_url',
        ];

        foreach ( $fields as $field ) {
            if ( isset( $_POST[ $field ] ) ) {
                update_post_meta( $post_id, $field, sanitize_text_field( wp_unslash( $_POST[ $field ] ) ) );
            }
        }
    }
    add_action( 'save_post', 'wai_kenya_save_meta' );
}

/* ─────────────────────────────────────────────
   6. EXPOSE FEATURED IMAGE URL IN REST API
───────────────────────────────────────────── */
if ( ! function_exists( 'wai_kenya_expose_featured_image' ) ) {
    function wai_kenya_expose_featured_image() {
        $types = [ 'wai_team', 'wai_event', 'wai_scholarship', 'wai_pioneer', 'wai_partner', 'wai_gallery', 'post', 'page' ];
        foreach ( $types as $pt ) {
            register_rest_field( $pt, 'featured_image_url', [
                'get_callback' => function( $post_arr ) {
                    $id = ! empty( $post_arr['featured_media'] ) ? (int) $post_arr['featured_media'] : 0;
                    return $id ? wp_get_attachment_image_url( $id, 'full' ) : null;
                },
                'schema' => [
                    'description' => 'Full URL of the featured image.',
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit', 'embed' ],
                ],
            ] );
        }
    }
    add_action( 'rest_api_init', 'wai_kenya_expose_featured_image' );
}

/* ─────────────────────────────────────────────
   7. BULK GALLERY UPLOAD — Admin Page
───────────────────────────────────────────── */
if ( ! function_exists( 'wai_kenya_bulk_gallery_menu' ) ) {
    function wai_kenya_bulk_gallery_menu() {
        add_submenu_page(
            'edit.php?post_type=wai_gallery',
            'Bulk Upload Gallery Images',
            '📤 Bulk Upload',
            'edit_posts',
            'wai-bulk-gallery',
            'wai_kenya_bulk_gallery_page'
        );
    }
    add_action( 'admin_menu', 'wai_kenya_bulk_gallery_menu' );
}

if ( ! function_exists( 'wai_kenya_bulk_gallery_page' ) ) {
    function wai_kenya_bulk_gallery_page() {
        ?>
        <div class="wrap">
            <h1>📤 Bulk Upload Gallery Images</h1>
            <p style="color:#555;font-size:14px;margin-bottom:20px;">
                Click <strong>"Select Images"</strong>, choose as many photos as you like from the Media Library
                (or upload new ones), then click <strong>"Add to Gallery"</strong>. A Gallery post will be
                created automatically for each image — no manual entry needed.
            </p>

            <button id="wai-open-media" class="button button-primary button-large">
                🖼️ Select Images from Media Library
            </button>

            <div id="wai-preview-wrap" style="margin-top:24px;display:flex;flex-wrap:wrap;gap:12px;"></div>

            <div id="wai-upload-actions" style="margin-top:20px;display:none;">
                <button id="wai-do-upload" class="button button-primary button-large">
                    ✅ Add Selected Images to Gallery
                </button>
                <span id="wai-status" style="margin-left:16px;font-size:14px;color:#2271b1;vertical-align:middle;"></span>
            </div>
        </div>

        <script>
        (function($) {
            var frame, selectedIds = [];

            $('#wai-open-media').on('click', function(e) {
                e.preventDefault();

                if ( frame ) { frame.open(); return; }

                frame = wp.media({
                    title:    'Select Gallery Images',
                    button:   { text: 'Add to Gallery' },
                    multiple: true,
                    library:  { type: 'image' }
                });

                frame.on('select', function() {
                    var attachments = frame.state().get('selection').toJSON();
                    selectedIds = attachments.map(function(a){ return a.id; });

                    // Render thumbnails
                    var $wrap = $('#wai-preview-wrap').empty();
                    attachments.forEach(function(a) {
                        var thumb = (a.sizes && a.sizes.thumbnail) ? a.sizes.thumbnail.url : a.url;
                        $wrap.append(
                            $('<div>').css({position:'relative',display:'inline-block'}).append(
                                $('<img>').attr('src', thumb).css({width:120,height:120,objectFit:'cover',borderRadius:4,border:'2px solid #2271b1'})
                            ).append(
                                $('<p>').text(a.filename || a.title).css({fontSize:11,textAlign:'center',maxWidth:120,overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis',margin:'4px 0 0'})
                            )
                        );
                    });

                    if ( selectedIds.length > 0 ) {
                        $('#wai-upload-actions').show();
                        $('#wai-status').text(selectedIds.length + ' image(s) selected.');
                    }
                });

                frame.open();
            });

            $('#wai-do-upload').on('click', function() {
                if ( ! selectedIds.length ) return;

                var $btn    = $(this).prop('disabled', true).text('⏳ Creating posts…');
                var $status = $('#wai-status');
                var done    = 0;

                $status.text('0 / ' + selectedIds.length + ' done…');

                function processNext(i) {
                    if ( i >= selectedIds.length ) {
                        $btn.text('✅ Done!');
                        $status.css('color','#00a32a').text('All ' + done + ' image(s) added to the gallery!');
                        // Refresh the gallery list after 2s
                        setTimeout(function(){ window.location.href = 'edit.php?post_type=wai_gallery'; }, 2000);
                        return;
                    }

                    $.post(ajaxurl, {
                        action:    'wai_create_gallery_post',
                        attach_id: selectedIds[i],
                        nonce:     waiGallery.nonce
                    }, function(res) {
                        if ( res.success ) done++;
                        $status.text((i+1) + ' / ' + selectedIds.length + ' done…');
                        processNext(i + 1);
                    }).fail(function() {
                        processNext(i + 1); // skip on error
                    });
                }

                processNext(0);
            });

        }(jQuery));
        </script>
        <?php
    }
}

/* Enqueue WP media + inline nonce for the bulk upload page */
if ( ! function_exists( 'wai_kenya_bulk_gallery_scripts' ) ) {
    function wai_kenya_bulk_gallery_scripts( $hook ) {
        if ( strpos( $hook, 'wai-bulk-gallery' ) === false ) return;
        wp_enqueue_media();
        wp_add_inline_script( 'jquery', 'var waiGallery = ' . json_encode([
            'nonce' => wp_create_nonce( 'wai_bulk_gallery' )
        ]) . ';' );
    }
    add_action( 'admin_enqueue_scripts', 'wai_kenya_bulk_gallery_scripts' );
}

/* AJAX handler — creates one wai_gallery post per image */
if ( ! function_exists( 'wai_kenya_create_gallery_post' ) ) {
    function wai_kenya_create_gallery_post() {
        check_ajax_referer( 'wai_bulk_gallery', 'nonce' );

        if ( ! current_user_can( 'edit_posts' ) ) {
            wp_send_json_error( 'Unauthorised' );
        }

        $attach_id = intval( $_POST['attach_id'] ?? 0 );
        if ( ! $attach_id ) {
            wp_send_json_error( 'No attachment ID' );
        }

        // Use the attachment filename as the post title
        $title = get_the_title( $attach_id );
        if ( ! $title ) {
            $title = 'Gallery Image ' . $attach_id;
        }

        $post_id = wp_insert_post( [
            'post_type'   => 'wai_gallery',
            'post_title'  => sanitize_text_field( $title ),
            'post_status' => 'publish',
        ], true );

        if ( is_wp_error( $post_id ) ) {
            wp_send_json_error( $post_id->get_error_message() );
        }

        // Set the chosen image as the featured image
        set_post_thumbnail( $post_id, $attach_id );

        wp_send_json_success( [ 'post_id' => $post_id ] );
    }
    add_action( 'wp_ajax_wai_create_gallery_post', 'wai_kenya_create_gallery_post' );
}
