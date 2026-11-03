<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ref } from 'vue';
import { Wallet, ArrowLeft, CheckCircle, Clock, XCircle } from 'lucide-vue-next';

const props = defineProps({
    withdrawals: Object,
    stats: Object,
});

const showForm = ref(false);
const form = useForm({
    amount: props.stats.available,
    method: 'bank',
    account_title: '',
    account_number: '',
    bank_name: '',
});

const fmtMoney = (a) => `${props.stats.currency} ${Number(a).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
const fmtDate = (d) => d ? new Date(d).toLocaleDateString() : '—';

const submit = () => form.post(route('affiliate.withdrawals.store'), {
    preserveScroll: true,
    onSuccess: () => { showForm.value = false; form.reset(); },
});

const statusBadge = (s) => ({
    pending: { class: 'bg-orange-50 text-orange-700', icon: Clock, label: 'Pending' },
    approved: { class: 'bg-primary-50 text-primary-700', icon: CheckCircle, label: 'Approved' },
    paid: { class: 'bg-accent-50 text-accent-700', icon: CheckCircle, label: 'Paid' },
    rejected: { class: 'bg-red-50 text-red-700', icon: XCircle, label: 'Rejected' },
}[s] || { class: 'bg-surface-100', icon: Clock, label: s });

const canWithdraw = props.stats.available >= props.stats.min_withdrawal;
</script>

<template>
    <Head title="Withdrawals" />
    <AuthenticatedLayout>
        <div class="max-w-4xl mx-auto space-y-6">
            <Link :href="route('affiliate.index')" class="text-sm text-primary-600 hover:underline inline-flex items-center gap-1">
                <ArrowLeft class="h-4 w-4" /> Back to affiliate
            </Link>

            <div class="card p-6 flex items-center justify-between flex-wrap gap-4">
                <div>
                    <p class="text-xs text-surface-500">Available to withdraw</p>
                    <p class="text-3xl font-bold">{{ fmtMoney(stats.available) }}</p>
                    <p class="text-xs text-surface-500 mt-1">
                        Minimum withdrawal: {{ fmtMoney(stats.min_withdrawal) }}
                    </p>
                </div>
                <button v-if="canWithdraw" @click="showForm = !showForm" class="btn-primary">
                    <Wallet class="h-4 w-4" /> {{ showForm ? 'Cancel' : 'Request withdrawal' }}
                </button>
                <p v-else class="text-sm text-surface-500 text-right">
                    Need {{ fmtMoney(stats.min_withdrawal - stats.available) }} more to withdraw.
                </p>
            </div>

            <!-- Withdrawal form -->
            <form v-if="showForm" @submit.prevent="submit" class="card p-6 space-y-4">
                <h2 class="font-semibold">New withdrawal request</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="label">Amount (PKR)</label>
                        <input type="number" v-model="form.amount" :max="stats.available"
                            :min="stats.min_withdrawal" required class="input" />
                        <p v-if="form.errors.amount" class="mt-1 text-xs text-red-600">{{ form.errors.amount }}</p>
                    </div>
                    <div>
                        <label class="label">Payout method</label>
                        <select v-model="form.method" required class="input">
                            <option value="bank">Bank transfer</option>
                            <option value="jazzcash">JazzCash</option>
                            <option value="easypaisa">EasyPaisa</option>
                        </select>
                    </div>
                    <div>
                        <label class="label">Account holder name</label>
                        <input v-model="form.account_title" required class="input" />
                        <p v-if="form.errors.account_title" class="mt-1 text-xs text-red-600">{{ form.errors.account_title }}</p>
                    </div>
                    <div>
                        <label class="label">
                            {{ form.method === 'bank' ? 'Account / IBAN' : 'Mobile number' }}
                        </label>
                        <input v-model="form.account_number" required class="input"
                            :placeholder="form.method === 'bank' ? 'PK00...' : '03XX-XXXXXXX'" />
                        <p v-if="form.errors.account_number" class="mt-1 text-xs text-red-600">{{ form.errors.account_number }}</p>
                    </div>
                    <div v-if="form.method === 'bank'" class="md:col-span-2">
                        <label class="label">Bank name</label>
                        <input v-model="form.bank_name" required class="input" placeholder="e.g. HBL, Meezan, UBL" />
                        <p v-if="form.errors.bank_name" class="mt-1 text-xs text-red-600">{{ form.errors.bank_name }}</p>
                    </div>
                </div>

                <div class="pt-3 border-t border-surface-200 dark:border-surface-800">
                    <button type="submit" :disabled="form.processing" class="btn-primary w-full">
                        {{ form.processing ? 'Submitting...' : 'Submit withdrawal request' }}
                    </button>
                    <p class="mt-2 text-xs text-surface-500 text-center">
                        Requests are processed manually within 2-3 business days.
                    </p>
                </div>
            </form>

            <!-- History -->
            <div class="card overflow-hidden">
                <div class="px-6 py-4 border-b border-surface-200 dark:border-surface-800">
                    <h2 class="font-semibold">Withdrawal history</h2>
                </div>
                <table class="w-full text-sm">
                    <thead class="bg-surface-50 dark:bg-surface-800/50 text-left">
                        <tr>
                            <th class="px-4 py-3 font-semibold">Date</th>
                            <th class="px-4 py-3 font-semibold">Amount</th>
                            <th class="px-4 py-3 font-semibold">Method</th>
                            <th class="px-4 py-3 font-semibold">Account</th>
                            <th class="px-4 py-3 font-semibold">Status</th>
                            <th class="px-4 py-3 font-semibold">Reference</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-surface-200 dark:divide-surface-800">
                        <tr v-for="w in withdrawals.data" :key="w.id">
                            <td class="px-4 py-3 text-surface-500">{{ fmtDate(w.created_at) }}</td>
                            <td class="px-4 py-3 font-medium">{{ fmtMoney(w.amount) }}</td>
                            <td class="px-4 py-3 capitalize">{{ w.method }}</td>
                            <td class="px-4 py-3 font-mono text-xs">{{ w.account_number }}</td>
                            <td class="px-4 py-3">
                                <span :class="['badge inline-flex items-center gap-1 text-xs', statusBadge(w.status).class]">
                                    <component :is="statusBadge(w.status).icon" class="h-3 w-3" />
                                    {{ statusBadge(w.status).label }}
                                </span>
                            </td>
                            <td class="px-4 py-3 text-xs text-surface-500">{{ w.transaction_reference || '—' }}</td>
                        </tr>
                        <tr v-if="withdrawals.data.length === 0">
                            <td colspan="6" class="px-4 py-12 text-center text-surface-500">No withdrawals yet.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
