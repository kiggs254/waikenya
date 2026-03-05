<?php
/**
 * Plugin Name: WAI Kenya Headless CMS
 * Plugin URI:  https://waikenyachapter.com
 * Description: Registers Team, Events, Scholarships, Pioneers, and Partners custom post types, adds admin meta boxes, and exposes the data seamlessly to the WP REST API for the Next.js frontend. Also seeds initial data upon activation.
 * Version:     1.1.0
 * Author:      AI Assistant
 * License:     GPL2
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class WAI_Kenya_Headless_CMS {

    public function __construct() {
        // Register Post Types & Meta early
        add_action( 'init', [ $this, 'register_cpts' ] );
        add_action( 'init', [ $this, 'register_meta_fields' ] );
        
        // Setup Admin Meta Boxes
        add_action( 'add_meta_boxes', [ $this, 'add_custom_meta_boxes' ] );
        add_action( 'save_post', [ $this, 'save_meta_box_data' ] );
        
        // Modify REST API output
        add_action( 'rest_api_init', [ $this, 'expose_featured_image_url' ] );
    }

    /**
     * 1. Register Custom Post Types
     */
    public function register_cpts() {
        $post_types = [
            'wai_team' => [
                'name'     => 'Team Members',
                'singular' => 'Team Member',
                'icon'     => 'dashicons-groups',
            ],
            'wai_event' => [
                'name'     => 'Events',
                'singular' => 'Event',
                'icon'     => 'dashicons-calendar-alt',
            ],
            'wai_scholarship' => [
                'name'     => 'Scholarships',
                'singular' => 'Scholarship',
                'icon'     => 'dashicons-awards',
            ],
            'wai_pioneer' => [
                'name'     => 'Pioneers',
                'singular' => 'Pioneer',
                'icon'     => 'dashicons-star-filled',
            ],
            'wai_partner' => [
                'name'     => 'Partners',
                'singular' => 'Partner',
                'icon'     => 'dashicons-networking',
            ],
            'wai_gallery' => [
                'name'     => 'Gallery Images',
                'singular' => 'Gallery Image',
                'icon'     => 'dashicons-format-gallery',
            ],
        ];

        foreach ( $post_types as $type => $info ) {
            register_post_type( $type, [
                'labels' => [
                    'name'          => $info['name'],
                    'singular_name' => $info['singular'],
                    'menu_name'     => $info['name'],
                    'add_new'       => 'Add New',
                    'add_new_item'  => 'Add New ' . $info['singular'],
                ],
                'public'       => true,
                'show_in_rest' => true, // Essential for Gutenberg & exposes to wp-json/wp/v2/
                'menu_icon'    => $info['icon'],
                'supports'     => [ 'title', 'editor', 'thumbnail', 'custom-fields' ],
                'has_archive'  => true,
                'rewrite'      => [ 'slug' => str_replace('wai_', '', $type) . 's' ],
            ] );
        }
    }

    /**
     * 2. Register REST Meta Fields
     */
    public function register_meta_fields() {
        $meta_schema = [
            'wai_team'        => [ 'role', 'company', 'linkedin_url', 'external_avatar' ],
            'wai_event'       => [ 'event_date', 'venue', 'category', 'edition', 'hashtags', 'highlights', 'external_url' ],
            'wai_scholarship' => [ 'amount', 'deadline', 'status', 'application_link' ],
            'wai_pioneer'     => [ 'note' ],
            'wai_partner'     => [ 'website_url' ]
        ];

        foreach ( $meta_schema as $cpt => $fields ) {
            foreach ( $fields as $field ) {
                // Ensure array data (like highlights) is exposed properly, fall back to string
                register_post_meta( $cpt, $field, [
                    'show_in_rest' => true,
                    'single'       => true,
                    'type'         => 'string',
                ] );
            }
        }
    }

    /**
     * 3. Add Custom Meta Boxes to the WP Admin Screen
     */
    public function add_custom_meta_boxes() {
        add_meta_box( 'wai_team_meta', 'Team Member Details', [ $this, 'render_team_meta' ], 'wai_team', 'normal', 'high' );
        add_meta_box( 'wai_event_meta', 'Event Details', [ $this, 'render_event_meta' ], 'wai_event', 'normal', 'high' );
        add_meta_box( 'wai_scholarship_meta', 'Scholarship Details', [ $this, 'render_scholarship_meta' ], 'wai_scholarship', 'normal', 'high' );
        add_meta_box( 'wai_pioneer_meta', 'Pioneer Details', [ $this, 'render_pioneer_meta' ], 'wai_pioneer', 'normal', 'high' );
        add_meta_box( 'wai_partner_meta', 'Partner Details', [ $this, 'render_partner_meta' ], 'wai_partner', 'normal', 'high' );
    }

    /* --- Meta Box Render Functions --- */

    public function render_team_meta( $post ) {
        wp_nonce_field( 'wai_save_meta', 'wai_meta_nonce' );
        $this->render_input( 'role', 'Role (e.g. Founder & President)', get_post_meta( $post->ID, 'role', true ) );
        $this->render_input( 'company', 'Company (e.g. Kenya Airways)', get_post_meta( $post->ID, 'company', true ) );
        $this->render_input( 'linkedin_url', 'LinkedIn URL', get_post_meta( $post->ID, 'linkedin_url', true ), 'url' );
        $this->render_input( 'external_avatar', 'External Avatar Image URL', get_post_meta( $post->ID, 'external_avatar', true ), 'url' );
    }

    public function render_event_meta( $post ) {
        wp_nonce_field( 'wai_save_meta', 'wai_meta_nonce' );
        $category = get_post_meta( $post->ID, 'category', true );
        
        $this->render_input( 'event_date', 'Date (YYYY-MM-DD)', get_post_meta( $post->ID, 'event_date', true ), 'date' );
        $this->render_input( 'venue', 'Venue (e.g. Astral Aerial Aviation)', get_post_meta( $post->ID, 'venue', true ) );
        
        echo "<p><label style='font-weight:bold; display:block; margin-bottom:5px;'>Category</label>
              <select name='category' style='width:100%; max-width:400px;'>";
        $cats = [ 'Girls in Aviation', 'Conference', 'Outreach' ];
        foreach ( $cats as $cat ) {
            $selected = ( $category === $cat ) ? 'selected' : '';
            echo "<option value='" . esc_attr( $cat ) . "' $selected>" . esc_html( $cat ) . "</option>";
        }
        echo "</select></p>";

        $this->render_input( 'edition', 'Edition (e.g. 7th Annual)', get_post_meta( $post->ID, 'edition', true ) );
        $this->render_input( 'hashtags', 'Hashtags (Comma separated, e.g. #GIAD2021, #mentorshipmatters)', get_post_meta( $post->ID, 'hashtags', true ) );
        $this->render_input( 'highlights', 'Highlights (Comma separated, e.g. Keynote speakers, Scholarship awards)', get_post_meta( $post->ID, 'highlights', true ) );
        $this->render_input( 'external_url', 'External Link URL', get_post_meta( $post->ID, 'external_url', true ), 'url' );
    }

    public function render_scholarship_meta( $post ) {
        wp_nonce_field( 'wai_save_meta', 'wai_meta_nonce' );
        $status = get_post_meta( $post->ID, 'status', true );
        
        $this->render_input( 'amount', 'Amount / Value (e.g. Ksh 100,000 or Fully Sponsored)', get_post_meta( $post->ID, 'amount', true ) );
        $this->render_input( 'deadline', 'Deadline (e.g. November 30, 2024)', get_post_meta( $post->ID, 'deadline', true ) );
        
        echo "<p><label style='font-weight:bold; display:block; margin-bottom:5px;'>Status</label>
              <select name='status' style='width:100%; max-width:400px;'>";
        $statuses = [ 'Open', 'Upcoming', 'Closed' ];
        foreach ( $statuses as $st ) {
            $selected = ( $status === $st ) ? 'selected' : '';
            echo "<option value='" . esc_attr( $st ) . "' $selected>" . esc_html( $st ) . "</option>";
        }
        echo "</select></p>";
        
        $this->render_input( 'application_link', 'Application URL', get_post_meta( $post->ID, 'application_link', true ), 'url' );
    }

    public function render_pioneer_meta( $post ) {
        wp_nonce_field( 'wai_save_meta', 'wai_meta_nonce' );
        $this->render_input( 'note', 'Achievement / Note (e.g. First woman to fly solo across the Atlantic)', get_post_meta( $post->ID, 'note', true ) );
    }

    public function render_partner_meta( $post ) {
        wp_nonce_field( 'wai_save_meta', 'wai_meta_nonce' );
        $this->render_input( 'website_url', 'Partner Website URL (e.g. https://example.com)', get_post_meta( $post->ID, 'website_url', true ), 'url' );
    }

    /**
     * Helper to render basic text inputs
     */
    private function render_input( $name, $label, $value, $type = 'text' ) {
        echo "<p>
                <label style='font-weight:bold; display:block; margin-bottom:5px;'>" . esc_html( $label ) . "</label>
                <input type='" . esc_attr( $type ) . "' name='" . esc_attr( $name ) . "' value='" . esc_attr( $value ) . "' style='width:100%; max-width:100%;' />
              </p>";
    }

    /**
     * 4. Save Meta Box Data
     */
    public function save_meta_box_data( $post_id ) {
        // Security checks
        if ( ! isset( $_POST['wai_meta_nonce'] ) || ! wp_verify_nonce( $_POST['wai_meta_nonce'], 'wai_save_meta' ) ) return;
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
        if ( ! current_user_can( 'edit_post', $post_id ) ) return;

        $fields = [
            'role', 'company', 'linkedin_url', 'external_avatar',
            'event_date', 'venue', 'category', 'edition', 'hashtags', 'highlights', 'external_url',
            'amount', 'deadline', 'status', 'application_link',
            'note', 'website_url'
        ];

        foreach ( $fields as $field ) {
            if ( isset( $_POST[ $field ] ) ) {
                update_post_meta( $post_id, $field, sanitize_text_field( wp_unslash( $_POST[ $field ] ) ) );
            }
        }
    }

    /**
     * 5. Expose Featured Image URL directly in REST response
     */
    public function expose_featured_image_url() {
        $post_types = [ 'wai_team', 'wai_event', 'wai_scholarship', 'wai_pioneer', 'wai_partner', 'wai_gallery', 'post', 'page' ];
        
        foreach ( $post_types as $pt ) {
            register_rest_field( $pt, 'featured_image_url', [
                'get_callback' => function( $post_arr ) {
                    $image_id = $post_arr['featured_media'];
                    if ( $image_id ) {
                        return wp_get_attachment_image_url( $image_id, 'full' );
                    }
                    return null;
                },
                'schema' => [
                    'description' => 'Direct URL to the featured image.',
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit', 'embed' ],
                ],
            ] );
        }
    }
}

// Initialize the plugin
new WAI_Kenya_Headless_CMS();
