<?php
// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Get the requested URI
$request_uri = $_SERVER['REQUEST_URI'];

// Create a response
$response = [
    'success' => false,
    'message' => 'API endpoint not found',
    'request_uri' => $request_uri,
    'available_endpoints' => [
        '/api/contact',
        '/api/testimonial',
        '/api/info.php',
        '/api/test.php'
    ]
];

// Output the response with a 404 status code
http_response_code(404);
echo json_encode($response, JSON_PRETTY_PRINT); 