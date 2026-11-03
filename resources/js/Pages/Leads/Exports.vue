<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Download, Trash2, Clock, CheckCircle, XCircle, Loader } from 'lucide-vue-next';

defineProps({ exports: Object });

const formatBytes = (bytes) => {
    if (!bytes) return '—';
    const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const remove = (id) => {
    if (confirm('Delete this export?')) {
        router.delete(route('leads.exports.destroy', id), { preserveScroll: true });
    }
};

const statusIcon = (s) => ({ queued: Clock, processing: Loader, completed: CheckCircle, failed: XCircle }[s] || Clock);
const statusClass = (s) => ({
    queued: 'text-surface-500',
    processing: 'text-primary-600 animate-spin',
    completed: 'text-accent-600',
    failed: 'text-red-600',
}[s] || 'text-surface-500');
</script>

<template>
    <Head title="Exports" />
    <AuthenticatedLayout>
        <div class="w-full">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold">Exports</h1>
                    <p class="mt-1 text-sm text-surface-500">Your generated CSV/XLSX files. Files expire after 30 days.</p>
                </div>
                <Link :href="route('leads.index')" class="btn-secondary text-sm">Back to Leads</Link>
            </div>

            <div class="mt-6 card overflow-hidden">
                <table class="w-full text-sm">
                    <thead class="bg-surface-50 dark:bg-surface-800/50 text-left">
                        <tr>
                            <th class="px-4 py-3 font-semibold">File</th>
                            <th class="px-4 py-3 font-semibold">Format</th>
                            <th class="px-4 py-3 font-semibold">Leads</th>
                            <th class="px-4 py-3 font-semibold">Size</th>
                            <th class="px-4 py-3 font-semibold">Status</th>
                            <th class="px-4 py-3 font-semibold">Created</th>
                            <th class="px-4 py-3 font-semibold w-20"></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-surface-200 dark:divide-surface-800">
                        <tr v-for="ex in exports.data" :key="ex.id" class="hover:bg-surface-50 dark:hover:bg-surface-800/30">
                            <td class="px-4 py-3 font-mono text-xs">{{ ex.filename }}</td>
                            <td class="px-4 py-3 uppercase text-xs">{{ ex.format }}</td>
                            <td class="px-4 py-3">{{ ex.lead_count.toLocaleString() }}</td>
                            <td class="px-4 py-3 text-surface-500">{{ formatBytes(ex.file_size) }}</td>
                            <td class="px-4 py-3">
                                <span class="inline-flex items-center gap-1.5">
                                    <component :is="statusIcon(ex.status)" :class="['h-4 w-4', statusClass(ex.status)]" />
                                    <span class="text-xs">{{ ex.status }}</span>
                                </span>
                            </td>
                            <td class="px-4 py-3 text-surface-500 text-xs">{{ new Date(ex.created_at).toLocaleString() }}</td>
                            <td class="px-4 py-3">
                                <div class="flex gap-1">
                                    <a v-if="ex.status === 'completed'" :href="route('leads.exports.download', ex.id)"
                                        class="p-1.5 hover:bg-primary-50 dark:hover:bg-primary-900/30 text-primary-600 rounded">
                                        <Download class="h-4 w-4" />
                                    </a>
                                    <button @click="remove(ex.id)" class="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 rounded">
                                        <Trash2 class="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="exports.data.length === 0" class="p-12 text-center text-sm text-surface-500">
                    No exports yet. Filter your leads and click Export to get started.
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
