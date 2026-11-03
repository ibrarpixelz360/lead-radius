<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Play, Trash2, MapPin } from 'lucide-vue-next';

defineProps({ saved: Array });

const run = (id) => router.post(route('leads.saved.run', id));
const remove = (id) => {
    if (confirm('Delete this saved search?')) {
        router.delete(route('leads.saved.destroy', id), { preserveScroll: true });
    }
};
</script>

<template>
    <Head title="Saved Searches" />
    <AuthenticatedLayout>
        <div class="w-full">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold">Saved Searches</h1>
                    <p class="mt-1 text-sm text-surface-500">Re-run searches you've saved.</p>
                </div>
                <Link :href="route('leads.search.create')" class="btn-primary text-sm">New Search</Link>
            </div>

            <div class="mt-6 grid gap-3">
                <div v-for="s in saved" :key="s.id" class="card p-4 flex items-center justify-between">
                    <div>
                        <h3 class="font-semibold">{{ s.name }}</h3>
                        <p class="mt-1 text-sm text-surface-500 flex items-center gap-1.5">
                            <MapPin class="h-3.5 w-3.5" />
                            {{ s.filters?.city }}, {{ s.filters?.country }}
                            · "{{ s.filters?.query }}"
                            · {{ s.filters?.radius_km }}km
                        </p>
                        <p v-if="s.last_run_at" class="text-xs text-surface-400 mt-1">
                            Last run: {{ new Date(s.last_run_at).toLocaleString() }}
                        </p>
                    </div>
                    <div class="flex gap-2">
                        <button @click="run(s.id)" class="btn-primary text-sm">
                            <Play class="h-4 w-4" /> Run
                        </button>
                        <button @click="remove(s.id)" class="btn-ghost text-sm text-red-600">
                            <Trash2 class="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div v-if="saved.length === 0" class="card p-12 text-center">
                    <p class="text-surface-500">No saved searches yet.</p>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
