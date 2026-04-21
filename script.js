/* WATERMARK: MarketHub - Copyright (c) 2025 ops.channel@proton.me - MIT License */
/* Beacon ID: 7r1gqp1T5p-MarketHub-2025-04-11 */

// ========== TRACCIAMENTO AFFILIATO ==========
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; path=/; expires=${date.toUTCString()}; SameSite=Lax`;
}
function trackAffiliate() {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if (ref) {
        setCookie('affiliate_ref', ref, 30);
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}
trackAffiliate();

// ==================== MULTILINGUA (solo essenziale per non appesantire) ==================
const translations = {
    it: { /* ... come prima ... */ },
    en: { /* ... come prima ... */ }
};
let currentLang = localStorage.getItem('markethubLang') || 'it';
function setLanguage(lang) { currentLang = lang; localStorage.setItem('markethubLang', lang); translatePage(); }
function translatePage() {
    document.querySelectorAll('[data-key]').forEach(el => {
        let key = el.getAttribute('data-key');
        if (translations[currentLang] && translations[currentLang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = translations[currentLang][key];
            else el.innerHTML = translations[currentLang][key];
        }
    });
}

// ==================== DATABASE ==================
let products = [], messages = [], currentUser = null;
function saveProducts() { localStorage.setItem('markethubProducts', JSON.stringify(products)); }
function loadProducts() { let stored = localStorage.getItem('markethubProducts'); if (stored) products = JSON.parse(stored); else products = []; }
function saveMessages() { localStorage.setItem('markethubMessages', JSON.stringify(messages)); }
function loadMessages() { let stored = localStorage.getItem('markethubMessages'); if (stored) messages = JSON.parse(stored); else messages = []; }
function saveCurrentUser(user) { currentUser = user; localStorage.setItem('markethubUser', JSON.stringify(user)); }
function loadCurrentUser() { let user = localStorage.getItem('markethubUser'); if (user) currentUser = JSON.parse(user); }

// ==================== SUBSCRIPTION ==================
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
    if (!currentUser) { alert(translations[currentLang].alert_login_required); showLogin(); return; }
    let modal = document.getElementById('subscriptionModal');
    let optionsDiv = document.getElementById('subPaymentOptions');
    optionsDiv.innerHTML = `
        <div style="text-align:center; padding:1rem;">
            <p>${currentLang === 'it' ? 'Clicca il pulsante qui sotto per pagare €9,90 in crypto:' : 'Click the button below to pay €9.90 in crypto:'}</p>
            <a href="${NOWPAYMENTS_SUBSCRIPTION_URL}" target="_blank" class="btn btn-primary" style="display:inline-block; margin:1rem 0;">💰 ${currentLang === 'it' ? 'Paga con NOWPayments' : 'Pay with NOWPayments'}</a>
            <p style="font-size:0.8rem; color:#94a3b8;">${currentLang === 'it' ? 'Dopo il pagamento, invia la ricevuta a:' : 'After payment, send receipt to:'} <strong>ops.channel@proton.me</strong></p>
            <p style="font-size:0.8rem;">${currentLang === 'it' ? 'Attiveremo l\'abbonamento entro 24 ore.' : 'We will activate the subscription within 24 hours.'}</p>
            <button class="btn btn-secondary" onclick="closeSubscriptionModal()">${currentLang === 'it' ? 'Chiudi' : 'Close'}</button>
        </div>
    `;
    modal.classList.add('active');
}
function closeSubscriptionModal() { document.getElementById('subscriptionModal').classList.remove('active'); }

// ==================== AUTH ==================
function showLogin() { document.getElementById('loginModal').classList.add('active'); }
function closeLogin() { document.getElementById('loginModal').classList.remove('active'); }
function showRegister() { document.getElementById('registerModal').classList.add('active'); }
function closeRegister() { document.getElementById('registerModal').classList.remove('active'); }
function switchToLogin() { closeRegister(); showLogin(); }
function switchToRegister() { closeLogin(); showRegister(); }
function logout() { localStorage.removeItem('markethubUser'); currentUser = null; window.location.href = 'index.html'; }

// ==================== NAVBAR DINAMICA ==================
function updateNavbarForUser() {
    const isLoggedIn = currentUser !== null;
    const hasActiveSub = isLoggedIn ? checkSubscriptionStatus(currentUser.email) : false;
    const dashboardLink = document.getElementById('dashboardLink');
    const uploadLink = document.getElementById('uploadLink');
    const messagesLink = document.getElementById('messagesLink');
    const logoutLink = document.getElementById('logoutLink');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    // Dashboard e Messaggi visibili a tutti i loggati (anche senza abbonamento)
    if (dashboardLink) dashboardLink.style.display = isLoggedIn ? 'inline-block' : 'none';
    if (messagesLink) messagesLink.style.display = isLoggedIn ? 'inline-block' : 'none';
    if (uploadLink) uploadLink.style.display = (isLoggedIn && hasActiveSub) ? 'inline-block' : 'none';
    if (logoutLink) logoutLink.style.display = isLoggedIn ? 'inline-block' : 'none';
    if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
    if (registerBtn) registerBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
    
    // Se siamo in dashboard.html, gestisci anche i bottoni interni
    if (window.location.pathname.includes('dashboard.html')) {
        const uploadBtn = document.getElementById('uploadBtn');
        if (uploadBtn) uploadBtn.style.display = hasActiveSub ? 'inline-block' : 'none';
    }
}

// ==================== PAGE ACCESS PROTECTION ==================
function checkPageAccess() {
    const page = window.location.pathname;
    // Pagine che richiedono login
    if (page.includes('dashboard.html') || page.includes('messages.html') || page.includes('upload-product.html')) {
        if (!currentUser) {
            alert(translations[currentLang].alert_login_required);
            window.location.href = 'index.html';
            return false;
        }
    }
    // upload-product.html richiede anche abbonamento attivo
    if (page.includes('upload-product.html')) {
        if (!checkSubscriptionStatus(currentUser.email)) {
            alert(translations[currentLang].alert_subscription_required);
            window.location.href = 'dashboard.html';
            return false;
        }
    }
    return true;
}

// ==================== DASHBOARD ==================
function loadDashboard() {
    if (!currentUser) return;
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
        subDiv.innerHTML = `${translations[currentLang].active_until} ${daysLeft} ${translations[currentLang].days_left}`;
        subDiv.className = 'subscription-status active';
    } else {
        subDiv.innerHTML = `${translations[currentLang].no_active_subscription} <a href="#" onclick="startSubscription()">${translations[currentLang].activate_now}</a>`;
        subDiv.className = 'subscription-status inactive';
    }
    let recent = document.getElementById('recentProductsList');
    if (recent) {
        recent.innerHTML = userProducts.slice(0,4).map(p => `<div class="product-card" onclick="viewProduct(${p.id})"><div class="product-image">${p.image && p.image !== '📦' ? `<img src="${p.image}">` : '📦'}</div><div class="product-info"><div class="product-title">${p.name}</div><div class="product-price">€${p.price}</div></div></div>`).join('');
        if (userProducts.length === 0) recent.innerHTML = `<p>${translations[currentLang].no_products_yet}</p>`;
    }
    // Recensioni ricevute (semplificato)
    let reviewsContainer = document.getElementById('sellerReviewsList');
    if (reviewsContainer) {
        let allReviews = [];
        userProducts.forEach(p => {
            if (p.reviews) p.reviews.forEach((r, idx) => allReviews.push({ productId: p.id, productName: p.name, review: r, reviewIndex: idx }));
        });
        if (allReviews.length === 0) reviewsContainer.innerHTML = `<p>${translations[currentLang].no_reviews}</p>`;
        else {
            reviewsContainer.innerHTML = allReviews.map(rev => `
                <div style="background:rgba(255,255,255,0.05); border-radius:16px; padding:1rem; margin-bottom:1rem;">
                    <strong>${translations[currentLang].all_products_title.slice(0,-1)}:</strong> ${rev.productName}<br>
                    <strong>${translations[currentLang].name_label}:</strong> ${rev.review.userName}<br>
                    <strong>Voto:</strong> ${'⭐'.repeat(rev.review.rating)}${'☆'.repeat(5-rev.review.rating)}<br>
                    <strong>Commento:</strong> ${rev.review.comment}<br>
                    <small>${new Date(rev.review.date).toLocaleDateString()}</small>
                    ${rev.review.reply ? `<div><strong>Risposta:</strong> ${rev.review.reply.text}</div>` : `<button class="btn-small" onclick="replyToReviewFromDashboard(${rev.productId}, ${rev.reviewIndex})">Rispondi</button>`}
                </div>
            `).join('');
        }
    }
}
function replyToReviewFromDashboard(productId, reviewIndex) {
    let reply = prompt('Rispondi alla recensione:');
    if (reply && reply.trim()) {
        let p = products.find(p => p.id === productId);
        if (p && p.reviews[reviewIndex]) {
            p.reviews[reviewIndex].reply = { text: reply, date: new Date().toISOString() };
            saveProducts();
            alert('Risposta aggiunta!');
            loadDashboard();
        }
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
        if (!currentUser) { alert(translations[currentLang].alert_login_required); return; }
        if (!checkSubscriptionStatus(currentUser.email)) { alert(translations[currentLang].alert_subscription_required); startSubscription(); return; }
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
            affiliateProductId: document.getElementById('affiliateProductId')?.value || null,
            views: 0,
            reviews: [],
            date: new Date().toISOString()
        };
        products.push(newProduct);
        saveProducts();
        document.getElementById('uploadMessage').innerHTML = translations[currentLang].alert_product_published;
        document.getElementById('uploadMessage').className = 'alert success';
        setTimeout(() => window.location.href = 'dashboard.html', 1500);
    });
}
function readFileAsDataURL(file) { return new Promise(resolve => { let r = new FileReader(); r.onload = () => resolve(r.result); r.readAsDataURL(file); }); }

// ==================== PRODOTTI (VISIBILI A TUTTI) ==================
function displayAllProducts() { /* come prima, ma invocata da products.html */ }
function filterProducts() { /* come prima */ }
function viewProduct(productId) { /* come prima, con gestione recensioni e link affiliato */ }
function submitReview(productId) { /* come prima */ }
function replyToReview(productId, reviewIndex) { /* come prima */ }
function closeProductModal() { document.getElementById('productModal').classList.remove('active'); }
function buyWithCrypto(productId) { /* come prima */ }
function copyAffiliateLink() { /* come prima */ }
function getAffiliateLink(productId) { /* come prima */ }
function finalizeOrder(orderData) { /* come prima */ }
function addReview(productId, userId, userName, rating, comment) { /* come prima */ }
function addReply(productId, reviewIndex, replyText) { /* come prima */ }
function getAverageRating(productId) { /* come prima */ }

// ==================== MESSAGGI ==================
function contactSeller(sellerEmail, sellerName, productId, productName) { /* come prima */ }
function getUserConversations() { /* come prima */ }
function displayConversations() { /* come prima */ }
function loadChat(userEmail, userName) { /* come prima */ }
function sendMessage() { /* come prima */ }

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

// ==================== DELETE ACCOUNT ==================
function deleteAccount() {
    if (!currentUser) { alert(translations[currentLang].alert_login_required); return; }
    if (confirm(translations[currentLang].alert_delete_confirm) && confirm(translations[currentLang].alert_delete_final)) {
        products = products.filter(p => p.sellerEmail !== currentUser.email);
        saveProducts();
        messages = messages.filter(m => m.from !== currentUser.email && m.to !== currentUser.email);
        saveMessages();
        let users = JSON.parse(localStorage.getItem('markethubUsers') || '[]');
        users = users.filter(u => u.email !== currentUser.email);
        localStorage.setItem('markethubUsers', JSON.stringify(users));
        let subs = JSON.parse(localStorage.getItem('markethubSubscriptions') || '{}');
        delete subs[currentUser.email];
        localStorage.setItem('markethubSubscriptions', JSON.stringify(subs));
        localStorage.removeItem('markethubUser');
        currentUser = null;
        alert(translations[currentLang].alert_account_deleted);
        window.location.href = 'index.html';
    }
}

// ==================== INIT ==================
document.addEventListener('DOMContentLoaded', () => {
    loadProducts(); loadMessages(); loadCurrentUser(); translatePage();
    updateNavbarForUser();
    if (!checkPageAccess()) return;
    if (window.location.pathname.includes('dashboard.html')) loadDashboard();
    if (window.location.pathname.includes('products.html')) displayAllProducts();
    if (window.location.pathname.includes('messages.html')) displayConversations();
    if (window.location.pathname.includes('upload-product.html')) setupUploadForm();
    checkCookieConsent();
    const acceptBtn = document.getElementById('acceptCookies');
    if (acceptBtn) acceptBtn.addEventListener('click', acceptCookies);
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let email = document.getElementById('loginEmail').value;
        let pwd = document.getElementById('loginPassword').value;
        let users = JSON.parse(localStorage.getItem('markethubUsers') || '[]');
        let user = users.find(u => u.email === email && u.password === btoa(pwd));
        if (user) {
            saveCurrentUser({ id: user.id, name: user.name, email: user.email });
            alert(translations[currentLang].alert_login_success);
            closeLogin();
            updateNavbarForUser();
            window.location.href = 'dashboard.html';
        } else alert(translations[currentLang].alert_invalid_credentials);
    });
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let name = document.getElementById('regName').value;
        let email = document.getElementById('regEmail').value;
        let pwd = document.getElementById('regPassword').value;
        let confirm = document.getElementById('regConfirmPassword').value;
        if (pwd !== confirm) { alert(translations[currentLang].alert_passwords_mismatch); return; }
        let users = JSON.parse(localStorage.getItem('markethubUsers') || '[]');
        if (users.find(u => u.email === email)) { alert(translations[currentLang].alert_email_exists); return; }
        users.push({ id: Date.now(), name, email, password: btoa(pwd), joinDate: new Date().toISOString() });
        localStorage.setItem('markethubUsers', JSON.stringify(users));
        alert(translations[currentLang].alert_registered);
        closeRegister(); showLogin();
    });
});
