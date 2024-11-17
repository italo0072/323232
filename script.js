document.addEventListener('DOMContentLoaded', function() {

    // Registro de usuario
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Obtener valores del formulario de registro
            const nombres = document.getElementById('nombres').value;
            const apellidos = document.getElementById('apellidos').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const genero = document.getElementById('genero').value;

            // Validar si los campos están vacíos
            if (!nombres || !apellidos || !email || !password || !genero) {
                alert('Por favor completa todos los campos.');
                return;
            }

            // Comprobar si ya existe un usuario con ese correo
            if (localStorage.getItem('user_' + email)) {
                alert('Este correo ya está registrado. Por favor, usa otro.');
                return;
            }

            // Crear objeto del usuario
            const user = {
                nombres: nombres,
                apellidos: apellidos,
                email: email,
                password: password,
                genero: genero
            };

            // Guardar usuario en localStorage
            localStorage.setItem('user_' + email, JSON.stringify(user));
            alert('Usuario registrado exitosamente.');
            
            // Redirigir a la página de login
            window.location.href = 'login.html';
        });
    }

    // Inicio de sesión
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Obtener valores del formulario de login
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Validar si los campos están vacíos
            if (!email || !password) {
                alert('Por favor ingresa tu correo y contraseña.');
                return;
            }

            // Obtener el usuario de localStorage
            const storedUser = localStorage.getItem('user_' + email);

            // Si el usuario no existe
            if (!storedUser) {
                alert('El usuario no está registrado.');
                return;
            }

            // Convertir el string almacenado en un objeto
            const user = JSON.parse(storedUser);

            // Verificar contraseña
            if (user.password === password) {
                alert('Bienvenidos ' + user.nombres);
                
                // Guardar el usuario actual como el usuario logueado
                localStorage.setItem('loggedUser', JSON.stringify(user));

                // Redirigir a la página de inicio
                window.location.href = 'index.html';
            } else {
                alert('Correo o contraseña incorrectos.');
            }
        });
    }

    // Mostrar el nombre del usuario logueado en el menú de navegación
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser) {
        const nav = document.querySelector('nav ul');
        const li = document.createElement('li');
        li.textContent = 'Hola, ' + loggedUser.nombres;

        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Cerrar Sesión';
        logoutBtn.style.marginLeft = '10px';
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('loggedUser');
            window.location.href = 'index.html';
        });

        li.appendChild(logoutBtn);
        nav.appendChild(li);
    }
});
