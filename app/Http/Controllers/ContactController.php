<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ContactRequest;
use App\Services\ContactService;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    protected $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }

    public function store(ContactRequest $request)
    {
        try {
            $data = $request->validated();
            $contact = $this->contactService->addContact($data);

            return response()->json(['message' => 'Contact added successfully', 'contact' => $contact]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    public function delete($id)
    {
        $result = $this->contactService->deleteContact($id);
        if (!$result) {
            return response()->json(['message' => 'Contact not found'], 404);
        }

        return response()->json(['message' => 'Contact deleted successfully']);
    }

}
