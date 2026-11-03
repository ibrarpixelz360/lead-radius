<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import {
    Search, Users, TrendingUp, Wallet, Calendar, Star,
    Bookmark, MapPin, Download, Monitor, Headphones,
    ChevronRight, AlertCircle, CheckCircle, X,
    Puzzle, BookmarkIcon, ArrowDownToLine,
} from 'lucide-vue-next';

const page = usePage();
const userName = computed(() => page.props.auth?.user?.name?.split(' ')[0] ?? 'there');

const props = defineProps({
    stats:           Object,
    plan_info:       Object,
    recent_searches: Array,
    recent_leads:    Array,
});

const fmt = (n) => new Intl.NumberFormat().format(n ?? 0);

// Plan feature display helpers
const leadsLabel = computed(() => {
    if (!props.plan_info) return '—';
    return props.plan_info.monthly_lead_limit === null ? 'Unlimited' : fmt(props.plan_info.monthly_lead_limit);
});
const exportsLabel = computed(() => {
    if (!props.plan_info) return '—';
    return props.plan_info.monthly_export_limit === null ? 'Unlimited' : fmt(props.plan_info.monthly_export_limit);
});
const devicesLabel = computed(() => {
    if (!props.plan_info) return '—';
    const n = props.plan_info.max_devices;
    return n === null ? 'Unlimited' : `${n} Device${n !== 1 ? 's' : ''}`;
});
</script>

