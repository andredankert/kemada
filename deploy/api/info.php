<?php
// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Create a test response
$response = [
    'success' => true,
    'message' => 'PHP is working correctly',
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => phpversion(),
    'server_info' => $_SERVER['SERVER_SOFTWARE'],
    'server_name' => $_SERVER['SERVER_NAME'],
    'request_uri' => $_SERVER['REQUEST_URI'],
    'script_filename' => $_SERVER['SCRIPT_FILENAME'],
    'document_root' => $_SERVER['DOCUMENT_ROOT'],
    'mail_function_exists' => function_exists('mail') ? 'Yes' : 'No'
];

// Output the response
echo json_encode($response, JSON_PRETTY_PRINT); 