<?php

namespace App\Http\Requests\Lead;

use Illuminate\Foundation\Http\FormRequest;

class LeadSearchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'country' => ['required', 'string', 'max:80'],
            'state' => ['nullable', 'string', 'max:120'],
            'city' => ['required', 'string', 'max:120'],
            'query' => ['required', 'string', 'min:2', 'max:255'],
            'category' => ['nullable', 'string', 'max:120'],
            'radius_km' => ['nullable', 'integer', 'min:1', 'max:100'],
            'min_rating' => ['nullable', 'numeric', 'between:0,5'],
            'min_reviews' => ['nullable', 'integer', 'min:0'],
            'require_website' => ['nullable', 'boolean'],
            'require_email' => ['nullable', 'boolean'],
            'require_phone' => ['nullable', 'boolean'],
            'save_search' => ['nullable', 'boolean'],
            'save_search_name' => ['nullable', 'string', 'max:120'],
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'radius_km' => $this->radius_km ?? 10,
            'require_website' => $this->boolean('require_website'),
            'require_email' => $this->boolean('require_email'),
            'require_phone' => $this->boolean('require_phone'),
            'save_search' => $this->boolean('save_search'),
        ]);
    }
}
