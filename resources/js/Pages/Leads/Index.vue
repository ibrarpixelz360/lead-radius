<script setup>
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ref } from 'vue';
import {
    Search, Star, Phone, Mail, Globe, Download,
    Bookmark, X, Lock, CheckCircle, Clock, ChevronDown,
} from 'lucide-vue-next';

const props = defineProps({
    leads: Object,
    filters: Object,
    stats: Object,
});

const filterForm = useForm({
    q:           props.filters?.q           || '',
    country:     props.filters?.country     || '',
    state:       props.filters?.state       || '',
    city:        props.filters?.city        || '',
    status:      props.filters?.status      || '',
    min_rating:  props.filters?.min_rating  || '',
    min_reviews: props.filters?.min_reviews || '',
    has_email:   !!props.filters?.has_email,
    has_phone:   !!props.filters?.has_phone,
    has_website: !!props.filters?.has_website,
    ai_category: props.filters?.ai_category || '',
    is_favorite: props.filters?.is_favorite || '',
    is_archived: props.filters?.is_archived || '',
});

const selected = ref(new Set());
const bulkAction = ref('');

const applyFilters = () =>
    filterForm.get(route('leads.index'), { preserveScroll: true, preserveState: true });

const reset = () => {
    Object.keys(filterForm.data()).forEach(k => {
        filterForm[k] = typeof filterForm[k] === 'boolean' ? false : '';
    });
    applyFilters();
};

const setAiCategory = (key) => {
    filterForm.ai_category = key;
    applyFilters();
};

const toggleHas = (field) => {
    filterForm[field] = !filterForm[field];
    applyFilters();
};

const toggleAll = () => {
    if (selected.value.size === props.leads.data.length) {
        selected.value.clear();
    } else {
        props.leads.data.forEach(l => selected.value.add(l.id));
    }
};

const toggle = (id) => {
    if (selected.value.has(id)) selected.value.delete(id);
    else selected.value.add(id);
};

const runBulk = () => {
    if (!bulkAction.value || selected.value.size === 0) return;
    const isStatus = bulkAction.value.startsWith('status:');
    router.post(route('leads.bulk'), {
        lead_ids: Array.from(selected.value),
        action: isStatus ? 'set_status' : bulkAction.value,
        value:  isStatus ? bulkAction.value.replace('status:', '') : '',
    }, {
        preserveScroll: true,
        onSuccess: () => { selected.value.clear(); bulkAction.value = ''; },
    });
};

const toggleFavorite = (lead) => {
    router.patch(route('leads.update', lead.id), { is_favorite: !lead.is_favorite }, { preserveScroll: true });
};

const exportSelected = () => {
    if (selected.value.size === 0) { alert('Select at least one lead to export.'); return; }
    router.post(route('leads.exports.store'), {
        format: 'csv',
        filters: { lead_ids: Array.from(selected.value) },
    });
};

const categoryTypes = [
    { key: '',           label: 'All Leads',    emoji: null,  locked: false },
    { key: 'seo_weak',   label: 'SEO Weak',     emoji: '📋',  locked: true  },
    { key: 'low_rating', label: 'Low Rating',   emoji: '⭐',  locked: false },
    { key: 'hot',        label: 'Hot',          emoji: '🔥',  locked: false },
    { key: 'good',       label: 'Good',         emoji: '👍',  locked: false },
    { key: 'competitive',label: 'Competitive',  emoji: '🧠',  locked: false },
    { key: 'inactive',   label: 'Inactive',     emoji: null,  locked: false },
];

const categoryPillClass = (key) => {
    if (filterForm.ai_category === key) {
        return 'bg-gray-900 text-white border-gray-900';
    }
    const map = {
        '':            'border-surface-200 text-surface-700 hover:bg-surface-50',
        seo_weak:      'border-surface-200 text-surface-500 hover:bg-surface-50',
        low_rating:    'border-rose-200 text-rose-600 hover:bg-rose-50',
        hot:           'border-orange-200 text-orange-600 hover:bg-orange-50',
        good:          'border-amber-200 text-amber-700 hover:bg-amber-50',
        competitive:   'border-pink-200 text-pink-600 hover:bg-pink-50',
        inactive:      'border-surface-200 text-surface-500 hover:bg-surface-50',
    };
    return map[key] || 'border-surface-200 text-surface-700';
};

const statusColor = (status) => ({
    new:       'bg-surface-100 text-surface-700',
    contacted: 'bg-primary-50 text-primary-700',
    responded: 'bg-orange-50 text-orange-700',
    converted: 'bg-green-50 text-green-700',
    closed:    'bg-surface-200 text-surface-500',
}[status] || 'bg-surface-100 text-surface-700');

