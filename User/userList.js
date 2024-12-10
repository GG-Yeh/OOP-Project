// userList.js

document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();
});

/**
 * Fetch users from the backend API
 */
function fetchUsers() {
    fetch('http://127.0.0.1:10000/api/users')  // Adjust the URL if the backend is hosted elsewhere
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayUsers(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            alert('Unable to fetch user data.');
        });
}

/**
 * Display the list of users on the page
 * @param {Array} users - Array of user objects
 */
function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear existing list

    users.forEach(user => {
        const ul = document.createElement('ul');
        ul.className = 'list-group list-group-horizontal';

        ul.innerHTML = `
            <li class="list-group-item col-2">${user.id_number}</li>
            <li class="list-group-item col-3">${user.name}</li>
            <li class="list-group-item col-1">${user.sex}</li>
            <li class="list-group-item col-3">${user.birthday}</li>
            <li class="list-group-item col-3">${user.contact}</li>
        `;
        userList.appendChild(ul);
    });
}