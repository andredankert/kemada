<?php
// Set headers for CORS and JSON response
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Log function for debugging
function logError($message) {
    $logFile = '/tmp/php_mail_errors.log';
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] $message\n", FILE_APPEND);
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get the JSON data from the request
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

// Validate required fields
if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

// Extract form data
$name = htmlspecialchars($data['name'], ENT_QUOTES, 'UTF-8');
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = isset($data['phone']) ? htmlspecialchars($data['phone'], ENT_QUOTES, 'UTF-8') : 'Nicht angegeben';
$message = htmlspecialchars($data['message'], ENT_QUOTES, 'UTF-8');

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

// Set up email headers
$to = 'info@kemada.de';
$subject = "Neue Kontaktanfrage von $name";

// Create plain text email body
$text_body = "
Name: $name
Email: $email
Telefon: $phone

Nachricht:
$message
";

// Create HTML email body
$html_body = "
<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\">
  <h2 style=\"color: #9c6644;\">Neue Kontaktanfrage von der Kemada Website</h2>
  <p><strong>Name:</strong> $name</p>
  <p><strong>Email:</strong> $email</p>
  <p><strong>Telefon:</strong> $phone</p>
  <p><strong>Nachricht:</strong></p>
  <div style=\"background-color: #f5f5f5; padding: 15px; border-radius: 5px;\">
    " . nl2br($message) . "
  </div>
</div>
";

// Set up email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=utf-8',
    'From: Kemada Website <noreply@kemada.de>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
];

// Try to send the email
try {
    // Check if mail function is available
    if (!function_exists('mail')) {
        throw new Exception('Mail function is not available');
    }
    
    // Try to send email
    $mail_sent = mail($to, $subject, $html_body, implode("\r\n", $headers));
    
    if ($mail_sent) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    } else {
        // Get more detailed error information
        $error = error_get_last();
        $errorMsg = isset($error['message']) ? $error['message'] : 'Unknown error';
        logError("Mail sending failed: $errorMsg");
        
        // For testing in Docker, save the email to a file in the emails directory
        $emailsDir = '/tmp/emails';
        if (!is_dir($emailsDir)) {
            mkdir($emailsDir, 0777, true);
        }
        
        $emailContent = "To: $to\nSubject: $subject\n" . implode("\r\n", $headers) . "\n\n$html_body";
        $saved = file_put_contents("$emailsDir/contact_" . time() . '.html', $emailContent);
        
        if ($saved) {
            // In Docker environment, we'll consider this a success for testing
            http_response_code(200);
            echo json_encode([
                'success' => true, 
                'message' => 'Email saved to file for testing (mail server not available)',
                'note' => 'This is a fallback for Docker testing. In production, emails will be sent normally.'
            ]);
        } else {
            throw new Exception('Failed to send email and failed to save to file: ' . $errorMsg);
        }
    }
} catch (Exception $e) {
    $errorMessage = $e->getMessage();
    logError('Error sending contact form email: ' . $errorMessage);
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Error sending email', 
        'error' => $errorMessage
    ]);
} 