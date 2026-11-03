<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ref } from 'vue';
import { ArrowLeft, Star, Phone, Mail, Globe, MapPin, Tag, X } from 'lucide-vue-next';

const props = defineProps({ lead: Object, pivot: Object });

const form = useForm({
    status: props.pivot.status,
    notes: props.pivot.notes || '',
    tags: props.pivot.tags || [],
    is_favorite: props.pivot.is_favorite,
    is_archived: props.pivot.is_archived,
});

const newTag = ref('');

const addTag = () => {
    if (newTag.value && !form.tags.includes(newTag.value)) {
        form.tags.push(newTag.value);
        newTag.value = '';
    }
};

const removeTag = (tag) => {
    form.tags = form.tags.filter(t => t !== tag);
};

const save = () => form.patch(route('leads.update', props.lead.id), { preserveScroll: true });
</script>

<template>
    <Head :title="lead.business_name" />
    <AuthenticatedLayout>
        <div class="max-w-5xl mx-auto">
            <Link :href="route('leads.index')" class="text-sm text-primary-600 hover:underline inline-flex items-center gap-1">
                <ArrowLeft class="h-4 w-4" /> Back to leads
            </Link>

            <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Lead info -->
                <div class="lg:col-span-2 space-y-6">
                    <div class="card p-6">
                        <div class="flex items-start justify-between gap-4">
                            <div>
                                <h1 class="text-2xl font-bold">{{ lead.business_name }}</h1>
                                <p v-if="lead.category" class="mt-1 text-surface-500">{{ lead.category }}</p>
                            </div>
                            <button @click="form.is_favorite = !form.is_favorite; save()" class="p-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800">
                                <Star :class="['h-5 w-5', form.is_favorite ? 'fill-yellow-400 text-yellow-400' : 'text-surface-400']" />
                            </button>
                        </div>

                        <div v-if="lead.rating" class="mt-4 flex items-center gap-2">
                            <Star class="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span class="font-semibold">{{ lead.rating }}</span>
                            <span class="text-sm text-surface-500">({{ lead.reviews_count }} reviews)</span>
                            <span v-if="lead.ai_score" class="ml-3 badge bg-primary-50 text-primary-700">AI Score: {{ lead.ai_score }}</span>
                            <span v-if="lead.ai_category" class="badge bg-surface-100 text-surface-700">{{ lead.ai_category.replace('_', ' ') }}</span>
                        </div>

                        <div class="mt-6 space-y-3 text-sm">
                            <div v-if="lead.phone" class="flex items-center gap-3">
                                <Phone class="h-4 w-4 text-surface-400" />
                                <a :href="`tel:${lead.phone}`" class="hover:text-primary-600">{{ lead.phone }}</a>
                            </div>
                            <div v-if="lead.email" class="flex items-center gap-3">
                                <Mail class="h-4 w-4 text-surface-400" />
                                <a :href="`mailto:${lead.email}`" class="hover:text-primary-600">{{ lead.email }}</a>
                            </div>
                            <div v-if="lead.website" class="flex items-center gap-3">
                                <Globe class="h-4 w-4 text-surface-400" />
                                <a :href="lead.website" target="_blank" rel="noopener" class="hover:text-primary-600 truncate">
                                    {{ lead.website }}
                                </a>
                            </div>
                            <div v-if="lead.address" class="flex items-start gap-3">
                                <MapPin class="h-4 w-4 text-surface-400 mt-0.5 shrink-0" />
                                <span>{{ lead.address }}, {{ lead.city }}, {{ lead.country }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Notes -->
                    <div class="card p-6">
                        <h2 class="font-semibold mb-3">Your notes</h2>
                        <textarea v-model="form.notes" rows="4" class="input"
                            placeholder="Add notes about this lead..."></textarea>
                        <div class="mt-3 flex justify-end">
                            <button @click="save" :disabled="form.processing" class="btn-primary text-sm">
                                {{ form.processing ? 'Saving...' : 'Save notes' }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="space-y-6">
                    <!-- Status -->
                    <div class="card p-5">
                        <label class="label">Status</label>
                        <select v-model="form.status" @change="save" class="input">
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="responded">Responded</option>
                            <option value="converted">Converted</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>

                    <!-- Tags -->
                    <div class="card p-5">
                        <label class="label">Tags</label>
                        <div class="flex flex-wrap gap-2 mt-2">
                            <span v-for="tag in form.tags" :key="tag"
                                class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs">
                                {{ tag }}
                                <button @click="removeTag(tag); save()" class="hover:text-red-600">
                                    <X class="h-3 w-3" />
                                </button>
                            </span>
                        </div>
                        <div class="mt-3 flex gap-2">
                            <input v-model="newTag" @keydown.enter.prevent="addTag(); save()"
                                class="input text-sm" placeholder="Add tag..." />
                            <button @click="addTag(); save()" class="btn-secondary text-sm">
                                <Tag class="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="card p-5 space-y-2">
                        <button @click="form.is_archived = !form.is_archived; save()" class="btn-secondary w-full text-sm">
                            {{ form.is_archived ? 'Unarchive' : 'Archive' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
