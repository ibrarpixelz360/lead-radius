<script setup>
import { Head, useForm, usePage } from '@inertiajs/vue3';
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { Mail, MessageSquare, MapPin, CheckCircle } from 'lucide-vue-next';
import { computed } from 'vue';

const page = usePage();
const flashSuccess = computed(() => page.props.flash?.success);

const form = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
});

const submit = () => form.post(route('contact.store'), {
    preserveScroll: true,
    onSuccess: () => form.reset(),
});
</script>

<template>
    <Head title="Contact" />
    <PublicLayout>
        <section class="py-16 lg:py-20">
            <div class="max-w-5xl mx-auto px-4 lg:px-8">
                <div class="text-center max-w-2xl mx-auto">
                    <h1 class="text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50">Get in touch</h1>
                    <p class="mt-4 text-lg text-surface-600 dark:text-surface-400">
                        Questions, feedback, or partnership ideas — we'd love to hear from you.
                    </p>
                </div>

                <div class="mt-16 grid md:grid-cols-3 gap-6">
                    <div class="card p-6 text-center">
                        <div class="mx-auto h-12 w-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                            <Mail class="h-6 w-6 text-primary-600" />
                        </div>
                        <h3 class="mt-4 font-bold">Email us</h3>
                        <a href="mailto:hello@customernearme.com" class="mt-1 text-sm text-primary-600 hover:underline">hello@customernearme.com</a>
                    </div>
                    <div class="card p-6 text-center">
                        <div class="mx-auto h-12 w-12 rounded-xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center">
                            <MessageSquare class="h-6 w-6 text-accent-600" />
                        </div>
                        <h3 class="mt-4 font-bold">Live support</h3>
                        <p class="mt-1 text-sm text-surface-500">In-app for paid plans</p>
                    </div>
                    <div class="card p-6 text-center">
                        <div class="mx-auto h-12 w-12 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
                            <MapPin class="h-6 w-6 text-orange-600" />
                        </div>
                        <h3 class="mt-4 font-bold">Headquarters</h3>
                        <p class="mt-1 text-sm text-surface-500">Karachi, Pakistan</p>
                    </div>
                </div>

                <div class="mt-12 max-w-xl mx-auto card p-8">
                    <h2 class="text-xl font-bold mb-6">Send us a message</h2>

                    <div v-if="flashSuccess" class="mb-4 p-3 rounded-lg bg-accent-50 text-accent-700 text-sm flex items-center gap-2">
                        <CheckCircle class="h-4 w-4 shrink-0" />
                        {{ flashSuccess }}
                    </div>

                    <form @submit.prevent="submit" class="space-y-4">
                        <div class="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label class="label">Name</label>
                                <input v-model="form.name" required class="input" />
                                <p v-if="form.errors.name" class="mt-1 text-xs text-red-600">{{ form.errors.name }}</p>
                            </div>
                            <div>
                                <label class="label">Email</label>
                                <input type="email" v-model="form.email" required class="input" />
                                <p v-if="form.errors.email" class="mt-1 text-xs text-red-600">{{ form.errors.email }}</p>
                            </div>
                        </div>
                        <div>
                            <label class="label">Subject</label>
                            <input v-model="form.subject" required class="input" />
                            <p v-if="form.errors.subject" class="mt-1 text-xs text-red-600">{{ form.errors.subject }}</p>
                        </div>
                        <div>
                            <label class="label">Message</label>
                            <textarea v-model="form.message" rows="5" required class="input"></textarea>
                            <p v-if="form.errors.message" class="mt-1 text-xs text-red-600">{{ form.errors.message }}</p>
                        </div>
                        <button type="submit" :disabled="form.processing" class="btn-primary w-full">
                            {{ form.processing ? 'Sending...' : 'Send message' }}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </PublicLayout>
</template>
