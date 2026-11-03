<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import {
    Search, Sparkles, MapPin, Globe, ChevronDown,
    Download, CheckCircle, XCircle, AlertCircle, Terminal, Loader2,
    Plus, X, Clock, Star, Phone, Mail, Eye, Play,
} from 'lucide-vue-next';

const props = defineProps({
    predefined_categories: { type: Array, default: () => [] },
    australian_states:     { type: Array, default: () => [] },
    recent_batches:        { type: Array, default: () => [] },
    active_batch_id:       { type: Number, default: null },
    recent_searches:       { type: Array, default: () => [] },
    saved_searches:        { type: Array, default: () => [] },
});

// ─── Active Tab ────────────────────────────────────────────────────────────────
const activeTab = ref('generator'); // 'generator' | 'classic' | 'history'

// ─── Generator Form State ──────────────────────────────────────────────────────
const generatorForm = ref({
    keywords:        [],
    categoryInput:   '',
    selectedStates:  [],
    customLocation:  '',
    limit:           50,
});

const isSubmitting   = ref(false);
const submitError    = ref(null);

// ─── Live Batch Polling State ──────────────────────────────────────────────────
const activeBatch = ref(null);
const batchStatus = ref(null);
const batchLogs   = ref([]);
const batchLeads  = ref([]);
let pollInterval  = null;

// Preset Category helpers
const defaultPresets = [
    'Plumber', 'Electrician', 'Roofers', 'Real Estate Agent', 'Dentist',
    'Accountant', 'Law Firm', 'Cleaning Service', 'HVAC Service',
    'Painter', 'Car Dealer', 'Hair Salon', 'Gym', 'Restaurant',
];

const availablePresets = computed(() => {
    return props.predefined_categories && props.predefined_categories.length > 0
        ? props.predefined_categories
        : defaultPresets;
});

const addKeyword = (kw) => {
    const clean = (kw || '').trim();
    if (!clean) return;
    if (!generatorForm.value.keywords.includes(clean)) {
        generatorForm.value.keywords.push(clean);
    }
    generatorForm.value.categoryInput = '';
};

const removeKeyword = (index) => {
    generatorForm.value.keywords.splice(index, 1);
};

const onKeywordInputKeydown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        addKeyword(generatorForm.value.categoryInput);
    }
};

const togglePreset = (preset) => {
    const idx = generatorForm.value.keywords.indexOf(preset);
    if (idx >= 0) {
        generatorForm.value.keywords.splice(idx, 1);
    } else {
        generatorForm.value.keywords.push(preset);
    }
};

const selectAllPresets = () => {
    const top = availablePresets.value.slice(0, 15);
    generatorForm.value.keywords = Array.from(new Set([...generatorForm.value.keywords, ...top]));
};

const clearAllKeywords = () => {
    generatorForm.value.keywords = [];
};

// Australian State selection helpers
const auStatesList = computed(() => {
    if (props.australian_states && props.australian_states.length > 0) {
        return props.australian_states;
    }
    return [
        { code: 'NSW', name: 'New South Wales' },
        { code: 'VIC', name: 'Victoria' },
        { code: 'QLD', name: 'Queensland' },
        { code: 'WA',  name: 'Western Australia' },
        { code: 'SA',  name: 'South Australia' },
        { code: 'TAS', name: 'Tasmania' },
        { code: 'ACT', name: 'Australian Capital Territory' },
        { code: 'NT',  name: 'Northern Territory' },
    ];
});

const toggleState = (code) => {
    const idx = generatorForm.value.selectedStates.indexOf(code);
    if (idx >= 0) {
        generatorForm.value.selectedStates.splice(idx, 1);
    } else {
        generatorForm.value.selectedStates.push(code);
    }
};

const selectAllStates = () => {
    generatorForm.value.selectedStates = auStatesList.value.map(s => s.code);
};

const clearAllStates = () => {
    generatorForm.value.selectedStates = [];
};

