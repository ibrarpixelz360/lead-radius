<script setup>
import { Head, Link } from '@inertiajs/vue3';
import PublicLayout from '@/Layouts/PublicLayout.vue';

defineProps({ posts: Object });

const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
</script>

<template>
    <Head title="Blog" />
    <PublicLayout>
        <section class="py-16 lg:py-20 text-center">
            <div class="max-w-3xl mx-auto px-4">
                <h1 class="text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50">Blog</h1>
                <p class="mt-4 text-lg text-surface-600 dark:text-surface-400">
                    Lead generation tips, product updates, and case studies.
                </p>
            </div>
        </section>

        <section class="pb-20">
            <div class="max-w-6xl mx-auto px-4 lg:px-8">
                <div v-if="posts.data.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Link v-for="post in posts.data" :key="post.id"
                        :href="route('blog.show', post.slug)"
                        class="card overflow-hidden hover:shadow-lg transition group">
                        <div v-if="post.cover_image" class="aspect-video bg-surface-100 dark:bg-surface-800">
                            <img :src="post.cover_image" :alt="post.title" class="w-full h-full object-cover" />
                        </div>
                        <div class="p-5">
                            <p class="text-xs text-surface-500">{{ fmtDate(post.published_at) }}</p>
                            <h3 class="mt-2 font-bold text-lg group-hover:text-primary-600 transition">{{ post.title }}</h3>
                            <p v-if="post.excerpt" class="mt-2 text-sm text-surface-600 dark:text-surface-300 line-clamp-3">
                                {{ post.excerpt }}
                            </p>
                            <div v-if="post.tags?.length" class="mt-3 flex flex-wrap gap-1.5">
                                <span v-for="t in post.tags.slice(0, 3)" :key="t"
                                    class="badge bg-surface-100 dark:bg-surface-800 text-surface-600">{{ t }}</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div v-else class="card p-12 text-center">
                    <p class="text-surface-500">No posts yet. Check back soon!</p>
                </div>

                <div v-if="posts.last_page > 1" class="mt-8 flex justify-center gap-1">
                    <Link v-for="link in posts.links" :key="link.label"
                        :href="link.url ?? '#'"
                        :class="['px-3 py-1 rounded border text-sm',
                            link.active ? 'bg-primary-600 text-white border-primary-600' :
                            link.url ? 'border-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800' :
                            'border-surface-100 text-surface-300 cursor-not-allowed']"
                        v-html="link.label" />
                </div>
            </div>
        </section>
    </PublicLayout>
</template>
