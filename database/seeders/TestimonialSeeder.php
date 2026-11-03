<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['Ahsan Tariq', 'Founder', 'Local SEO Co', "We onboarded 47 dental clinics in our first month using Customer Near Me. The lead quality is significantly better than buying lists.", 5, true],
            ['Sara Khan', 'Marketing Lead', 'Digital Spark', "The geo-targeting precision is brilliant. I can scope a 5km radius around any city and pull restaurant leads with verified emails in minutes.", 5, true],
            ['Bilal Mehmood', 'Agency Owner', 'Webmaster PK', "Saved me thousands compared to Apollo. Manual payment in PKR is a huge plus for the local market.", 5, true],
            ['Maria Iqbal', 'Cold Outreach Specialist', 'Freelance', "The AI lead scoring is gold. I focus only on Hot and SEO Weak leads — my reply rate jumped 3x.", 5, false],
            ['Hamza Ali', 'BDM', 'Tech Solutions', "Integrated this into our outbound workflow. Pull, filter, export — done in 10 minutes.", 5, false],
            ['Fatima Sheikh', 'Marketing Consultant', 'Self-employed', "The affiliate program pays consistently. Made PKR 18,000 last month from referrals alone.", 5, true],
        ];

        foreach ($items as $i => [$name, $title, $company, $content, $rating, $featured]) {
            Testimonial::updateOrCreate(
                ['name' => $name],
                compact('title', 'company', 'content', 'rating') + [
                    'is_featured' => $featured,
                    'is_active' => true,
                    'sort_order' => $i,
                ]
            );
        }
    }
}
