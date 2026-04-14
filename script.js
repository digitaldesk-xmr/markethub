/* WATERMARK: MarketHub - Copyright (c) 2025 ops.channel@proton.me - MIT License */
/* Beacon ID: 7r1gqp1T5p-MarketHub-2025-04-11 */

// ==================== MULTILINGUA ==================
const translations = {
    it: {
        site_name: "🛒 MarketHub", nav_home: "Home", nav_products: "Prodotti", nav_dashboard: "Dashboard",
        btn_login: "Accedi", btn_register: "Registrati", hero_title: "Vendi i tuoi prodotti in tutto il mondo",
        hero_sub: "MarketHub è il marketplace dove chiunque può vendere prodotti fisici.",
        hero_start: "Inizia a vendere", hero_browse: "Esplora prodotti", stat_sellers: "Venditori attivi",
        stat_products: "Prodotti venduti", stat_countries: "Paesi raggiunti", features_title: "Perché scegliere MarketHub",
        feat1_title: "Pagamenti flessibili", feat1_desc: "Bitcoin, Ethereum, USDT e 300+ crypto",
        feat2_title: "Vendita globale", feat2_desc: "Raggiungi compratori in 120+ paesi",
        feat3_title: "Prodotti fisici", feat3_desc: "Elettronica, moda, arredamento",
        feat4_title: "Protezione acquisti", feat4_desc: "Recensioni verificate",
        pricing_title: "Diventa venditore", popular_badge: "🔥 Più venduto", plan_name: "Piano Venditore",
        plan_duration: "/30 giorni", feature_unlimited: "✓ Prodotti illimitati", feature_payments: "✓ Pagamenti crypto",
        feature_messages: "✓ Messaggistica integrata", feature_stats: "✓ Statistiche vendite", feature_support: "✓ Supporto prioritario",
        btn_activate: "Attiva ora", login_title: "Accedi", register_title: "Registrati", email_label: "Email",
        password_label: "Password", name_label: "Nome completo", confirm_label: "Conferma password",
        login_btn: "Accedi", register_btn: "Registrati", no_account: "Non hai un account?", have_account: "Hai già un account?",
        register_link: "Registrati", login_link: "Accedi", subscription_title: "Abbonamento Venditore - €9,90",
        payment_choice: "Paga in crypto con NOWPayments:", footer_payments: "Il marketplace globale per prodotti fisici"
    },
    en: {
        site_name: "🛒 MarketHub", nav_home: "Home", nav_products: "Products", nav_dashboard: "Dashboard",
        btn_login: "Login", btn_register: "Sign up", hero_title: "Sell your products worldwide",
        hero_sub: "MarketHub is the global marketplace for physical products.",
        hero_start: "Start selling", hero_browse: "Browse products", stat_sellers: "Active sellers",
        stat_products: "Products sold", stat_countries: "Countries reached", features_title: "Why choose MarketHub",
        feat1_title: "Flexible payments", feat1_desc: "Bitcoin, Ethereum, USDT and 300+ cryptos",
        feat2_title: "Global selling", feat2_desc: "Reach buyers in 120+ countries",
        feat3_title: "Physical products", feat3_desc: "Electronics, fashion, furniture",
        feat4_title: "Purchase protection", feat4_desc: "Verified reviews",
        pricing_title: "Become a seller", popular_badge: "🔥 Best seller", plan_name: "Seller Plan",
        plan_duration: "/30 days", feature_unlimited: "✓ Unlimited products", feature_payments: "✓ Crypto payments",
        feature_messages: "✓ Integrated messaging", feature_stats: "✓ Sales statistics", feature_support: "✓ Priority support",
        btn_activate: "Activate now", login_title: "Login", register_title: "Sign up", email_label: "Email",
        password_label: "Password", name_label: "Full name", confirm_label: "Confirm password",
        login_btn: "Login", register_btn: "Sign up", no_account: "Don't have an account?", have_account: "Already have an account?",
        register_link: "Sign up", login_link: "Login", subscription_title: "Seller Subscription - €9.90",
        payment_choice: "Pay with crypto via NOWPayments:", footer_payments: "The global marketplace for physical products"
    }
};

