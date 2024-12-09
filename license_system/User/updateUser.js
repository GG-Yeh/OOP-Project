document.addEventListener('DOMContentLoaded', () => {
    const apiBaseUrl = 'http://127.0.0.1:5000/api/users';
    const userIdInput = document.getElementById('userIdInput');
    const userIdDropdown = document.getElementById('userIdDropdown');
    const updateUserBtn = document.getElementById('updateUserBtn');

    const userNameField = document.getElementById('name');
    const userIdField = document.getElementById('id');
    const userBirthdayField = document.getElementById('birthday');
    const userGenderField = document.getElementById('gender');
    const userContactField = document.getElementById('contact');

    // 載入所有用戶ID到下拉選單
    fetch(apiBaseUrl)
        .then(response => response.json())
        .then(users => {
            userIdDropdown.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.className = 'dropdown-item';
                a.href = '#';
                a.textContent = user.id_number; // 假設後端返回的ID屬性為id_number
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    userIdInput.value = user.id_number;
                    loadUserDetails(user.id_number);
                });
                li.appendChild(a);
                userIdDropdown.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error loading users:', error);
            userIdDropdown.innerHTML = '<li><a class="dropdown-item disabled" href="#">Error loading users</a></li>';
        });

    // 當使用者在文字框中輸入ID並按下 Enter 時，也嘗試載入該用戶資料
    userIdInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const enteredId = userIdInput.value.trim();
            if (enteredId) {
                loadUserDetails(enteredId);
            }
        }
    });

    // 更新用戶功能
    updateUserBtn.addEventListener('click', () => {
        const selectedUserId = userIdInput.value.trim();

        if (!selectedUserId) {
            alert('Please enter a valid user ID!');
            return;
        }

        // 從欄位取得更新後的資料
        const updatedData = {
            name: userNameField.value.trim(),
            id_number: userIdField.value.trim(),
            birthday: userBirthdayField.value.trim(),
            sex: userGenderField.value.trim(),
            contact: userContactField.value.trim()
        };

        fetch(`${apiBaseUrl}/${selectedUserId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            return response.json();
        })
        .then(data => {
            alert('User updated successfully!');
            console.log('Update response:', data);
            // 如需刷新列表可重新呼叫取得列表的函式或直接location.reload()
            // location.reload();
        })
        .catch(error => {
            console.error('Error updating user:', error);
            alert('Error updating user');
        });
    });

    // 載入用戶詳細資料的函式
    function loadUserDetails(userId) {
        fetch(`${apiBaseUrl}/${userId}/details`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch user details. Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const userDetails = data.user;
                if (userDetails) {
                    userNameField.value = userDetails.name || '';
                    userIdField.value = userDetails.id_number || '';
                    userBirthdayField.value = userDetails.birthday || '';
                    userGenderField.value = userDetails.sex || '';
                    userContactField.value = userDetails.contact || '';
                } else {
                    console.error('User details are missing in response:', data);
                    alert('Failed to load user details. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                alert('Error fetching user details. Please check the console for more information.');
            });
    }
});
