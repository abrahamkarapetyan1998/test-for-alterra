function addContact() {
    const name = $('#name').val();
    const phone = $('#phone').val();

    $.ajax({
        url: '/api/contacts',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: JSON.stringify({name, phone_number: phone}),
        dataType: 'json',
        success: function (data) {
            const contactsList = $('.contacts_list');
            const errorMessageDiv = $('.error_message');
            errorMessageDiv.empty();

            const contactDiv = $('<div>').addClass('contact_container');
            contactDiv.attr('data-contact-id', data.contact.id);

            const nameDiv = $('<div>').addClass('contact_name').attr('data-contact-id', data.contact.id);
            const nameText = $('<span>').text(name);
            const deleteIcon = $('<span>').addClass('delete_contact').text('❌');
            deleteIcon.on('click', function () {
                deleteContact(data.contact.id);
            });

            nameText.append(deleteIcon);
            nameDiv.append(nameText);
            contactDiv.append(nameDiv);

            const phoneDiv = $('<div>').addClass('contact_phone').text(phone);
            contactDiv.append(phoneDiv);

            contactsList.append(contactDiv);

            $('#name').val('');
            $('#phone').val('');

            alert(data.message);
        },
        error: function(xhr) {
            const errorMessageDiv = $('.error_message');
            errorMessageDiv.empty();
            if (xhr.responseJSON) {
                const errors = xhr.responseJSON;
                let errorMessage = '';

                for (const field in errors) {
                    if (errors.hasOwnProperty(field)) {
                        const fieldErrors = errors[field];
                        fieldErrors.forEach(error => {
                            errorMessage += error + '<br>'; // Use <br> to display each error message on a new line
                        });
                    }
                }

                errorMessageDiv.html(errorMessage);
            } else {
                console.error('Error:', xhr);
            }
        }
    });
}
function deleteContact(id) {
    $.ajax({
        url: '/api/contacts/' + encodeURIComponent(id),
        type: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (data) {
            $('.contacts_list').find(`[data-contact-id="${id}"]`).remove();
            alert(data.message);
        },
    });
}

$('.contacts_list').on('click', '.delete_contact', function () {
    const contactId = $(this).closest('.contact_container').data('contact-id');
    deleteContact(contactId);
});
