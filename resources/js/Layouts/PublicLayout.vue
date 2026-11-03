<script setup>
import { Link } from '@inertiajs/vue3';
import { ref } from 'vue';
import { Menu, X } from 'lucide-vue-next';

const mobileOpen = ref(false);
</script>

<template>
    <div class="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col">
        <!-- Nav -->
        <nav class="sticky top-0 z-30 bg-white/80 dark:bg-surface-900/80 backdrop-blur border-b border-surface-200 dark:border-surface-800">
            <div class="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" class="flex items-center gap-2">
                    <div class="h-9 w-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold">C</div>
                    <span class="font-bold text-surface-900 dark:text-surface-50">CustomerNearMe</span>
                </Link>
                <div class="hidden md:flex items-center gap-6 text-sm">
                    <Link :href="route('how-it-works')" class="hover:text-primary-600 transition">How It Works</Link>
                    <Link :href="route('pricing')" class="hover:text-primary-600 transition">Pricing</Link>
                    <Link :href="route('faq')" class="hover:text-primary-600 transition">FAQ</Link>
                    <Link :href="route('affiliate-program')" class="hover:text-primary-600 transition">Affiliate</Link>
                    <Link :href="route('contact')" class="hover:text-primary-600 transition">Contact</Link>
                </div>
                <div class="flex items-center gap-3">
                    <Link :href="route('login')" class="btn-ghost text-sm hidden sm:inline-flex">Log in</Link>
                    <Link :href="route('register')" class="btn-primary text-sm">Get Started</Link>
                    <button @click="mobileOpen = !mobileOpen" class="md:hidden p-1">
                        <Menu v-if="!mobileOpen" class="h-6 w-6" />
                        <X v-else class="h-6 w-6" />
                    </button>
                </div>
            </div>
            <div v-if="mobileOpen" class="md:hidden border-t border-surface-200 dark:border-surface-800 px-4 py-3 space-y-1 bg-white dark:bg-surface-900">
                <Link :href="route('how-it-works')" class="block py-2 text-sm">How It Works</Link>
                <Link :href="route('pricing')" class="block py-2 text-sm">Pricing</Link>
                <Link :href="route('faq')" class="block py-2 text-sm">FAQ</Link>
                <Link :href="route('affiliate-program')" class="block py-2 text-sm">Affiliate</Link>
                <Link :href="route('contact')" class="block py-2 text-sm">Contact</Link>
                <Link :href="route('login')" class="block py-2 text-sm">Log in</Link>
            </div>
        </nav>

        <main class="flex-1">
            <slot />
        </main>

        <!-- Footer -->
        <footer class="border-t border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 mt-20">
            <div class="max-w-7xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                <div class="col-span-2">
                    <Link href="/" class="flex items-center gap-2">
                        <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">C</div>
                        <span class="font-bold">CustomerNearMe</span>
                    </Link>
                    <p class="mt-3 text-surface-500 max-w-sm">
                        Verified GMB leads, instantly delivered. Generate hyper-targeted local business leads from Google My Business.
                    </p>
                </div>
                <div>
                    <h4 class="font-semibold mb-3">Product</h4>
                    <ul class="space-y-2 text-surface-500">
                        <li><Link :href="route('how-it-works')" class="hover:text-primary-600">How It Works</Link></li>
                        <li><Link :href="route('pricing')" class="hover:text-primary-600">Pricing</Link></li>
                        <li><Link :href="route('faq')" class="hover:text-primary-600">FAQ</Link></li>
                        <li><Link :href="route('affiliate-program')" class="hover:text-primary-600">Affiliate</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-3">Legal</h4>
                    <ul class="space-y-2 text-surface-500">
                        <li><Link :href="route('terms')" class="hover:text-primary-600">Terms</Link></li>
                        <li><Link :href="route('privacy')" class="hover:text-primary-600">Privacy</Link></li>
                        <li><Link :href="route('contact')" class="hover:text-primary-600">Contact</Link></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-surface-200 dark:border-surface-800 px-4 py-6 text-center text-xs text-surface-500">
                &copy; {{ new Date().getFullYear() }} Customer Near Me. All rights reserved.
            </div>
        </footer>
    </div>
</template>
