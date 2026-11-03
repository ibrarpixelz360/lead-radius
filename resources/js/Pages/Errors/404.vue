<script setup>
import { Head, Link } from '@inertiajs/vue3';
defineProps({ status: Number });
</script>
<template>
    <Head title="Page not found" />
    <div class="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
        <div class="text-center px-4">
            <p class="text-7xl font-bold text-primary-600">404</p>
            <h1 class="mt-2 text-2xl font-bold">Page not found</h1>
            <p class="mt-2 text-surface-500">The page you're looking for doesn't exist or has moved.</p>
            <Link href="/" class="mt-6 btn-primary inline-flex">Back to home</Link>
        </div>
    </div>
</template>
