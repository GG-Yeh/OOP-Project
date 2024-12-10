document.addEventListener('DOMContentLoaded', () => {
    const apiBaseUrl = 'https://oop-project-w9ul.onrender.com/api/users';
    const userIdInput = document.getElementById('userIdInput');
    const userIdDropdown = document.getElementById('userIdDropdown');
    const deleteUserBtn = document.getElementById('deleteUserBtn');

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
                a.textContent = user.id_number; // user.id 為該用戶ID
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

    // 刪除用戶功能
    deleteUserBtn.addEventListener('click', () => {
        const selectedUserId = userIdInput.value.trim();

        if (!selectedUserId) {
            alert('Please enter a valid user ID!');
            return;
        }

        fetch(`${apiBaseUrl}/${selectedUserId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            alert('User deleted successfully!');
            location.reload(); // 刷新頁面以更新用戶列表
        })
        .catch(error => {
            console.error('Error deleting user:', error);
            alert('Error deleting user');
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
                    document.getElementById('name').value = userDetails.name || '';
                    document.getElementById('id').value = userDetails.id_number || '';
                    document.getElementById('birthday').value = userDetails.birthday || '';
                    document.getElementById('gender').value = userDetails.sex || '';
                    document.getElementById('contact').value = userDetails.contact || '';
                } else {
                    console.error('User details are missing in response:', data);
                    alert('Failed to load user details. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                alert('Error fetching user details. Please check the console for more information.');
                location.reload(); // 刷新頁面以更新用戶列表
            });
    }
});
