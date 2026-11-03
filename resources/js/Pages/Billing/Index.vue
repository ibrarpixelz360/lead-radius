<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {
    CheckCircle, Clock, XCircle, Download, Crown, Zap, X,
    ArrowUp, ReceiptText, CreditCard, Infinity,
} from 'lucide-vue-next';

const props = defineProps({
    subscription: Object,
    is_on_trial:  Boolean,
    trial_days_left: Number,
    plans:    Array,
    payments: Array,
    bank:     Object,
});

// ── Billing cycle toggle ──────────────────────────────────────────
const billingCycle = ref('monthly');
const displayedPlans = computed(() =>
    props.plans.filter(p => billingCycle.value === 'monthly'
        ? p.billing_cycle === 'monthly' || p.billing_cycle === null || p.is_free
        : p.billing_cycle === 'yearly'  || p.is_free
    ).length > 0
        ? props.plans.filter(p => billingCycle.value === 'monthly'
            ? p.billing_cycle !== 'yearly'
            : p.billing_cycle !== 'monthly' || p.is_free)
        : props.plans
);

// ── Countdown timer ───────────────────────────────────────────────
const countdown = ref({ days: 0, hours: 0, mins: 0, secs: 0 });
let timer = null;

const pad = (n) => String(n).padStart(2, '0');

onMounted(() => {
    if (props.subscription?.ends_at) {
        const update = () => {
            const diff = Math.max(0, new Date(props.subscription.ends_at).getTime() - Date.now());
            countdown.value = {
                days:  Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                mins:  Math.floor((diff % 3600000) / 60000),
                secs:  Math.floor((diff % 60000) / 1000),
            };
        };
        update();
        timer = setInterval(update, 1000);
    }
});
onBeforeUnmount(() => clearInterval(timer));

// ── Current plan helpers ──────────────────────────────────────────
const currentPlan = computed(() =>
    props.plans.find(p => p.id === props.subscription?.plan?.id) ?? null
);

const fmtLimit = (v) => v === null ? 'Unlimited' : new Intl.NumberFormat().format(v);
const fmtDevices = (n) => n === null ? 'Unlimited' : `${n} Device${n !== 1 ? 's' : ''}`;
const fmtPrice = (p) => {
    if (p.price === 0) return 'Rs0';
    return `Rs${new Intl.NumberFormat('en-PK', { minimumFractionDigits: 2 }).format(p.price)}`;
};

// ── Feature comparison table ──────────────────────────────────────
const FEATURES = [
    { key: 'map_scraping',    label: 'Unlimited Map Scraping',   desc: 'Scrape as many Google Maps results as you need', type: 'bool',    getter: p => !p.is_free },
    { key: 'basic_signals',   label: 'Basic Business Signals',   desc: 'Name, address, category, rating, total reviews', type: 'bool',    getter: () => true },
    { key: 'contact_ready',   label: 'Contact-Ready Leads',      desc: 'Verified phone & website data included',         type: 'bool',    getter: () => true },
    { key: 'email_scraping',  label: 'Email Scraping',           desc: 'Extract emails from business websites',          type: 'bool',    getter: () => true },
    { key: 'social_media',    label: 'Social Media Scraping',    desc: 'Facebook, Instagram, Twitter & more',            type: 'bool',    getter: () => true },
    { key: 'website_ext',     label: 'Website Extraction',       desc: 'Pull full website URLs from listings',           type: 'bool',    getter: () => true },
    { key: 'review_insights', label: 'Latest Review Insights',   desc: 'Recent review text & sentiment signals',         type: 'bool',    getter: () => true },
    { key: 'review_filters',  label: 'Advanced Review Filters',  desc: 'Filter by rating, recency & keywords',           type: 'bool',    getter: () => true },
    { key: 'leads_limit',     label: 'Daily Leads Limit',        desc: 'Max leads you can collect per day',              type: 'pill',    getter: p => fmtLimit(p.monthly_lead_limit) },
    { key: 'exports',         label: 'Export Leads',             desc: 'Download leads as CSV / Excel',                  type: 'pill',    getter: p => fmtLimit(p.monthly_export_limit) },
    { key: 'devices',         label: 'Devices Access',           desc: 'Number of devices that can access your account', type: 'text',    getter: p => fmtDevices(p.max_devices) },
    { key: 'priority',        label: 'Priority Support',         desc: 'Fast-track support response',                    type: 'bool',    getter: p => p.priority_support },
];