// Start Generator Batch
const startGenerator = async () => {
    submitError.value = null;

    if (generatorForm.value.keywords.length === 0 && generatorForm.value.categoryInput.trim()) {
        addKeyword(generatorForm.value.categoryInput);
    }

    if (generatorForm.value.keywords.length === 0) {
        submitError.value = 'Please add at least one keyword or category.';
        return;
    }

    if (generatorForm.value.selectedStates.length === 0 && !generatorForm.value.customLocation.trim()) {
        submitError.value = 'Please select at least one Australian state or enter a custom location.';
        return;
    }

    isSubmitting.value = true;

    try {
        const response = await fetch(route('leads.generator.start'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                keywords:        generatorForm.value.keywords,
                selected_states: generatorForm.value.selectedStates,
                custom_location: generatorForm.value.customLocation,
                limit:           parseInt(generatorForm.value.limit, 10) || 50,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            submitError.value = data.message || 'Failed to start generator.';
            isSubmitting.value = false;
            return;
        }

        activeBatch.value = { id: data.batch_id };
        startPolling(data.batch_id);
    } catch (err) {
        submitError.value = err.message || 'An unexpected error occurred.';
    } finally {
        isSubmitting.value = false;
    }
};

// Polling batch status & live logs
const fetchBatchStatus = async (batchId) => {
    try {
        const res = await fetch(route('leads.generator.batches.status', batchId), {
            headers: { 'Accept': 'application/json' },
        });
        if (!res.ok) return;
        const data = await res.json();
        batchStatus.value = data;
        batchLogs.value   = data.logs || [];
        batchLeads.value  = data.leads || [];

        if (data.is_finished) {
            stopPolling();
        }
    } catch (e) {
        console.error('Error polling batch status:', e);
    }
};

const startPolling = (batchId) => {
    stopPolling();
    fetchBatchStatus(batchId);
    pollInterval = setInterval(() => {
        fetchBatchStatus(batchId);
    }, 3000);
};

const stopPolling = () => {
    if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
    }
};

const cancelBatch = async () => {
    if (!batchStatus.value?.id) return;
    try {
        await fetch(route('leads.generator.batches.cancel', batchStatus.value.id), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                'Accept': 'application/json',
            },
        });
        fetchBatchStatus(batchStatus.value.id);
    } catch (e) {
        console.error(e);
    }
};

const dismissBatch = () => {
    stopPolling();
    activeBatch.value = null;
    batchStatus.value = null;
    batchLogs.value   = [];
    batchLeads.value  = [];
};

onMounted(() => {
    if (props.active_batch_id) {
        activeBatch.value = { id: props.active_batch_id };
        startPolling(props.active_batch_id);
    }
});

onBeforeUnmount(() => {
    stopPolling();
});

// ─── Classic Location Search Form (Tab 2) ──────────────────────────────────────
const locationData = {
    PK: { name: 'Pakistan', states: {
        Punjab: ['Lahore','Faisalabad','Rawalpindi','Gujranwala','Multan','Sialkot'],
        Sindh:  ['Karachi','Hyderabad','Sukkur','Larkana'],
        KPK:    ['Peshawar','Mardan','Abbottabad'],
        'Islamabad Capital Territory': ['Islamabad'],
    }},
    AU: { name: 'Australia', states: {
        'New South Wales':   ['Sydney','Newcastle','Wollongong','Parramatta'],
        'Victoria':          ['Melbourne','Geelong','Ballarat','Bendigo'],
        'Queensland':        ['Brisbane','Gold Coast','Sunshine Coast','Cairns'],
        'Western Australia': ['Perth','Fremantle','Mandurah'],
        'South Australia':   ['Adelaide','Mount Gambier'],
    }},
    US: { name: 'United States', states: {
        California: ['Los Angeles','San Francisco','San Diego','San Jose'],
        'New York': ['New York City','Buffalo','Rochester','Albany'],
        Texas:      ['Houston','Dallas','Austin','San Antonio'],
        Florida:    ['Miami','Orlando','Tampa','Jacksonville'],
    }},
    GB: { name: 'United Kingdom', states: {
        England: ['London','Manchester','Birmingham','Leeds'],
        Scotland: ['Edinburgh','Glasgow'],
    }},
};

const classicForm = useForm({
    country:         'AU',
    state:           '',
    city:            '',
    query:           '',
    category:        '',
    radius_km:       10,
    min_rating:      '',
    min_reviews:     '',
    require_email:   false,
    require_phone:   false,
    require_website: false,
    save_search:     false,
    save_search_name:'',
});

