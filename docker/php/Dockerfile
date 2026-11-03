FROM php:8.3-fpm-alpine AS base

LABEL maintainer="Customer Near Me"

RUN apk add --no-cache \
        bash git curl supervisor \
        libpng-dev libjpeg-turbo-dev libwebp-dev freetype-dev \
        oniguruma-dev libxml2-dev icu-dev libzip-dev \
        mysql-client postgresql-dev \
        $PHPIZE_DEPS \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql mbstring exif pcntl bcmath gd intl zip opcache \
    && pecl install redis-6.0.2 \
    && docker-php-ext-enable redis opcache \
    && apk del $PHPIZE_DEPS \
    && rm -rf /tmp/* /var/cache/apk/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

# OPcache configuration tuned for production
RUN { \
        echo 'opcache.memory_consumption=256'; \
        echo 'opcache.interned_strings_buffer=16'; \
        echo 'opcache.max_accelerated_files=20000'; \
        echo 'opcache.revalidate_freq=0'; \
        echo 'opcache.validate_timestamps=0'; \
        echo 'opcache.enable_cli=1'; \
        echo 'opcache.jit_buffer_size=128M'; \
        echo 'opcache.jit=tracing'; \
    } > /usr/local/etc/php/conf.d/opcache.ini

RUN { \
        echo 'memory_limit=512M'; \
        echo 'upload_max_filesize=10M'; \
        echo 'post_max_size=12M'; \
        echo 'max_execution_time=300'; \
        echo 'date.timezone=Asia/Karachi'; \
    } > /usr/local/etc/php/conf.d/app.ini

WORKDIR /var/www/html

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

COPY . .

RUN composer dump-autoload --optimize --no-dev \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
