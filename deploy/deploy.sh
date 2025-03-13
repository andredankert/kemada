#!/bin/bash

# Kemada API Deployment Script
# This script helps deploy the API files to the server

# Configuration
SERVER="your-server-hostname"
USERNAME="your-username"
REMOTE_PATH="/path/to/your/webroot"

# Display instructions
echo "=== Kemada API Deployment Script ==="
echo "This script will help you deploy the API files to your server."
echo ""
echo "Before running this script, please update the following variables:"
echo "  SERVER: $SERVER"
echo "  USERNAME: $USERNAME"
echo "  REMOTE_PATH: $REMOTE_PATH"
echo ""
echo "You can edit this script to update these variables."
echo ""
echo "Once you've updated the variables, you can run this script to deploy the files."
echo ""
echo "Alternatively, you can manually upload the files using FTP or another method."
echo ""

# Ask for confirmation
read -p "Do you want to continue with the deployment? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Deployment canceled."
    exit 1
fi

# Check if the configuration has been updated
if [ "$SERVER" == "your-server-hostname" ] || [ "$USERNAME" == "your-username" ] || [ "$REMOTE_PATH" == "/path/to/your/webroot" ]
then
    echo "Error: Please update the configuration variables in this script before running it."
    exit 1
fi

# Deploy the files
echo "Deploying files to $SERVER..."
scp -r ./* $USERNAME@$SERVER:$REMOTE_PATH

# Check if the deployment was successful
if [ $? -eq 0 ]
then
    echo "Deployment successful!"
    echo ""
    echo "Please verify that the API endpoints are working by accessing:"
    echo "  https://$SERVER/api/info.php"
    echo "  https://$SERVER/api/test.php"
else
    echo "Deployment failed. Please check your configuration and try again."
fi 