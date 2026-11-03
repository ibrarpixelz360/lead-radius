<script setup>
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { computed } from 'vue';

defineProps({ canResetPassword: Boolean, status: String });

const page = usePage();
const googleEnabled = computed(() => Boolean(page.props.app?.google_oauth_enabled));

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Log in" />

        <h1 class="text-2xl font-bold text-center text-surface-900 dark:text-surface-50">Welcome back</h1>
        <p class="mt-2 text-center text-sm text-surface-500">Sign in to continue generating leads</p>

        <div v-if="status" class="mt-4 text-sm font-medium text-accent-600">{{ status }}</div>

        <form @submit.prevent="submit" class="mt-6 space-y-4">
            <div>
                <label for="email" class="label">Email</label>
                <input id="email" type="email" v-model="form.email" required autofocus autocomplete="username" class="input" />
                <p v-if="form.errors.email" class="mt-1 text-xs text-red-600">{{ form.errors.email }}</p>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label for="password" class="label">Password</label>
                    <Link v-if="canResetPassword" :href="route('password.request')"
                          class="text-xs text-primary-600 hover:underline">
                        Forgot?
                    </Link>
                </div>
                <input id="password" type="password" v-model="form.password" required autocomplete="current-password" class="input" />
                <p v-if="form.errors.password" class="mt-1 text-xs text-red-600">{{ form.errors.password }}</p>
            </div>

            <div class="flex items-center">
                <input id="remember" type="checkbox" v-model="form.remember"
                       class="h-4 w-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500" />
                <label for="remember" class="ml-2 text-sm text-surface-700 dark:text-surface-300">Remember me</label>
            </div>

            <button type="submit" :disabled="form.processing" class="btn-primary w-full">
                {{ form.processing ? 'Signing in...' : 'Sign in' }}
            </button>

            <div v-if="googleEnabled" class="relative my-4">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-surface-200 dark:border-surface-800"></div>
                </div>
                <div class="relative flex justify-center text-xs">
                    <span class="bg-white dark:bg-surface-900 px-2 text-surface-500">or</span>
                </div>
            </div>

            <a v-if="googleEnabled" :href="route('auth.google')" class="btn-secondary w-full">
                <svg class="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.99 10.99 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
                Continue with Google
            </a>
        </form>

        <p class="mt-6 text-center text-sm text-surface-500">
            New here?
            <Link :href="route('register')" class="font-medium text-primary-600 hover:underline">
                Create an account
            </Link>
        </p>
    </GuestLayout>
</template>
