<script setup>
import { Head, Link } from '@inertiajs/vue3';
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { Wallet, Users, Repeat, ArrowRight, Check } from 'lucide-vue-next';

defineProps({
    commission_percent: { type: Number, default: 30 },
    recurring_percent: { type: Number, default: 20 },
    cookie_days: { type: Number, default: 90 },
});
</script>

<template>
    <Head title="Affiliate Program" />
    <PublicLayout>
        <section class="py-16 lg:py-24">
            <div class="max-w-5xl mx-auto px-4 lg:px-8 text-center">
                <span class="badge bg-accent-50 text-accent-700">💰 Earn passively</span>
                <h1 class="mt-4 text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50">
                    Refer once. Earn forever.
                </h1>
                <p class="mt-4 text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
                    Earn <strong class="text-surface-900 dark:text-surface-50">{{ commission_percent }}%</strong> on every paid signup,
                    plus <strong class="text-surface-900 dark:text-surface-50">{{ recurring_percent }}%</strong> on every renewal —
                    for as long as they stay subscribed.
                </p>
                <Link :href="route('register')" class="mt-8 btn-primary inline-flex">
                    Become an Affiliate <ArrowRight class="h-4 w-4" />
                </Link>
            </div>
        </section>

        <section class="pb-16">
            <div class="max-w-5xl mx-auto px-4 lg:px-8 grid md:grid-cols-3 gap-6">
                <div class="card p-6 text-center">
                    <div class="mx-auto h-12 w-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                        <Users class="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 class="mt-4 font-bold">Share your link</h3>
                    <p class="mt-2 text-sm text-surface-500">Every account gets a unique referral link with a {{ cookie_days }}-day cookie window.</p>
                </div>
                <div class="card p-6 text-center">
                    <div class="mx-auto h-12 w-12 rounded-xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center">
                        <Wallet class="h-6 w-6 text-accent-600" />
                    </div>
                    <h3 class="mt-4 font-bold">Earn {{ commission_percent }}% upfront</h3>
                    <p class="mt-2 text-sm text-surface-500">When your referral pays, you earn instantly. Held briefly to clear chargebacks.</p>
                </div>
                <div class="card p-6 text-center">
                    <div class="mx-auto h-12 w-12 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
                        <Repeat class="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 class="mt-4 font-bold">{{ recurring_percent }}% recurring</h3>
                    <p class="mt-2 text-sm text-surface-500">Every time they renew, you earn again. Build truly passive income.</p>
                </div>
            </div>
        </section>

        <section class="pb-20">
            <div class="max-w-3xl mx-auto px-4 lg:px-8">
                <div class="card p-8">
                    <h2 class="text-2xl font-bold">How it works</h2>
                    <ul class="mt-6 space-y-4">
                        <li class="flex gap-3">
                            <Check class="h-6 w-6 text-accent-500 shrink-0" />
                            <div>
                                <p class="font-semibold">1. Sign up free</p>
                                <p class="text-sm text-surface-500">Create your account — every user automatically becomes an affiliate.</p>
                            </div>
                        </li>
                        <li class="flex gap-3">
                            <Check class="h-6 w-6 text-accent-500 shrink-0" />
                            <div>
                                <p class="font-semibold">2. Share your link</p>
                                <p class="text-sm text-surface-500">Find your referral link in the dashboard. Share on social, blog, or email.</p>
                            </div>
                        </li>
                        <li class="flex gap-3">
                            <Check class="h-6 w-6 text-accent-500 shrink-0" />
                            <div>
                                <p class="font-semibold">3. Get paid</p>
                                <p class="text-sm text-surface-500">Withdraw via bank transfer, JazzCash, or EasyPaisa. Minimum PKR 1,000.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </PublicLayout>
</template>
