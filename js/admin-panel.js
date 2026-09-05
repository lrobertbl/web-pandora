// Admin Panel JavaScript for L2J Mobius Website

// Admin Login
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const messageDiv = document.getElementById('loginMessage');
    
    // Show loading
    showLoading(messageDiv);
    
    // Prepare login data
    const loginData = {
        username: username,
        password: password
    };
    
    // Here you would authenticate with your backend
    console.log('Admin login data:', loginData);
    
    // Simulate API call
    setTimeout(() => {
        // This would be your actual authentication
        // fetch('/api/admin/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(loginData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         // Store session
        //         localStorage.setItem('adminToken', data.token);
        //         localStorage.setItem('adminUsername', username);
        //         
        //         // Show dashboard
        //         document.getElementById('loginSection').style.display = 'none';
        //         document.getElementById('adminDashboard').style.display = 'block';
        //         
        //         // Load dashboard data
        //         loadDashboardData();
        //         
        //         showSuccess(messageDiv, 'Bienvenido al panel de administración');
        //     } else {
        //         showError(messageDiv, data.message || 'Credenciales inválidas');
        //     }
        // })
        // .catch(error => {
        //     showError(messageDiv, 'Error de conexión. Por favor intenta más tarde.');
        // });
        
        // Simulation - accept any login for demo
        localStorage.setItem('adminToken', 'demo-token');
        localStorage.setItem('adminUsername', username);
        
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        
        loadDashboardData();
        showSuccess(messageDiv, 'Bienvenido al panel de administración');
    }, 1500);
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
    
    document.getElementById('adminLoginForm').reset();
    document.getElementById('loginMessage').innerHTML = '';
});

// Tab Navigation
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Hide all tab panes
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        // Show selected tab pane
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId + 'Tab').classList.add('active');
        
        // Load data for the selected tab
        loadTabData(tabId);
    });
});

// Load Dashboard Data
function loadDashboardData() {
    loadTabData('accounts');
    loadTabData('characters');
    loadTabData('stats');
}

