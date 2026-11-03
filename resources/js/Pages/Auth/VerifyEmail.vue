<script setup>
import { computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';

const props = defineProps({ status: String });

const form = useForm({});

const submit = () => form.post(route('verification.send'));

const verificationLinkSent = computed(() => props.status === 'verification-link-sent');
</script>

<template>
    <GuestLayout>
        <Head title="Verify Email" />

        <h1 class="text-2xl font-bold text-center text-surface-900 dark:text-surface-50">Verify your email</h1>
        <p class="mt-4 text-sm text-surface-600 dark:text-surface-400">
            Thanks for signing up! Please verify your email by clicking the link we sent you.
            If you didn't receive it, we can send you another.
        </p>

        <div v-if="verificationLinkSent" class="mt-4 p-3 rounded-lg bg-accent-50 text-accent-700 text-sm text-center">
            A new verification link has been sent.
        </div>

        <form @submit.prevent="submit" class="mt-6 space-y-4">
            <button type="submit" :disabled="form.processing" class="btn-primary w-full">
                Resend verification email
            </button>

            <Link :href="route('logout')" method="post" as="button" class="btn-ghost w-full">
                Log out
            </Link>
        </form>
    </GuestLayout>
</template>
