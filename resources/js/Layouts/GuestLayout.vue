<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-surface-50 dark:bg-surface-950">
        <div class="mb-6">
            <Link href="/" class="flex items-center gap-2">
                <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg">
                    C
                </div>
                <span class="text-xl font-bold text-surface-900 dark:text-surface-50">Customer Near Me</span>
            </Link>
        </div>

        <div class="w-full sm:max-w-md px-6 py-8 bg-white dark:bg-surface-900 shadow-md overflow-hidden sm:rounded-2xl border border-surface-200 dark:border-surface-800">
            <slot />
        </div>

        <p class="mt-6 text-xs text-surface-500">
            &copy; {{ new Date().getFullYear() }} Customer Near Me. All rights reserved.
        </p>
    </div>
</template>
