# Kemada API Deployment

This directory contains the necessary files to deploy the API endpoints for the Kemada website.

## Deployment Instructions

1. Upload the contents of this directory to your web server's root directory.
2. Ensure that the `.htaccess` files are properly uploaded and that Apache's `mod_rewrite` is enabled.
3. Make sure the PHP files have the correct permissions (usually 644).
4. Test the API endpoints by accessing them in your browser:
   - `https://kemada.de/api/info.php` - Should return JSON with server information
   - `https://kemada.de/api/test.php` - Should return JSON with a test response

## API Endpoints

- `/api/contact` - Handles contact form submissions
- `/api/testimonial` - Handles testimonial submissions
- `/api/info.php` - Returns server information
- `/api/test.php` - Returns a test response

## Troubleshooting

If you encounter issues with the API endpoints:

1. Check that the `.htaccess` files are properly uploaded and that Apache's `mod_rewrite` is enabled.
2. Verify that the PHP files have the correct permissions.
3. Check the Apache error logs for any errors.
4. Ensure that the server has PHP installed and properly configured.
5. Make sure the `mail()` function is available on the server.

## Server Requirements

- Apache with `mod_rewrite` enabled
- PHP 7.4 or higher
- `mail()` function enabled (for sending emails)

## Contact

If you have any questions or issues, please contact the developer at andre.dankert@gmail.com. 