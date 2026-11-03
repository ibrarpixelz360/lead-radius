<?php

namespace Database\Factories;

use App\Models\Lead;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class LeadFactory extends Factory
{
    protected $model = Lead::class;

    public function definition(): array
    {
        $categories = ['Restaurant', 'Dentist', 'Plumber', 'Electrician', 'Salon', 'Gym', 'Cafe', 'Pharmacy'];
        $cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad'];

        return [
            'google_place_id' => 'CHJ_'.Str::random(20),
            'business_name' => fake()->company(),
            'category' => fake()->randomElement($categories),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->boolean(70) ? fake()->companyEmail() : null,
            'website' => fake()->boolean(80) ? fake()->url() : null,
            'address' => fake()->streetAddress(),
            'city' => fake()->randomElement($cities),
            'state' => 'Sindh',
            'country' => 'PK',
            'postal_code' => fake()->postcode(),
            'lat' => fake()->latitude(24, 35),
            'lng' => fake()->longitude(66, 75),
            'rating' => fake()->randomFloat(1, 2.5, 5.0),
            'reviews_count' => fake()->numberBetween(0, 500),
            'social_links' => ['facebook' => fake()->url()],
            'ai_score' => fake()->numberBetween(20, 95),
            'ai_category' => fake()->randomElement(['hot', 'good', 'seo_weak', 'low_rating', 'inactive']),
            'last_scraped_at' => now(),
        ];
    }
}
