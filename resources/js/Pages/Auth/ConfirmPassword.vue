<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';

const form = useForm({ password: '' });

const submit = () => form.post(route('password.confirm'), {
    onFinish: () => form.reset('password'),
});
</script>

<template>
    <GuestLayout>
        <Head title="Confirm Password" />
        <h1 class="text-2xl font-bold text-center">Confirm your password</h1>
        <p class="mt-2 text-sm text-surface-500 text-center">
            This is a secure area. Please confirm your password before continuing.
        </p>
        <form @submit.prevent="submit" class="mt-6 space-y-4">
            <div>
                <label class="label">Password</label>
                <input type="password" v-model="form.password" required autofocus class="input" />
                <p v-if="form.errors.password" class="mt-1 text-xs text-red-600">{{ form.errors.password }}</p>
            </div>
            <button type="submit" :disabled="form.processing" class="btn-primary w-full">Confirm</button>
        </form>
    </GuestLayout>
</template>