const submitClassic = () => classicForm.post(route('leads.search.store'));

const classicCountries = Object.entries(locationData).map(([code, d]) => ({ code, name: d.name }));
const classicStates = computed(() => classicForm.country && locationData[classicForm.country] ? Object.keys(locationData[classicForm.country].states) : []);
const classicCities = computed(() => classicForm.country && classicForm.state && locationData[classicForm.country]?.states[classicForm.state] ? locationData[classicForm.country].states[classicForm.state] : []);
</script>

<template>
    <Head title="Google Maps Lead Generator" />
    <AuthenticatedLayout>
        <div class="w-full space-y-6">

            <!-- ── Hero Banner ── -->
            <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-primary-600 p-6 md:p-8 text-white shadow-xl">
                <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <div class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-inner">
                            <Sparkles class="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <div class="flex items-center gap-2 flex-wrap">
                                <h1 class="text-2xl md:text-3xl font-black tracking-tight">Google Maps Lead Generator</h1>
                                <span class="bg-white/20 backdrop-blur-sm text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                    ⚡ Python Playwright Engine
                                </span>
                            </div>
                            <p class="mt-1 text-orange-100 text-sm md:text-base max-w-2xl">
                                Extract verified B2B leads across Australia &amp; worldwide. Scrape phone numbers, websites, emails, ratings, and AI enrichment scores in real time.
                            </p>
                        </div>
                    </div>

                    <!-- Navigation tabs -->
                    <div class="flex items-center gap-1.5 bg-black/20 backdrop-blur-md p-1.5 rounded-xl border border-white/10 self-stretch md:self-auto justify-center">
                        <button
                            type="button"
                            @click="activeTab = 'generator'"
                            :class="['px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
                                activeTab === 'generator' ? 'bg-white text-orange-600 shadow-md' : 'text-white/80 hover:text-white']">
                            <Sparkles class="h-3.5 w-3.5" /> Lead Generator
                        </button>
                        <button
                            type="button"
                            @click="activeTab = 'classic'"
                            :class="['px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
                                activeTab === 'classic' ? 'bg-white text-orange-600 shadow-md' : 'text-white/80 hover:text-white']">
                            <Search class="h-3.5 w-3.5" /> Classic Search
                        </button>
                        <button
                            type="button"
                            @click="activeTab = 'history'"
                            :class="['px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
                                activeTab === 'history' ? 'bg-white text-orange-600 shadow-md' : 'text-white/80 hover:text-white']">
                            <Clock class="h-3.5 w-3.5" /> Batches ({{ recent_batches?.length || 0 }})
                        </button>
                    </div>
                </div>
            </div>

            <!-- ── LIVE BATCH EXECUTION & LOGS PANEL ── -->
            <div v-if="batchStatus" class="card overflow-hidden border-2 border-orange-500/40 dark:border-orange-500/30 shadow-2xl">
                <!-- Header -->
                <div class="bg-gradient-to-r from-surface-900 to-surface-800 text-white p-5 flex flex-wrap items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <div :class="[
                            'w-10 h-10 rounded-xl flex items-center justify-center font-bold',
                            batchStatus.status === 'processing' ? 'bg-orange-500/20 text-orange-400' :
                            batchStatus.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            'bg-red-500/20 text-red-400'
                        ]">
                            <Loader2 v-if="batchStatus.status === 'processing'" class="h-5 w-5 animate-spin" />
                            <CheckCircle v-else-if="batchStatus.status === 'completed'" class="h-5 w-5 text-green-400" />
                            <AlertCircle v-else class="h-5 w-5 text-red-400" />
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <h3 class="font-bold text-lg text-white">Scraper Batch #{{ batchStatus.id }}</h3>
                                <span :class="[
                                    'text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full',
                                    batchStatus.status === 'processing' ? 'bg-orange-500 text-white animate-pulse' :
                                    batchStatus.status === 'completed' ? 'bg-green-500 text-white' :
                                    'bg-surface-700 text-surface-300'
                                ]">
                                    {{ batchStatus.status }}
                                </span>
                            </div>
                            <p class="text-xs text-surface-400 mt-0.5">
                                Jobs: {{ batchStatus.completed_jobs }} / {{ batchStatus.total_jobs }} completed
                                · Found: <strong class="text-orange-400">{{ batchStatus.found_leads }} leads</strong>
                            </p>
                        </div>
                    </div>

                    <div class="flex items-center gap-2">
                        <a
                            v-if="batchStatus.found_leads > 0"
                            :href="route('leads.generator.batches.export', batchStatus.id)"
                            target="_blank"
                            class="btn-primary text-xs py-2 px-3.5 bg-green-600 hover:bg-green-500 border-none flex items-center gap-1.5 shadow">
                            <Download class="h-3.5 w-3.5" /> Download CSV ({{ batchStatus.found_leads }})
                        </a>

                        <button
                            v-if="batchStatus.status === 'processing'"
                            type="button"
                            @click="cancelBatch"
                            class="px-3 py-2 rounded-lg text-xs font-semibold bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition">
                            Cancel
                        </button>

                        <button
                            v-if="batchStatus.is_finished"
                            type="button"
                            @click="dismissBatch"
                            class="p-2 text-surface-400 hover:text-white rounded-lg">
                            <X class="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <!-- Progress Bar -->
                <div class="w-full bg-surface-800 h-2">
                    <div
                        class="bg-gradient-to-r from-orange-500 to-amber-400 h-2 transition-all duration-500"
                        :style="{ width: `${batchStatus.progress}%` }">
                    </div>
                </div>

                <!-- Terminal / Logs Box -->
                <div class="p-5 bg-surface-950 text-surface-200 border-b border-surface-800">
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-2 text-xs font-bold text-surface-400 uppercase tracking-wider">
                            <Terminal class="h-3.5 w-3.5 text-orange-400" />
                            Live Scraper Execution Logs
                        </div>
                        <span class="text-xs text-surface-500">Auto-refreshing every 3s</span>
                    </div>

                    <div class="bg-surface-900 rounded-xl p-3 max-h-48 overflow-y-auto font-mono text-xs space-y-1 border border-surface-800">
                        <div v-if="batchLogs.length === 0" class="text-surface-500 italic py-2">
                            Initializing Playwright browser and queuing scraping requests...
                        </div>
                        <div
                            v-for="log in batchLogs"
                            :key="log.id"
                            :class="[
                                'flex items-start gap-2',
                                log.level === 'error' ? 'text-red-400 font-semibold' :
                                log.level === 'warning' ? 'text-amber-400' :
                                log.level === 'success' ? 'text-green-400 font-semibold' :
                                'text-surface-300'
                            ]">
                            <span class="text-surface-500 select-none flex-shrink-0">[{{ log.created_at }}]</span>
                            <span class="flex-1">{{ log.message }}</span>
                        </div>
                    </div>
                </div>

                <!-- Live Scraped Leads Table -->
                <div v-if="batchLeads.length > 0" class="p-5 bg-white dark:bg-surface-900">
                    <div class="flex items-center justify-between mb-3">
                        <h4 class="font-bold text-sm text-surface-900 dark:text-white flex items-center gap-2">
                            <Sparkles class="h-4 w-4 text-orange-500" />
                            Recently Scraped Leads in this Batch ({{ batchLeads.length }})
                        </h4>
                        <Link :href="route('leads.index')" class="text-xs text-primary-600 hover:underline">
                            View all in My Leads →
                        </Link>
                    </div>

                    <div class="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800">
                        <table class="w-full text-xs text-left">
                            <thead class="bg-surface-50 dark:bg-surface-800/60 text-surface-500 uppercase tracking-wider font-semibold">
                                <tr>
                                    <th class="px-3 py-2.5">Business Name</th>
                                    <th class="px-3 py-2.5">Category</th>
                                    <th class="px-3 py-2.5">Phone</th>
                                    <th class="px-3 py-2.5">Location</th>
                                    <th class="px-3 py-2.5">Rating</th>
                                    <th class="px-3 py-2.5">AI Score</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-surface-200 dark:divide-surface-800">
                                <tr v-for="lead in batchLeads" :key="lead.id" class="hover:bg-surface-50 dark:hover:bg-surface-800/30">
                                    <td class="px-3 py-2.5 font-semibold text-surface-900 dark:text-white">
                                        <div class="flex items-center gap-1.5">
                                            <a v-if="lead.website" :href="lead.website" target="_blank" rel="noopener" class="hover:text-primary-600 underline">
                                                {{ lead.business_name }}
                                            </a>
                                            <span v-else>{{ lead.business_name }}</span>
                                        </div>
                                    </td>
                                    <td class="px-3 py-2.5 text-surface-500">{{ lead.category || '—' }}</td>
                                    <td class="px-3 py-2.5 font-mono text-surface-700 dark:text-surface-300">
                                        {{ lead.phone || '—' }}
                                    </td>
                                    <td class="px-3 py-2.5 text-surface-500">{{ lead.city || 'Australia' }}</td>
                                    <td class="px-3 py-2.5">
                                        <div v-if="lead.rating" class="flex items-center gap-1 text-amber-500 font-semibold">
                                            <Star class="h-3 w-3 fill-amber-400" />
                                            <span>{{ lead.rating }}</span>
                                            <span class="text-surface-400 text-[10px]">({{ lead.reviews_count }})</span>
                                        </div>
                                        <span v-else class="text-surface-400">—</span>
                                    </td>
                                    <td class="px-3 py-2.5">
                                        <span v-if="lead.ai_score" class="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400">
                                            {{ lead.ai_score }}/100
                                        </span>
                                        <span v-else class="text-surface-400">—</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- ── TAB 1: GOOGLE MAPS LEAD GENERATOR FORM ── -->
            <div v-if="activeTab === 'generator'" class="space-y-6">

                <!-- Generator Input Card -->
                <div class="card p-6 space-y-6">

                    <!-- Error Alert -->
                    <div v-if="submitError" class="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
                        <AlertCircle class="h-4 w-4 flex-shrink-0" />
                        <span>{{ submitError }}</span>
                    </div>

                    <!-- Step 1: Keywords & Categories -->
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <label class="text-xs font-bold text-surface-600 dark:text-surface-300 uppercase tracking-wider flex items-center gap-1.5">
                                <Sparkles class="h-4 w-4 text-orange-500" />
                                Step 1: Select or Enter Target Keywords / Niches
                                <span class="text-red-500">*</span>
                            </label>
                            <div class="flex items-center gap-2 text-xs">
                                <button type="button" @click="selectAllPresets" class="text-primary-600 hover:underline">Select Top 15</button>
                                <span class="text-surface-300">·</span>
                                <button type="button" @click="clearAllKeywords" class="text-surface-400 hover:text-surface-600">Clear All</button>
                            </div>
                        </div>

                        <!-- Quick Category Presets Chips -->
                        <div class="mb-3 flex flex-wrap gap-1.5">
                            <button
                                v-for="preset in availablePresets"
                                :key="preset"
                                type="button"
                                @click="togglePreset(preset)"
                                :class="[
                                    'px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 border',
                                    generatorForm.keywords.includes(preset)
                                        ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                                        : 'bg-surface-50 dark:bg-surface-800/80 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-surface-700 hover:border-orange-300 hover:bg-orange-50/50'
                                ]">
                                <Plus v-if="!generatorForm.keywords.includes(preset)" class="h-3 w-3" />
                                <X v-else class="h-3 w-3" />
                                {{ preset }}
                            </button>
                        </div>

                        <!-- Active Keywords Chips & Custom Adder -->
                        <div class="p-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-900/50">
                            <div class="flex flex-wrap items-center gap-1.5">
                                <span
                                    v-for="(kw, idx) in generatorForm.keywords"
                                    :key="idx"
                                    class="inline-flex items-center gap-1 bg-surface-900 dark:bg-surface-100 text-white dark:text-surface-900 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                                    {{ kw }}
                                    <button type="button" @click="removeKeyword(idx)" class="hover:text-red-400 p-0.5">
                                        <X class="h-3 w-3" />
                                    </button>
                                </span>

                                <input
                                    type="text"
                                    v-model="generatorForm.categoryInput"
                                    @keydown="onKeywordInputKeydown"
                                    placeholder="Type custom niche & press Enter (e.g. Solar Installers)"
                                    class="bg-transparent border-none text-xs text-surface-800 dark:text-surface-200 focus:ring-0 flex-1 min-w-[220px] p-1"
                                />
                            </div>
                        </div>
                        <p class="mt-1 text-[11px] text-surface-400">
                            Tip: You can add multiple keywords. The scraper will scrape leads for each keyword across all selected locations.
                        </p>
                    </div>

                    <!-- Step 2: Target Location -->
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <label class="text-xs font-bold text-surface-600 dark:text-surface-300 uppercase tracking-wider flex items-center gap-1.5">
                                <MapPin class="h-4 w-4 text-orange-500" />
                                Step 2: Choose Target Locations (Australia &amp; Worldwide)
                                <span class="text-red-500">*</span>
                            </label>
                            <div class="flex items-center gap-2 text-xs">
                                <button type="button" @click="selectAllStates" class="text-primary-600 hover:underline">Select All States</button>
                                <span class="text-surface-300">·</span>
                                <button type="button" @click="clearAllStates" class="text-surface-400 hover:text-surface-600">Clear</button>
                            </div>
                        </div>

                        <!-- Australian States Grid -->
                        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 mb-3">
                            <button
                                v-for="state in auStatesList"
                                :key="state.code"
                                type="button"
                                @click="toggleState(state.code)"
                                :class="[
                                    'p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-0.5',
                                    generatorForm.selectedStates.includes(state.code)
                                        ? 'bg-primary-50 dark:bg-primary-950/60 border-primary-500 text-primary-700 dark:text-primary-300 font-bold shadow-sm ring-1 ring-primary-500'
                                        : 'border-surface-200 dark:border-surface-700 hover:border-surface-400 bg-white dark:bg-surface-900 text-surface-600 dark:text-surface-400'
                                ]">
                                <span class="text-sm font-black">{{ state.code }}</span>
                                <span class="text-[10px] truncate max-w-full opacity-80">{{ state.name }}</span>
                            </button>
                        </div>

                        <!-- Custom Global Location Input -->
                        <div class="relative">
                            <MapPin class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                            <input
                                type="text"
                                v-model="generatorForm.customLocation"
                                placeholder="Or enter specific city / suburb / global region (e.g. Sydney NSW, Melbourne, London UK, Miami FL)"
                                class="input pl-9 text-xs"
                            />
                        </div>
                    </div>

                    <!-- Step 3: Limit & Submit -->
                    <div class="pt-4 border-t border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div class="flex items-center gap-3 w-full sm:w-auto">
                            <label class="text-xs font-bold text-surface-600 dark:text-surface-300 uppercase tracking-wider">
                                Max Leads:
                            </label>
                            <select v-model="generatorForm.limit" class="input py-2 text-xs font-bold w-36">
                                <option :value="10">10 leads</option>
                                <option :value="25">25 leads</option>
                                <option :value="50">50 leads (recommended)</option>
                                <option :value="100">100 leads</option>
                                <option :value="200">200 leads</option>
                            </select>
                        </div>

                        <button
                            type="button"
                            @click="startGenerator"
                            :disabled="isSubmitting || (generatorForm.keywords.length === 0 && !generatorForm.categoryInput.trim())"
                            class="btn-primary w-full sm:w-auto px-8 py-3 text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 border-none shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-50">
                            <Loader2 v-if="isSubmitting" class="h-4 w-4 animate-spin" />
                            <Sparkles v-else class="h-4 w-4" />
                            {{ isSubmitting ? 'Starting Generator...' : 'Start Lead Generator' }}
                        </button>
                    </div>

                </div>

            </div>

            <!-- ── TAB 2: CLASSIC LOCATION SEARCH ── -->
            <div v-else-if="activeTab === 'classic'" class="card p-6 space-y-6">
                <div class="flex items-center gap-3 pb-4 border-b border-surface-200 dark:border-surface-700">
                    <Search class="h-5 w-5 text-orange-500" />
                    <div>
                        <h3 class="font-bold text-surface-900 dark:text-white">Single-Area Targeted Search</h3>
                        <p class="text-xs text-surface-500">Pick Country > State > City for focused local business discovery</p>
                    </div>
                </div>

                <form @submit.prevent="submitClassic" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <!-- Country -->
                        <div>
                            <label class="label">Country <span class="text-red-500">*</span></label>
                            <select v-model="classicForm.country" class="input font-medium">
                                <option v-for="c in classicCountries" :key="c.code" :value="c.code">{{ c.name }}</option>
                            </select>
                        </div>

                        <!-- State -->
                        <div>
                            <label class="label">State</label>
                            <select v-model="classicForm.state" class="input font-medium" :disabled="classicStates.length === 0">
                                <option value="">Select State</option>
                                <option v-for="s in classicStates" :key="s" :value="s">{{ s }}</option>
                            </select>
                        </div>

                        <!-- City -->
                        <div>
                            <label class="label">City</label>
                            <select v-model="classicForm.city" class="input font-medium" :disabled="classicCities.length === 0">
                                <option value="">Select City</option>
                                <option v-for="c in classicCities" :key="c" :value="c">{{ c }}</option>
                            </select>
                        </div>
                    </div>

                    <!-- Search Query -->
                    <div>
                        <label class="label">Search Query / Keyword <span class="text-red-500">*</span></label>
                        <input
                            type="text"
                            v-model="classicForm.query"
                            placeholder="e.g. Plumbing Service, Dentist, Roofing Contractor"
                            class="input font-medium"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        :disabled="classicForm.processing || !classicForm.country || !classicForm.query"
                        class="btn-primary w-full py-3 font-bold text-sm">
                        <Search class="h-4 w-4" />
                        {{ classicForm.processing ? 'Searching...' : 'Run Classic Search' }}
                    </button>
                </form>
            </div>

            <!-- ── TAB 3: BATCHES HISTORY ── -->
            <div v-else-if="activeTab === 'history'" class="card p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-surface-900 dark:text-white flex items-center gap-2">
                        <Clock class="h-4 w-4 text-orange-500" />
                        Your Lead Generator Batches
                    </h3>
                    <button type="button" @click="activeTab = 'generator'" class="text-xs text-primary-600 hover:underline">
                        + New Generator Run
                    </button>
                </div>

                <div v-if="!recent_batches || recent_batches.length === 0" class="text-center py-12 text-surface-400">
                    <Sparkles class="h-8 w-8 mx-auto mb-2 opacity-40 text-orange-400" />
                    <p class="text-sm">No scraper batches run yet.</p>
                </div>

                <div v-else class="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800">
                    <table class="w-full text-xs text-left">
                        <thead class="bg-surface-50 dark:bg-surface-800/60 text-surface-500 uppercase tracking-wider font-semibold">
                            <tr>
                                <th class="px-4 py-3">Batch ID</th>
                                <th class="px-4 py-3">Keywords</th>
                                <th class="px-4 py-3">Locations</th>
                                <th class="px-4 py-3">Status</th>
                                <th class="px-4 py-3">Leads Found</th>
                                <th class="px-4 py-3">Created</th>
                                <th class="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-surface-200 dark:divide-surface-800">
                            <tr v-for="b in recent_batches" :key="b.id" class="hover:bg-surface-50 dark:hover:bg-surface-800/30">
                                <td class="px-4 py-3 font-bold text-surface-900 dark:text-white">#{{ b.id }}</td>
                                <td class="px-4 py-3">
                                    <span class="font-medium text-surface-800 dark:text-surface-200">
                                        {{ Array.isArray(b.query) ? b.query.join(', ') : b.query }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-surface-500 truncate max-w-xs">
                                    {{ Array.isArray(b.location) ? b.location.join(', ') : b.location }}
                                </td>
                                <td class="px-4 py-3">
                                    <span :class="[
                                        'px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                                        b.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                        b.status === 'processing' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 animate-pulse' :
                                        'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400'
                                    ]">
                                        {{ b.status }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 font-bold text-orange-600 dark:text-orange-400">
                                    {{ b.leads_count ?? b.found_leads ?? 0 }}
                                </td>
                                <td class="px-4 py-3 text-surface-400">{{ b.created_at }}</td>
                                <td class="px-4 py-3 text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <button
                                            type="button"
                                            @click="startPolling(b.id)"
                                            class="p-1 text-surface-500 hover:text-primary-600"
                                            title="View Live Logs & Details">
                                            <Eye class="h-4 w-4" />
                                        </button>
                                        <a
                                            :href="route('leads.generator.batches.export', b.id)"
                                            target="_blank"
                                            class="p-1 text-green-600 hover:text-green-700"
                                            title="Download CSV">
                                            <Download class="h-4 w-4" />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </AuthenticatedLayout>
</template>