let currentLang = localStorage.getItem('markethubLang') || 'it';
function setLanguage(lang) { currentLang = lang; localStorage.setItem('markethubLang', lang); translatePage(); }
function translatePage() { document.querySelectorAll('[data-key]').forEach(el => { let key = el.getAttribute('data-key'); if (translations[currentLang] && translations[currentLang][key]) { if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = translations[currentLang][key]; else el.innerHTML = translations[currentLang][key]; } }); }

// ==================== BEACON TRACKER (anti-clone) ==================
const ORIGINAL_DOMAIN = "digitaldesk-xmr.github.io"; // IL TUO DOMINIO ORIGINALE (senza https://)
const TELEGRAM_BOT_TOKEN = "123456:ABCdefGHIjklmNOPqrstuVWXyz"; // SOSTITUISCI CON IL TUO TOKEN
const TELEGRAM_CHAT_ID = "123456789"; // SOSTITUISCI CON IL TUO CHAT_ID

function sendBeaconAlert(message) {
    if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === "123456:ABCdefGHIjklmNOPqrstuVWXyz") return;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
    }).catch(e => console.log("Beacon error:", e));
}

function checkClone() {
    const currentHost = window.location.hostname;
    if (currentHost !== ORIGINAL_DOMAIN && !currentHost.includes("localhost") && !currentHost.includes("127.0.0.1")) {
        const alertMsg = `⚠️ POTENZIALE CLONE DETECTED!\nOriginale: ${ORIGINAL_DOMAIN}\nClone: ${currentHost}\nURL: ${window.location.href}\nUser-Agent: ${navigator.userAgent}`;
        console.warn(alertMsg);
        sendBeaconAlert(alertMsg);
        // Opzionale: mostra avviso all'utente (solo su clone)
        // document.body.insertAdjacentHTML('afterbegin', '<div style="background:red;color:white;padding:10px;text-align:center;">⚠️ Questo sito non è l\'originale MarketHub. Visita il sito ufficiale: https://digitaldesk-xmr.github.io/markethub/</div>');
    }
}

// ==================== DATABASE ==================
let products = [], messages = [], currentUser = null;
function saveProducts() { localStorage.setItem('markethubProducts', JSON.stringify(products)); }
function loadProducts() { let stored = localStorage.getItem('markethubProducts'); if (stored) products = JSON.parse(stored); else products = []; }
function saveMessages() { localStorage.setItem('markethubMessages', JSON.stringify(messages)); }
function loadMessages() { let stored = localStorage.getItem('markethubMessages'); if (stored) messages = JSON.parse(stored); else messages = []; }
function saveCurrentUser(user) { currentUser = user; localStorage.setItem('markethubUser', JSON.stringify(user)); }
function loadCurrentUser() { let user = localStorage.getItem('markethubUser'); if (user) currentUser = JSON.parse(user); }

// ==================== ABBONAMENTO ==================
function checkSubscriptionStatus(email = null) {
    let checkEmail = email || (currentUser ? currentUser.email : null);
    if (!checkEmail) return false;
    let subs = JSON.parse(localStorage.getItem('markethubSubscriptions') || '{}');
    let sub = subs[checkEmail];
    if (!sub) return false;
    if (new Date(sub.expiresDate) < new Date()) {
        delete subs[checkEmail];
        localStorage.setItem('markethubSubscriptions', JSON.stringify(subs));
        return false;
    }
    return true;
}

const NOWPAYMENTS_SUBSCRIPTION_URL = "https://nowpayments.io/payment/?iid=4951702791";

