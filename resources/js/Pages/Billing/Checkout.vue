<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ref } from 'vue';
import { ArrowLeft, Copy, Check, Upload, FileImage } from 'lucide-vue-next';

const props = defineProps({
    plan: Object,
    bank: Object,
    reference_code: String,
});

const form = useForm({
    plan_id: props.plan.id,
    transaction_id: '',
    sender_name: '',
    sender_account: '',
    bank_name: '',
    screenshot: null,
});

const preview = ref(null);
const copied = ref('');

const onFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    form.screenshot = file;
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => preview.value = ev.target.result;
        reader.readAsDataURL(file);
    }
};

const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    copied.value = key;
    setTimeout(() => copied.value = '', 1500);
};

const submit = () => form.post(route('billing.payment.submit'), {
    forceFormData: true,
});
</script>

<template>
    <Head :title="`Subscribe to ${plan.name}`" />
    <AuthenticatedLayout>
        <div class="max-w-3xl mx-auto">
            <Link :href="route('billing.index')"
                class="text-sm text-primary-600 hover:underline inline-flex items-center gap-1">
                <ArrowLeft class="h-4 w-4" /> Back to billing
            </Link>

            <div class="mt-4 card p-6">
                <h1 class="text-2xl font-bold">Subscribe to {{ plan.name }}</h1>
                <p class="mt-2 text-surface-600 dark:text-surface-300">
                    {{ plan.currency }} {{ Number(plan.price).toLocaleString() }} / {{ plan.billing_cycle }}
                </p>
            </div>

            <!-- Step 1: Bank details -->
            <div class="mt-6 card p-6">
                <h2 class="font-semibold flex items-center gap-2">
                    <span class="h-6 w-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center">1</span>
                    Transfer the amount to our bank
                </h2>

                <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div class="rounded-lg border border-surface-200 dark:border-surface-700 p-3">
                        <p class="text-xs text-surface-500">Bank Name</p>
                        <p class="font-medium">{{ bank.name }}</p>
                    </div>
                    <div class="rounded-lg border border-surface-200 dark:border-surface-700 p-3">
                        <p class="text-xs text-surface-500">Account Title</p>
                        <p class="font-medium">{{ bank.account_title }}</p>
                    </div>
                    <div class="rounded-lg border border-surface-200 dark:border-surface-700 p-3 sm:col-span-2">
                        <p class="text-xs text-surface-500">Account Number</p>
                        <div class="flex items-center justify-between">
                            <p class="font-mono font-medium">{{ bank.account_number }}</p>
                            <button @click="copy(bank.account_number, 'acc')" class="text-primary-600 hover:text-primary-700">
                                <Check v-if="copied === 'acc'" class="h-4 w-4" />
                                <Copy v-else class="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div v-if="bank.iban" class="rounded-lg border border-surface-200 dark:border-surface-700 p-3 sm:col-span-2">
                        <p class="text-xs text-surface-500">IBAN</p>
                        <div class="flex items-center justify-between">
                            <p class="font-mono font-medium">{{ bank.iban }}</p>
                            <button @click="copy(bank.iban, 'iban')" class="text-primary-600 hover:text-primary-700">
                                <Check v-if="copied === 'iban'" class="h-4 w-4" />
                                <Copy v-else class="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mt-4 p-4 rounded-lg bg-primary-50 dark:bg-primary-900/30">
                    <p class="text-sm">
                        <strong>Amount to transfer:</strong>
                        {{ plan.currency }} {{ Number(plan.price).toLocaleString() }}
                    </p>
                    <p class="text-xs mt-1 text-surface-600 dark:text-surface-300">
                        Add reference code <code class="font-mono">{{ reference_code }}</code> in the transaction memo to help us match it.
                    </p>
                </div>
            </div>

            <!-- Step 2: Submit proof -->
            <form @submit.prevent="submit" class="mt-6 card p-6 space-y-4">
                <h2 class="font-semibold flex items-center gap-2">
                    <span class="h-6 w-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center">2</span>
                    Submit your payment proof
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="label">Transaction ID *</label>
                        <input v-model="form.transaction_id" required class="input"
                            placeholder="From your bank receipt" />
                        <p v-if="form.errors.transaction_id" class="mt-1 text-xs text-red-600">{{ form.errors.transaction_id }}</p>
                    </div>
                    <div>
                        <label class="label">Your bank (optional)</label>
                        <input v-model="form.bank_name" class="input" placeholder="e.g. HBL" />
                    </div>
                    <div>
                        <label class="label">Sender name *</label>
                        <input v-model="form.sender_name" required class="input" placeholder="Name on the sending account" />
                        <p v-if="form.errors.sender_name" class="mt-1 text-xs text-red-600">{{ form.errors.sender_name }}</p>
                    </div>
                    <div>
                        <label class="label">Sender account number *</label>
                        <input v-model="form.sender_account" required class="input" placeholder="Last 4 digits OK" />
                        <p v-if="form.errors.sender_account" class="mt-1 text-xs text-red-600">{{ form.errors.sender_account }}</p>
                    </div>
                </div>

                <div>
                    <label class="label">Screenshot of transfer * <span class="text-xs font-normal text-surface-500">(JPG/PNG/WEBP, max 5MB)</span></label>
                    <label class="block mt-1 cursor-pointer">
                        <div class="border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-lg p-6 hover:border-primary-500 transition">
                            <div v-if="!preview" class="text-center">
                                <Upload class="h-8 w-8 mx-auto text-surface-400" />
                                <p class="mt-2 text-sm text-surface-600 dark:text-surface-300">Click to upload screenshot</p>
                            </div>
                            <div v-else class="text-center">
                                <img :src="preview" alt="Preview" class="max-h-48 mx-auto rounded" />
                                <p class="mt-2 text-xs text-surface-500 inline-flex items-center gap-1">
                                    <FileImage class="h-3.5 w-3.5" /> {{ form.screenshot?.name }}
                                </p>
                            </div>
                        </div>
                        <input type="file" accept="image/*" @change="onFile" class="hidden" />
                    </label>
                    <p v-if="form.errors.screenshot" class="mt-1 text-xs text-red-600">{{ form.errors.screenshot }}</p>
                </div>

                <div class="pt-3 border-t border-surface-200 dark:border-surface-800">
                    <button type="submit" :disabled="form.processing || !form.screenshot" class="btn-primary w-full">
                        {{ form.processing ? 'Submitting...' : 'Submit payment for review' }}
                    </button>
                    <p class="mt-2 text-xs text-surface-500 text-center">
                        Our team typically reviews payments within 4 hours.
                    </p>
                </div>
            </form>
        </div>
    </AuthenticatedLayout>
</template>
