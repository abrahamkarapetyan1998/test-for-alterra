<?php

namespace App\Services;

use App\Models\Contact;

class ContactService
{
    public function addContact($data)
    {
        return Contact::create($data);
    }

    public function deleteContact($id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return false;
        }

        $contact->delete();
        return true;
    }
}
