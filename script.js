const API_BASE = '/api';

async function callApi(endpoint, method, body = null) {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
    });
    return res.json();
}

// ==================== APERTURA MODALI ====================
function openRegisterModal() {
    document.getElementById('registerModal').style.display = 'flex';
}
function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
}
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}
function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Collega i pulsanti navbar
document.getElementById('openRegisterModalLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    openRegisterModal();
});
document.getElementById('openLoginModalLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    openLoginModal();
});

// Chiudi modali cliccando fuori
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// ==================== REGISTRAZIONE ==================
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const telegram = document.getElementById('regTelegram').value;
        const pwd = document.getElementById('regPassword').value;
        const confirm = document.getElementById('regConfirmPassword').value;
        const msgDiv = document.getElementById('registerMessage');
        
        if (pwd !== confirm) {
            msgDiv.innerHTML = 'Le password non coincidono';
            msgDiv.className = 'alert error';
            return;
        }
        
        const data = await callApi('auth/register', 'POST', { name, email, telegram, password: pwd });
        if (data.error) {
            msgDiv.innerHTML = data.error;
            msgDiv.className = 'alert error';
        } else {
            msgDiv.innerHTML = '✅ Registrato! Attendi attivazione admin.';
            msgDiv.className = 'alert success';
            document.getElementById('registerForm').reset();
            setTimeout(() => {
                closeRegisterModal();
                openLoginModal();
            }, 2000);
        }
    });
}

// ==================== LOGIN ==================
async function loginUser(email, password) {
    const data = await callApi('auth/login', 'POST', { email, password });
    if (data.user) {
        localStorage.setItem('loggedInUser', JSON.stringify(data.user));
        return true;
    }
    return false;
}

if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const pwd = document.getElementById('loginPassword').value;
        const msgDiv = document.getElementById('loginMessage');
        
        const ok = await loginUser(email, pwd);
        if (ok) {
            msgDiv.innerHTML = 'Login effettuato! Reindirizzamento...';
            msgDiv.className = 'alert success';
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            msgDiv.innerHTML = 'Email o password errati';
            msgDiv.className = 'alert error';
        }
    });
}

// ==================== LOGOUT ==================
window.logout = function() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
};

// ==================== RECUPERO PASSWORD ==================
if (document.getElementById('forgotPasswordLink')) {
    document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
        e.preventDefault();
        closeLoginModal();
        document.getElementById('forgotPasswordModal').style.display = 'flex';
    });
}

window.sendResetPassword = async function() {
    const email = document.getElementById('resetEmail').value;
    const msgDiv = document.getElementById('resetMessage');
    
    if (!email) {
        msgDiv.innerHTML = '<span style="color:#f87171;">Inserisci email</span>';
        return;
    }
    
    const data = await callApi('password/reset', 'POST', { email });
    if (data.success) {
        msgDiv.innerHTML = '<span style="color:#4ade80;">✅ Nuova password inviata</span>';
        setTimeout(() => closeForgotModal(), 2000);
    } else {
        msgDiv.innerHTML = '<span style="color:#f87171;">Email non trovata</span>';
    }
};

window.closeForgotModal = function() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
    document.getElementById('resetEmail').value = '';
    document.getElementById('resetMessage').innerHTML = '';
};

