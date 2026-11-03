<script setup>
import { Head } from '@inertiajs/vue3';
defineProps({ status: Number });
</script>
<template>
    <Head title="Maintenance" />
    <div class="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
        <div class="text-center px-4">
            <p class="text-7xl font-bold text-blue-600">503</p>
            <h1 class="mt-2 text-2xl font-bold">Be right back</h1>
            <p class="mt-2 text-surface-500">We're performing scheduled maintenance. This won't take long.</p>
        </div>
    </div>
</template>
