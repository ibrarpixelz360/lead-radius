<script setup>
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Bell, BellOff, Check, CheckCircle } from 'lucide-vue-next';

const props = defineProps({
    notifications: Object,
    unread_count: Number,
    preferences: Object,
});

const prefs = useForm({ ...props.preferences });

const savePrefs = () => prefs.patch(route('notifications.preferences'), { preserveScroll: true });

const markRead = (id) => router.post(route('notifications.read', id), {}, { preserveScroll: true });
const markAllRead = () => router.post(route('notifications.read-all'), {}, { preserveScroll: true });

const fmtDate = (d) => new Date(d).toLocaleString();

const typeLabel = (t) => ({
    payment_received: 'Payment received',
    payment_approved: 'Payment approved 🎉',
    payment_rejected: 'Payment issue',
    new_payment_review: 'New payment for review',
}[t] || t);
</script>

<template>
    <Head title="Notifications" />
    <AuthenticatedLayout>
        <div class="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 class="text-2xl font-bold">Notifications</h1>
                <p class="mt-1 text-sm text-surface-500">{{ unread_count }} unread</p>
            </div>

            <!-- Preferences -->
            <div class="card p-6">
                <h2 class="font-semibold mb-4">Email preferences</h2>
                <div class="space-y-3">
                    <label class="flex items-center justify-between p-3 rounded-lg border border-surface-200 dark:border-surface-700">
                        <div>
                            <p class="font-medium text-sm">Lead generation complete</p>
                            <p class="text-xs text-surface-500">Email me when a lead search finishes</p>
                        </div>
                        <input type="checkbox" v-model="prefs.email_lead_complete" @change="savePrefs"
                            class="rounded text-primary-600" />
                    </label>
                    <label class="flex items-center justify-between p-3 rounded-lg border border-surface-200 dark:border-surface-700">
                        <div>
                            <p class="font-medium text-sm">Weekly digest</p>
                            <p class="text-xs text-surface-500">Summary of your hot leads each Monday</p>
                        </div>
                        <input type="checkbox" v-model="prefs.email_weekly_digest" @change="savePrefs"
                            class="rounded text-primary-600" />
                    </label>
                    <label class="flex items-center justify-between p-3 rounded-lg border border-surface-200 dark:border-surface-700">
                        <div>
                            <p class="font-medium text-sm">Marketing emails</p>
                            <p class="text-xs text-surface-500">Product updates, tips, new features</p>
                        </div>
                        <input type="checkbox" v-model="prefs.email_marketing" @change="savePrefs"
                            class="rounded text-primary-600" />
                    </label>
                </div>
            </div>

            <!-- Notifications list -->
            <div class="card overflow-hidden">
                <div class="px-6 py-4 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between">
                    <h2 class="font-semibold">Inbox</h2>
                    <button v-if="unread_count > 0" @click="markAllRead" class="btn-ghost text-sm">
                        <CheckCircle class="h-4 w-4" /> Mark all read
                    </button>
                </div>
                <ul class="divide-y divide-surface-200 dark:divide-surface-800">
                    <li v-for="n in notifications.data" :key="n.id"
                        :class="['p-5 flex items-start gap-3', n.read_at ? 'opacity-60' : '']">
                        <div class="shrink-0 mt-0.5">
                            <Bell v-if="!n.read_at" class="h-5 w-5 text-primary-600" />
                            <BellOff v-else class="h-5 w-5 text-surface-400" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="font-medium text-sm">{{ typeLabel(n.type) }}</p>
                            <p v-if="n.data?.amount" class="text-xs text-surface-500 mt-0.5">
                                Amount: PKR {{ Number(n.data.amount).toLocaleString() }}
                                <span v-if="n.data.plan"> · {{ n.data.plan }}</span>
                            </p>
                            <p class="text-xs text-surface-400 mt-1">{{ fmtDate(n.created_at) }}</p>
                        </div>
                        <button v-if="!n.read_at" @click="markRead(n.id)"
                            class="text-xs text-primary-600 hover:underline">Mark read</button>
                    </li>
                    <li v-if="notifications.data.length === 0" class="p-12 text-center text-surface-500 text-sm">
                        No notifications.
                    </li>
                </ul>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
