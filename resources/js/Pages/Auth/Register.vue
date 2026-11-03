<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';

const props = defineProps({ referralCode: { type: String, default: null } });

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    country_code: 'PK',
    terms: false,
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Sign up" />

        <h1 class="text-2xl font-bold text-center text-surface-900 dark:text-surface-50">Start your 7-day trial</h1>
        <p class="mt-2 text-center text-sm text-surface-500">No credit card required.</p>

        <div v-if="referralCode" class="mt-4 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-sm text-primary-700 dark:text-primary-300 text-center">
            Referred by <strong>{{ referralCode }}</strong>
        </div>

        <form @submit.prevent="submit" class="mt-6 space-y-4">
            <div>
                <label for="name" class="label">Full name</label>
                <input id="name" v-model="form.name" required autofocus class="input" />
                <p v-if="form.errors.name" class="mt-1 text-xs text-red-600">{{ form.errors.name }}</p>
            </div>

            <div>
                <label for="email" class="label">Email</label>
                <input id="email" type="email" v-model="form.email" required class="input" />
                <p v-if="form.errors.email" class="mt-1 text-xs text-red-600">{{ form.errors.email }}</p>
            </div>

            <div>
                <label for="phone" class="label">Phone (optional)</label>
                <input id="phone" v-model="form.phone" class="input" placeholder="+92 300 1234567" />
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="password" class="label">Password</label>
                    <input id="password" type="password" v-model="form.password" required class="input" />
                    <p v-if="form.errors.password" class="mt-1 text-xs text-red-600">{{ form.errors.password }}</p>
                </div>

                <div>
                    <label for="password_confirmation" class="label">Confirm</label>
                    <input id="password_confirmation" type="password" v-model="form.password_confirmation" required class="input" />
                </div>
            </div>

            <div class="flex items-start gap-2">
                <input id="terms" type="checkbox" v-model="form.terms" required
                       class="mt-0.5 h-4 w-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500" />
                <label for="terms" class="text-sm text-surface-700 dark:text-surface-300">
                    I agree to the <Link href="/terms" class="text-primary-600 hover:underline">Terms</Link>
                    and <Link href="/privacy" class="text-primary-600 hover:underline">Privacy Policy</Link>
                </label>
            </div>
            <p v-if="form.errors.terms" class="text-xs text-red-600">{{ form.errors.terms }}</p>

            <button type="submit" :disabled="form.processing" class="btn-primary w-full">
                {{ form.processing ? 'Creating account...' : 'Create account' }}
            </button>
        </form>

        <p class="mt-6 text-center text-sm text-surface-500">
            Already have an account?
            <Link :href="route('login')" class="font-medium text-primary-600 hover:underline">
                Sign in
            </Link>
        </p>
    </GuestLayout>
</template>
