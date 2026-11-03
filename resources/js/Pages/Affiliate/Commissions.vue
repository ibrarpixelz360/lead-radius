<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ArrowLeft, Clock, CheckCircle, Wallet, Undo2 } from 'lucide-vue-next';

defineProps({ commissions: Object });

const fmtDate = (d) => new Date(d).toLocaleDateString();

const statusBadge = (s) => ({
    pending: { class: 'bg-orange-50 text-orange-700', icon: Clock, label: 'On hold' },
    approved: { class: 'bg-primary-50 text-primary-700', icon: CheckCircle, label: 'Available' },
    paid: { class: 'bg-accent-50 text-accent-700', icon: Wallet, label: 'Paid' },
    reversed: { class: 'bg-red-50 text-red-700', icon: Undo2, label: 'Reversed' },
}[s] || { class: 'bg-surface-100', icon: Clock, label: s });
</script>

<template>
    <Head title="Commissions" />
    <AuthenticatedLayout>
        <div class="max-w-5xl mx-auto space-y-6">
            <Link :href="route('affiliate.index')" class="text-sm text-primary-600 hover:underline inline-flex items-center gap-1">
                <ArrowLeft class="h-4 w-4" /> Back to affiliate
            </Link>

            <div>
                <h1 class="text-2xl font-bold">Commission history</h1>
                <p class="mt-1 text-sm text-surface-500">Every commission you've earned, with status.</p>
            </div>

            <div class="card overflow-hidden">
                <table class="w-full text-sm">
                    <thead class="bg-surface-50 dark:bg-surface-800/50 text-left">
                        <tr>
                            <th class="px-4 py-3 font-semibold">Date</th>
                            <th class="px-4 py-3 font-semibold">Referred user</th>
                            <th class="px-4 py-3 font-semibold">Rate</th>
                            <th class="px-4 py-3 font-semibold">Amount</th>
                            <th class="px-4 py-3 font-semibold">Status</th>
                            <th class="px-4 py-3 font-semibold">Available on</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-surface-200 dark:divide-surface-800">
                        <tr v-for="c in commissions.data" :key="c.id">
                            <td class="px-4 py-3 text-surface-500">{{ fmtDate(c.created_at) }}</td>
                            <td class="px-4 py-3 font-mono text-xs">{{ c.referred_email }}</td>
                            <td class="px-4 py-3">{{ c.rate }}%</td>
                            <td class="px-4 py-3 font-medium">{{ c.currency }} {{ Number(c.amount).toLocaleString() }}</td>
                            <td class="px-4 py-3">
                                <span :class="['badge inline-flex items-center gap-1 text-xs', statusBadge(c.status).class]">
                                    <component :is="statusBadge(c.status).icon" class="h-3 w-3" />
                                    {{ statusBadge(c.status).label }}
                                </span>
                            </td>
                            <td class="px-4 py-3 text-xs text-surface-500">
                                {{ c.status === 'pending' && c.hold_until ? fmtDate(c.hold_until) : '—' }}
                            </td>
                        </tr>
                        <tr v-if="commissions.data.length === 0">
                            <td colspan="6" class="px-4 py-12 text-center text-surface-500">No commissions yet.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="commissions.last_page > 1" class="flex items-center justify-between text-sm">
                <p class="text-surface-500">Showing {{ commissions.from }}–{{ commissions.to }} of {{ commissions.total }}</p>
                <div class="flex gap-1">
                    <Link v-for="link in commissions.links" :key="link.label"
                        :href="link.url ?? '#'"
                        :class="['px-3 py-1 rounded border text-sm',
                            link.active ? 'bg-primary-600 text-white border-primary-600' :
                            link.url ? 'border-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800' :
                            'border-surface-100 text-surface-300 cursor-not-allowed']"
                        v-html="link.label"
                        :preserve-scroll="true" />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
