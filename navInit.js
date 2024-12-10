document.write(`
    <nav class="navbar bg-dark navbar-dark p-3 navbar-expand-sm">
        <div class="container">
            <a href="/index.html" class="navbar-brand">License System</a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto">

                    <li class="nv-item">
                        <a href="/index.html" class="nav-link">Home</a>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="userNavbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            User
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="userNavbarDropdown">
                            <li><a class="dropdown-item" href="/User/userList.html">User List</a></li>
                            <li> 
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="/User/addUser.html">Add User</a></li>
                            <li><a class="dropdown-item" href="/User/updateUser.html">Update User</a></li>
                            <li><a class="dropdown-item" href="/User/deleteUser.html">Delete User</a></li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="vioNavbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Violation
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="vioNavbarDropdown">
                            <li><a class="dropdown-item" href="/User/violationList.html">Violation List</a></li>
                            <li> 
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="/User/addViolation.html">Add Violation</a></li>
                            <li><a class="dropdown-item" href="/User/updateViolation.html">Update Violation</a></li>
                            <li><a class="dropdown-item" href="/User/deleteViolation.html">Delete Violation</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
`);
