<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            ['general', 'What is Customer Near Me?', 'Customer Near Me is a SaaS platform that lets you generate verified business leads from Google My Business by country, state, city, and keyword. Each lead includes business name, phone, email, website, rating, reviews, and more.'],
            ['general', 'Do I need a credit card to start the free trial?', 'No. Sign up with just your email and start using the platform immediately for 7 days. No payment information is required.'],
            ['general', 'Where do the leads come from?', 'All leads are sourced from publicly available Google My Business listings. We extract business contact information available on each listing and enrich it with email/social data when possible.'],
            ['billing', 'How do I pay?', 'We accept manual bank transfers in PKR. After selecting a plan, you will see our bank details, transfer the amount, and upload your payment screenshot. Payments are typically reviewed within 4 hours.'],
            ['billing', 'Can I get a refund?', 'We offer a 7-day free trial so you can fully evaluate the platform before paying. After payment, refunds are handled on a case-by-case basis within 3 days of subscription.'],
            ['billing', 'Can I upgrade or downgrade my plan?', 'Yes. You can change plans anytime from the billing section. Upgrades take effect immediately; downgrades apply at the next billing cycle.'],
            ['affiliate', 'How does the affiliate program work?', 'Share your unique referral link. When someone signs up through your link and pays for a plan, you earn 30% of their first payment and 20% of every recurring payment. Withdraw via bank, JazzCash, or EasyPaisa.'],
            ['affiliate', 'When can I withdraw my earnings?', 'Commissions become available after a 14-day hold period (chargeback protection). The minimum withdrawal is PKR 1,000.'],
            ['technical', 'How many devices can I use?', 'Free trial: 1 device. Starter: 2 devices. Growth: 5 devices. You can revoke devices anytime from your settings.'],
            ['technical', 'Can I export leads?', 'Yes. All paid plans include unlimited CSV and XLSX exports with custom filtering.'],
        ];

        foreach ($faqs as $i => [$category, $q, $a]) {
            Faq::updateOrCreate(
                ['question' => $q],
                ['category' => $category, 'answer' => $a, 'sort_order' => $i, 'is_active' => true]
            );
        }
    }
}
