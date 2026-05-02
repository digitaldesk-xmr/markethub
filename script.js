// ==================== SUPABASE CONFIG ==================
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
        return await supabaseFetch('users', { method: 'POST', body: JSON.stringify(user) });
    } catch (error) {
        console.error("Errore salvataggio utente:", error);
        return null;
    }
}

async function updateUser(email, updates) {
    try {
        return await supabaseFetch(`users?email=eq.${email}`, { method: 'PATCH', body: JSON.stringify(updates) });
    } catch (error) {
        console.error("Errore aggiornamento utente:", error);
        return null;
    }
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
        return await supabaseFetch('subscriptions', { method: 'POST', body: JSON.stringify(sub) });
    } catch (error) {
        console.error("Errore salvataggio abbonamento:", error);
        return null;
    }
}

async function deleteSubscription(email) {
    try {
        await supabaseFetch(`subscriptions?email=eq.${email}`, { method: 'DELETE' });
    } catch (error) {
        console.error("Errore cancellazione abbonamento:", error);
    }
}

// ==================== EMAILJS CONFIG ==================
const EMAILJS_SERVICE_ID = "service_xxxxxx";
const EMAILJS_TEMPLATE_ID = "template_xxxxxx";
const EMAILJS_RESET_TEMPLATE_ID = "template_reset_password";

async function sendProductNotification(productData, imageBase64) {
    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            product_name: productData.name,
            product_description: productData.description,
            product_price: productData.price,
            product_category: productData.category,
            product_condition: productData.condition,
            product_quantity: productData.quantity,
            shipping_from: productData.shippingFrom,
            shipping_cost: productData.shippingCost,
            seller_name: productData.sellerName,
            seller_email: productData.sellerEmail,
            seller_telegram: productData.sellerTelegram,
            product_image: imageBase64 || "Nessuna immagine"
        });
        return true;
    } catch (error) {
        console.error("EmailJS error:", error);
        return false;
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
            
            const users = await loadUsers();
            if (users.find(u => u.email === email)) {
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

// ==================== LOGIN ==================
async function loginUser(email, password) {
    const users = await loadUsers();
    const user = users.find(u => u.email === email && u.password === btoa(password));
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        return user;
    }
    return null;
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const messageDiv = document.getElementById('loginMessage');
        
        const user = await loginUser(email, password);
        if (user) {
            messageDiv.innerHTML = 'Login effettuato! Reindirizzamento...';
            messageDiv.className = 'alert success';
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            messageDiv.innerHTML = 'Email o password errati';
            messageDiv.className = 'alert error';
        }
    });
}

// ==================== RECUPERO PASSWORD ==================
function generateRandomPassword(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

async function sendResetPasswordEmail(email, newPassword) {
    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_RESET_TEMPLATE_ID, {
            to_email: email,
            new_password: newPassword
        });
        return true;
    } catch (error) {
        console.error("Errore invio reset password:", error);
        return false;
    }
}

async function sendResetPassword() {
    const email = document.getElementById('resetEmail').value;
    const messageDiv = document.getElementById('resetMessage');
    
    if (!email) {
        messageDiv.innerHTML = '<span style="color:#f87171;">Inserisci la tua email</span>';
        return;
    }
    
    const users = await loadUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
        messageDiv.innerHTML = '<span style="color:#f87171;">Nessun account trovato con questa email</span>';
        return;
    }
    
    const newPassword = generateRandomPassword(10);
    await updateUser(email, { password: btoa(newPassword) });
    
    const sent = await sendResetPasswordEmail(email, newPassword);
    
    if (sent) {
        messageDiv.innerHTML = '<span style="color:#4ade80;">✅ Nuova password inviata alla tua email</span>';
        setTimeout(() => {
            closeForgotModal();
        }, 3000);
    } else {
        messageDiv.innerHTML = '<span style="color:#f87171;">❌ Errore nell\'invio. Riprova più tardi.</span>';
    }
}

function showForgotModal() {
    document.getElementById('forgotPasswordModal').style.display = 'flex';
}

function closeForgotModal() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
    document.getElementById('resetEmail').value = '';
    document.getElementById('resetMessage').innerHTML = '';
}

if (document.getElementById('forgotPasswordLink')) {
    document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
        e.preventDefault();
        showForgotModal();
    });
}

