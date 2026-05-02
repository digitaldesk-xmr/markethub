// supabase-config.js deve esistere
const SUPABASE_URL = "https://tuo-progetto.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

async function supabaseFetch(endpoint, options = {}) {
    const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
    const response = await fetch(url, {
        ...options,
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
}

// ==================== UTENTI ==================
async function loadUsers() {
    try {
        return await supabaseFetch('users?select=*');
    } catch (error) {
        console.error("Errore caricamento utenti:", error);
        return [];
    }
}

async function saveUser(user) {
    try {
        const data = await supabaseFetch('users', {
            method: 'POST',
            body: JSON.stringify(user)
        });
        return data[0];
    } catch (error) {
        console.error("Errore salvataggio utente:", error);
        return null;
    }
}

async function checkUserExists(email) {
    const users = await loadUsers();
    return users.find(u => u.email === email);
}

// ==================== ABBONAMENTI ==================
async function loadSubscriptions() {
    try {
        return await supabaseFetch('subscriptions?select=*');
    } catch (error) {
        console.error("Errore caricamento abbonamenti:", error);
        return [];
    }
}

async function saveSubscription(sub) {
    try {
        const data = await supabaseFetch('subscriptions', {
            method: 'POST',
            body: JSON.stringify(sub)
        });
        return data[0];
    } catch (error) {
        console.error("Errore salvataggio abbonamento:", error);
        return null;
    }
}

async function updateSubscription(email, updates) {
    try {
        await supabaseFetch(`subscriptions?email=eq.${email}`, {
            method: 'PATCH',
            body: JSON.stringify(updates)
        });
    } catch (error) {
        console.error("Errore aggiornamento abbonamento:", error);
    }
}

async function deleteSubscription(email) {
    try {
        await supabaseFetch(`subscriptions?email=eq.${email}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error("Errore cancellazione abbonamento:", error);
    }
}

// ==================== REGISTRAZIONE ==================
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
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
            
            const existing = await checkUserExists(email);
            if (existing) {
                messageDiv.innerHTML = 'Email già registrata';
                messageDiv.className = 'alert error';
                return;
            }
            
            const newUser = {
                name: name,
                email: email,
                telegram: telegram,
                password: btoa(password),
                register_date: new Date().toISOString()
            };
            
            await saveUser(newUser);
            
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
async function checkAdminLogin() {
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

async function checkExpiredSubscriptions() {
    const subs = await loadSubscriptions();
    const now = new Date();
    for (const sub of subs) {
        if (new Date(sub.expires_date) < now) {
            await deleteSubscription(sub.email);
        }
    }
}

async function loadAdminData() {
    await checkExpiredSubscriptions();
    
    const users = await loadUsers();
    const subs = await loadSubscriptions();
    const subsMap = {};
    subs.forEach(s => { subsMap[s.email] = s; });
    
    document.getElementById('statUsers').innerText = users.length;
    
    let activeCount = 0;
    let expiringCount = 0;
    const now = new Date();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    
    for (const sub of subs) {
        const expiryDate = new Date(sub.expires_date);
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
    
    for (const user of users) {
        const sub = subsMap[user.email];
        let status = '';
        let statusClass = '';
        let expiryText = '';
        
        if (sub && new Date(sub.expires_date) > now) {
            status = 'Attivo';
            statusClass = 'badge-active';
            expiryText = new Date(sub.expires_date).toLocaleDateString();
        } else if (sub && new Date(sub.expires_date) <= now) {
            status = 'Scaduto';
            statusClass = 'badge-expired';
            expiryText = new Date(sub.expires_date).toLocaleDateString();
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
                <td>${new Date(user.register_date).toLocaleDateString()}</td>
                <td><span class="${statusClass}">${status}</span></td>
                <td>${expiryText}</td>
                <td>
                    <button class="btn-small btn-activate" onclick="activateSubscription('${user.email}')">Attiva (30gg)</button>
                    <button class="btn-small btn-deactivate" onclick="deactivateSubscription('${user.email}')">Disattiva</button>
                </td>
            </tr>
        `;
    }
}

async function activateSubscription(email) {
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 30);
    
    const existingSubs = await loadSubscriptions();
    const existing = existingSubs.find(s => s.email === email);
    
    if (existing) {
        await updateSubscription(email, { expires_date: expiresDate.toISOString() });
    } else {
        await saveSubscription({
            email: email,
            expires_date: expiresDate.toISOString(),
            activated_by: 'admin',
            activated_at: new Date().toISOString()
        });
    }
    
    alert(`Abbonamento attivato per ${email} per 30 giorni`);
    loadAdminData();
}

async function deactivateSubscription(email) {
    await deleteSubscription(email);
    alert(`Abbonamento disattivato per ${email}`);
    loadAdminData();
}

// Inizializzazione admin
if (document.getElementById('adminLogin') && localStorage.getItem('adminLoggedIn') === 'true') {
    document.getElementById('adminLogin').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
    loadAdminData();
}
