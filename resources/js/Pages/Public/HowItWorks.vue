<script setup>
import { Head, Link } from '@inertiajs/vue3';
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { Search, Filter, Download, Mail, MousePointerClick, Wallet, ArrowRight } from 'lucide-vue-next';

const steps = [
    { icon: Search, title: 'Search GMB Leads', desc: 'Pick your country, state, city, and a search keyword. Set radius, minimum rating, review count, and required contact fields.' },
    { icon: Filter, title: 'Filter & Save', desc: 'Our scraper pulls fresh GMB listings. Filter further by AI category (Hot, SEO Weak, Inactive) and save the ones you want.' },
    { icon: Download, title: 'Export Anywhere', desc: 'Export to CSV or XLSX with custom column selection. Push directly into your CRM, cold email tool, or outreach sequence.' },
    { icon: Mail, title: 'Contact Businesses', desc: 'Use the verified phone, email, and website data to reach out. Track status: New → Contacted → Responded → Converted.' },
    { icon: MousePointerClick, title: 'Track in Dashboard', desc: 'Tag leads, add notes, mark favorites. Your dashboard shows conversion rates and your hottest opportunities.' },
    { icon: Wallet, title: 'Earn from Affiliate', desc: 'Share your referral link and earn 30% commission on every paid signup, plus 20% on every renewal — for as long as they stay subscribed.' },
];
</script>

<template>
    <Head title="How It Works" />
    <PublicLayout>
        <section class="py-16 lg:py-20 text-center">
            <div class="max-w-3xl mx-auto px-4">
                <h1 class="text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50">
                    How Customer Near Me works
                </h1>
                <p class="mt-4 text-lg text-surface-600 dark:text-surface-400">
                    From search to outreach in under a minute. Here's the full flow.
                </p>
            </div>
        </section>

        <section class="pb-20">
            <div class="max-w-5xl mx-auto px-4 lg:px-8">
                <div class="grid gap-6 md:gap-8">
                    <div v-for="(step, i) in steps" :key="step.title"
                         class="card p-6 lg:p-8 flex items-start gap-6">
                        <div class="shrink-0 h-12 w-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                            <component :is="step.icon" class="h-6 w-6" />
                        </div>
                        <div>
                            <div class="flex items-center gap-3">
                                <span class="text-xs font-bold text-surface-400">STEP {{ i + 1 }}</span>
                            </div>
                            <h3 class="mt-1 text-xl font-bold text-surface-900 dark:text-surface-50">{{ step.title }}</h3>
                            <p class="mt-2 text-surface-600 dark:text-surface-400">{{ step.desc }}</p>
                        </div>
                    </div>
                </div>

                <div class="mt-16 card p-10 text-center bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                    <h2 class="text-2xl lg:text-3xl font-bold">Ready to find your next customer?</h2>
                    <p class="mt-2 opacity-90">Start your 7-day free trial — no credit card required.</p>
                    <Link :href="route('register')" class="mt-6 btn bg-white text-primary-700 hover:bg-surface-50 inline-flex">
                        Start Free Trial <ArrowRight class="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    </PublicLayout>
</template>