const aiCategoryColor = (cat) => ({
    hot:        'bg-red-50 text-red-700',
    good:       'bg-green-50 text-green-700',
    seo_weak:   'bg-orange-50 text-orange-700',
    low_rating: 'bg-yellow-50 text-yellow-700',
    inactive:   'bg-surface-100 text-surface-500',
    competitive:'bg-primary-50 text-primary-700',
}[cat] || 'bg-surface-100 text-surface-700');
</script>

<template>
    <Head title="My Leads" />
    <AuthenticatedLayout>
        <div class="w-full space-y-5">

            <!-- Page header -->
            <div class="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 class="text-2xl font-bold text-surface-900 dark:text-white">My Leads</h1>
                    <p class="mt-0.5 text-sm text-surface-500">Manage and track your saved business leads</p>
                </div>
                <div class="flex gap-2">
                    <Link :href="route('leads.exports.index')" class="btn-secondary text-sm">
                        <Download class="h-4 w-4" /> Exports
                    </Link>
                    <Link :href="route('leads.search.create')" class="btn-primary text-sm">
                        <Search class="h-4 w-4" /> Find Leads
                    </Link>
                </div>
            </div>

            <!-- Stats row -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="card p-4 flex items-center gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                        <Bookmark class="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <p class="text-xs text-surface-500 font-medium uppercase tracking-wide">Total Leads</p>
                        <p class="text-2xl font-bold text-surface-900 dark:text-white">{{ stats.total }}</p>
                    </div>
                </div>
                <div class="card p-4 flex items-center gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                        <Phone class="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <p class="text-xs text-surface-500 font-medium uppercase tracking-wide">Contacted</p>
                        <p class="text-2xl font-bold text-surface-900 dark:text-white">{{ stats.contacted }}</p>
                    </div>
                </div>
                <div class="card p-4 flex items-center gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
                        <Clock class="h-6 w-6 text-orange-500 dark:text-orange-400" />
                    </div>
                    <div>
                        <p class="text-xs text-surface-500 font-medium uppercase tracking-wide">Pending</p>
                        <p class="text-2xl font-bold text-surface-900 dark:text-white">{{ stats.new }}</p>
                    </div>
                </div>
                <div class="card p-4 flex items-center gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                        <CheckCircle class="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <p class="text-xs text-surface-500 font-medium uppercase tracking-wide">Converted</p>
                        <p class="text-2xl font-bold text-surface-900 dark:text-white">{{ stats.converted }}</p>
                    </div>
                </div>
            </div>

            <!-- Filter card -->
            <div class="card p-5 space-y-4">
                <!-- Search row -->
                <div class="flex gap-2">
                    <div class="relative flex-1">
                        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400 pointer-events-none" />
                        <input
                            v-model="filterForm.q"
                            type="text"
                            placeholder="Search by name, email, phone..."
                            class="input pl-9"
                            @keydown.enter="applyFilters"
                        />
                    </div>
                    <button @click="applyFilters" class="btn-primary px-5">Search</button>
                    <button @click="reset" class="btn-secondary px-5">Clear</button>
                </div>

                <!-- Filter dropdowns row -->
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
                    <input v-model="filterForm.country" placeholder="Country" class="input text-sm" />
                    <input v-model="filterForm.state"   placeholder="State"   class="input text-sm" />
                    <input v-model="filterForm.city"    placeholder="City"    class="input text-sm" />

                    <div class="relative">
                        <select v-model="filterForm.status" class="input text-sm appearance-none pr-8" @change="applyFilters">
                            <option value="">Status</option>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="responded">Responded</option>
                            <option value="converted">Converted</option>
                            <option value="closed">Closed</option>
                        </select>
                        <ChevronDown class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-surface-400" />
                    </div>

                    <div class="relative">
                        <select v-model="filterForm.min_rating" class="input text-sm appearance-none pr-8" @change="applyFilters">
                            <option value="">Rating</option>
                            <option value="3">3+ ⭐</option>
                            <option value="4">4+ ⭐</option>
                            <option value="4.5">4.5+ ⭐</option>
                        </select>
                        <ChevronDown class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-surface-400" />
                    </div>

                    <div class="relative">
                        <select class="input text-sm appearance-none pr-8">
                            <option value="">Review</option>
                            <option value="positive">Positive</option>
                            <option value="negative">Negative</option>
                        </select>
                        <ChevronDown class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-surface-400" />
                    </div>

                    <div class="relative">
                        <select v-model="filterForm.min_reviews" class="input text-sm appearance-none pr-8" @change="applyFilters">
                            <option value="">Reviews #</option>
                            <option value="10">10+</option>
                            <option value="50">50+</option>
                            <option value="100">100+</option>
                            <option value="500">500+</option>
                        </select>
                        <ChevronDown class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-surface-400" />
                    </div>
                </div>

                <!-- HAS toggles -->
                <div class="flex items-center gap-6 flex-wrap">
                    <span class="text-xs font-semibold text-surface-400 uppercase tracking-wider">HAS:</span>

                    <label class="flex items-center gap-2 cursor-pointer select-none">
                        <button type="button"
                            @click="toggleHas('has_email')"
                            :class="['relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none',
                                filterForm.has_email ? 'bg-green-500' : 'bg-surface-200 dark:bg-surface-700']">
                            <span :class="['pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200',
                                filterForm.has_email ? 'translate-x-5' : 'translate-x-0']" />
                        </button>
                        <span class="text-sm font-medium text-surface-700 dark:text-surface-300">Email</span>
                    </label>

                    <label class="flex items-center gap-2 cursor-pointer select-none">
                        <button type="button"
                            @click="toggleHas('has_phone')"
                            :class="['relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none',
                                filterForm.has_phone ? 'bg-green-500' : 'bg-surface-200 dark:bg-surface-700']">
                            <span :class="['pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200',
                                filterForm.has_phone ? 'translate-x-5' : 'translate-x-0']" />
                        </button>
                        <span class="text-sm font-medium text-surface-700 dark:text-surface-300">Phone</span>
                    </label>

                    <label class="flex items-center gap-2 cursor-pointer select-none">
                        <button type="button"
                            @click="toggleHas('has_website')"
                            :class="['relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none',
                                filterForm.has_website ? 'bg-green-500' : 'bg-surface-200 dark:bg-surface-700']">
                            <span :class="['pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200',
                                filterForm.has_website ? 'translate-x-5' : 'translate-x-0']" />
                        </button>
                        <span class="text-sm font-medium text-surface-700 dark:text-surface-300">Website</span>
                    </label>
                </div>

                <!-- Category filter pills -->
                <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-semibold text-surface-400 uppercase tracking-wider mr-1">FILTER BY TYPE:</span>
                    <button v-for="cat in categoryTypes" :key="cat.key"
                        @click="setAiCategory(cat.key)"
                        :class="['inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all',
                            categoryPillClass(cat.key)]">
                        <span v-if="cat.emoji">{{ cat.emoji }}</span>
                        <Lock v-if="cat.locked" class="h-3 w-3" />
                        <X v-if="cat.key === 'inactive' && !cat.emoji" class="h-3 w-3" />
                        {{ cat.label }}
                        <span class="opacity-60">({{ cat.key === '' ? stats.total : leads.data.filter(l => l.ai_category === cat.key).length }})</span>
                    </button>
                </div>
            </div>

            <!-- Bulk action bar -->
            <div v-if="selected.size > 0"
                class="card p-3 flex items-center justify-between bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800">
                <span class="text-sm font-semibold text-primary-700 dark:text-primary-300">
                    {{ selected.size }} lead{{ selected.size > 1 ? 's' : '' }} selected
                </span>
                <div class="flex items-center gap-2">
                    <select v-model="bulkAction" class="input text-sm py-1.5 w-44">
                        <option value="">Choose action...</option>
                        <option value="status:contacted">Mark contacted</option>
                        <option value="status:converted">Mark converted</option>
                        <option value="favorite">Add to favorites</option>
                        <option value="archive">Archive</option>
                        <option value="delete">Delete</option>
                    </select>
                    <button @click="runBulk" class="btn-primary text-sm py-1.5">Apply</button>
                    <button @click="exportSelected" class="btn-secondary text-sm py-1.5">
                        <Download class="h-4 w-4" /> Export
                    </button>
                </div>
            </div>

            <!-- Leads table -->
            <div class="card overflow-hidden">
                <div v-if="leads.data.length > 0" class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead class="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                            <tr>
                                <th class="px-4 py-3 w-10">
                                    <input type="checkbox"
                                        :checked="selected.size === leads.data.length && leads.data.length > 0"
                                        @change="toggleAll"
                                        class="rounded border-surface-300" />
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide">Business</th>
                                <th class="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide hidden md:table-cell">Category</th>
                                <th class="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide">Rating</th>
                                <th class="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide">Contact</th>
                                <th class="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide hidden lg:table-cell">AI Score</th>
                                <th class="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide">Status</th>
                                <th class="px-4 py-3 w-10"></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-surface-100 dark:divide-surface-800">
                            <tr v-for="lead in leads.data" :key="lead.id"
                                class="hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors">
                                <td class="px-4 py-3">
                                    <input type="checkbox"
                                        :checked="selected.has(lead.id)"
                                        @change="toggle(lead.id)"
                                        class="rounded border-surface-300" />
                                </td>
                                <td class="px-4 py-3 min-w-[180px]">
                                    <Link :href="route('leads.show', lead.id)"
                                        class="font-semibold text-surface-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                        {{ lead.business_name }}
                                    </Link>
                                    <p class="text-xs text-surface-400 mt-0.5">{{ [lead.city, lead.country].filter(Boolean).join(', ') }}</p>
                                </td>
                                <td class="px-4 py-3 hidden md:table-cell">
                                    <span v-if="lead.category" class="text-xs text-surface-600 dark:text-surface-400">{{ lead.category }}</span>
                                    <span v-else class="text-surface-300">—</span>
                                </td>
                                <td class="px-4 py-3">
                                    <div v-if="lead.rating" class="flex items-center gap-1">
                                        <Star class="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                                        <span class="text-xs font-medium text-surface-700 dark:text-surface-300">{{ lead.rating }}</span>
                                        <span class="text-xs text-surface-400">({{ lead.reviews_count }})</span>
                                    </div>
                                    <span v-else class="text-surface-300 text-xs">—</span>
                                </td>
                                <td class="px-4 py-3">
                                    <div class="flex items-center gap-2">
                                        <a v-if="lead.phone" :href="`tel:${lead.phone}`"
                                            class="p-1 rounded-md bg-green-50 hover:bg-green-100 dark:bg-green-900/30 transition-colors" :title="lead.phone">
                                            <Phone class="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                                        </a>
                                        <a v-if="lead.email" :href="`mailto:${lead.email}`"
                                            class="p-1 rounded-md bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/30 transition-colors" :title="lead.email">
                                            <Mail class="h-3.5 w-3.5 text-primary-600 dark:text-primary-400" />
                                        </a>
                                        <a v-if="lead.website" :href="lead.website" target="_blank" rel="noopener"
                                            class="p-1 rounded-md bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/30 transition-colors" :title="lead.website">
                                            <Globe class="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                                        </a>
                                    </div>
                                </td>
                                <td class="px-4 py-3 hidden lg:table-cell">
                                    <span v-if="lead.ai_category"
                                        :class="['badge text-xs font-medium', aiCategoryColor(lead.ai_category)]">
                                        {{ lead.ai_category.replace('_', ' ') }}
                                    </span>
                                    <span v-else class="text-surface-300 text-xs">—</span>
                                </td>
                                <td class="px-4 py-3">
                                    <span :class="['badge text-xs font-medium capitalize', statusColor(lead.user_status)]">
                                        {{ lead.user_status }}
                                    </span>
                                </td>
                                <td class="px-4 py-3">
                                    <button @click="toggleFavorite(lead)"
                                        class="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                                        <Star :class="['h-4 w-4 transition-colors',
                                            lead.is_favorite ? 'fill-yellow-400 text-yellow-400' : 'text-surface-300 hover:text-yellow-400']" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Empty state -->
                <div v-else class="flex flex-col items-center justify-center py-20 px-6 text-center">
                    <div class="w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-4">
                        <Bookmark class="h-8 w-8 text-surface-400" />
                    </div>
                    <h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-1">No Saved Leads</h3>
                    <p class="text-sm text-surface-500 max-w-xs mb-6">
                        You haven't saved any leads yet. Start by searching for businesses and saving potential leads.
                    </p>
                    <Link :href="route('leads.search.create')" class="btn-primary">
                        <Search class="h-4 w-4" /> Search for Leads
                    </Link>
                </div>
            </div>

            <!-- Pagination -->
            <div v-if="leads.last_page > 1" class="flex items-center justify-between text-sm">
                <p class="text-surface-500">
                    Showing {{ leads.from }}–{{ leads.to }} of {{ leads.total }} leads
                </p>
                <div class="flex gap-1">
                    <Link v-for="link in leads.links" :key="link.label"
                        :href="link.url ?? '#'"
                        :class="['px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors',
                            link.active
                                ? 'bg-primary-600 text-white border-primary-600'
                                : link.url
                                    ? 'border-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800 dark:border-surface-700'
                                    : 'border-surface-100 text-surface-300 cursor-not-allowed dark:border-surface-800']"
                        v-html="link.label"
                        :preserve-scroll="true" />
                </div>
            </div>

        </div>
    </AuthenticatedLayout>
</template>