function startSubscription() {
    if (!currentUser) { alert('Devi prima accedere'); showLogin(); return; }
    let modal = document.getElementById('subscriptionModal');
    let optionsDiv = document.getElementById('subPaymentOptions');
    optionsDiv.innerHTML = `
        <div style="text-align:center; padding:1rem;">
            <p>Clicca il pulsante qui sotto per pagare €9,90 in crypto:</p>
            <a href="${NOWPAYMENTS_SUBSCRIPTION_URL}" target="_blank" class="btn btn-primary" style="display:inline-block; margin:1rem 0;">💰 Paga con NOWPayments</a>
            <p style="font-size:0.8rem; color:#94a3b8;">Dopo il pagamento, invia la ricevuta a: <strong>ops.channel@proton.me</strong></p>
            <p style="font-size:0.8rem;">Attiveremo l'abbonamento entro 24 ore.</p>
            <button class="btn btn-secondary" onclick="closeSubscriptionModal()">Chiudi</button>
        </div>
    `;
    modal.classList.add('active');
}
function closeSubscriptionModal() { document.getElementById('subscriptionModal').classList.remove('active'); }

function activateSubscriptionManually(email, days) {
    let subs = JSON.parse(localStorage.getItem('markethubSubscriptions') || '{}');
    subs[email] = { expiresDate: new Date(Date.now() + days * 86400000).toISOString(), activatedBy: 'admin' };
    localStorage.setItem('markethubSubscriptions', JSON.stringify(subs));
}

// ==================== AUTH ==================
function showLogin() { document.getElementById('loginModal').classList.add('active'); }
function closeLogin() { document.getElementById('loginModal').classList.remove('active'); }
function showRegister() { document.getElementById('registerModal').classList.add('active'); }
function closeRegister() { document.getElementById('registerModal').classList.remove('active'); }
function switchToLogin() { closeRegister(); showLogin(); }
function switchToRegister() { closeLogin(); showRegister(); }

document.addEventListener('DOMContentLoaded', () => {
    loadProducts(); loadMessages(); loadCurrentUser(); translatePage();
    if (window.location.pathname.includes('dashboard.html')) loadDashboard();
    if (window.location.pathname.includes('products.html')) displayAllProducts();
    if (window.location.pathname.includes('messages.html')) displayConversations();
    if (window.location.pathname.includes('upload-product.html')) setupUploadForm();
    
    // Cookie banner
    checkCookieConsent();
    const acceptBtn = document.getElementById('acceptCookies');
    if (acceptBtn) acceptBtn.addEventListener('click', acceptCookies);
    
    // Beacon anti-clone
    checkClone();

    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let email = document.getElementById('loginEmail').value;
        let pwd = document.getElementById('loginPassword').value;
        let users = JSON.parse(localStorage.getItem('markethubUsers') || '[]');
        let user = users.find(u => u.email === email && u.password === btoa(pwd));
        if (user) {
            saveCurrentUser({ id: user.id, name: user.name, email: user.email });
            let userProducts = products.filter(p => p.sellerEmail === email);
            if (userProducts.length > 0 && !checkSubscriptionStatus(email)) {
                alert('Il tuo abbonamento è scaduto. Contatta l\'admin per rinnovare.');
                localStorage.removeItem('markethubUser');
                closeLogin();
                return;
            }
            alert('Login effettuato!');
            closeLogin();
            window.location.href = 'dashboard.html';
        } else alert('Credenziali errate');
    });

    const registerForm = document.getElementById('registerForm');
    if (registerForm) registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let name = document.getElementById('regName').value;
        let email = document.getElementById('regEmail').value;
        let pwd = document.getElementById('regPassword').value;
        let confirm = document.getElementById('regConfirmPassword').value;
        if (pwd !== confirm) { alert('Le password non coincidono'); return; }
        let users = JSON.parse(localStorage.getItem('markethubUsers') || '[]');
        if (users.find(u => u.email === email)) { alert('Email già registrata'); return; }
        users.push({ id: Date.now(), name, email, password: btoa(pwd), joinDate: new Date().toISOString() });
        localStorage.setItem('markethubUsers', JSON.stringify(users));
        alert('Registrato! Ora accedi');
        closeRegister(); showLogin();
    });
});

function logout() { localStorage.removeItem('markethubUser'); window.location.href = 'index.html'; }

