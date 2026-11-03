<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';

defineProps({ status: String });

const form = useForm({ email: '' });

const submit = () => form.post(route('password.email'));
</script>

<template>
    <GuestLayout>
        <Head title="Forgot Password" />

        <h1 class="text-2xl font-bold text-center text-surface-900 dark:text-surface-50">Reset your password</h1>
        <p class="mt-2 text-center text-sm text-surface-500">
            Enter your email and we'll send you a reset link.
        </p>

        <div v-if="status" class="mt-4 p-3 rounded-lg bg-accent-50 text-accent-700 text-sm text-center">
            {{ status }}
        </div>

        <form @submit.prevent="submit" class="mt-6 space-y-4">
            <div>
                <label for="email" class="label">Email</label>
                <input id="email" type="email" v-model="form.email" required autofocus class="input" />
                <p v-if="form.errors.email" class="mt-1 text-xs text-red-600">{{ form.errors.email }}</p>
            </div>

            <button type="submit" :disabled="form.processing" class="btn-primary w-full">
                {{ form.processing ? 'Sending...' : 'Send reset link' }}
            </button>
        </form>

        <p class="mt-6 text-center text-sm">
            <Link :href="route('login')" class="text-primary-600 hover:underline">Back to login</Link>
        </p>
    </GuestLayout>
</template>
