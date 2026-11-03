<?php

namespace App\Http\Requests\Payment;

use Illuminate\Foundation\Http\FormRequest;

class PaymentSubmissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'plan_id' => ['required', 'integer', 'exists:plans,id'],
            'transaction_id' => ['required', 'string', 'max:120'],
            'sender_name' => ['required', 'string', 'max:120'],
            'sender_account' => ['required', 'string', 'max:60'],
            'bank_name' => ['nullable', 'string', 'max:80'],
            'screenshot' => [
                'required',
                'file',
                'mimes:jpg,jpeg,png,webp',
                'max:5120', // 5MB
                'mimetypes:image/jpeg,image/png,image/webp',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'screenshot.required' => 'Please upload a screenshot of your bank transfer.',
            'screenshot.mimes' => 'Screenshot must be JPG, PNG, or WEBP.',
            'screenshot.max' => 'Screenshot must be smaller than 5 MB.',
        ];
    }
}
