// Registration JavaScript for L2J Mobius Website

// Account Registration Form
document.getElementById('accountForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value;
    const messageDiv = document.getElementById('accountMessage');
    
    // Validation
    if (!validateUsername(username)) {
        showError(messageDiv, 'El usuario debe tener entre 4 y 16 caracteres');
        return;
    }
    
    if (!validatePassword(password)) {
        showError(messageDiv, 'La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    if (password !== confirmPassword) {
        showError(messageDiv, 'Las contraseñas no coinciden');
        return;
    }
    
    if (!validateEmail(email)) {
        showError(messageDiv, 'Email inválido');
        return;
    }
    
    if (!question) {
        showError(messageDiv, 'Selecciona una pregunta de seguridad');
        return;
    }
    
    // Show loading
    showLoading(messageDiv);
    
    // Prepare data for backend
    const accountData = {
        username: username,
        password: password,
        email: email
    };
    
    // Send data to backend
    fetch('api/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccess(messageDiv, 'Cuenta creada exitosamente! Ahora puedes crear tu personaje.');
            document.getElementById('accountForm').reset();
        } else {
            showError(messageDiv, data.message || 'Error al crear la cuenta');
        }
    })
    .catch(error => {
        showError(messageDiv, 'Error de conexión. Por favor intenta más tarde.');
    });
});

// Real-time validation
document.getElementById('username').addEventListener('input', function() {
    const username = this.value;
    const messageDiv = document.getElementById('accountMessage');
    
    if (username.length > 0 && !validateUsername(username)) {
        showInfo(messageDiv, 'El usuario debe tener entre 4 y 16 caracteres');
    } else {
        messageDiv.innerHTML = '';
    }
});

document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const messageDiv = document.getElementById('accountMessage');
    
    if (password.length > 0 && !validatePassword(password)) {
        showInfo(messageDiv, 'La contraseña debe tener al menos 6 caracteres');
    } else {
        messageDiv.innerHTML = '';
    }
});

document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    const messageDiv = document.getElementById('accountMessage');
    
    if (confirmPassword.length > 0 && password !== confirmPassword) {
        showInfo(messageDiv, 'Las contraseñas no coinciden');
    } else {
        messageDiv.innerHTML = '';
    }
});
