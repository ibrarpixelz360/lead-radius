<script setup>
import { Head } from '@inertiajs/vue3';
import PublicLayout from '@/Layouts/PublicLayout.vue';
</script>

<template>
    <Head title="Terms of Service" />
    <PublicLayout>
        <article class="max-w-3xl mx-auto px-4 lg:px-8 py-16 prose prose-slate dark:prose-invert">
            <h1>Terms of Service</h1>
            <p class="text-sm text-surface-500"><em>Last updated: {{ new Date().toLocaleDateString() }}</em></p>

            <h2>1. Acceptance of terms</h2>
            <p>By accessing or using Customer Near Me, you agree to be bound by these Terms. If you disagree, do not use the service.</p>

            <h2>2. Account responsibility</h2>
            <p>You are responsible for maintaining the confidentiality of your login credentials. You agree to accept responsibility for all activities that occur under your account.</p>

            <h2>3. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
                <li>Use the service for illegal purposes or to harass others</li>
                <li>Attempt to bypass plan limits, device restrictions, or security measures</li>
                <li>Reverse-engineer, scrape, or resell our service or data</li>
                <li>Send unsolicited bulk email (spam) using lead data from our platform</li>
                <li>Share your account with unauthorized users or exceed your plan's device limit</li>
            </ul>

            <h2>4. Lead data usage</h2>
            <p>Lead data is provided for legitimate business outreach only. You must comply with all applicable laws governing email marketing, telemarketing, and data privacy in your jurisdiction (CAN-SPAM, GDPR, TCPA, etc.).</p>

            <h2>5. Subscription & payments</h2>
            <p>Subscriptions are billed monthly via manual bank transfer. After admin approval, your plan activates for 30 days. We do not auto-renew. No refunds on partially-used subscription periods.</p>

            <h2>6. Affiliate program</h2>
            <p>Self-referrals are not permitted. We reserve the right to reverse commissions on fraudulent referrals or chargeback events.</p>

            <h2>7. Account suspension</h2>
            <p>We may suspend or terminate accounts that violate these Terms without prior notice.</p>

            <h2>8. Disclaimer</h2>
            <p>The service is provided "as is" without warranties. Lead data accuracy depends on Google's public listings — we do not guarantee any specific number of leads or their conversion rates.</p>

            <h2>9. Limitation of liability</h2>
            <p>Our liability is limited to the amount you have paid in the past 12 months.</p>

            <h2>10. Changes to terms</h2>
            <p>We may update these terms. Material changes will be communicated via email.</p>

            <h2>11. Contact</h2>
            <p>For legal questions: <a href="mailto:legal@customernearme.com">legal@customernearme.com</a></p>
        </article>
    </PublicLayout>
</template>
