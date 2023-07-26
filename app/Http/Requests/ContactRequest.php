<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ContactRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'phone_number' => 'min:8|required|numeric',
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Поле Имя Не Может Быть Пустым.',
            'name.max' => 'Максимум Число Не Должно Превышать 255.',
            'phone_number.required' => 'Поле Телефон Не Может Быть Пустым.',
            'phone_number.numeric' => 'Поле Телефон Должно Состоять Из Цифер.',
            'phone_number.min' => 'Минимум Число Цифер Для Поле Телефон Должно Быть 8.',
            'phone_number.max' => 'Максимум Число Цифер Для Поле Телефон Должно Быть 15.'
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        if ($this->expectsJson()) {
            throw new HttpResponseException(
                response()->json($validator->errors(), 422)
            );
        }

        parent::failedValidation($validator);
    }
}