<template>
    <Head title="Dashboard" />
    <AuthenticatedLayout>
        <div class="w-full space-y-6">

            <!-- ── Welcome banner ── -->
            <div class="rounded-2xl bg-primary-600 p-6 text-white">
                <h1 class="text-2xl font-black">Welcome back, {{ userName }}!</h1>
                <p class="mt-1 text-primary-200 text-sm">
                    {{ plan_info?.monthly_lead_limit === null ? 'You have unlimited leads today.' : `You have ${fmt(plan_info?.monthly_lead_limit ?? 0)} leads available.` }}
                    Start building your business network!
                </p>

                <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div v-for="step in [
                        { num: 1, icon: Search,          title: 'Search GMB Leads',     desc: 'Pick your country, state, city, and a search keyword. Set radius, minimum rating, review count, and required contact fields.' },
                        { num: 2, icon: BookmarkIcon,    title: 'Filter & Save',        desc: 'Our scraper pulls fresh GMB listings. Filter further by AI category (Hot, SEO Weak, Inactive) and save the ones you want.' },
                        { num: 3, icon: ArrowDownToLine, title: 'Export Anywhere',      desc: 'Export to CSV or XLSX with custom column selection. Push directly into your CRM, cold email tool, or outreach sequence.' },
                        { num: 4, icon: Puzzle,          title: 'Contact Businesses',   desc: 'Use the verified phone, email, and website data to reach out. Track status: New → Contacted → Responded → Converted.' },
                    ]" :key="step.num"
                        class="rounded-xl bg-white/10 hover:bg-white/15 transition-colors p-4 flex items-start gap-3">
                        <div class="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                            <component :is="step.icon" class="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p class="font-bold text-white text-sm">{{ step.num }}. {{ step.title }}</p>
                            <p class="text-primary-200 text-xs mt-0.5 leading-relaxed">{{ step.desc }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── Quick action cards ── -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link :href="route('leads.search.create')"
                    class="card p-5 flex items-center gap-4 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 transition-all group">
                    <div class="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <Search class="h-7 w-7 text-blue-500" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="font-bold text-surface-900 dark:text-white text-base">Find Leads</p>
                        <p class="text-sm text-surface-500">Search for new businesses</p>
                    </div>
                    <ChevronRight class="h-5 w-5 text-surface-300 group-hover:text-primary-500 transition-colors flex-shrink-0" />
                </Link>

                <Link :href="route('leads.index')"
                    class="card p-5 flex items-center gap-4 hover:shadow-md hover:border-green-200 dark:hover:border-green-700 transition-all group">
                    <div class="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <Bookmark class="h-7 w-7 text-green-600" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="font-bold text-surface-900 dark:text-white text-base">My Leads</p>
                        <p class="text-sm text-surface-500">View your saved leads</p>
                    </div>
                    <ChevronRight class="h-5 w-5 text-surface-300 group-hover:text-green-500 transition-colors flex-shrink-0" />
                </Link>
            </div>

            <!-- ── Plan info + features ── -->
            <div v-if="plan_info" class="card overflow-hidden">
                <!-- Plan banner -->
                <div class="flex items-center justify-between px-5 py-4 border-b border-surface-100 dark:border-surface-800">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                            <Wallet class="h-4 w-4 text-orange-500" />
                        </div>
                        <div>
                            <p class="font-bold text-surface-900 dark:text-white">{{ plan_info.name }}</p>
                            <div v-if="plan_info.expires_at" class="flex items-center gap-2 mt-0.5">
                                <Calendar class="h-3.5 w-3.5 text-surface-400" />
                                <span class="text-xs text-surface-500">Expires:</span>
                                <span class="text-xs font-semibold text-orange-500">{{ plan_info.expires_at }}</span>
                                <span class="text-xs text-surface-400">({{ plan_info.expires_human }})</span>
                            </div>
                        </div>
                    </div>
                    <Link :href="route('billing.index')"
                        class="text-sm font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors">
                        View Plan
                    </Link>
                </div>

                <!-- Feature grid -->
                <div class="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-surface-100 dark:divide-surface-800">

                    <!-- Daily Leads Limit -->
                    <div class="p-5">
                        <div class="flex items-center gap-2 mb-3">
                            <MapPin class="h-4 w-4 text-orange-400" />
                            <span class="text-xs font-semibold text-surface-500 uppercase tracking-wide">Daily Leads Limit</span>
                        </div>
                        <p class="text-2xl font-black text-surface-900 dark:text-white">{{ leadsLabel }}</p>
                        <p class="text-xs text-surface-400 mt-1">
                            {{ plan_info.monthly_lead_limit === null ? 'No daily limit on your plan' : 'leads per month' }}
                        </p>
                    </div>

                    <!-- Export Leads -->
                    <div class="p-5">
                        <div class="flex items-center gap-2 mb-3">
                            <Download class="h-4 w-4 text-green-500" />
                            <span class="text-xs font-semibold text-surface-500 uppercase tracking-wide">Export Leads</span>
                        </div>
                        <p class="text-2xl font-black text-surface-900 dark:text-white">{{ exportsLabel }}</p>
                        <p class="text-xs text-surface-400 mt-1">CSV / Excel downloads</p>
                    </div>

                    <!-- Devices Access -->
                    <div class="p-5">
                        <div class="flex items-center gap-2 mb-3">
                            <Monitor class="h-4 w-4 text-blue-500" />
                            <span class="text-xs font-semibold text-surface-500 uppercase tracking-wide">Devices Access</span>
                        </div>
                        <p class="text-2xl font-black text-surface-900 dark:text-white">
                            <span>{{ plan_info.max_devices === null ? 'Unlimited' : plan_info.max_devices }}</span>
                            <span v-if="plan_info.max_devices !== null" class="text-base font-semibold text-surface-600 dark:text-surface-400 ml-1">
                                Device{{ plan_info.max_devices !== 1 ? 's' : '' }}
                            </span>
                        </p>
                        <p class="text-xs text-surface-400 mt-1">Simultaneous logins</p>
                    </div>

                    <!-- Priority Support -->
                    <div class="p-5">
                        <div class="flex items-center gap-2 mb-3">
                            <Headphones class="h-4 w-4 text-purple-500" />
                            <span class="text-xs font-semibold text-surface-500 uppercase tracking-wide">Priority Support</span>
                        </div>
                        <div v-if="plan_info.priority_support" class="flex items-center gap-2 mt-1">
                            <span class="inline-flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-semibold px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800">
                                <CheckCircle class="h-4 w-4" /> Included
                            </span>
                        </div>
                        <div v-else class="flex items-center gap-2 mt-1">
                            <span class="inline-flex items-center gap-1.5 bg-surface-100 dark:bg-surface-800 text-surface-500 text-sm font-semibold px-3 py-1.5 rounded-full border border-surface-200 dark:border-surface-700">
                                <X class="h-4 w-4" /> Not included
                            </span>
                        </div>
                        <p class="text-xs text-surface-400 mt-2">Fast-track support response</p>
                    </div>
                </div>
            </div>

            <!-- ── Stats grid ── -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="card p-5">
                    <div class="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 w-fit">
                        <Users class="h-5 w-5 text-primary-600" />
                    </div>
                    <p class="mt-3 text-2xl font-bold">{{ fmt(stats.total_leads) }}</p>
                    <p class="text-xs text-surface-500 mt-0.5">Total Leads</p>
                </div>

                <div class="card p-5">
                    <div class="p-2 rounded-lg bg-green-50 dark:bg-green-900/30 w-fit">
                        <Calendar class="h-5 w-5 text-green-600" />
                    </div>
                    <p class="mt-3 text-2xl font-bold">{{ fmt(stats.today_leads) }}</p>
                    <p class="text-xs text-surface-500 mt-0.5">Today's Leads</p>
                </div>

                <div class="card p-5">
                    <div class="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/30 w-fit">
                        <Star class="h-5 w-5 text-orange-500" />
                    </div>
                    <p class="mt-3 text-2xl font-bold">{{ fmt(stats.hot_leads) }}</p>
                    <p class="text-xs text-surface-500 mt-0.5">Hot Leads</p>
                </div>

                <div class="card p-5">
                    <div class="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 w-fit">
                        <Wallet class="h-5 w-5 text-purple-600" />
                    </div>
                    <p class="mt-3 text-2xl font-bold">PKR {{ fmt(stats.affiliate_balance) }}</p>
                    <p class="text-xs text-surface-500 mt-0.5">Affiliate Balance</p>
                </div>
            </div>

            <!-- ── Recent activity ── -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Recent searches -->
                <div class="card p-5">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="font-semibold text-surface-900 dark:text-white">Recent Searches</h2>
                        <Link :href="route('leads.searches.index')" class="text-xs text-primary-600 hover:underline">View all</Link>
                    </div>
                    <div v-if="recent_searches.length === 0" class="flex flex-col items-center justify-center py-10 text-center">
                        <Search class="h-8 w-8 text-surface-200 mb-2" />
                        <p class="text-sm text-surface-400">No searches yet.</p>
                        <Link :href="route('leads.search.create')" class="mt-3 text-xs text-primary-600 hover:underline">Run your first search →</Link>
                    </div>
                    <ul v-else class="space-y-1">
                        <li v-for="s in recent_searches" :key="s.id">
                            <Link :href="route('leads.searches.show', s.id)"
                                class="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors group">
                                <div class="min-w-0">
                                    <p class="text-sm font-medium text-surface-900 dark:text-white truncate">{{ s.query }}</p>
                                    <p class="text-xs text-surface-400">{{ s.city }}, {{ s.country }}</p>
                                </div>
                                <span :class="['badge text-xs ml-3 flex-shrink-0',
                                    s.status === 'completed' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                    s.status === 'running'   ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                    s.status === 'failed'    ? 'bg-red-50 text-red-700' :
                                    'bg-surface-100 text-surface-600']">
                                    {{ s.results_count }} · {{ s.status }}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <!-- Recent leads -->
                <div class="card p-5">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="font-semibold text-surface-900 dark:text-white">Recent Leads</h2>
                        <Link :href="route('leads.index')" class="text-xs text-primary-600 hover:underline">View all</Link>
                    </div>
                    <div v-if="recent_leads.length === 0" class="flex flex-col items-center justify-center py-10 text-center">
                        <Bookmark class="h-8 w-8 text-surface-200 mb-2" />
                        <p class="text-sm text-surface-400">No leads yet.</p>
                    </div>
                    <ul v-else class="space-y-1">
                        <li v-for="lead in recent_leads" :key="lead.id">
                            <Link :href="route('leads.show', lead.id)"
                                class="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
                                <div class="min-w-0 flex-1">
                                    <p class="text-sm font-medium text-surface-900 dark:text-white truncate">{{ lead.business_name }}</p>
                                    <p class="text-xs text-surface-400">{{ lead.city }} · ★ {{ lead.rating ?? '—' }}</p>
                                </div>
                                <span class="badge bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 capitalize ml-3 flex-shrink-0 text-xs">
                                    {{ lead.ai_category?.replace('_', ' ') ?? 'new' }}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </AuthenticatedLayout>
</template>
