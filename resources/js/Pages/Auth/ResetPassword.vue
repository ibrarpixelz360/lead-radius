<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';

const props = defineProps({ email: String, token: String });

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const submit = () => form.post(route('password.store'), {
    onFinish: () => form.reset('password', 'password_confirmation'),
});
</script>

<template>
    <GuestLayout>
        <Head title="Reset Password" />

        <h1 class="text-2xl font-bold text-center text-surface-900 dark:text-surface-50">Set new password</h1>

        <form @submit.prevent="submit" class="mt-6 space-y-4">
            <div>
                <label for="email" class="label">Email</label>
                <input id="email" type="email" v-model="form.email" required class="input" readonly />
            </div>

            <div>
                <label for="password" class="label">New password</label>
                <input id="password" type="password" v-model="form.password" required autofocus class="input" />
                <p v-if="form.errors.password" class="mt-1 text-xs text-red-600">{{ form.errors.password }}</p>
            </div>

            <div>
                <label for="password_confirmation" class="label">Confirm password</label>
                <input id="password_confirmation" type="password" v-model="form.password_confirmation" required class="input" />
            </div>

            <button type="submit" :disabled="form.processing" class="btn-primary w-full">
                {{ form.processing ? 'Updating...' : 'Reset password' }}
            </button>
        </form>
    </GuestLayout>
</template>