// ── Payment history helpers ───────────────────────────────────────
const statusBadge = (status) => ({
    pending_review: { cls: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', icon: Clock,       label: 'Pending Review' },
    approved:       { cls: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',     icon: CheckCircle, label: 'Approved' },
    rejected:       { cls: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',             icon: XCircle,     label: 'Rejected' },
}[status] ?? { cls: 'bg-surface-100 text-surface-600', icon: Clock, label: status });

const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

// ── Cancel modal ──────────────────────────────────────────────────
const showCancelModal = ref(false);
const cancelling      = ref(false);
const cancelPlan = () => {
    cancelling.value = true;
    router.delete(route('billing.cancel'), {
        onFinish: () => { cancelling.value = false; showCancelModal.value = false; },
    });
};
</script>

<template>
    <Head title="Billing & Plans" />
    <AuthenticatedLayout>
        <div class="w-full space-y-6">

            <!-- ── Trial countdown banner ── -->
            <div v-if="is_on_trial"
                class="rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-5">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div class="flex items-start gap-3">
                        <div class="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center flex-shrink-0">
                            <Clock class="h-5 w-5 text-orange-500" />
                        </div>
                        <div>
                            <p class="font-bold text-orange-800 dark:text-orange-300 text-base">Free Trial Active — Time Remaining</p>
                            <p class="text-xs text-orange-600 dark:text-orange-400 mt-0.5">Upgrade to a paid plan to keep full access after trial ends.</p>
                        </div>
                    </div>
                    <Link :href="route('billing.checkout', plans.find(p => p.is_featured)?.id ?? plans[1]?.id ?? plans[0]?.id)"
                        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors flex-shrink-0 self-start sm:self-auto">
                        <ArrowUp class="h-4 w-4" />
                        Upgrade Now
                    </Link>
                </div>

                <!-- Countdown -->
                <div class="mt-4 flex items-center gap-3">
                    <div v-for="(unit, key) in [
                        { val: pad(countdown.days),  label: 'DAYS' },
                        { val: pad(countdown.hours), label: 'HRS' },
                        { val: pad(countdown.mins),  label: 'MIN' },
                        { val: pad(countdown.secs),  label: 'SEC' },
                    ]" :key="key" class="text-center">
                        <div class="w-14 h-14 rounded-xl bg-white dark:bg-surface-900 border border-orange-200 dark:border-orange-800 flex items-center justify-center">
                            <span class="text-2xl font-black text-orange-600 dark:text-orange-400 tabular-nums">{{ unit.val }}</span>
                        </div>
                        <p class="text-[10px] font-bold text-orange-500 mt-1 tracking-wider">{{ unit.label }}</p>
                    </div>
                    <span class="text-2xl font-black text-orange-400 mb-5">:</span>
                    <div class="text-center">
                        <div class="w-14 h-14 rounded-xl bg-white dark:bg-surface-900 border border-orange-200 dark:border-orange-800 flex items-center justify-center">
                            <span class="text-2xl font-black text-orange-600 dark:text-orange-400 tabular-nums">{{ pad(countdown.hours) }}</span>
                        </div>
                        <p class="text-[10px] font-bold text-orange-500 mt-1 tracking-wider">HRS</p>
                    </div>
                </div>
            </div>

            <!-- ── Current plan card ── -->
            <div v-if="subscription" class="card overflow-hidden">
                <!-- Header -->
                <div class="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-surface-100 dark:border-surface-800">
                    <div class="flex items-center gap-3 flex-wrap">
                        <span class="font-bold text-surface-900 dark:text-white text-base">Current Plan</span>
                        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                            <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            {{ subscription.plan.name }}
                        </span>
                        <span v-if="is_on_trial" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                            <Clock class="h-3 w-3" />
                            {{ countdown.days }}d {{ pad(countdown.hours) }}h {{ pad(countdown.mins) }}m left
                        </span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span v-if="subscription.ends_at" class="text-sm text-surface-500">
                            Trial ends {{ subscription.ends_at_formatted ?? fmtDate(subscription.ends_at) }}
                        </span>
                        <Link v-if="is_on_trial"
                            :href="route('billing.checkout', plans.find(p => p.is_featured)?.id ?? plans[1]?.id ?? plans[0]?.id)"
                            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors">
                            <ArrowUp class="h-4 w-4" /> Upgrade Now
                        </Link>
                    </div>
                </div>

                <!-- Features 4-col grid -->
                <div v-if="currentPlan" class="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-surface-100 dark:divide-surface-800">
                    <!-- Daily Leads Limit -->
                    <div class="p-5">
                        <p class="text-[11px] font-semibold text-surface-400 uppercase tracking-wide mb-2">Daily Leads Limit</p>
                        <div class="flex items-center gap-1.5">
                            <Infinity v-if="currentPlan.monthly_lead_limit === null" class="h-6 w-6 text-surface-800 dark:text-white" />
                            <p class="text-xl font-black text-surface-900 dark:text-white">{{ fmtLimit(currentPlan.monthly_lead_limit) }}</p>
                        </div>
                        <p class="text-xs text-surface-400 mt-1">{{ currentPlan.monthly_lead_limit === null ? 'No daily limit on your plan' : 'leads per month' }}</p>
                    </div>
                    <!-- Export Leads -->
                    <div class="p-5">
                        <p class="text-[11px] font-semibold text-surface-400 uppercase tracking-wide mb-2">Export Leads</p>
                        <p class="text-xl font-black text-surface-900 dark:text-white">{{ fmtLimit(currentPlan.monthly_export_limit) }}</p>
                        <p class="text-xs text-surface-400 mt-1">CSV / Excel downloads</p>
                    </div>
                    <!-- Devices Access -->
                    <div class="p-5">
                        <p class="text-[11px] font-semibold text-surface-400 uppercase tracking-wide mb-2">Devices Access</p>
                        <p class="text-xl font-black text-surface-900 dark:text-white">{{ fmtDevices(currentPlan.max_devices) }}</p>
                        <p class="text-xs text-surface-400 mt-1">Simultaneous logins</p>
                    </div>
                    <!-- Priority Support -->
                    <div class="p-5">
                        <p class="text-[11px] font-semibold text-surface-400 uppercase tracking-wide mb-2">Priority Support</p>
                        <span v-if="currentPlan.priority_support"
                            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-semibold border border-green-200 dark:border-green-800">
                            <CheckCircle class="h-4 w-4" /> Included
                        </span>
                        <span v-else
                            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-500 text-sm font-semibold border border-surface-200 dark:border-surface-700">
                            <X class="h-4 w-4" /> Not included
                        </span>
                        <p class="text-xs text-surface-400 mt-2">Fast-track support response</p>
                    </div>
                </div>

                <!-- Feature tags -->
                <div class="px-5 py-3 border-t border-surface-100 dark:border-surface-800 flex flex-wrap gap-2">
                    <span v-for="tag in ['Basic Business Signals','Contact-Ready Leads','Email Scraping','Social Media Scraping','Website Extraction','Latest Review Insights','Advanced Review Filters']"
                        :key="tag"
                        class="inline-flex items-center gap-1 text-xs text-green-700 dark:text-green-400 font-medium">
                        <CheckCircle class="h-3.5 w-3.5" /> {{ tag }}
                    </span>
                </div>
            </div>

            <!-- ── Choose Your Plan ── -->
            <div>
                <h2 class="text-xl font-bold text-surface-900 dark:text-white mb-5">Choose Your Plan</h2>

                <!-- Monthly / Yearly toggle -->
                <div class="flex items-center justify-center gap-2 mb-6">
                    <button @click="billingCycle = 'monthly'"
                        :class="['px-5 py-2 rounded-full text-sm font-semibold transition-colors',
                            billingCycle === 'monthly'
                                ? 'bg-primary-600 text-white shadow-sm'
                                : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700']">
                        Monthly
                    </button>
                    <button @click="billingCycle = 'yearly'"
                        :class="['px-5 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2',
                            billingCycle === 'yearly'
                                ? 'bg-primary-600 text-white shadow-sm'
                                : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700']">
                        Yearly
                        <span class="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">Save 2 months</span>
                    </button>
                </div>

                <!-- Plan cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div v-for="plan in plans" :key="plan.id"
                        :class="['relative rounded-2xl border-2 p-6 flex flex-col transition-all',
                            plan.is_featured
                                ? 'bg-primary-600 border-primary-600 text-white shadow-xl'
                                : subscription?.plan?.id === plan.id
                                    ? 'border-green-500 bg-white dark:bg-surface-900'
                                    : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900']">

                        <!-- Active plan badge -->
                        <div v-if="subscription?.plan?.id === plan.id"
                            class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-green-500 text-white text-xs font-bold shadow">
                            Your Active Plan
                        </div>
                        <!-- Featured badge -->
                        <div v-else-if="plan.is_featured"
                            class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange-500 text-white text-xs font-bold shadow">
                            Popular
                        </div>

                        <!-- Plan name + description -->
                        <h3 :class="['text-xl font-bold', plan.is_featured ? 'text-white' : 'text-surface-900 dark:text-white']">
                            {{ plan.name }}
                        </h3>
                        <p :class="['text-sm mt-1 mb-4', plan.is_featured ? 'text-primary-100' : 'text-surface-500']">
                            {{ plan.description ?? 'Access all features included in this plan.' }}
                        </p>

                        <!-- Price -->
                        <div class="mb-5">
                            <span :class="['text-3xl font-black', plan.is_featured ? 'text-white' : 'text-surface-900 dark:text-white']">
                                {{ fmtPrice(plan) }}
                            </span>
                            <span :class="['text-sm font-medium', plan.is_featured ? 'text-primary-200' : 'text-surface-500']">
                                /month
                            </span>
                        </div>

                        <!-- Features list -->
                        <ul class="space-y-2.5 flex-1 mb-6">
                            <li class="flex items-center gap-2 text-sm">
                                <CheckCircle :class="['h-4 w-4 flex-shrink-0', plan.is_featured ? 'text-primary-200' : 'text-green-500']" />
                                <span :class="plan.is_featured ? 'text-white' : 'text-surface-700 dark:text-surface-300'">
                                    Daily Leads Limit:
                                    <strong>{{ fmtLimit(plan.monthly_lead_limit) }}</strong>
                                </span>
                            </li>
                            <li class="flex items-center gap-2 text-sm">
                                <CheckCircle :class="['h-4 w-4 flex-shrink-0', plan.is_featured ? 'text-primary-200' : 'text-green-500']" />
                                <span :class="plan.is_featured ? 'text-white' : 'text-surface-700 dark:text-surface-300'">
                                    Export Leads:
                                    <strong>{{ fmtLimit(plan.monthly_export_limit) }}</strong>
                                </span>
                            </li>
                            <li class="flex items-center gap-2 text-sm">
                                <CheckCircle :class="['h-4 w-4 flex-shrink-0', plan.is_featured ? 'text-primary-200' : 'text-green-500']" />
                                <span :class="plan.is_featured ? 'text-white' : 'text-surface-700 dark:text-surface-300'">
                                    Devices Access:
                                    <strong>{{ fmtDevices(plan.max_devices) }}</strong>
                                </span>
                            </li>
                            <li class="flex items-center gap-2 text-sm">
                                <component :is="plan.priority_support ? CheckCircle : X"
                                    :class="['h-4 w-4 flex-shrink-0',
                                        plan.is_featured
                                            ? (plan.priority_support ? 'text-primary-200' : 'text-primary-300')
                                            : (plan.priority_support ? 'text-green-500' : 'text-surface-400')]" />
                                <span :class="plan.is_featured ? 'text-white' : (plan.priority_support ? 'text-surface-700 dark:text-surface-300' : 'text-surface-400')">
                                    Priority Support
                                </span>
                            </li>
                        </ul>

                        <!-- CTA button -->
                        <div>
                            <Link v-if="subscription?.plan?.id !== plan.id"
                                :href="route('billing.checkout', plan.id)"
                                :class="['w-full block text-center py-3 rounded-xl font-bold text-sm transition-colors',
                                    plan.is_featured
                                        ? 'bg-white text-primary-700 hover:bg-primary-50'
                                        : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20']">
                                Get Started
                            </Link>
                            <button v-else disabled
                                class="w-full py-3 rounded-xl font-bold text-sm bg-surface-100 dark:bg-surface-800 text-surface-400 cursor-not-allowed">
                                Current Plan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── Feature comparison table ── -->
            <div class="card overflow-hidden">
                <div class="px-6 py-8 text-center border-b border-surface-100 dark:border-surface-800">
                    <p class="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">What's Included</p>
                    <h2 class="text-2xl font-black text-surface-900 dark:text-white">Lead Intelligence by Plan</h2>
                    <p class="mt-2 text-sm text-surface-500 max-w-md mx-auto">
                        Each plan unlocks deeper business data. See exactly what intelligence you get at every tier.
                    </p>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b border-surface-100 dark:border-surface-800">
                                <th class="px-6 py-4 text-left font-semibold text-surface-500 uppercase text-xs tracking-wide w-1/3">Feature</th>
                                <th v-for="plan in plans" :key="plan.id"
                                    :class="['px-4 py-4 text-center font-bold text-sm', plan.is_featured ? 'text-primary-600 dark:text-primary-400' : 'text-surface-900 dark:text-white']">
                                    {{ plan.name }}
                                    <div :class="['text-xs font-normal mt-0.5', plan.is_featured ? 'text-primary-500' : 'text-surface-400']">
                                        {{ plan.price === 0 ? 'Free' : `Rs${new Intl.NumberFormat('en-PK', { minimumFractionDigits: 2 }).format(plan.price)}/mo` }}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-surface-100 dark:divide-surface-800">
                            <tr v-for="feat in FEATURES" :key="feat.key"
                                class="hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors">
                                <td class="px-6 py-4">
                                    <p class="font-medium text-surface-900 dark:text-white">{{ feat.label }}</p>
                                    <p class="text-xs text-surface-400 mt-0.5">{{ feat.desc }}</p>
                                </td>
                                <td v-for="plan in plans" :key="plan.id" class="px-4 py-4 text-center">
                                    <!-- bool type -->
                                    <template v-if="feat.type === 'bool'">
                                        <CheckCircle v-if="feat.getter(plan)" class="h-5 w-5 text-green-500 mx-auto" />
                                        <X v-else class="h-5 w-5 text-surface-300 mx-auto" />
                                    </template>
                                    <!-- pill type -->
                                    <template v-else-if="feat.type === 'pill'">
                                        <span class="inline-block px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold border border-green-200 dark:border-green-800">
                                            {{ feat.getter(plan) }}
                                        </span>
                                    </template>
                                    <!-- text type -->
                                    <template v-else>
                                        <span class="text-sm font-semibold text-surface-700 dark:text-surface-300">
                                            {{ feat.getter(plan) }}
                                        </span>
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- ── Billing History ── -->
            <div class="card overflow-hidden">
                <div class="flex items-center gap-3 px-6 py-4 border-b border-surface-100 dark:border-surface-800">
                    <div class="w-7 h-7 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                        <ReceiptText class="h-4 w-4 text-primary-600" />
                    </div>
                    <h2 class="font-bold text-surface-900 dark:text-white">Billing History</h2>
                </div>

                <div v-if="payments.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
                    <div class="w-14 h-14 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-3">
                        <ReceiptText class="h-7 w-7 text-surface-300" />
                    </div>
                    <p class="font-semibold text-surface-700 dark:text-surface-300">No billing history yet</p>
                    <p class="text-sm text-surface-400 mt-1">Your payment history will appear here</p>
                </div>

                <table v-else class="w-full text-sm">
                    <thead class="bg-surface-50 dark:bg-surface-800/50">
                        <tr class="text-left border-b border-surface-100 dark:border-surface-800">
                            <th class="px-6 py-3 font-semibold text-surface-500 text-xs uppercase tracking-wide">Date</th>
                            <th class="px-4 py-3 font-semibold text-surface-500 text-xs uppercase tracking-wide">Plan</th>
                            <th class="px-4 py-3 font-semibold text-surface-500 text-xs uppercase tracking-wide">Amount</th>
                            <th class="px-4 py-3 font-semibold text-surface-500 text-xs uppercase tracking-wide">Status</th>
                            <th class="px-4 py-3 font-semibold text-surface-500 text-xs uppercase tracking-wide">Invoice</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-surface-100 dark:divide-surface-800">
                        <tr v-for="p in payments" :key="p.id" class="hover:bg-surface-50 dark:hover:bg-surface-800/30">
                            <td class="px-6 py-3.5 text-surface-500">{{ fmtDate(p.created_at) }}</td>
                            <td class="px-4 py-3.5 font-medium text-surface-900 dark:text-white">{{ p.plan_name }}</td>
                            <td class="px-4 py-3.5 font-semibold">{{ p.currency }} {{ Number(p.amount).toLocaleString() }}</td>
                            <td class="px-4 py-3.5">
                                <span :class="['inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold', statusBadge(p.status).cls]">
                                    <component :is="statusBadge(p.status).icon" class="h-3.5 w-3.5" />
                                    {{ statusBadge(p.status).label }}
                                </span>
                                <p v-if="p.status === 'rejected' && p.rejection_reason" class="mt-1 text-xs text-red-600">
                                    {{ p.rejection_reason }}
                                </p>
                            </td>
                            <td class="px-4 py-3.5">
                                <a v-if="p.has_invoice" :href="route('billing.invoice.download', p.id)"
                                    class="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-xs font-medium">
                                    <Download class="h-3.5 w-3.5" /> {{ p.invoice_number }}
                                </a>
                                <span v-else class="text-surface-300 text-xs">—</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- ── Plan Management ── -->
            <div v-if="subscription && !is_on_trial">
                <h2 class="font-bold text-surface-900 dark:text-white mb-4">Plan Management</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link :href="route('billing.index')"
                        class="flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm transition-colors">
                        <ArrowUp class="h-5 w-5" /> Upgrade Plan
                    </Link>
                    <button @click="showCancelModal = true"
                        class="flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors">
                        <X class="h-5 w-5" /> Cancel Plan
                    </button>
                </div>
            </div>

            <!-- ── Plan Management for trial (just upgrade) ── -->
            <div v-else-if="is_on_trial">
                <h2 class="font-bold text-surface-900 dark:text-white mb-4">Plan Management</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link :href="route('billing.checkout', plans.find(p => p.is_featured)?.id ?? plans[1]?.id ?? plans[0]?.id)"
                        class="flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm transition-colors">
                        <ArrowUp class="h-5 w-5" /> Upgrade Plan
                    </Link>
                    <button disabled
                        class="flex items-center justify-center gap-2 py-4 rounded-2xl bg-surface-200 dark:bg-surface-800 text-surface-400 font-bold text-sm cursor-not-allowed">
                        <X class="h-5 w-5" /> Cancel Plan
                    </button>
                </div>
            </div>

        </div>
    </AuthenticatedLayout>

    <!-- Cancel confirmation modal -->
    <Teleport to="body">
        <div v-if="showCancelModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="showCancelModal = false" />
            <div class="relative bg-white dark:bg-surface-900 rounded-2xl shadow-2xl p-6 w-full max-w-md">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-11 h-11 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <X class="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                        <h3 class="font-bold text-surface-900 dark:text-white">Cancel Subscription</h3>
                        <p class="text-xs text-surface-500">This action cannot be undone</p>
                    </div>
                </div>
                <p class="text-sm text-surface-600 dark:text-surface-300 mb-6">
                    Are you sure you want to cancel your plan? You'll lose access to premium features at the end of your current billing period.
                </p>
                <div class="flex gap-3">
                    <button @click="showCancelModal = false"
                        class="flex-1 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 font-semibold text-sm hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                        Keep Plan
                    </button>
                    <button @click="cancelPlan" :disabled="cancelling"
                        class="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors disabled:opacity-60">
                        {{ cancelling ? 'Cancelling…' : 'Yes, Cancel' }}
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>