// ==================== DASHBOARD ==================
function loadDashboard() {
    if (!currentUser) { window.location.href = 'index.html'; return; }
    document.getElementById('userName').innerText = currentUser.name;
    let userProducts = products.filter(p => p.sellerEmail === currentUser.email);
    document.getElementById('totalProducts').innerText = userProducts.length;
    let totalViews = userProducts.reduce((sum, p) => sum + (p.views || 0), 0);
    document.getElementById('totalSales').innerText = '0';
    document.getElementById('totalRevenue').innerText = '€0';
    document.getElementById('totalViews').innerText = totalViews;

    let subActive = checkSubscriptionStatus(currentUser.email);
    let subDiv = document.getElementById('subscriptionStatus');
    if (subActive) {
        let subs = JSON.parse(localStorage.getItem('markethubSubscriptions') || '{}');
        let expiry = new Date(subs[currentUser.email].expiresDate);
        let daysLeft = Math.ceil((expiry - new Date()) / (1000*3600*24));
        subDiv.innerHTML = `✅ Abbonamento attivo - Scade tra ${daysLeft} giorni`;
        subDiv.className = 'subscription-status active';
    } else {
        subDiv.innerHTML = `⚠️ Nessun abbonamento attivo. <a href="#" onclick="startSubscription()">Attiva ora €9,90</a>`;
        subDiv.className = 'subscription-status inactive';
    }
    let recent = document.getElementById('recentProductsList');
    if (recent) {
        recent.innerHTML = userProducts.slice(0,4).map(p => `<div class="product-card" onclick="viewProduct(${p.id})"><div class="product-image">${p.image && p.image !== '📦' ? `<img src="${p.image}">` : '📦'}</div><div class="product-info"><div class="product-title">${p.name}</div><div class="product-price">€${p.price}</div></div></div>`).join('');
        if (userProducts.length === 0) recent.innerHTML = '<p>Nessun prodotto. <a href="upload-product.html">Carica il primo</a></p>';
    }
}

// ==================== UPLOAD PRODOTTO ==================
function setupUploadForm() {
    let fileInput = document.getElementById('productImageFile');
    if (fileInput) fileInput.addEventListener('change', function(e) {
        let preview = document.getElementById('imagePreview');
        if (this.files && this.files[0]) {
            let reader = new FileReader();
            reader.onload = ev => preview.innerHTML = `<img src="${ev.target.result}" style="max-width:200px;border-radius:12px;">`;
            reader.readAsDataURL(this.files[0]);
        }
    });
    let form = document.getElementById('uploadProductForm');
    if (form) form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentUser) { alert('Login richiesto'); return; }
        if (!checkSubscriptionStatus(currentUser.email)) { alert('Abbonamento richiesto per vendere.'); startSubscription(); return; }
        let file = document.getElementById('productImageFile').files[0];
        let imageData = file ? await readFileAsDataURL(file) : '📦';
        let newProduct = {
            id: Date.now(),
            name: document.getElementById('productName').value,
            description: document.getElementById('productDescription').value,
            price: parseFloat(document.getElementById('productPrice').value),
            category: document.getElementById('productCategory').value,
            seller: currentUser.name,
            sellerEmail: currentUser.email,
            image: imageData,
            condition: document.getElementById('productCondition').value,
            quantity: parseInt(document.getElementById('productQuantity').value),
            shippingFrom: document.getElementById('productShippingFrom')?.value || 'IT',
            shippingCost: parseFloat(document.getElementById('productShippingCost')?.value || 0),
            views: 0,
            date: new Date().toISOString()
        };
        products.push(newProduct);
        saveProducts();
        document.getElementById('uploadMessage').innerHTML = '✅ Prodotto pubblicato!';
        document.getElementById('uploadMessage').className = 'alert success';
        setTimeout(() => window.location.href = 'dashboard.html', 1500);
    });
}
function readFileAsDataURL(file) { return new Promise(resolve => { let r = new FileReader(); r.onload = () => resolve(r.result); r.readAsDataURL(file); }); }

