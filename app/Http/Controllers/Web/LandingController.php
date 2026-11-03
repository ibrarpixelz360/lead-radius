<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\Plan;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function landing(): Response
    {
        return Inertia::render('Public/Landing', [
            'plans' => Plan::active()->ordered()->get(),
            'testimonials' => Testimonial::active()->limit(6)->get(),
            'faqs' => Faq::active()->limit(6)->get(['id', 'question', 'answer']),
        ]);
    }

    public function pricing(): Response
    {
        return Inertia::render('Public/Pricing', [
            'plans' => Plan::active()->ordered()->get(),
        ]);
    }

    public function howItWorks(): Response
    {
        return Inertia::render('Public/HowItWorks');
    }

    public function faq(): Response
    {
        $faqs = Faq::active()
            ->get(['id', 'category', 'question', 'answer'])
            ->groupBy('category');

        return Inertia::render('Public/Faq', ['faqs' => $faqs]);
    }

    public function affiliate(): Response
    {
        return Inertia::render('Public/Affiliate', [
            'commission_percent' => (int) config('cnm.affiliate.commission_percent', 30),
            'recurring_percent' => (int) config('cnm.affiliate.recurring_percent', 20),
            'cookie_days' => (int) config('cnm.affiliate.cookie_days', 90),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('Public/Contact');
    }

    public function privacy(): Response
    {
        return Inertia::render('Public/Privacy');
    }

    public function terms(): Response
    {
        return Inertia::render('Public/Terms');
    }
}
