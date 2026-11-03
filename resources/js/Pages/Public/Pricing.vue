<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { Check, X, ArrowRight } from 'lucide-vue-next';

defineProps({ plans: Array });

const features = [
    { key: 'leads', label: 'Lead generation', free: 'Trial only', starter: 'Unlimited', growth: 'Unlimited' },
    { key: 'export', label: 'CSV / XLSX export', free: 'Trial only', starter: 'Unlimited', growth: 'Unlimited' },
    { key: 'devices', label: 'Devices allowed', free: '1', starter: '2', growth: '5' },
    { key: 'support', label: 'Priority support', free: false, starter: true, growth: true },
    { key: 'ai', label: 'AI lead scoring', free: true, starter: true, growth: true },
    { key: 'api', label: 'API access', free: false, starter: false, growth: true },
    { key: 'saved', label: 'Saved searches', free: '5', starter: '50', growth: 'Unlimited' },
];
</script>

<template>
    <Head title="Pricing" />
    <div class="min-h-screen bg-surface-50 dark:bg-surface-950">
        <!-- Header -->
        <nav class="sticky top-0 z-30 bg-white/80 dark:bg-surface-900/80 backdrop-blur border-b border-surface-200 dark:border-surface-800">
            <div class="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" class="flex items-center gap-2">
                    <div class="h-9 w-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold">C</div>
                    <span class="font-bold">CustomerNearMe</span>
                </Link>
                <div class="flex items-center gap-3">
                    <Link :href="route('login')" class="btn-ghost text-sm">Log in</Link>
                    <Link :href="route('register')" class="btn-primary text-sm">Get Started</Link>
                </div>
            </div>
        </nav>

        <!-- Hero -->
        <section class="py-16 lg:py-20 text-center">
            <div class="max-w-3xl mx-auto px-4">
                <h1 class="text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50">
                    Simple, transparent pricing
                </h1>
                <p class="mt-4 text-lg text-surface-600 dark:text-surface-400">
                    Start free, upgrade when you're ready. Cancel anytime.
                </p>
            </div>
        </section>

        <!-- Plans -->
        <section class="pb-20">
            <div class="max-w-6xl mx-auto px-4 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div v-for="plan in plans" :key="plan.id"
                         :class="[
                            'card p-8 relative',
                            plan.is_featured ? 'ring-2 ring-primary-500 shadow-xl scale-105' : ''
                         ]">
                        <span v-if="plan.is_featured"
                              class="absolute -top-3 left-1/2 -translate-x-1/2 badge bg-primary-600 text-white">
                            Most Popular
                        </span>

                        <h3 class="text-lg font-bold text-surface-900 dark:text-surface-50">{{ plan.name }}</h3>
                        <p class="mt-1 text-sm text-surface-500">{{ plan.description }}</p>

                        <div class="mt-6">
                            <span class="text-4xl font-bold text-surface-900 dark:text-surface-50">
                                {{ plan.price > 0 ? `${plan.currency} ${Number(plan.price).toLocaleString()}` : 'Free' }}
                            </span>
                            <span v-if="plan.price > 0" class="text-sm text-surface-500">/month</span>
                        </div>

                        <Link :href="route('register')"
                              :class="['mt-6 w-full block text-center', plan.is_featured ? 'btn-primary' : 'btn-secondary']">
                            {{ plan.price > 0 ? 'Choose ' + plan.name : 'Start Free Trial' }}
                        </Link>

                        <ul class="mt-8 space-y-3 text-sm">
                            <li class="flex items-start gap-2">
                                <Check class="h-5 w-5 text-accent-500 shrink-0" />
                                <span>{{ plan.monthly_lead_limit ? `${plan.monthly_lead_limit} leads/mo` : 'Unlimited leads' }}</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <Check class="h-5 w-5 text-accent-500 shrink-0" />
                                <span>{{ plan.monthly_export_limit ? `${plan.monthly_export_limit} exports/mo` : 'Unlimited exports' }}</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <Check class="h-5 w-5 text-accent-500 shrink-0" />
                                <span>{{ plan.max_devices }} {{ plan.max_devices === 1 ? 'device' : 'devices' }}</span>
                            </li>
                            <li class="flex items-start gap-2" :class="plan.priority_support ? '' : 'opacity-40'">
                                <component :is="plan.priority_support ? Check : X"
                                           :class="['h-5 w-5 shrink-0', plan.priority_support ? 'text-accent-500' : 'text-surface-400']" />
                                <span>Priority support</span>
                            </li>
                            <li class="flex items-start gap-2" :class="plan.api_access ? '' : 'opacity-40'">
                                <component :is="plan.api_access ? Check : X"
                                           :class="['h-5 w-5 shrink-0', plan.api_access ? 'text-accent-500' : 'text-surface-400']" />
                                <span>API access</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Comparison table -->
                <div class="mt-16 card overflow-hidden">
                    <div class="px-6 py-4 border-b border-surface-200 dark:border-surface-800">
                        <h2 class="text-lg font-bold">Compare features</h2>
                    </div>
                    <table class="w-full text-sm">
                        <thead class="bg-surface-50 dark:bg-surface-800/50">
                            <tr>
                                <th class="px-6 py-3 text-left font-semibold">Feature</th>
                                <th class="px-6 py-3 text-center font-semibold">Free</th>
                                <th class="px-6 py-3 text-center font-semibold">Starter</th>
                                <th class="px-6 py-3 text-center font-semibold">Growth</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-surface-200 dark:divide-surface-800">
                            <tr v-for="f in features" :key="f.key">
                                <td class="px-6 py-3 text-surface-700 dark:text-surface-300">{{ f.label }}</td>
                                <td class="px-6 py-3 text-center">
                                    <Check v-if="f.free === true" class="h-5 w-5 text-accent-500 mx-auto" />
                                    <X v-else-if="f.free === false" class="h-5 w-5 text-surface-300 mx-auto" />
                                    <span v-else>{{ f.free }}</span>
                                </td>
                                <td class="px-6 py-3 text-center">
                                    <Check v-if="f.starter === true" class="h-5 w-5 text-accent-500 mx-auto" />
                                    <X v-else-if="f.starter === false" class="h-5 w-5 text-surface-300 mx-auto" />
                                    <span v-else>{{ f.starter }}</span>
                                </td>
                                <td class="px-6 py-3 text-center">
                                    <Check v-if="f.growth === true" class="h-5 w-5 text-accent-500 mx-auto" />
                                    <X v-else-if="f.growth === false" class="h-5 w-5 text-surface-300 mx-auto" />
                                    <span v-else>{{ f.growth }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- FAQ teaser -->
                <div class="mt-16 text-center">
                    <h2 class="text-2xl font-bold">Have questions?</h2>
                    <p class="mt-2 text-surface-600 dark:text-surface-400">Read our FAQ or get in touch.</p>
                    <div class="mt-4 flex gap-3 justify-center">
                        <Link :href="route('faq')" class="btn-secondary">View FAQ</Link>
                        <Link :href="route('contact')" class="btn-secondary">Contact us</Link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