// ==================== PRODOTTI ==================
function displayAllProducts() {
    let container = document.getElementById('productsList');
    if (!container) return;
    if (products.length === 0) { container.innerHTML = '<p>Nessun prodotto in vendita.</p>'; return; }
    container.innerHTML = products.map(p => `<div class="product-card" onclick="viewProduct(${p.id})"><div class="product-image">${p.image && p.image !== '📦' ? `<img src="${p.image}">` : '📦'}</div><div class="product-info"><div class="product-title">${p.name}</div><div class="product-price">€${p.price}</div><div class="product-seller">👤 ${p.seller}</div></div></div>`).join('');
}
function filterProducts() {
    let search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    let cat = document.getElementById('categoryFilter')?.value || 'all';
    let filtered = products.filter(p => (p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search)) && (cat === 'all' || p.category === cat));
    let container = document.getElementById('productsList');
    container.innerHTML = filtered.map(p => `<div class="product-card" onclick="viewProduct(${p.id})"><div class="product-image">${p.image && p.image !== '📦' ? `<img src="${p.image}">` : '📦'}</div><div class="product-info"><div class="product-title">${p.name}</div><div class="product-price">€${p.price}</div><div class="product-seller">👤 ${p.seller}</div></div></div>`).join('');
}
function viewProduct(productId) {
    let p = products.find(p => p.id === productId);
    if (!p) return;
    p.views = (p.views || 0) + 1;
    saveProducts();
    let modal = document.getElementById('productModal');
    document.getElementById('productDetail').innerHTML = `<div style="text-align:center">${p.image && p.image !== '📦' ? `<img src="${p.image}" style="max-width:100%;max-height:300px;border-radius:16px;">` : '<div style="font-size:4rem">📦</div>'}<h2>${p.name}</h2><p>${p.description}</p><div style="font-size:2rem;color:#f97316;margin:1rem 0">€${p.price}</div><div style="background:rgba(255,255,255,0.05);padding:1rem;border-radius:16px;"><p>👤 Venditore: ${p.seller}</p><p>📍 Spedizione da: ${p.shippingFrom} - €${p.shippingCost}</p><p>📦 Quantità: ${p.quantity}</p><p>👁️ Visualizzazioni: ${p.views}</p></div></div>`;
    document.getElementById('paymentButtons').innerHTML = `<button class="btn btn-primary" onclick="buyWithCrypto(${p.id})">💰 Compra con Crypto</button><button class="btn" onclick="contactSeller('${p.sellerEmail}','${p.seller}',${p.id},'${p.name}')">💬 Contatta venditore</button>`;
    modal.classList.add('active');
}
function closeProductModal() { document.getElementById('productModal').classList.remove('active'); }
function buyWithCrypto(productId) {
    let p = products.find(p => p.id === productId);
    alert(`Per acquistare ${p.name} a €${p.price}: contatta il venditore per accordi sul pagamento in crypto.`);
}

