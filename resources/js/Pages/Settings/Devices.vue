<script setup>
import { Head, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Smartphone, Monitor, Tablet, Trash2, Shield } from 'lucide-vue-next';

defineProps({ devices: Array });

const iconFor = (device) => {
    if (device.device_type === 'mobile') return Smartphone;
    if (device.device_type === 'tablet') return Tablet;
    return Monitor;
};

const revoke = (device) => {
    if (confirm('Revoke this device? You will need to log in again on this device.')) {
        router.delete(route('devices.destroy', device.id), { preserveScroll: true });
    }
};

const fmt = (date) => new Date(date).toLocaleString();
</script>

<template>
    <Head title="Connected Devices" />
    <AuthenticatedLayout>
        <div class="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 class="text-2xl font-bold">Connected devices</h1>
                <p class="mt-1 text-sm text-surface-500">
                    Devices that have signed into your account. Revoke any you don't recognize.
                </p>
            </div>

            <div class="card divide-y divide-surface-200 dark:divide-surface-800">
                <div v-for="device in devices" :key="device.id" class="p-5 flex items-center gap-4">
                    <div class="shrink-0 h-10 w-10 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
                        <component :is="iconFor(device)" class="h-5 w-5 text-surface-600 dark:text-surface-400" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2">
                            <p class="font-medium truncate">{{ device.browser }} on {{ device.os }}</p>
                            <span v-if="device.is_trusted" class="badge bg-accent-50 text-accent-700">
                                <Shield class="h-3 w-3 mr-1" /> Trusted
                            </span>
                        </div>
                        <p class="text-xs text-surface-500">
                            {{ device.ip }} · {{ device.country || 'Unknown location' }}
                            · Last seen {{ fmt(device.last_seen_at) }}
                        </p>
                    </div>
                    <button @click="revoke(device)"
                            class="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition">
                        <Trash2 class="h-4 w-4" />
                    </button>
                </div>
                <div v-if="devices.length === 0" class="p-12 text-center text-sm text-surface-500">
                    No active devices.
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
