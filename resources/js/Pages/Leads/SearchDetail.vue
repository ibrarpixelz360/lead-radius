<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { ArrowLeft, RefreshCw, Phone, Mail, Globe, Star, Loader, CheckCircle, XCircle, Clock } from 'lucide-vue-next';

const props = defineProps({
    search: Object,
    leads: Object,
});

const status = ref(props.search.status);
const resultsCount = ref(props.search.results_count);
const errorMessage = ref(props.search.error_message);
let pollTimer = null;

const isActive = computed(() => ['queued', 'running'].includes(status.value));

const poll = async () => {
    try {
        const res = await fetch(route('leads.searches.status', props.search.id));
        const data = await res.json();
        status.value = data.status;
        resultsCount.value = data.results_count;
        errorMessage.value = data.error_message;

        if (!isActive.value) {
            clearInterval(pollTimer);
            // Refresh page once to load completed leads
            router.reload({ preserveScroll: true });
        }
    } catch (e) {
        console.error(e);
    }
};

onMounted(() => {
    if (isActive.value) {
        pollTimer = setInterval(poll, 4000);
    }
});

onUnmounted(() => {
    if (pollTimer) clearInterval(pollTimer);
});

const cancel = () => {
    if (confirm('Cancel this search?')) {
        router.post(route('leads.searches.cancel', props.search.id), {}, { preserveScroll: true });
    }
};

const statusBadge = computed(() => ({
    queued: { class: 'bg-surface-100 text-surface-700', icon: Clock, label: 'Queued' },
    running: { class: 'bg-primary-50 text-primary-700', icon: Loader, label: 'Running' },
    completed: { class: 'bg-accent-50 text-accent-700', icon: CheckCircle, label: 'Completed' },
    failed: { class: 'bg-red-50 text-red-700', icon: XCircle, label: 'Failed' },
    cancelled: { class: 'bg-orange-50 text-orange-700', icon: XCircle, label: 'Cancelled' },
}[status.value] || { class: 'bg-surface-100', icon: Clock, label: status.value }));
</script>

<template>
    <Head :title="`${search.query} — Search Results`" />
    <AuthenticatedLayout>
        <div class="max-w-7xl mx-auto">
            <Link :href="route('leads.search.create')" class="text-sm text-primary-600 hover:underline inline-flex items-center gap-1">
                <ArrowLeft class="h-4 w-4" /> Back to search
            </Link>

            <div class="mt-4 card p-6">
                <div class="flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <h1 class="text-xl font-bold">{{ search.query }}</h1>
                        <p class="mt-1 text-sm text-surface-500">
                            {{ search.city }}{{ search.state ? ', ' + search.state : '' }}, {{ search.country }}
                            · {{ search.radius_km }} km radius
                        </p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span :class="['badge', statusBadge.class, 'inline-flex items-center gap-1']">
                            <component :is="statusBadge.icon" :class="['h-3.5 w-3.5', isActive ? 'animate-spin' : '']" />
                            {{ statusBadge.label }}
                        </span>
                        <button v-if="isActive" @click="cancel" class="btn-ghost text-sm text-red-600">Cancel</button>
                    </div>
                </div>

                <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                        <p class="text-xs text-surface-500">Results found</p>
                        <p class="font-bold text-lg">{{ resultsCount }}</p>
                    </div>
                    <div v-if="search.duration_seconds">
                        <p class="text-xs text-surface-500">Duration</p>
                        <p class="font-bold text-lg">{{ search.duration_seconds }}s</p>
                    </div>
                    <div v-if="search.min_rating">
                        <p class="text-xs text-surface-500">Min rating</p>
                        <p class="font-bold text-lg">{{ search.min_rating }}+</p>
                    </div>
                </div>

                <div v-if="errorMessage" class="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-sm text-red-700 dark:text-red-300">
                    {{ errorMessage }}
                </div>
            </div>

            <!-- Loading state -->
            <div v-if="isActive && leads.data.length === 0" class="mt-6 card p-12 text-center">
                <Loader class="h-8 w-8 mx-auto text-primary-600 animate-spin" />
                <p class="mt-3 text-surface-600 dark:text-surface-300">Scraping in progress... Leads will appear here.</p>
                <p class="mt-1 text-xs text-surface-400">This typically takes 30-90 seconds.</p>
            </div>

            <!-- Leads -->
            <div v-else-if="leads.data.length" class="mt-6 card overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead class="bg-surface-50 dark:bg-surface-800/50 text-left">
                            <tr>
                                <th class="px-4 py-3 font-semibold">Business</th>
                                <th class="px-4 py-3 font-semibold">Category</th>
                                <th class="px-4 py-3 font-semibold">Rating</th>
                                <th class="px-4 py-3 font-semibold">Contact</th>
                                <th class="px-4 py-3 font-semibold">Score</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-surface-200 dark:divide-surface-800">
                            <tr v-for="lead in leads.data" :key="lead.id" class="hover:bg-surface-50 dark:hover:bg-surface-800/30">
                                <td class="px-4 py-3">
                                    <Link :href="route('leads.show', lead.id)" class="font-medium hover:text-primary-600">
                                        {{ lead.business_name }}
                                    </Link>
                                    <p class="text-xs text-surface-500">{{ lead.city }}</p>
                                </td>
                                <td class="px-4 py-3 text-surface-600 dark:text-surface-300">{{ lead.category || '—' }}</td>
                                <td class="px-4 py-3">
                                    <div v-if="lead.rating" class="flex items-center gap-1">
                                        <Star class="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                                        <span>{{ lead.rating }}</span>
                                        <span class="text-xs text-surface-500">({{ lead.reviews_count }})</span>
                                    </div>
                                    <span v-else class="text-surface-400">—</span>
                                </td>
                                <td class="px-4 py-3">
                                    <div class="flex gap-2">
                                        <Phone v-if="lead.phone" class="h-4 w-4 text-accent-600" :title="lead.phone" />
                                        <Mail v-if="lead.email" class="h-4 w-4 text-primary-600" :title="lead.email" />
                                        <Globe v-if="lead.website" class="h-4 w-4 text-orange-600" :title="lead.website" />
                                    </div>
                                </td>
                                <td class="px-4 py-3">
                                    <span v-if="lead.ai_score" class="badge bg-primary-50 text-primary-700">{{ lead.ai_score }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div v-else class="mt-6 card p-12 text-center">
                <p class="text-surface-500">No leads found for this search. Try widening your filters.</p>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