// Load Tab Data
function loadTabData(tab) {
    switch(tab) {
        case 'accounts':
            loadAccounts();
            break;
        case 'characters':
            loadCharacters();
            break;
        case 'stats':
            loadStats();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// Load Accounts
function loadAccounts() {
    const tbody = document.getElementById('accountsTableBody');
    
    // Here you would fetch accounts from your backend
    // fetch('/api/admin/accounts', {
    //     headers: {
    //         'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
    //     }
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.success) {
    //         renderAccounts(data.accounts);
    //     }
    // });
    
    // Simulation
    const accounts = [
        { id: 1, username: 'player1', email: 'player1@email.com', status: 'active' },
        { id: 2, username: 'player2', email: 'player2@email.com', status: 'active' },
        { id: 3, username: 'player3', email: 'player3@email.com', status: 'banned' },
        { id: 4, username: 'player4', email: 'player4@email.com', status: 'active' },
        { id: 5, username: 'player5', email: 'player5@email.com', status: 'active' }
    ];
    
    renderAccounts(accounts);
}

function renderAccounts(accounts) {
    const tbody = document.getElementById('accountsTableBody');
    tbody.innerHTML = '';
    
    accounts.forEach(account => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${account.id}</td>
            <td>${account.username}</td>
            <td>${account.email}</td>
            <td><span class="status-${account.status}">${account.status}</span></td>
            <td>
                <button class="btn-action btn-edit" onclick="editAccount(${account.id})">Editar</button>
                <button class="btn-action btn-ban" onclick="banAccount(${account.id})">Ban</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load Characters
function loadCharacters() {
    const tbody = document.getElementById('charactersTableBody');
    
    // Here you would fetch characters from your backend
    // fetch('/api/admin/characters', {
    //     headers: {
    //         'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
    //     }
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.success) {
    //         renderCharacters(data.characters);
    //     }
    // });
    
    // Simulation
    const characters = [
        { id: 1, name: 'DemonSlayer', level: 80, class: 'Duelist', race: 'Human' },
        { id: 2, name: 'NightMare', level: 80, class: 'Adventurer', race: 'Human' },
        { id: 3, name: 'DarkAngel', level: 80, class: 'Spellsinger', race: 'Dark Elf' },
        { id: 4, name: 'GhostRider', level: 79, class: 'Phoenix Knight', race: 'Human' },
        { id: 5, name: 'BladeMaster', level: 79, class: 'Destroyer', race: 'Human' }
    ];
    
    renderCharacters(characters);
}

function renderCharacters(characters) {
    const tbody = document.getElementById('charactersTableBody');
    tbody.innerHTML = '';
    
    characters.forEach(char => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${char.id}</td>
            <td>${char.name}</td>
            <td>${char.level}</td>
            <td>${char.class}</td>
            <td>${char.race}</td>
            <td>
                <button class="btn-action btn-view" onclick="viewCharacter(${char.id})">Ver</button>
                <button class="btn-action btn-edit" onclick="editCharacter(${char.id})">Editar</button>
                <button class="btn-action btn-delete" onclick="deleteCharacter(${char.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load Stats
function loadStats() {
    // Here you would fetch stats from your backend
    // fetch('/api/admin/stats', {
    //     headers: {
    //         'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
    //     }
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.success) {
    //         document.getElementById('totalAccounts').textContent = data.totalAccounts;
    //         document.getElementById('totalCharacters').textContent = data.totalCharacters;
    //         document.getElementById('onlinePlayers').textContent = data.onlinePlayers;
    //         document.getElementById('avgLevel').textContent = data.avgLevel;
    //     }
    // });
    
    // Simulation
    document.getElementById('totalAccounts').textContent = '156';
    document.getElementById('totalCharacters').textContent = '234';
    document.getElementById('onlinePlayers').textContent = '127';
    document.getElementById('avgLevel').textContent = '72';
}

// Load Settings
function loadSettings() {
    // Here you would fetch settings from your backend
    // fetch('/api/admin/settings', {
    //     headers: {
    //         'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
    //     }
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.success) {
    //         document.getElementById('serverName').value = data.settings.serverName;
    //         document.getElementById('maxAccounts').value = data.settings.maxAccounts;
    //         document.getElementById('maxChars').value = data.settings.maxChars;
    //         document.getElementById('regEnabled').value = data.settings.regEnabled;
    //     }
    // });
    
    // Simulation - set default values
    document.getElementById('serverName').value = 'L2J Mobius';
    document.getElementById('maxAccounts').value = '5';
    document.getElementById('maxChars').value = '7';
    document.getElementById('regEnabled').value = 'true';
}

// Settings Form
document.getElementById('settingsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const settings = {
        serverName: document.getElementById('serverName').value,
        maxAccounts: document.getElementById('maxAccounts').value,
        maxChars: document.getElementById('maxChars').value,
        regEnabled: document.getElementById('regEnabled').value
    };
    
    // Here you would save settings to your backend
    console.log('Settings to save:', settings);
    
    // Simulation
    alert('Configuración guardada exitosamente');
});

// Account Actions
function editAccount(accountId) {
    console.log('Edit account:', accountId);
    // Here you would open an edit modal or redirect to edit page
}

function banAccount(accountId) {
    if (confirm('¿Estás seguro de banear esta cuenta?')) {
        console.log('Ban account:', accountId);
        // Here you would send ban request to backend
    }
}

// Character Actions
function viewCharacter(charId) {
    console.log('View character:', charId);
    // Here you would show character details
}

function editCharacter(charId) {
    console.log('Edit character:', charId);
    // Here you would open an edit modal
}

function deleteCharacter(charId) {
    if (confirm('¿Estás seguro de eliminar este personaje?')) {
        console.log('Delete character:', charId);
        // Here you would send delete request to backend
    }
}

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('adminToken');
    if (token) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        loadDashboardData();
    }
});