// ==================== DASHBOARD ==================
async function loadDashboard() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('userName').innerText = user.name;
    document.getElementById('userEmail').innerText = user.email;
    document.getElementById('userTelegram').innerText = user.telegram;
    
    const data = await callApi(`user/getUser?email=${encodeURIComponent(user.email)}`, 'GET');
    const sub = data.subscription;
    const statusDiv = document.getElementById('subscriptionStatus');
    const expiryDiv = document.getElementById('subscriptionExpiry');
    const btnDiv = document.getElementById('subscriptionButton');
    
    if (sub.active) {
        const expiry = new Date(sub.expires);
        const daysLeft = Math.ceil((expiry - new Date()) / (86400000));
        statusDiv.innerHTML = '<span class="badge-active">✅ ATTIVO</span>';
        expiryDiv.innerHTML = `Scade tra ${daysLeft} giorni (${expiry.toLocaleDateString()})`;
        btnDiv.innerHTML = `<a href="https://nowpayments.io/payment/?iid=5949538024" target="_blank" class="btn btn-primary">🔄 Rinnova</a>`;
    } else {
        statusDiv.innerHTML = '<span class="badge-inactive">❌ NON ATTIVO</span>';
        expiryDiv.innerHTML = 'Nessun abbonamento attivo';
        btnDiv.innerHTML = `<a href="https://nowpayments.io/payment/?iid=5949538024" target="_blank" class="btn btn-primary">💎 Attiva €9,90</a>`;
    }
}

if (window.location.pathname.includes('dashboard.html')) {
    loadDashboard();
}

// ==================== UPLOAD PRODOTTO ==================
async function checkSubscription() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) return false;
    const data = await callApi(`user/getUser?email=${encodeURIComponent(user.email)}`, 'GET');
    return data.subscription.active;
}

function setupUploadForm() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('displayEmail').innerText = user.email;
    document.getElementById('displayTelegram').innerText = user.telegram;
    
    checkSubscription().then(active => {
        const warning = document.getElementById('subscriptionWarning');
        const form = document.getElementById('uploadProductForm');
        if (active) {
            warning.style.display = 'none';
            form.style.display = 'block';
        } else {
            warning.style.display = 'block';
            form.style.display = 'none';
        }
    });
    
    const fileInput = document.getElementById('productImageFile');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const preview = document.getElementById('imagePreview');
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = ev => preview.innerHTML = `<img src="${ev.target.result}" style="max-width:200px;border-radius:12px;">`;
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    
    const form = document.getElementById('uploadProductForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const file = document.getElementById('productImageFile').files[0];
            let imageData = null;
            if (file) {
                imageData = await new Promise(resolve => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            }
            
            const productData = {
                name: document.getElementById('productName').value,
                description: document.getElementById('productDescription').value,
                price: parseFloat(document.getElementById('productPrice').value),
                category: document.getElementById('productCategory').value,
                condition: document.getElementById('productCondition').value,
                quantity: parseInt(document.getElementById('productQuantity').value),
                shippingFrom: document.getElementById('productShippingFrom').value,
                shippingCost: parseFloat(document.getElementById('productShippingCost').value),
                sellerName: user.name,
                sellerEmail: user.email,
                sellerTelegram: user.telegram
            };
            
            const result = await callApi('product/notify', 'POST', { productData, imageBase64: imageData });
            const msgDiv = document.getElementById('uploadMessage');
            
            if (result && result.success) {
                msgDiv.innerHTML = '✅ Annuncio inviato! Verrà pubblicato a breve.';
                msgDiv.className = 'alert success';
                form.reset();
                document.getElementById('imagePreview').innerHTML = '';
            } else {
                msgDiv.innerHTML = '❌ Errore nell\'invio. Riprova.';
                msgDiv.className = 'alert error';
            }
        });
    }
}

if (window.location.pathname.includes('upload-product.html')) {
    setupUploadForm();
}

