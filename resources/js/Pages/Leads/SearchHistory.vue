<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { CheckCircle, XCircle, Loader, Clock } from 'lucide-vue-next';

defineProps({ searches: Object });

const statusIcon = (s) => ({ queued: Clock, running: Loader, completed: CheckCircle, failed: XCircle, cancelled: XCircle }[s] || Clock);
</script>

<template>
    <Head title="Search History" />
    <AuthenticatedLayout>
        <div class="max-w-5xl mx-auto">
            <h1 class="text-2xl font-bold">Search History</h1>

            <div class="mt-6 card overflow-hidden">
                <table class="w-full text-sm">
                    <thead class="bg-surface-50 dark:bg-surface-800/50 text-left">
                        <tr>
                            <th class="px-4 py-3 font-semibold">Query</th>
                            <th class="px-4 py-3 font-semibold">Location</th>
                            <th class="px-4 py-3 font-semibold">Results</th>
                            <th class="px-4 py-3 font-semibold">Duration</th>
                            <th class="px-4 py-3 font-semibold">Status</th>
                            <th class="px-4 py-3 font-semibold">Date</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-surface-200 dark:divide-surface-800">
                        <tr v-for="s in searches.data" :key="s.id" class="hover:bg-surface-50 dark:hover:bg-surface-800/30">
                            <td class="px-4 py-3">
                                <Link :href="route('leads.searches.show', s.id)" class="font-medium hover:text-primary-600">
                                    {{ s.query }}
                                </Link>
                            </td>
                            <td class="px-4 py-3 text-surface-600">{{ s.city }}, {{ s.country }}</td>
                            <td class="px-4 py-3">{{ s.results_count }}</td>
                            <td class="px-4 py-3 text-surface-500">{{ s.duration_seconds || '—' }}s</td>
                            <td class="px-4 py-3">
                                <span class="inline-flex items-center gap-1.5 text-xs">
                                    <component :is="statusIcon(s.status)" class="h-4 w-4" />
                                    {{ s.status }}
                                </span>
                            </td>
                            <td class="px-4 py-3 text-surface-500 text-xs">{{ new Date(s.created_at).toLocaleString() }}</td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="searches.data.length === 0" class="p-12 text-center text-sm text-surface-500">
                    No searches yet.
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
