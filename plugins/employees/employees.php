<?php
/*
Plugin Name: Employees with AJAX
Description: Displays employees through the WP-API
Version:     0.1
Author:      Laura Abend
Author URI:  https://github.com/thisisserious
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Domain Path: /languages
Text Domain: employees
*/

// Hook
function employees_scripts() {
  // Get plugin stylesheet
  wp_enqueue_style( 'employees-style', plugin_dir_url(__FILE__) . 'css/style.css', '0.1', 'all');
  wp_enqueue_script( 'employees-script', plugin_dir_url(__FILE__) . 'js/employees.ajax.js', array('jquery'), '0.1', true);
}
add_action( 'wp_enqueue_scripts', 'employees_scripts' );

// Base HTML to be added
function employees_baseline_html() {
  $baseline  = '<section id="get-more" class="get-more">';
  $baseline .= '<a href="#" class="get-more-employees">Load More</a>';
    $baseline .= '<div class="ajax-loader"><img src="' . plugin_dir_url( __FILE__ ) . 'css/spinner.svg" width="32" height="32" /></div>';
  $baseline .= '</section><!-- .get-more -->';
  return $baseline;
}

// Bootstrap onto page
function employees_display($content) {
  $content .= employees_baseline_html();
  return $content;
}
add_filter( 'the_content', 'employees_display' );
