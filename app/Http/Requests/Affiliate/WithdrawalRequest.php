<?php

namespace App\Http\Requests\Affiliate;

use Illuminate\Foundation\Http\FormRequest;

class WithdrawalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $min = (float) config('cnm.affiliate.min_withdrawal', 1000);

        return [
            'amount' => ['required', 'numeric', "min:{$min}"],
            'method' => ['required', 'in:bank,jazzcash,easypaisa'],
            'account_title' => ['required', 'string', 'max:120'],
            'account_number' => ['required', 'string', 'max:60'],
            'bank_name' => ['nullable', 'string', 'max:80', 'required_if:method,bank'],
        ];
    }

    public function messages(): array
    {
        return [
            'amount.min' => 'Minimum withdrawal is PKR '.number_format((float) config('cnm.affiliate.min_withdrawal', 1000)),
        ];
    }
}
