<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ref, computed } from 'vue';
import { Wallet, Users, TrendingUp, Copy, Check, Share2, ArrowRight } from 'lucide-vue-next';

const props = defineProps({
    stats: Object,
    timeline: Array,
    referral_code: String,
    referral_link: String,
    recent_referrals: Array,
});

const copied = ref(false);
const copy = (text) => {
    navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
};

const fmtMoney = (amt) => `${props.stats.currency} ${Number(amt).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
const fmtDate = (d) => new Date(d).toLocaleDateString();

// Simple sparkline data
const maxAmount = computed(() => Math.max(...props.timeline.map(t => t.amount), 1));
const sparklinePath = computed(() => {
    if (!props.timeline.length) return '';
    const w = 600, h = 60;
    const stepX = w / Math.max(props.timeline.length - 1, 1);
    return props.timeline
        .map((t, i) => {
            const x = i * stepX;
            const y = h - (t.amount / maxAmount.value) * h;
            return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join(' ');
});
</script>

<template>
    <Head title="Affiliate" />
    <AuthenticatedLayout>
        <div class="w-full space-y-6">
            <div>
                <h1 class="text-2xl font-bold">Affiliate Program</h1>
                <p class="mt-1 text-sm text-surface-500">
                    Earn {{ stats.commission_percent }}% on first payments + {{ stats.recurring_percent }}% on every renewal.
                </p>
            </div>

            <!-- Referral link -->
            <div class="card p-6 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                <div class="flex items-center gap-2 text-primary-100">
                    <Share2 class="h-4 w-4" />
                    <span class="text-xs font-semibold uppercase tracking-wide">Your referral link</span>
                </div>
                <div class="mt-3 flex items-center gap-2">
                    <code class="flex-1 px-3 py-2 rounded-lg bg-white/15 font-mono text-sm break-all">
                        {{ referral_link }}
                    </code>
                    <button @click="copy(referral_link)"
                        class="px-4 py-2 rounded-lg bg-white text-primary-700 font-medium text-sm hover:bg-primary-50 inline-flex items-center gap-2">
                        <Check v-if="copied" class="h-4 w-4" />
                        <Copy v-else class="h-4 w-4" />
                        {{ copied ? 'Copied!' : 'Copy' }}
                    </button>
                </div>
                <p class="mt-3 text-xs text-primary-100">
                    Code: <span class="font-mono font-semibold">{{ referral_code }}</span>
                    · Cookie window: 90 days
                </p>
            </div>

            <!-- Stats grid -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="card p-5">
                    <div class="flex items-center gap-2 text-surface-500 text-xs">
                        <Wallet class="h-4 w-4" />
                        Available
                    </div>
                    <p class="mt-2 text-2xl font-bold">{{ fmtMoney(stats.available) }}</p>
                    <p class="text-xs text-surface-500 mt-1">Ready to withdraw</p>
                </div>
                <div class="card p-5">
                    <div class="flex items-center gap-2 text-surface-500 text-xs">
                        <TrendingUp class="h-4 w-4" />
                        Total earned
                    </div>
                    <p class="mt-2 text-2xl font-bold">{{ fmtMoney(stats.total_earned) }}</p>
                    <p class="text-xs text-surface-500 mt-1">All time</p>
                </div>
                <div class="card p-5">
                    <div class="flex items-center gap-2 text-surface-500 text-xs">
                        <Wallet class="h-4 w-4 text-orange-500" />
                        Pending
                    </div>
                    <p class="mt-2 text-2xl font-bold">{{ fmtMoney(stats.pending) }}</p>
                    <p class="text-xs text-surface-500 mt-1">In hold period</p>
                </div>
                <div class="card p-5">
                    <div class="flex items-center gap-2 text-surface-500 text-xs">
                        <Users class="h-4 w-4" />
                        Referrals
                    </div>
                    <p class="mt-2 text-2xl font-bold">{{ stats.total_referrals }}</p>
                    <p class="text-xs text-surface-500 mt-1">{{ stats.conversion_rate }}% converted</p>
                </div>
            </div>

            <!-- Earnings chart -->
            <div class="card p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="font-semibold">Earnings — last 30 days</h2>
                    <Link :href="route('affiliate.commissions.index')"
                        class="text-sm text-primary-600 hover:underline inline-flex items-center gap-1">
                        View all commissions <ArrowRight class="h-3.5 w-3.5" />
                    </Link>
                </div>
                <div class="relative h-24">
                    <svg viewBox="0 0 600 60" preserveAspectRatio="none" class="w-full h-full">
                        <defs>
                            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.3"/>
                                <stop offset="100%" stop-color="#3B82F6" stop-opacity="0"/>
                            </linearGradient>
                        </defs>
                        <path :d="`${sparklinePath} L 600 60 L 0 60 Z`" fill="url(#grad)" />
                        <path :d="sparklinePath" stroke="#2563EB" stroke-width="2" fill="none" vector-effect="non-scaling-stroke"/>
                    </svg>
                </div>
            </div>

            <!-- Quick actions -->
            <div class="grid md:grid-cols-3 gap-4">
                <Link :href="route('affiliate.withdrawals.index')"
                    class="card p-6 hover:border-primary-500 transition border-2 border-transparent">
                    <Wallet class="h-6 w-6 text-primary-600" />
                    <h3 class="mt-3 font-semibold">Withdraw earnings</h3>
                    <p class="mt-1 text-sm text-surface-500">
                        Min {{ fmtMoney(stats.min_withdrawal) }} · Bank, JazzCash, EasyPaisa
                    </p>
                </Link>
                <Link :href="route('affiliate.referrals.index')"
                    class="card p-6 hover:border-primary-500 transition border-2 border-transparent">
                    <Users class="h-6 w-6 text-accent-600" />
                    <h3 class="mt-3 font-semibold">View referrals</h3>
                    <p class="mt-1 text-sm text-surface-500">{{ stats.total_referrals }} signups · {{ stats.converted_referrals }} paying</p>
                </Link>
                <Link :href="route('affiliate.commissions.index')"
                    class="card p-6 hover:border-primary-500 transition border-2 border-transparent">
                    <TrendingUp class="h-6 w-6 text-orange-600" />
                    <h3 class="mt-3 font-semibold">Commission history</h3>
                    <p class="mt-1 text-sm text-surface-500">Track every commission earned</p>
                </Link>
            </div>

            <!-- Recent referrals -->
            <div class="card overflow-hidden">
                <div class="px-6 py-4 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between">
                    <h2 class="font-semibold">Recent referrals</h2>
                </div>
                <table class="w-full text-sm">
                    <thead class="bg-surface-50 dark:bg-surface-800/50 text-left">
                        <tr>
                            <th class="px-4 py-3 font-semibold">Name</th>
                            <th class="px-4 py-3 font-semibold">Email</th>
                            <th class="px-4 py-3 font-semibold">Joined</th>
                            <th class="px-4 py-3 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-surface-200 dark:divide-surface-800">
                        <tr v-for="r in recent_referrals" :key="r.id">
                            <td class="px-4 py-3">{{ r.name }}</td>
                            <td class="px-4 py-3 text-surface-500 font-mono text-xs">{{ r.email }}</td>
                            <td class="px-4 py-3 text-surface-500">{{ fmtDate(r.created_at) }}</td>
                            <td class="px-4 py-3">
                                <span v-if="r.is_paying" class="badge bg-accent-50 text-accent-700">Paying</span>
                                <span v-else class="badge bg-surface-100 text-surface-500">Trial</span>
                            </td>
                        </tr>
                        <tr v-if="recent_referrals.length === 0">
                            <td colspan="4" class="px-4 py-12 text-center text-surface-500 text-sm">
                                No referrals yet. Share your link to start earning!
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
