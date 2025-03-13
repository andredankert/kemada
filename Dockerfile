# Build stage
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create API directory
RUN mkdir -p /usr/share/nginx/html/api

# Copy PHP files
COPY public/api/*.php /usr/share/nginx/html/api/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Install PHP and PHP-FPM
RUN apk add --update \
    php82 \
    php82-fpm \
    php82-json \
    php82-openssl \
    php82-curl \
    php82-zlib \
    php82-xml \
    php82-phar \
    php82-intl \
    php82-dom \
    php82-xmlreader \
    php82-ctype \
    php82-session \
    php82-mbstring \
    php82-tokenizer \
    php82-fileinfo \
    php82-iconv \
    php82-simplexml \
    php82-sodium \
    php82-xmlwriter \
    php82-opcache \
    php82-pdo \
    php82-pdo_mysql \
    php82-mysqli \
    php82-gd \
    php82-zip \
    msmtp \
    && ln -s /usr/bin/php82 /usr/bin/php

# Configure msmtp as a sendmail replacement
RUN echo "sendmail_path = /usr/bin/msmtp -t" > /etc/php82/conf.d/99-msmtp.ini

# Configure msmtp
RUN echo "account default\nhost mailhog\nport 1025\nauto_from on\nfrom noreply@kemada.de\n" > /etc/msmtprc && \
    chmod 600 /etc/msmtprc

# Configure PHP-FPM to listen on 127.0.0.1:9000
RUN sed -i 's/listen = 127.0.0.1:9000/listen = 9000/g' /etc/php82/php-fpm.d/www.conf && \
    sed -i 's/;listen.allowed_clients = 127.0.0.1/listen.allowed_clients = 127.0.0.1/g' /etc/php82/php-fpm.d/www.conf && \
    sed -i 's/user = nobody/user = nginx/g' /etc/php82/php-fpm.d/www.conf && \
    sed -i 's/group = nobody/group = nginx/g' /etc/php82/php-fpm.d/www.conf && \
    sed -i 's/;clear_env = no/clear_env = no/g' /etc/php82/php-fpm.d/www.conf

# Create log directories
RUN mkdir -p /var/log/nginx && \
    touch /var/log/nginx/access.log && \
    touch /var/log/nginx/error.log && \
    chown -R nginx:nginx /var/log/nginx

# Create directory for email files
RUN mkdir -p /tmp/emails && \
    chmod 777 /tmp/emails

# Expose port
EXPOSE 80

# Start Nginx and PHP-FPM
CMD sh -c "php-fpm82 && nginx -g 'daemon off;'"