// ==================== MY PRODUCTS ==================
async function loadMyProducts() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    const products = await callApi(`user/myProducts?email=${encodeURIComponent(user.email)}`, 'GET');
    const container = document.getElementById('myProductsList');
    const noMsg = document.getElementById('noProductsMessage');
    
    if (!products || products.length === 0) {
        if (noMsg) noMsg.style.display = 'block';
        if (container) container.innerHTML = '';
        return;
    }
    
    if (noMsg) noMsg.style.display = 'none';
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="product-image">${p.image_url ? `<img src="${p.image_url}">` : '📦'}</div>
            <div class="product-info">
                <div class="product-title">${p.name}</div>
                <div class="product-price">€${p.price}</div>
            </div>
        </div>
    `).join('');
}

if (window.location.pathname.includes('my-products.html')) {
    loadMyProducts();
}

// ==================== ADMIN PANEL ==================
async function loadAdminData(adminSecret) {
    const users = await fetch('/api/admin/getUsers', {
        headers: { 'Authorization': `Bearer ${adminSecret}` }
    }).then(r => r.json());
    
    const subs = await fetch('/api/admin/getSubscriptions', {
        headers: { 'Authorization': `Bearer ${adminSecret}` }
    }).then(r => r.json());
    
    document.getElementById('statUsers').innerText = users.length;
    
    const activeCount = subs.filter(s => new Date(s.expires_date) > new Date()).length;
    const expiringCount = subs.filter(s => {
        const diff = new Date(s.expires_date) - new Date();
        return diff > 0 && diff < 7 * 86400000;
    }).length;
    
    document.getElementById('statActive').innerText = activeCount;
    document.getElementById('statExpiring').innerText = expiringCount;
    
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    for (const user of users) {
        const sub = subs.find(s => s.email === user.email);
        let status = 'Inattivo';
        let statusClass = 'badge-inactive';
        let expiryText = 'Mai attivato';
        
        if (sub && new Date(sub.expires_date) > new Date()) {
            status = 'Attivo';
            statusClass = 'badge-active';
            expiryText = new Date(sub.expires_date).toLocaleDateString();
        } else if (sub && new Date(sub.expires_date) <= new Date()) {
            status = 'Scaduto';
            statusClass = 'badge-expired';
            expiryText = new Date(sub.expires_date).toLocaleDateString();
        }
        
        tbody.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.telegram}</td>
                <td>${new Date(user.register_date).toLocaleDateString()}</td>
                <td><span class="${statusClass}">${status}</span></td>
                <td>${expiryText}</td>
                <td>
                    <button class="btn-small btn-activate" onclick="activateSubscriptionAdmin('${user.email}')">Attiva 30gg</button>
                    <button class="btn-small btn-deactivate" onclick="deactivateSubscriptionAdmin('${user.email}')">Disattiva</button>
                </td>
            </tr>
        `;
    }
}

window.checkAdminLogin = async function() {
    const pwd = document.getElementById('adminPassword').value;
    if (pwd === 'admin123') {
        const adminSecret = prompt('Inserisci la chiave admin:');
        if (!adminSecret) return;
        localStorage.setItem('adminSecret', adminSecret);
        document.getElementById('adminLogin').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        await loadAdminData(adminSecret);
    } else {
        alert('Password errata');
    }
};

window.logoutAdmin = function() {
    localStorage.removeItem('adminSecret');
    window.location.href = 'index.html';
};

window.activateSubscriptionAdmin = async (email) => {
    const adminSecret = localStorage.getItem('adminSecret');
    if (!adminSecret) return;
    await fetch('/api/admin/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminSecret}` },
        body: JSON.stringify({ email })
    });
    await loadAdminData(adminSecret);
};

window.deactivateSubscriptionAdmin = async (email) => {
    const adminSecret = localStorage.getItem('adminSecret');
    if (!adminSecret) return;
    await fetch('/api/admin/deactivate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminSecret}` },
        body: JSON.stringify({ email })
    });
    await loadAdminData(adminSecret);
};

if (document.getElementById('adminLogin') && localStorage.getItem('adminSecret')) {
    document.getElementById('adminLogin').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
    loadAdminData(localStorage.getItem('adminSecret'));
}

// ==================== COOKIE BANNER ==================
function checkCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        const banner = document.getElementById('cookieBanner');
        if (banner) banner.style.display = 'flex';
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
}

const acceptBtn = document.getElementById('acceptCookies');
if (acceptBtn) acceptBtn.addEventListener('click', acceptCookies);
checkCookieConsent();