// ==================== MESSAGGI ==================
function contactSeller(sellerEmail, sellerName, productId, productName) {
    if (!currentUser) { alert('Devi accedere'); showLogin(); return; }
    let msg = prompt(`Messaggio a ${sellerName} riguardo "${productName}":`);
    if (msg) {
        messages.push({ id: Date.now(), from: currentUser.email, fromName: currentUser.name, to: sellerEmail, toName: sellerName, productId, productName, message: msg, timestamp: new Date().toISOString(), read: false });
        saveMessages();
        alert('Messaggio inviato!');
    }
}
function getUserConversations() {
    if (!currentUser) return [];
    let userMessages = messages.filter(m => m.from === currentUser.email || m.to === currentUser.email);
    let map = new Map();
    userMessages.forEach(msg => {
        let other = msg.from === currentUser.email ? { email: msg.to, name: msg.toName } : { email: msg.from, name: msg.fromName };
        if (!map.has(other.email)) map.set(other.email, { userEmail: other.email, userName: other.name, lastMessage: msg.message, lastTimestamp: msg.timestamp, productName: msg.productName, unread: msg.to === currentUser.email && !msg.read });
        else {
            let existing = map.get(other.email);
            if (new Date(msg.timestamp) > new Date(existing.lastTimestamp)) { existing.lastMessage = msg.message; existing.lastTimestamp = msg.timestamp; }
            if (msg.to === currentUser.email && !msg.read) existing.unread = true;
        }
    });
    return Array.from(map.values()).sort((a,b)=>new Date(b.lastTimestamp)-new Date(a.lastTimestamp));
}
function displayConversations() {
    let container = document.getElementById('conversationsList');
    if (!container) return;
    let convs = getUserConversations();
    if (convs.length === 0) { container.innerHTML = '<p>Nessuna conversazione</p>'; return; }
    container.innerHTML = convs.map(c => `<div class="conversation-item" onclick="loadChat('${c.userEmail}','${c.userName}')"><div class="conversation-name">${c.userName}</div><div class="conversation-last">${c.lastMessage.substring(0,50)}...</div><div class="conversation-product">📦 ${c.productName}</div>${c.unread ? '<span class="unread-badge">Nuovo</span>' : ''}</div>`).join('');
}
let currentChatWith = null;
function loadChat(userEmail, userName) {
    currentChatWith = { email: userEmail, name: userName };
    document.getElementById('chatHeader').innerHTML = `<h3>💬 Chat con ${userName}</h3>`;
    document.getElementById('chatInput').style.display = 'flex';
    let chatMsgs = messages.filter(m => (m.from === currentUser.email && m.to === userEmail) || (m.from === userEmail && m.to === currentUser.email)).sort((a,b)=>new Date(a.timestamp)-new Date(b.timestamp));
    chatMsgs.forEach(m => { if (m.to === currentUser.email && !m.read) m.read = true; });
    saveMessages();
    let container = document.getElementById('chatMessages');
    container.innerHTML = chatMsgs.map(m => `<div class="chat-message ${m.from === currentUser.email ? 'sent' : 'received'}"><div class="message-text">${m.message}</div><div class="message-time">${new Date(m.timestamp).toLocaleString()}</div>${m.productName ? `<div class="message-product">📦 Prodotto: ${m.productName}</div>` : ''}</div>`).join('');
    container.scrollTop = container.scrollHeight;
}
function sendMessage() {
    let text = document.getElementById('messageText').value;
    if (!text.trim() || !currentChatWith) return;
    messages.push({ id: Date.now(), from: currentUser.email, fromName: currentUser.name, to: currentChatWith.email, toName: currentChatWith.name, productId: null, productName: null, message: text, timestamp: new Date().toISOString(), read: false });
    saveMessages();
    document.getElementById('messageText').value = '';
    loadChat(currentChatWith.email, currentChatWith.name);
    displayConversations();
}

// ==================== COOKIE BANNER ==================
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

// ==================== DELETE ACCOUNT (GDPR) ==================
function deleteAccount() {
    if (!currentUser) {
        alert('Devi essere loggato per eliminare l\'account.');
        return;
    }
    if (confirm("⚠️ Sei sicuro? Questa azione cancellerà PERMANENTEMENTE il tuo account, tutti i tuoi prodotti e tutti i messaggi. Non potrai più recuperarli.")) {
        if (confirm("Questa operazione è IRREVERSIBILE. Vuoi davvero procedere?")) {
            // 1. Rimuovi prodotti
            products = products.filter(p => p.sellerEmail !== currentUser.email);
            saveProducts();
            // 2. Rimuovi messaggi
            messages = messages.filter(m => m.from !== currentUser.email && m.to !== currentUser.email);
            saveMessages();
            // 3. Rimuovi utente dalla lista users
            let users = JSON.parse(localStorage.getItem('markethubUsers') || '[]');
            users = users.filter(u => u.email !== currentUser.email);
            localStorage.setItem('markethubUsers', JSON.stringify(users));
            // 4. Rimuovi abbonamento
            let subscriptions = JSON.parse(localStorage.getItem('markethubSubscriptions') || '{}');
            delete subscriptions[currentUser.email];
            localStorage.setItem('markethubSubscriptions', JSON.stringify(subscriptions));
            // 5. Rimuovi la sessione corrente
            localStorage.removeItem('markethubUser');
            currentUser = null;
            alert("✅ Account eliminato con successo. Grazie per aver utilizzato MarketHub.");
            window.location.href = 'index.html';
        }
    }
}
