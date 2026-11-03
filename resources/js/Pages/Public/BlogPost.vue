<script setup>
import { Head, Link } from '@inertiajs/vue3';
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { ArrowLeft } from 'lucide-vue-next';

defineProps({ post: Object, related: Array });

const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
</script>

<template>
    <Head>
        <title>{{ post.meta_title || post.title }}</title>
        <meta v-if="post.meta_description" name="description" :content="post.meta_description" head-key="description" />
        <meta property="og:title" :content="post.title" />
        <meta v-if="post.cover_image" property="og:image" :content="post.cover_image" />
    </Head>
    <PublicLayout>
        <article class="max-w-3xl mx-auto px-4 lg:px-8 py-16">
            <Link :href="route('blog.index')"
                class="text-sm text-primary-600 hover:underline inline-flex items-center gap-1">
                <ArrowLeft class="h-4 w-4" /> Back to blog
            </Link>

            <h1 class="mt-6 text-3xl lg:text-4xl font-bold text-surface-900 dark:text-surface-50">{{ post.title }}</h1>
            <p class="mt-3 text-sm text-surface-500">{{ fmtDate(post.published_at) }}</p>

            <img v-if="post.cover_image" :src="post.cover_image" :alt="post.title"
                class="mt-8 w-full rounded-xl" />

            <div class="prose prose-slate dark:prose-invert max-w-none mt-8" v-html="post.content"></div>

            <div v-if="post.tags?.length" class="mt-8 pt-6 border-t border-surface-200 dark:border-surface-800 flex flex-wrap gap-2">
                <span v-for="t in post.tags" :key="t" class="badge bg-surface-100 dark:bg-surface-800 text-surface-600">
                    {{ t }}
                </span>
            </div>
        </article>

        <section v-if="related.length" class="border-t border-surface-200 dark:border-surface-800 py-16">
            <div class="max-w-6xl mx-auto px-4 lg:px-8">
                <h2 class="text-2xl font-bold mb-6">Related posts</h2>
                <div class="grid gap-6 md:grid-cols-3">
                    <Link v-for="r in related" :key="r.id" :href="route('blog.show', r.slug)"
                        class="card p-5 hover:shadow-lg transition">
                        <p class="text-xs text-surface-500">{{ fmtDate(r.published_at) }}</p>
                        <h3 class="mt-2 font-bold">{{ r.title }}</h3>
                        <p v-if="r.excerpt" class="mt-2 text-sm text-surface-600 line-clamp-2">{{ r.excerpt }}</p>
                    </Link>
                </div>
            </div>
        </section>
    </PublicLayout>
</template>
