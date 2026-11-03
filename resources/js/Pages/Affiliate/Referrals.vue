<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ArrowLeft } from 'lucide-vue-next';

defineProps({ referrals: Object });

const fmtDate = (d) => new Date(d).toLocaleDateString();
</script>

<template>
    <Head title="Referrals" />
    <AuthenticatedLayout>
        <div class="max-w-5xl mx-auto space-y-6">
            <Link :href="route('affiliate.index')" class="text-sm text-primary-600 hover:underline inline-flex items-center gap-1">
                <ArrowLeft class="h-4 w-4" /> Back to affiliate
            </Link>

            <div>
                <h1 class="text-2xl font-bold">Your referrals</h1>
                <p class="mt-1 text-sm text-surface-500">
                    Names are partially masked for your referrals' privacy.
                </p>
            </div>

            <div class="card overflow-hidden">
                <table class="w-full text-sm">
                    <thead class="bg-surface-50 dark:bg-surface-800/50 text-left">
                        <tr>
                            <th class="px-4 py-3 font-semibold">Name</th>
                            <th class="px-4 py-3 font-semibold">Email</th>
                            <th class="px-4 py-3 font-semibold">Signed up</th>
                            <th class="px-4 py-3 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-surface-200 dark:divide-surface-800">
                        <tr v-for="r in referrals.data" :key="r.id">
                            <td class="px-4 py-3">{{ r.name }}</td>
                            <td class="px-4 py-3 font-mono text-xs">{{ r.email }}</td>
                            <td class="px-4 py-3 text-surface-500">{{ fmtDate(r.created_at) }}</td>
                            <td class="px-4 py-3">
                                <span v-if="r.has_paid" class="badge bg-accent-50 text-accent-700">Paying</span>
                                <span v-else class="badge bg-surface-100 text-surface-500">Trial / Free</span>
                            </td>
                        </tr>
                        <tr v-if="referrals.data.length === 0">
                            <td colspan="4" class="px-4 py-12 text-center text-surface-500">
                                No referrals yet. Share your link!
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
