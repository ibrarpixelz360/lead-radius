<script setup>
import { Head, Link } from '@inertiajs/vue3';
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { ref } from 'vue';
import { ChevronDown } from 'lucide-vue-next';

const props = defineProps({ faqs: Object });
const openId = ref(null);

const toggle = (id) => { openId.value = openId.value === id ? null : id; };

// Fallback FAQs if database is empty
const fallback = [
    {
        category: 'General',
        items: [
            { id: 1, question: 'What is Customer Near Me?', answer: 'A SaaS platform that lets you generate verified business leads from Google My Business based on country, city, niche, and radius.' },
            { id: 2, question: 'Do I need a credit card to start?', answer: 'No. Your 7-day free trial requires no card. We will only ask for payment if you choose to upgrade.' },
            { id: 3, question: 'Where does the lead data come from?', answer: 'Public Google My Business listings. We extract business names, addresses, phone, email, website, ratings, and social links.' },
        ],
    },
    {
        category: 'Plans & Billing',
        items: [
            { id: 4, question: 'How does payment work?', answer: 'We accept manual bank transfers (Pakistan banks). Upload your transaction screenshot, our team approves within hours, and your plan activates automatically.' },
            { id: 5, question: 'Can I cancel anytime?', answer: 'Yes. Plans are month-to-month. Cancel and you keep access until the end of your billing period.' },
            { id: 6, question: 'What happens after my trial ends?', answer: 'Lead generation pauses. Your saved leads stay accessible. Upgrade anytime to resume.' },
        ],
    },
    {
        category: 'Affiliate',
        items: [
            { id: 7, question: 'How much can I earn?', answer: '30% commission on every first payment from your referral, plus 20% on every renewal — for as long as they stay subscribed.' },
            { id: 8, question: 'When do I get paid?', answer: 'Withdrawals are processed manually. Minimum payout: PKR 1,000. Methods: Bank transfer, JazzCash, EasyPaisa.' },
        ],
    },
];

const grouped = props.faqs && Object.keys(props.faqs).length
    ? Object.entries(props.faqs).map(([cat, items]) => ({ category: cat || 'General', items }))
    : fallback;
</script>

<template>
    <Head title="FAQ" />
    <PublicLayout>
        <section class="py-16 lg:py-20 text-center">
            <div class="max-w-3xl mx-auto px-4">
                <h1 class="text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50">Frequently Asked Questions</h1>
                <p class="mt-4 text-lg text-surface-600 dark:text-surface-400">
                    Everything you need to know. Can't find an answer? <Link :href="route('contact')" class="text-primary-600 hover:underline">Contact us</Link>.
                </p>
            </div>
        </section>

        <section class="pb-20">
            <div class="max-w-3xl mx-auto px-4 lg:px-8 space-y-10">
                <div v-for="group in grouped" :key="group.category">
                    <h2 class="text-lg font-bold text-surface-900 dark:text-surface-50 mb-4">{{ group.category }}</h2>
                    <div class="space-y-2">
                        <div v-for="faq in group.items" :key="faq.id"
                             class="card overflow-hidden">
                            <button @click="toggle(faq.id)"
                                    class="w-full flex items-center justify-between p-5 text-left">
                                <span class="font-medium">{{ faq.question }}</span>
                                <ChevronDown :class="['h-5 w-5 transition-transform', openId === faq.id ? 'rotate-180' : '']" />
                            </button>
                            <div v-show="openId === faq.id"
                                 class="px-5 pb-5 text-surface-600 dark:text-surface-400 text-sm leading-relaxed">
                                {{ faq.answer }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </PublicLayout>
</template>
