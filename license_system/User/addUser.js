// addUser.js: Handles user addition functionality

document.addEventListener('DOMContentLoaded', () => {
    const addUserBtn = document.getElementById('addUserBtn');

    if (addUserBtn) {
        addUserBtn.addEventListener('click', () => {
            const userData = {
                birthday: document.getElementById('birthday').value.trim(),
                contact: document.getElementById('contact').value.trim(),
                id_number: document.getElementById('id').value.trim(),
                name: document.getElementById('name').value.trim(),
                sex: document.getElementById('gender').value.trim()
            };

            // Validate form inputs
            if (!userData.id_number || !userData.name || !userData.birthday || !userData.sex || !userData.contact) {
                alert('Please fill out all fields!');
                return;
            }

            // Send data to the backend
            fetch('http://127.0.0.1:10000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add user!');
                }
                return response.json();
            })
            .then(data => {
                alert('User added successfully!');
                console.log(data);
                // Optionally, reset the form after successful submission
                resetForm();
            })
            .catch(error => {
                alert('Error adding user!');
                console.error(error);
            });
        });
    }
});

// Reset form fields
function resetForm() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('birthday').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('contact').value = '';
}
