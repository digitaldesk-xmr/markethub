// ==================== GESTIONE UTENTI ==================
function loadUsers() {
    const users = localStorage.getItem('markethubUsers');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('markethubUsers', JSON.stringify(users));
}

function loadSubscriptions() {
    const subs = localStorage.getItem('markethubSubscriptions');
    return subs ? JSON.parse(subs) : {};
}

function saveSubscriptions(subs) {
    localStorage.setItem('markethubSubscriptions', JSON.stringify(subs));
}

// ==================== REGISTRAZIONE ==================
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const telegram = document.getElementById('regTelegram').value;
            const password = document.getElementById('regPassword').value;
            const confirm = document.getElementById('regConfirmPassword').value;
            const messageDiv = document.getElementById('registerMessage');
            
            if (password !== confirm) {
                messageDiv.innerHTML = 'Le password non coincidono';
                messageDiv.className = 'alert error';
                return;
            }
            
            let users = loadUsers();
            if (users.find(u => u.email === email)) {
                messageDiv.innerHTML = 'Email già registrata';
                messageDiv.className = 'alert error';
                return;
            }
            
            const newUser = {
                id: Date.now(),
                name: name,
                email: email,
                telegram: telegram,
                password: btoa(password),
                registerDate: new Date().toISOString()
            };
            
            users.push(newUser);
            saveUsers(users);
            
            messageDiv.innerHTML = '✅ Registrazione completata! Attendi che l\'admin attivi il tuo abbonamento.';
            messageDiv.className = 'alert success';
            registerForm.reset();
            
            setTimeout(() => {
                messageDiv.style.display = 'none';
                messageDiv.className = 'alert';
            }, 5000);
        });
    }
});

// ==================== ADMIN PANEL ==================
function checkAdminLogin() {
    const pwd = document.getElementById('adminPassword').value;
    if (pwd === 'admin123') {
        localStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('adminLogin').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        loadAdminData();
    } else {
        alert('Password errata');
    }
}

function logoutAdmin() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'index.html';
}

function checkExpiredSubscriptions() {
    const subs = loadSubscriptions();
    const now = new Date();
    let changed = false;
    
    for (const [email, data] of Object.entries(subs)) {
        if (new Date(data.expiresDate) < now) {
            delete subs[email];
            changed = true;
        }
    }
    
    if (changed) {
        saveSubscriptions(subs);
    }
}

function loadAdminData() {
    checkExpiredSubscriptions();
    
    const users = loadUsers();
    const subs = loadSubscriptions();
    
    document.getElementById('statUsers').innerText = users.length;
    
    let activeCount = 0;
    let expiringCount = 0;
    const now = new Date();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    
    for (const [email, data] of Object.entries(subs)) {
        const expiryDate = new Date(data.expiresDate);
        if (expiryDate > now) {
            activeCount++;
            if (expiryDate - now < sevenDays) {
                expiringCount++;
            }
        }
    }
    
    document.getElementById('statActive').innerText = activeCount;
    document.getElementById('statExpiring').innerText = expiringCount;
    
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const sub = subs[user.email];
        const nowDate = new Date();
        let status = '';
        let statusClass = '';
        let expiryText = '';
        let expiryDate = null;
        
        if (sub && new Date(sub.expiresDate) > nowDate) {
            expiryDate = new Date(sub.expiresDate);
            status = 'Attivo';
            statusClass = 'badge-active';
            expiryText = expiryDate.toLocaleDateString() + ' ' + expiryDate.toLocaleTimeString();
        } else if (sub && new Date(sub.expiresDate) <= nowDate) {
            status = 'Scaduto';
            statusClass = 'badge-expired';
            expiryText = new Date(sub.expiresDate).toLocaleDateString();
        } else {
            status = 'Inattivo';
            statusClass = 'badge-inactive';
            expiryText = 'Mai attivato';
        }
        
        tbody.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.telegram || '-'}</td>
                <td>${new Date(user.registerDate).toLocaleDateString()}</td>
                <td><span class="${statusClass}">${status}</span></td>
                <td>${expiryText}</td>
                <td>
                    <button class="btn-small btn-activate" onclick="activateSubscription('${user.email}')">Attiva (30gg)</button>
                    <button class="btn-small btn-deactivate" onclick="deactivateSubscription('${user.email}')">Disattiva</button>
                </td>
            </tr>
        `;
    });
}

function activateSubscription(email) {
    const subs = loadSubscriptions();
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 30);
    
    subs[email] = {
        expiresDate: expiresDate.toISOString(),
        activatedBy: 'admin',
        activatedAt: new Date().toISOString()
    };
    
    saveSubscriptions(subs);
    alert(`Abbonamento attivato per ${email} per 30 giorni`);
    loadAdminData();
}

function deactivateSubscription(email) {
    const subs = loadSubscriptions();
    delete subs[email];
    saveSubscriptions(subs);
    alert(`Abbonamento disattivato per ${email}`);
    loadAdminData();
}

// Controlla se admin è già loggato
if (document.getElementById('adminLogin') && localStorage.getItem('adminLoggedIn') === 'true') {
    document.getElementById('adminLogin').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
    loadAdminData();
}

// Controllo automatico scadenze all'avvio (per pulizia)
checkExpiredSubscriptions();
