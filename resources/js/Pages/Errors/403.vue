<script setup>
import { Head, Link } from '@inertiajs/vue3';
defineProps({ status: Number });
</script>
<template>
    <Head title="Forbidden" />
    <div class="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
        <div class="text-center px-4">
            <p class="text-7xl font-bold text-red-600">403</p>
            <h1 class="mt-2 text-2xl font-bold">Forbidden</h1>
            <p class="mt-2 text-surface-500">You don't have permission to access this page.</p>
            <Link href="/" class="mt-6 btn-primary inline-flex">Back to home</Link>
        </div>
    </div>
</template>