// ==================== DASHBOARD ==================
async function loadDashboard() {
    const loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedUser) {
        window.location.href = 'login.html';
        return;
    }
    
    document.getElementById('userName').innerText = loggedUser.name;
    document.getElementById('userEmail').innerText = loggedUser.email;
    document.getElementById('userTelegram').innerText = loggedUser.telegram || '@non specificato';
    
    const subs = await loadSubscriptions();
    const userSub = subs.find(s => s.email === loggedUser.email);
    const now = new Date();
    
    const statusDiv = document.getElementById('subscriptionStatus');
    const expiryDiv = document.getElementById('subscriptionExpiry');
    const buttonDiv = document.getElementById('subscriptionButton');
    
    if (userSub && new Date(userSub.expires_date) > now) {
        const expiryDate = new Date(userSub.expires_date);
        const daysLeft = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
        statusDiv.innerHTML = '<span class="badge-active">✅ ATTIVO</span>';
        expiryDiv.innerHTML = `Scade tra ${daysLeft} giorni (${expiryDate.toLocaleDateString()})`;
        buttonDiv.innerHTML = `<a href="https://nowpayments.io/payment/?iid=5949538024" target="_blank" class="btn btn-primary">🔄 Rinnova abbonamento</a>`;
    } else {
        statusDiv.innerHTML = '<span class="badge-inactive">❌ NON ATTIVO</span>';
        expiryDiv.innerHTML = userSub ? 'Il tuo abbonamento è scaduto' : 'Non hai ancora un abbonamento attivo';
        buttonDiv.innerHTML = `<a href="https://nowpayments.io/payment/?iid=5949538024" target="_blank" class="btn btn-primary">💎 Attiva abbonamento €9,90</a>`;
    }
}

// ==================== UPLOAD PRODOTTO ==================
async function checkSubscriptionStatusForUpload(email) {
    const subs = await loadSubscriptions();
    const userSub = subs.find(s => s.email === email);
    const now = new Date();
    const warningDiv = document.getElementById('subscriptionWarning');
    const form = document.getElementById('uploadProductForm');
    
    if (userSub && new Date(userSub.expires_date) > now) {
        warningDiv.style.display = 'none';
        form.style.display = 'block';
    } else {
        warningDiv.style.display = 'block';
        form.style.display = 'none';
    }
}

async function readFileAsDataURL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

function setupUploadForm() {
    const loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Mostra i contatti nel form
    const emailSpan = document.getElementById('displayEmail');
    const telegramSpan = document.getElementById('displayTelegram');
    if (emailSpan) emailSpan.innerText = loggedUser.email;
    if (telegramSpan) telegramSpan.innerText = loggedUser.telegram || '@non specificato';
    
    // Controlla abbonamento
    checkSubscriptionStatusForUpload(loggedUser.email);
    
    const fileInput = document.getElementById('productImageFile');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
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
                imageData = await readFileAsDataURL(file);
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
                sellerName: loggedUser.name,
                sellerEmail: loggedUser.email,
                sellerTelegram: loggedUser.telegram || '@non specificato'
            };
            
            const messageDiv = document.getElementById('uploadMessage');
            const sent = await sendProductNotification(productData, imageData);
            
            if (sent) {
                messageDiv.innerHTML = '✅ Richiesta inviata! Riceverai conferma a breve. Il prodotto verrà pubblicato manualmente sul nostro canale Telegram.';
                messageDiv.className = 'alert success';
                form.reset();
                document.getElementById('imagePreview').innerHTML = '';
            } else {
                messageDiv.innerHTML = '❌ Errore nell\'invio. Riprova o contatta l\'assistenza.';
                messageDiv.className = 'alert error';
            }
        });
    }
}

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
        await supabaseFetch(`subscriptions?email=eq.${email}`, {
            method: 'PATCH',
            body: JSON.stringify({ expires_date: expiresDate.toISOString() })
        });
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

// Cookie banner
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        const banner = document.getElementById('cookieBanner');
        if (banner) banner.style.display = 'flex';
    }
}
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
}

if (document.getElementById('acceptCookies')) {
    document.getElementById('acceptCookies').addEventListener('click', acceptCookies);
}
checkCookieConsent();

// Inizializzazione pagina
if (window.location.pathname.includes('dashboard.html')) {
    loadDashboard();
}
if (window.location.pathname.includes('upload-product.html')) {
    setupUploadForm();
}
