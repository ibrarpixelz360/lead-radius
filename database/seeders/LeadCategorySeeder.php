<?php

namespace Database\Seeders;

use App\Models\LeadCategory;
use Illuminate\Database\Seeder;

class LeadCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            "Accountant",
            "Asian Restaurant",
            "Auto parts store",
            "Auto repair shop",
            "Bakery",
            "Beauty",
            "Blinds Shop",
            "Building materials supplier",
            "Business management consultant",
            "Cafe",
            "Car dealer",
            "Carpenter",
            "Carpet Retail Shop",
            "Caterer",
            "Chinese Bakery",
            "Chiropractor",
            "Civil law attorney",
            "Cladding supplier",
            "Clothing store",
            "Coaching center",
            "Comic Cafe",
            "Computer training school",
            "Criminal justice attorney",
            "Custom home builder",
            "Dog day care center",
            "Dog trainer",
            "Electrician",
            "Electronics store",
            "Eyelash Extensions",
            "Facials",
            "Fast food restaurant",
            "Figurine Shop",
            "Fish Farm",
            "Fish Store",
            "Flower Delivery",
            "Flower Designer",
            "Food Manufacturer",
            "Furniture store",
            "Grocery Shop",
            "Gym",
            "Hair Dresser",
            "HVAC contractor",
            "Immigration attorney",
            "Insurance agency",
            "Kennel",
            "Language school",
            "Law firm",
            "Logistics service",
            "Music school",
            "Packaging supply store",
            "Painter",
            "Perfume Store",
            "Personal trainer",
            "Pest Control Service",
            "Pet Boarding Service",
            "Pet Groomer",
            "Pet Sitter",
            "Physiotherapy clinic",
            "Pilates studio",
            "Plumber",
            "Real Estate",
            "Real estate agency",
            "Restaurant",
            "Roofing contractor",
            "Skin Care",
            "Tax consultant",
            "Towing service",
            "Training centre",
            "Truck rental agency",
            "Yoga studio",
        ];

        foreach ($categories as $cat) {
            LeadCategory::firstOrCreate(['name' => trim($cat)]);
        }
    }
}
