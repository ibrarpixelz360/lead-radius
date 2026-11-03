<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { Search, Filter, Download, Zap, Shield, Globe, Star, ArrowRight, Check, MapPin } from 'lucide-vue-next';

defineProps({ plans: Array, testimonials: Array, faqs: Array });

const features = [
    { icon: MapPin, title: 'Geo-targeted leads', desc: 'Filter by country, state, city, and radius up to 50km.' },
    { icon: Filter, title: 'Smart filters', desc: 'Min rating, review count, has email/phone/website — get exactly the leads you want.' },
    { icon: Zap, title: 'AI lead scoring', desc: 'Auto-categorized as Hot, SEO Weak, Inactive — focus on the highest-value prospects.' },
    { icon: Download, title: 'Unlimited exports', desc: 'CSV and XLSX exports with custom column selection. No row limits.' },
    { icon: Shield, title: 'Verified data', desc: 'Sourced from public GMB listings, deduplicated, and continuously refreshed.' },
    { icon: Globe, title: 'Affiliate ready', desc: 'Earn 30% on every referral, plus 20% on recurring renewals.' },
];
</script>

<template>
    <Head title="GMB Lead Generation Made Simple" />

    <div class="min-h-screen bg-surface-50 dark:bg-surface-950">
        <!-- Nav -->
        <nav class="sticky top-0 z-30 bg-white/80 dark:bg-surface-900/80 backdrop-blur border-b border-surface-200 dark:border-surface-800">
            <div class="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" class="flex items-center gap-2">
                    <div class="h-9 w-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold">C</div>
                    <span class="font-bold">CustomerNearMe</span>
                </Link>
                <div class="hidden md:flex items-center gap-6 text-sm">
                    <Link :href="route('how-it-works')" class="hover:text-primary-600">How It Works</Link>
                    <Link :href="route('pricing')" class="hover:text-primary-600">Pricing</Link>
                    <Link :href="route('faq')" class="hover:text-primary-600">FAQ</Link>
                    <Link :href="route('affiliate-program')" class="hover:text-primary-600">Affiliate</Link>
                </div>
                <div class="flex items-center gap-3">
                    <Link :href="route('login')" class="btn-ghost text-sm">Log in</Link>
                    <Link :href="route('register')" class="btn-primary text-sm">Get Started</Link>
                </div>
            </div>
        </nav>

        <!-- Hero -->
        <section class="relative overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-28">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span class="badge bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                            ⚡ 7-day free trial · No card required
                        </span>
                        <h1 class="mt-4 text-4xl lg:text-5xl font-bold tracking-tight text-surface-900 dark:text-surface-50">
                            Verified GMB leads,<br />
                            <span class="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                                instantly delivered.
                            </span>
                        </h1>
                        <p class="mt-4 text-lg text-surface-600 dark:text-surface-300">
                            Generate hyper-targeted local business leads from Google My Business in seconds.
                            Filter by country, city, niche, and radius. Get verified contact info ready for outreach.
                        </p>
                        <div class="mt-8 flex flex-wrap gap-3">
                            <Link :href="route('register')" class="btn-primary">
                                Start Free Trial <ArrowRight class="h-4 w-4" />
                            </Link>
                            <Link :href="route('how-it-works')" class="btn-secondary">See how it works</Link>
                        </div>
                        <div class="mt-8 flex items-center gap-4 text-xs text-surface-500">
                            <div class="flex items-center gap-1"><Check class="h-4 w-4 text-accent-500" /> 5,000+ users</div>
                            <div class="flex items-center gap-1"><Check class="h-4 w-4 text-accent-500" /> 12M+ leads scraped</div>
                            <div class="flex items-center gap-1"><Star class="h-4 w-4 text-yellow-400 fill-yellow-400" /> 4.8/5 rating</div>
                        </div>
                    </div>

                    <!-- Mock dashboard -->
                    <div class="card p-6 shadow-2xl rotate-1">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="h-3 w-3 rounded-full bg-red-400"></div>
                            <div class="h-3 w-3 rounded-full bg-yellow-400"></div>
                            <div class="h-3 w-3 rounded-full bg-green-400"></div>
                            <span class="ml-2 text-xs text-surface-500">customernearme.com/dashboard</span>
                        </div>
                        <div class="space-y-2">
                            <div v-for="i in 5" :key="i" class="flex items-center justify-between p-2 rounded border border-surface-100 dark:border-surface-800">
                                <div>
                                    <div class="text-sm font-medium">Business {{ i }}</div>
                                    <div class="text-xs text-surface-500">Karachi · ★ 4.{{ 9-i }}</div>
                                </div>
                                <span class="badge bg-accent-50 text-accent-700 text-xs">Hot</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features -->
        <section class="py-16 bg-white dark:bg-surface-900 border-y border-surface-200 dark:border-surface-800">
            <div class="max-w-7xl mx-auto px-4 lg:px-8">
                <div class="text-center max-w-2xl mx-auto">
                    <h2 class="text-3xl font-bold">Everything you need for local lead gen</h2>
                    <p class="mt-3 text-surface-600 dark:text-surface-300">From discovery to outreach, all in one platform.</p>
                </div>
                <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="f in features" :key="f.title" class="card p-6 hover:shadow-lg transition">
                        <div class="h-10 w-10 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                            <component :is="f.icon" class="h-5 w-5 text-primary-600" />
                        </div>
                        <h3 class="font-semibold">{{ f.title }}</h3>
                        <p class="mt-1 text-sm text-surface-600 dark:text-surface-400">{{ f.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Pricing -->
        <section class="py-16">
            <div class="max-w-7xl mx-auto px-4 lg:px-8">
                <div class="text-center max-w-2xl mx-auto">
                    <h2 class="text-3xl font-bold">Simple pricing</h2>
                    <p class="mt-3 text-surface-600 dark:text-surface-300">Pay in PKR via bank transfer. Cancel anytime.</p>
                </div>
                <div class="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <div v-for="plan in plans" :key="plan.id"
                         :class="[
                             'card p-6 relative',
                             plan.is_featured ? 'ring-2 ring-primary-500 lg:scale-105' : ''
                         ]">
                        <span v-if="plan.is_featured" class="absolute -top-3 left-1/2 -translate-x-1/2 badge bg-primary-600 text-white">
                            Most Popular
                        </span>
                        <h3 class="font-bold text-lg">{{ plan.name }}</h3>
                        <p class="text-sm text-surface-500 mt-1">{{ plan.description }}</p>
                        <div class="mt-4 flex items-baseline gap-1">
                            <span class="text-4xl font-bold">PKR {{ Number(plan.price).toLocaleString() }}</span>
                            <span class="text-sm text-surface-500" v-if="plan.price > 0">/month</span>
                        </div>
                        <ul class="mt-6 space-y-2 text-sm">
                            <li class="flex gap-2"><Check class="h-4 w-4 text-accent-500 shrink-0 mt-0.5" /> {{ plan.max_devices }} device(s)</li>
                            <li class="flex gap-2"><Check class="h-4 w-4 text-accent-500 shrink-0 mt-0.5" /> Unlimited leads</li>
                            <li class="flex gap-2"><Check class="h-4 w-4 text-accent-500 shrink-0 mt-0.5" /> Unlimited exports</li>
                            <li class="flex gap-2"><Check class="h-4 w-4 text-accent-500 shrink-0 mt-0.5" /> AI lead scoring</li>
                            <li v-if="plan.priority_support" class="flex gap-2"><Check class="h-4 w-4 text-accent-500 shrink-0 mt-0.5" /> Priority support</li>
                            <li v-if="plan.api_access" class="flex gap-2"><Check class="h-4 w-4 text-accent-500 shrink-0 mt-0.5" /> API access</li>
                        </ul>
                        <Link :href="route('register')"
                              :class="['mt-6 block text-center', plan.is_featured ? 'btn-primary' : 'btn-secondary']">
                            {{ plan.price > 0 ? 'Choose ' + plan.name : 'Start Free Trial' }}
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials -->
        <section class="py-16 bg-white dark:bg-surface-900 border-y border-surface-200 dark:border-surface-800">
            <div class="max-w-7xl mx-auto px-4 lg:px-8">
                <div class="text-center">
                    <h2 class="text-3xl font-bold">Loved by lead gen pros</h2>
                </div>
                <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="t in testimonials" :key="t.id" class="card p-6">
                        <div class="flex gap-0.5 text-yellow-400 mb-3">
                            <Star v-for="n in t.rating" :key="n" class="h-4 w-4 fill-yellow-400" />
                        </div>
                        <p class="text-sm text-surface-700 dark:text-surface-300">"{{ t.content }}"</p>
                        <div class="mt-4 flex items-center gap-3">
                            <div class="h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold">
                                {{ t.name.charAt(0) }}
                            </div>
                            <div>
                                <p class="text-sm font-semibold">{{ t.name }}</p>
                                <p class="text-xs text-surface-500">{{ t.title }}{{ t.company ? `, ${t.company}` : '' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section class="py-16">
            <div class="max-w-3xl mx-auto px-4 lg:px-8">
                <div class="text-center">
                    <h2 class="text-3xl font-bold">Frequently asked questions</h2>
                </div>
                <div class="mt-10 space-y-4">
                    <details v-for="faq in faqs" :key="faq.id" class="card p-5 group">
                        <summary class="cursor-pointer font-semibold flex justify-between items-center">
                            {{ faq.question }}
                            <ArrowRight class="h-4 w-4 transition group-open:rotate-90" />
                        </summary>
                        <p class="mt-3 text-sm text-surface-600 dark:text-surface-400">{{ faq.answer }}</p>
                    </details>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
            <div class="max-w-3xl mx-auto px-4 lg:px-8 text-center">
                <h2 class="text-3xl lg:text-4xl font-bold">Ready to find your next 1,000 leads?</h2>
                <p class="mt-4 text-primary-100">Start your 7-day free trial. No credit card. No commitment.</p>
                <Link :href="route('register')" class="mt-8 inline-flex btn bg-white text-primary-700 hover:bg-primary-50">
                    Get Started Free <ArrowRight class="h-4 w-4" />
                </Link>
            </div>
        </section>

        <!-- Footer -->
        <footer class="py-12 bg-surface-900 text-surface-400">
            <div class="max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center gap-2">
                        <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">C</div>
                        <span class="font-bold text-white">CustomerNearMe</span>
                    </div>
                    <p class="mt-3 text-sm">Verified GMB leads, instantly.</p>
                </div>
                <div>
                    <h4 class="text-white font-semibold mb-3 text-sm">Product</h4>
                    <ul class="space-y-2 text-sm">
                        <li><Link :href="route('pricing')" class="hover:text-white">Pricing</Link></li>
                        <li><Link :href="route('how-it-works')" class="hover:text-white">How It Works</Link></li>
                        <li><Link :href="route('faq')" class="hover:text-white">FAQ</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-semibold mb-3 text-sm">Company</h4>
                    <ul class="space-y-2 text-sm">
                        <li><Link :href="route('contact')" class="hover:text-white">Contact</Link></li>
                        <li><Link :href="route('affiliate-program')" class="hover:text-white">Affiliate Program</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-semibold mb-3 text-sm">Legal</h4>
                    <ul class="space-y-2 text-sm">
                        <li><Link :href="route('terms')" class="hover:text-white">Terms</Link></li>
                        <li><Link :href="route('privacy')" class="hover:text-white">Privacy</Link></li>
                    </ul>
                </div>
            </div>
            <div class="max-w-7xl mx-auto px-4 lg:px-8 mt-8 pt-8 border-t border-surface-800 text-xs">
                &copy; {{ new Date().getFullYear() }} Customer Near Me. All rights reserved.
            </div>
        </footer>
    </div>
</template>
