<script setup>
import { Head } from '@inertiajs/vue3';
import PublicLayout from '@/Layouts/PublicLayout.vue';
</script>

<template>
    <Head title="Privacy Policy" />
    <PublicLayout>
        <article class="max-w-3xl mx-auto px-4 lg:px-8 py-16 prose prose-slate dark:prose-invert">
            <h1>Privacy Policy</h1>
            <p class="text-sm text-surface-500"><em>Last updated: {{ new Date().toLocaleDateString() }}</em></p>

            <h2>1. Information we collect</h2>
            <p>When you create an account, we collect your name, email address, phone number (optional), and country code. When you make a payment, we collect transaction information including the screenshot of your bank transfer.</p>

            <h2>2. How we use your information</h2>
            <p>We use your information to:</p>
            <ul>
                <li>Provide and maintain the service</li>
                <li>Process payments and activate subscriptions</li>
                <li>Send transactional emails (welcome, payment confirmations, trial expiry, etc.)</li>
                <li>Track devices on your account for plan limit enforcement</li>
                <li>Calculate affiliate commissions</li>
            </ul>

            <h2>3. Lead data</h2>
            <p>The business leads generated through our platform are sourced from publicly available Google My Business listings. We do not collect personal data of individual consumers — only public business contact information.</p>

            <h2>4. Cookies</h2>
            <p>We use cookies for authentication, session management, and affiliate referral tracking (90-day attribution window).</p>

            <h2>5. Data security</h2>
            <p>We use industry-standard security: HTTPS everywhere, password hashing (bcrypt), encrypted database backups, and audit logging on admin actions.</p>

            <h2>6. Your rights</h2>
            <p>You can export or delete your account data at any time from <em>Settings → Profile</em>. Account deletion is soft-deleted for 30 days before permanent purge.</p>

            <h2>7. Contact</h2>
            <p>For privacy questions: <a href="mailto:privacy@customernearme.com">privacy@customernearme.com</a></p>
        </article>
    </PublicLayout>
</template>
