<?php
// Set headers for JSON response
header('Content-Type: application/json');

// Create a test response
$response = [
    'success' => true,
    'message' => 'PHP is working correctly',
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => phpversion(),
    'server_info' => $_SERVER['SERVER_SOFTWARE'],
    'mail_function_exists' => function_exists('mail') ? 'Yes' : 'No'
];

// Output the response
echo json_encode($response, JSON_PRETTY_PRINT); 