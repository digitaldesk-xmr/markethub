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
        console.log('Affiliate tracciato:', ref);
    }
}
trackAffiliate();

// ==================== MULTILINGUA (COMPLETO) ==================
const translations = {
    it: {
        // Generale
        site_name: "🛒 MarketHub",
        // Navbar
        nav_home: "Home",
        nav_products: "Prodotti",
        nav_dashboard: "Dashboard",
        nav_messages: "Messaggi",
        nav_upload: "Carica",
        nav_exchange: "Exchange",
        nav_logout: "Esci",
        btn_login: "Accedi",
        btn_register: "Registrati",
        // Hero
        hero_title: "Vendi i tuoi prodotti in tutto il mondo",
        hero_sub: "MarketHub è il marketplace dove chiunque può vendere prodotti fisici.",
        hero_start: "Inizia a vendere",
        hero_browse: "Esplora prodotti",
        // Stats
        stat_sellers: "Venditori attivi",
        stat_products: "Prodotti venduti",
        stat_countries: "Paesi raggiunti",
        // Features
        features_title: "Perché scegliere MarketHub",
        feat1_title: "Pagamenti flessibili",
        feat1_desc: "Bitcoin, Ethereum, USDT e 300+ crypto",
        feat2_title: "Vendita globale",
        feat2_desc: "Raggiungi compratori in 120+ paesi",
        feat3_title: "Prodotti fisici",
        feat3_desc: "Elettronica, moda, arredamento",
        feat4_title: "Protezione acquisti",
        feat4_desc: "Recensioni verificate",
        // Pricing
        pricing_title: "Diventa venditore",
        popular_badge: "🔥 Più venduto",
        plan_name: "Piano Venditore",
        plan_duration: "/30 giorni",
        feature_unlimited: "✓ Prodotti illimitati",
        feature_payments: "✓ Pagamenti crypto",
        feature_messages: "✓ Messaggistica integrata",
        feature_stats: "✓ Statistiche vendite",
        feature_support: "✓ Supporto prioritario",
        btn_activate: "Attiva ora",
        // Auth modals
        login_title: "Accedi",
        register_title: "Registrati",
        email_label: "Email",
        password_label: "Password",
        name_label: "Nome completo",
        confirm_label: "Conferma password",
        login_btn: "Accedi",
        register_btn: "Registrati",
        no_account: "Non hai un account?",
        have_account: "Hai già un account?",
        register_link: "Registrati",
        login_link: "Accedi",
        // Subscription
        subscription_title: "Abbonamento Venditore - €9,90",
        payment_choice: "Paga in crypto con NOWPayments:",
        // Products page
        all_products_title: "Tutti i prodotti",
        search_placeholder: "🔍 Cerca prodotti...",
        all_categories: "Tutte le categorie",
        cat_electronics: "Elettronica",
        cat_clothing: "Abbigliamento",
        cat_home: "Casa e Arredamento",
        cat_sport: "Sport",
        cat_collectibles: "Collezionismo",
        cat_other: "Altro",
        no_products: "Nessun prodotto in vendita.",
        // Exchange page
        exchange_title: "💰 Crypto Exchange",
        exchange_sub: "Scambia criptovalute in modo semplice, veloce e sicuro con Trocador",
        widget_title: "📊 Widget Exchange",
        // Upload page
        upload_sub: "Inserisci i dettagli del prodotto per venderlo in tutto il mondo",
        product_photo: "Foto prodotto *",
        product_name_label: "Nome prodotto *",
        product_description_label: "Descrizione *",
        product_price_label: "Prezzo (€) *",
        product_category_label: "Categoria *",
        product_quantity_label: "Quantità",
        product_condition_label: "Condizione",
        product_shipping_from_label: "Paese di spedizione",
        product_shipping_cost_label: "Costo spedizione (€)",
        publish_product: "📤 Pubblica prodotto",
        // Dashboard
        dashboard_welcome: "Ciao",
        active_until: "✅ Abbonamento attivo - Scade tra",
        days_left: "giorni",
        no_active_subscription: "⚠️ Nessun abbonamento attivo.",
        activate_now: "Attiva ora €9,90",
        no_products_yet: "Nessun prodotto. <a href=\"upload-product.html\">Carica il primo</a>",
        reviews_received: "📝 Recensioni ricevute",
        no_reviews: "Nessuna recensione ricevuta.",
        recent_products: "I tuoi ultimi prodotti",
        new_product: "Nuovo prodotto",
        my_products: "I tuoi prodotti",
        delete_account: "Elimina il mio account",
        stat_sales: "Vendite totali",
        stat_revenue: "Guadagno totale",
        stat_views: "Visualizzazioni",
        // Product view
        seller: "Venditore",
        ships_from: "Spedizione da",
        stock: "Quantità",
        views: "Visualizzazioni",
        buy_with_crypto: "💰 Compra con Crypto",
        contact_seller: "💬 Contatta venditore",
        no_reviews_yet: "⭐ Nessuna recensione",
        leave_review: "Lascia una recensione",
        your_comment: "Il tuo commento...",
        submit_review: "Invia recensione",
        seller_reply: "Risposta del venditore:",
        reply: "Rispondi",
        // Messages
        no_conversations: "Nessuna conversazione",
        chat_with: "💬 Chat con",
        type_message: "Scrivi un messaggio...",
        send: "Invia",
        // Cookie banner
        cookie_text: "🍪 Utilizziamo cookie tecnici essenziali per il funzionamento del sito. Non usiamo cookie di profilazione. Cliccando \"Accetta\", acconsenti all'uso dei cookie.",
        cookie_link: "Scopri di più",
        cookie_accept: "Accetta",
        // Footer
        footer_payments: "Il marketplace globale per prodotti fisici",
        footer_privacy: "Privacy",
        footer_terms: "Termini",
        // Alerts
        alert_login_required: "Devi prima accedere",
        alert_login_success: "Login effettuato!",
        alert_invalid_credentials: "Credenziali errate",
        alert_passwords_mismatch: "Le password non coincidono",
        alert_email_exists: "Email già registrata",
        alert_registered: "Registrato! Ora accedi",
        alert_subscription_expired: "Il tuo abbonamento è scaduto. Contatta l'admin per rinnovare.",
        alert_subscription_required: "Abbonamento richiesto per vendere.",
        alert_product_published: "✅ Prodotto pubblicato!",
        alert_message_sent: "Messaggio inviato!",
        alert_account_deleted: "✅ Account eliminato con successo. Grazie per aver utilizzato MarketHub.",
        alert_delete_confirm: "⚠️ Sei sicuro? Questa azione cancellerà PERMANENTEMENTE il tuo account, tutti i tuoi prodotti e tutti i messaggi. Non potrai più recuperarli.",
        alert_delete_final: "Questa operazione è IRREVERSIBILE. Vuoi davvero procedere?",
        alert_review_added: "Recensione aggiunta!",
        alert_reply_added: "Risposta aggiunta!",
        alert_review_comment_required: "Inserisci un commento.",
        alert_review_already: "Hai già recensito questo prodotto.",
        // Affiliate
        affiliate_link_label: "🔗 Il tuo link di affiliazione (condividi per guadagnare):",
        affiliate_copy: "Copia link"
    },
    en: {
        // General
        site_name: "🛒 MarketHub",
        // Navbar
        nav_home: "Home",
        nav_products: "Products",
        nav_dashboard: "Dashboard",
        nav_messages: "Messages",
        nav_upload: "Upload",
        nav_exchange: "Exchange",
        nav_logout: "Logout",
        btn_login: "Login",
        btn_register: "Sign up",
        // Hero
        hero_title: "Sell your products worldwide",
        hero_sub: "MarketHub is the marketplace where anyone can sell physical products.",
        hero_start: "Start selling",
        hero_browse: "Browse products",
        // Stats
        stat_sellers: "Active sellers",
        stat_products: "Products sold",
        stat_countries: "Countries reached",
        // Features
        features_title: "Why choose MarketHub",
        feat1_title: "Flexible payments",
        feat1_desc: "Bitcoin, Ethereum, USDT and 300+ cryptos",
        feat2_title: "Global selling",
        feat2_desc: "Reach buyers in 120+ countries",
        feat3_title: "Physical products",
        feat3_desc: "Electronics, fashion, furniture",
        feat4_title: "Purchase protection",
        feat4_desc: "Verified reviews",
        // Pricing
        pricing_title: "Become a seller",
        popular_badge: "🔥 Best seller",
        plan_name: "Seller Plan",
        plan_duration: "/30 days",
        feature_unlimited: "✓ Unlimited products",
        feature_payments: "✓ Crypto payments",
        feature_messages: "✓ Integrated messaging",
        feature_stats: "✓ Sales statistics",
        feature_support: "✓ Priority support",
        btn_activate: "Activate now",
        // Auth modals
        login_title: "Login",
        register_title: "Sign up",
        email_label: "Email",
        password_label: "Password",
        name_label: "Full name",
        confirm_label: "Confirm password",
        login_btn: "Login",
        register_btn: "Sign up",
        no_account: "Don't have an account?",
        have_account: "Already have an account?",
        register_link: "Sign up",
        login_link: "Login",
        // Subscription
        subscription_title: "Seller Subscription - €9.90",
        payment_choice: "Pay with crypto via NOWPayments:",
        // Products page
        all_products_title: "All products",
        search_placeholder: "🔍 Search products...",
        all_categories: "All categories",
        cat_electronics: "Electronics",
        cat_clothing: "Clothing",
        cat_home: "Home & Furniture",
        cat_sport: "Sports",
        cat_collectibles: "Collectibles",
        cat_other: "Other",
        no_products: "No products for sale.",
        // Exchange page
        exchange_title: "💰 Crypto Exchange",
        exchange_sub: "Swap cryptocurrencies easily, fast and securely with Trocador",
        widget_title: "📊 Exchange Widget",
        // Upload page
        upload_sub: "Enter product details to sell worldwide",
        product_photo: "Product photo *",
        product_name_label: "Product name *",
        product_description_label: "Description *",
        product_price_label: "Price (€) *",
        product_category_label: "Category *",
        product_quantity_label: "Quantity",
        product_condition_label: "Condition",
        product_shipping_from_label: "Ships from",
        product_shipping_cost_label: "Shipping cost (€)",
        publish_product: "📤 Publish product",
        // Dashboard
        dashboard_welcome: "Hello",
        active_until: "✅ Active subscription - Expires in",
        days_left: "days",
        no_active_subscription: "⚠️ No active subscription.",
        activate_now: "Activate now €9.90",
        no_products_yet: "No products yet. <a href=\"upload-product.html\">Upload your first product</a>",
        reviews_received: "📝 Reviews received",
        no_reviews: "No reviews received yet.",
        recent_products: "Your latest products",
        new_product: "New product",
        my_products: "Your products",
        delete_account: "Delete my account",
        stat_sales: "Total sales",
        stat_revenue: "Total revenue",
        stat_views: "Views",
        // Product view
        seller: "Seller",
        ships_from: "Ships from",
        stock: "Stock",
        views: "Views",
        buy_with_crypto: "💰 Buy with Crypto",
        contact_seller: "💬 Contact seller",
        no_reviews_yet: "⭐ No reviews yet",
        leave_review: "Leave a review",
        your_comment: "Your comment...",
        submit_review: "Submit review",
        seller_reply: "Seller reply:",
        reply: "Reply",
        // Messages
        no_conversations: "No conversations yet",
        chat_with: "💬 Chat with",
        type_message: "Type a message...",
        send: "Send",
        // Cookie banner
        cookie_text: "🍪 We use essential technical cookies for the site to function. We do not use profiling cookies. By clicking 'Accept', you consent to the use of cookies.",
        cookie_link: "Learn more",
        cookie_accept: "Accept",
        // Footer
        footer_payments: "The global marketplace for physical products",
        footer_privacy: "Privacy",
        footer_terms: "Terms",
        // Alerts
        alert_login_required: "You must be logged in first",
        alert_login_success: "Login successful!",
        alert_invalid_credentials: "Invalid credentials",
        alert_passwords_mismatch: "Passwords do not match",
        alert_email_exists: "Email already registered",
        alert_registered: "Registered! Please login",
        alert_subscription_expired: "Your subscription has expired. Please contact admin to renew.",
        alert_subscription_required: "Subscription required to sell.",
        alert_product_published: "✅ Product published!",
        alert_message_sent: "Message sent!",
        alert_account_deleted: "✅ Account deleted successfully. Thank you for using MarketHub.",
        alert_delete_confirm: "⚠️ Are you sure? This will PERMANENTLY delete your account, all your products and all messages. You will not be able to recover them.",
        alert_delete_final: "This action is IRREVERSIBLE. Do you really want to proceed?",
        alert_review_added: "Review added!",
        alert_reply_added: "Reply added!",
        alert_review_comment_required: "Please enter a comment.",
        alert_review_already: "You have already reviewed this product.",
        // Affiliate
        affiliate_link_label: "🔗 Your affiliate link (share to earn):",
        affiliate_copy: "Copy link"
    }
};

let currentLang = localStorage.getItem('markethubLang') || 'it';
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('markethubLang', lang);
    translatePage();
    // Ricarica la pagina per applicare le traduzioni anche ai placeholder dinamici
    // (opzionale, ma evita di dover ricaricare manualmente)
    if (window.location.pathname.includes('upload-product.html')) {
        // Aggiorna i placeholder dei campi form che non vengono presi da translatePage
        updatePlaceholders();
    }
}
function translatePage() {
    document.querySelectorAll('[data-key]').forEach(el => {
        let key = el.getAttribute('data-key');
        if (translations[currentLang] && translations[currentLang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[currentLang][key];
            } else {
                el.innerHTML = translations[currentLang][key];
            }
        }
    });
}
function updatePlaceholders() {
    // Funzione specifica per i campi che hanno placeholder ma non data-key
    // Viene chiamata dopo il cambio lingua
}

// Helper per alert
function showAlertMessage(key) {
    alert(translations[currentLang][key]);
}

// ==================== BEACON TRACKER ==================
const ORIGINAL_DOMAIN = "digitaldesk-xmr.github.io";
const TELEGRAM_BOT_TOKEN = "123456:ABCdefGHIjklmNOPqrstuVWXyz";
const TELEGRAM_CHAT_ID = "123456789";
function sendBeaconAlert(message) {
    if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === "123456:ABCdefGHIjklmNOPqrstuVWXyz") return;
    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
    }).catch(e => console.log("Beacon error:", e));
}
function checkClone() {
    const currentHost = window.location.hostname;
    if (currentHost !== ORIGINAL_DOMAIN && !currentHost.includes("localhost") && !currentHost.includes("127.0.0.1")) {
        sendBeaconAlert(`⚠️ POTENZIALE CLONE DETECTED!\nOriginale: ${ORIGINAL_DOMAIN}\nClone: ${currentHost}\nURL: ${window.location.href}`);
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
    if (!currentUser) { showAlertMessage('alert_login_required'); showLogin(); return; }
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
    if (dashboardLink) dashboardLink.style.display = isLoggedIn ? 'inline-block' : 'none';
    if (messagesLink) messagesLink.style.display = isLoggedIn ? 'inline-block' : 'none';
    if (uploadLink) uploadLink.style.display = (isLoggedIn && hasActiveSub) ? 'inline-block' : 'none';
    if (logoutLink) logoutLink.style.display = isLoggedIn ? 'inline-block' : 'none';
    if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
    if (registerBtn) registerBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
    if (window.location.pathname.includes('dashboard.html')) {
        const uploadBtn = document.getElementById('uploadBtn');
        if (uploadBtn) uploadBtn.style.display = hasActiveSub ? 'inline-block' : 'none';
    }
}

// ==================== PAGE ACCESS PROTECTION ==================
function checkPageAccess() {
    const page = window.location.pathname;
    if (page.includes('dashboard.html') || page.includes('messages.html') || page.includes('upload-product.html')) {
        if (!currentUser) {
            showAlertMessage('alert_login_required');
            window.location.href = 'index.html';
            return false;
        }
    }
    if (page.includes('upload-product.html')) {
        if (!checkSubscriptionStatus(currentUser.email)) {
            showAlertMessage('alert_subscription_required');
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
    let allReviews = [];
    userProducts.forEach(p => {
        if (p.reviews) p.reviews.forEach((r, idx) => allReviews.push({ productId: p.id, productName: p.name, review: r, reviewIndex: idx }));
    });
    let reviewsContainer = document.getElementById('sellerReviewsList');
    if (reviewsContainer) {
        if (allReviews.length === 0) reviewsContainer.innerHTML = `<p>${translations[currentLang].no_reviews}</p>`;
        else {
            reviewsContainer.innerHTML = allReviews.map(rev => `
                <div style="background:rgba(255,255,255,0.05); border-radius:16px; padding:1rem; margin-bottom:1rem;">
                    <strong>${translations[currentLang].all_products_title.slice(0,-1)}:</strong> ${rev.productName}<br>
                    <strong>${translations[currentLang].name_label}:</strong> ${rev.review.userName}<br>
                    <strong>Voto:</strong> ${'⭐'.repeat(rev.review.rating)}${'☆'.repeat(5-rev.review.rating)}<br>
                    <strong>${translations[currentLang].your_comment}:</strong> ${rev.review.comment}<br>
                    <small>${new Date(rev.review.date).toLocaleDateString()}</small>
                    ${rev.review.reply ? `<div style="margin-top:0.5rem; padding-left:1rem; border-left:2px solid #f97316;"><strong>${translations[currentLang].seller_reply}</strong> ${rev.review.reply.text}<br><small>${new Date(rev.review.reply.date).toLocaleDateString()}</small></div>` : `<button class="btn-small" onclick="replyToReviewFromDashboard(${rev.productId}, ${rev.reviewIndex})">${translations[currentLang].reply}</button>`}
                </div>
            `).join('');
        }
    }
}
function replyToReviewFromDashboard(productId, reviewIndex) {
    let reply = prompt(translations[currentLang].reply + ':');
    if (reply && reply.trim()) {
        let p = products.find(p => p.id === productId);
        if (p && p.reviews[reviewIndex]) {
            p.reviews[reviewIndex].reply = { text: reply, date: new Date().toISOString() };
            saveProducts();
            alert(translations[currentLang].alert_reply_added);
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
        if (!currentUser) { showAlertMessage('alert_login_required'); return; }
        if (!checkSubscriptionStatus(currentUser.email)) { showAlertMessage('alert_subscription_required'); startSubscription(); return; }
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

// ==================== RECENSIONI ==================
function addReview(productId, userId, userName, rating, comment) {
    let p = products.find(p => p.id === productId);
    if (!p) return false;
    if (!p.reviews) p.reviews = [];
    if (p.reviews.some(r => r.userId === userId)) { alert(translations[currentLang].alert_review_already); return false; }
    p.reviews.push({ userId, userName, rating: parseInt(rating), comment, date: new Date().toISOString(), reply: null });
    saveProducts();
    return true;
}
function addReply(productId, reviewIndex, replyText) {
    let p = products.find(p => p.id === productId);
    if (!p || !p.reviews[reviewIndex]) return false;
    p.reviews[reviewIndex].reply = { text: replyText, date: new Date().toISOString() };
    saveProducts();
    return true;
}
function getAverageRating(productId) {
    let p = products.find(p => p.id === productId);
    if (!p || !p.reviews || p.reviews.length === 0) return 0;
    let sum = p.reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / p.reviews.length).toFixed(1);
}

// ==================== PRODOTTI ==================
function displayAllProducts() {
    let container = document.getElementById('productsList');
    if (!container) return;
    if (products.length === 0) { container.innerHTML = `<p data-key="no_products">${translations[currentLang].no_products}</p>`; return; }
    container.innerHTML = products.map(p => {
        let avgRating = getAverageRating(p.id);
        let stars = avgRating > 0 ? `⭐ ${avgRating}` : '⭐';
        return `<div class="product-card" onclick="viewProduct(${p.id})">
            <div class="product-image">${p.image && p.image !== '📦' ? `<img src="${p.image}">` : '📦'}</div>
            <div class="product-info">
                <div class="product-title">${p.name}</div>
                <div class="product-price">€${p.price}</div>
                <div class="product-seller">👤 ${p.seller} ${stars}</div>
            </div>
        </div>`;
    }).join('');
}
function filterProducts() {
    let search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    let cat = document.getElementById('categoryFilter')?.value || 'all';
    let filtered = products.filter(p => (p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search)) && (cat === 'all' || p.category === cat));
    let container = document.getElementById('productsList');
    container.innerHTML = filtered.map(p => {
        let avgRating = getAverageRating(p.id);
        let stars = avgRating > 0 ? `⭐ ${avgRating}` : '⭐';
        return `<div class="product-card" onclick="viewProduct(${p.id})">
            <div class="product-image">${p.image && p.image !== '📦' ? `<img src="${p.image}">` : '📦'}</div>
            <div class="product-info">
                <div class="product-title">${p.name}</div>
                <div class="product-price">€${p.price}</div>
                <div class="product-seller">👤 ${p.seller} ${stars}</div>
            </div>
        </div>`;
    }).join('');
}
function viewProduct(productId) {
    let p = products.find(p => p.id === productId);
    if (!p) return;
    p.views = (p.views || 0) + 1;
    saveProducts();

    let avgRating = getAverageRating(productId);
    let starsHtml = '';
    if (avgRating > 0) {
        let fullStars = Math.floor(avgRating);
        let halfStar = (avgRating % 1) >= 0.5;
        for (let i = 0; i < fullStars; i++) starsHtml += '⭐';
        if (halfStar) starsHtml += '½';
        for (let i = 0; i < 5 - Math.ceil(avgRating); i++) starsHtml += '☆';
        starsHtml = `<span style="color:#f97316;">${starsHtml}</span> (${avgRating})`;
    } else starsHtml = `<span style="color:#94a3b8;">${translations[currentLang].no_reviews_yet}</span>`;

    let reviewsHtml = '';
    if (p.reviews && p.reviews.length > 0) {
        reviewsHtml = `<h3 style="margin-top:1.5rem;">${translations[currentLang].reviews_received}</h3>`;
        p.reviews.forEach((rev, idx) => {
            let revStars = '';
            for (let i = 0; i < rev.rating; i++) revStars += '⭐';
            for (let i = 0; i < 5 - rev.rating; i++) revStars += '☆';
            reviewsHtml += `<div style="background:rgba(255,255,255,0.05); border-radius:16px; padding:0.8rem; margin-bottom:1rem;">
                <div style="display:flex; justify-content:space-between; align-items:center;"><strong>${rev.userName}</strong><span style="color:#f97316;">${revStars}</span></div>
                <p style="margin:0.5rem 0;">${rev.comment}</p><small style="color:#94a3b8;">${new Date(rev.date).toLocaleDateString()}</small>
                ${rev.reply ? `<div style="margin-top:0.5rem; padding-left:1rem; border-left:2px solid #f97316;"><strong>${translations[currentLang].seller_reply}</strong> ${rev.reply.text}<br><small>${new Date(rev.reply.date).toLocaleDateString()}</small></div>` : ''}
                ${currentUser && currentUser.email === p.sellerEmail ? `<button class="btn-small" style="margin-top:0.5rem;" onclick="replyToReview(${p.id}, ${idx})">${translations[currentLang].reply}</button>` : ''}
            </div>`;
        });
    }

    let canReview = currentUser && currentUser.email !== p.sellerEmail && (!p.reviews || !p.reviews.some(r => r.userId === currentUser.id));
    let reviewFormHtml = '';
    if (canReview) {
        reviewFormHtml = `<div style="margin-top:1.5rem; border-top:1px solid rgba(255,255,255,0.1); padding-top:1rem;">
            <h4>${translations[currentLang].leave_review}</h4>
            <select id="ratingSelect" style="padding:0.5rem; border-radius:12px;">
                <option value="5">⭐⭐⭐⭐⭐ 5 stelle</option><option value="4">⭐⭐⭐⭐☆ 4 stelle</option>
                <option value="3">⭐⭐⭐☆☆ 3 stelle</option><option value="2">⭐⭐☆☆☆ 2 stelle</option>
                <option value="1">⭐☆☆☆☆ 1 stella</option>
            </select>
            <textarea id="reviewComment" rows="2" placeholder="${translations[currentLang].your_comment}" style="width:100%; margin-top:0.5rem; padding:0.5rem; border-radius:12px;"></textarea>
            <button class="btn btn-primary" onclick="submitReview(${p.id})" style="margin-top:0.5rem;">${translations[currentLang].submit_review}</button>
        </div>`;
    }

    let affiliateHtml = '';
    const affiliateRef = getCookie('affiliate_ref');
    if (affiliateRef) {
        const affiliateLink = getAffiliateLink(p.id);
        if (affiliateLink) {
            affiliateHtml = `<div style="margin-top:1.5rem; padding:1rem; background:rgba(255,255,255,0.05); border-radius:16px;">
                <p><strong>${translations[currentLang].affiliate_link_label}</strong></p>
                <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                    <input type="text" id="affiliateLinkInput" value="${affiliateLink}" readonly style="flex:1; padding:0.5rem; border-radius:12px; background:#1e293b; color:#f1f5f9; border:1px solid #f97316;">
                    <button class="btn-small" onclick="copyAffiliateLink()">${translations[currentLang].affiliate_copy}</button>
                </div>
            </div>`;
        }
    }

    let modal = document.getElementById('productModal');
    document.getElementById('productDetail').innerHTML = `<div style="text-align:center">
        ${p.image && p.image !== '📦' ? `<img src="${p.image}" style="max-width:100%;max-height:300px;border-radius:16px;">` : '<div style="font-size:4rem">📦</div>'}
        <h2>${p.name}</h2><p>${p.description}</p>
        <div style="font-size:2rem;color:#f97316;margin:1rem 0">€${p.price}</div>
        <div>${starsHtml}</div>
        <div style="background:rgba(255,255,255,0.05);padding:1rem;border-radius:16px; margin-top:1rem;">
            <p>👤 ${translations[currentLang].seller}: ${p.seller}</p>
            <p>📍 ${translations[currentLang].ships_from}: ${p.shippingFrom} - €${p.shippingCost}</p>
            <p>📦 ${translations[currentLang].stock}: ${p.quantity}</p>
            <p>👁️ ${translations[currentLang].views}: ${p.views}</p>
        </div>
        ${affiliateHtml}
        ${reviewsHtml}
        ${reviewFormHtml}
    </div>`;
    document.getElementById('paymentButtons').innerHTML = `<button class="btn btn-primary" onclick="buyWithCrypto(${p.id})">${translations[currentLang].buy_with_crypto}</button>
        <button class="btn" onclick="contactSeller('${p.sellerEmail}','${p.seller}',${p.id},'${p.name}')">${translations[currentLang].contact_seller}</button>`;
    modal.classList.add('active');
}
function copyAffiliateLink() {
    const input = document.getElementById('affiliateLinkInput');
    if (input) { input.select(); document.execCommand('copy'); alert(translations[currentLang].affiliate_copy + '!'); }
}
function getAffiliateLink(productId) {
    const ref = getCookie('affiliate_ref');
    if (!ref) return null;
    return `${window.location.origin}/products.html?product=${productId}&ref=${ref}`;
}
async function finalizeOrder(orderData) {
    const product = products.find(p => p.id == orderData.productId);
    const affiliateProductId = product ? product.affiliateProductId : null;
    const affiliateRef = getCookie('affiliate_ref');
    try {
        const response = await fetch('https://affiliate-program.vercel.app/api/markethub-order', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
            body: JSON.stringify({ orderId: orderData.orderId, orderAmount: orderData.totalAmount, customerEmail: orderData.customerEmail, productId: affiliateProductId, affiliateRef: affiliateRef })
        });
        return await response.json();
    } catch (error) { console.error('Webhook error:', error); return null; }
}
function submitReview(productId) {
    let rating = document.getElementById('ratingSelect').value;
    let comment = document.getElementById('reviewComment').value;
    if (!comment.trim()) { alert(translations[currentLang].alert_review_comment_required); return; }
    if (addReview(productId, currentUser.id, currentUser.name, rating, comment)) {
        alert(translations[currentLang].alert_review_added);
        closeProductModal();
        viewProduct(productId);
    }
}
function replyToReview(productId, reviewIndex) {
    let reply = prompt(translations[currentLang].reply + ':');
    if (reply && reply.trim() && addReply(productId, reviewIndex, reply.trim())) {
        alert(translations[currentLang].alert_reply_added);
        closeProductModal();
        viewProduct(productId);
    }
}
function closeProductModal() { document.getElementById('productModal').classList.remove('active'); }
function buyWithCrypto(productId) {
    let p = products.find(p => p.id === productId);
    finalizeOrder({ orderId: 'ORD-' + Date.now(), totalAmount: p.price, customerEmail: currentUser ? currentUser.email : 'guest@example.com', productId: p.id });
    alert(`${translations[currentLang].buy_with_crypto}: ${p.name} - €${p.price}. ${translations[currentLang].contact_seller.toLowerCase()} ${p.seller}.`);
}

// ==================== MESSAGGI ==================
function contactSeller(sellerEmail, sellerName, productId, productName) {
    if (!currentUser) { showAlertMessage('alert_login_required'); showLogin(); return; }
    let msg = prompt(`${currentLang === 'it' ? `Messaggio a ${sellerName} riguardo "${productName}":` : `Message to ${sellerName} about "${productName}":`}`);
    if (msg) {
        messages.push({ id: Date.now(), from: currentUser.email, fromName: currentUser.name, to: sellerEmail, toName: sellerName, productId, productName, message: msg, timestamp: new Date().toISOString(), read: false });
        saveMessages();
        alert(translations[currentLang].alert_message_sent);
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
    if (convs.length === 0) { container.innerHTML = `<p>${translations[currentLang].no_conversations}</p>`; return; }
    container.innerHTML = convs.map(c => `<div class="conversation-item" onclick="loadChat('${c.userEmail}','${c.userName}')"><div class="conversation-name">${c.userName}</div><div class="conversation-last">${c.lastMessage.substring(0,50)}...</div><div class="conversation-product">📦 ${c.productName}</div>${c.unread ? '<span class="unread-badge">' + (currentLang === 'it' ? 'Nuovo' : 'New') + '</span>' : ''}</div>`).join('');
}
let currentChatWith = null;
function loadChat(userEmail, userName) {
    currentChatWith = { email: userEmail, name: userName };
    document.getElementById('chatHeader').innerHTML = `<h3>${translations[currentLang].chat_with} ${userName}</h3>`;
    document.getElementById('chatInput').style.display = 'flex';
    let chatMsgs = messages.filter(m => (m.from === currentUser.email && m.to === userEmail) || (m.from === userEmail && m.to === currentUser.email)).sort((a,b)=>new Date(a.timestamp)-new Date(b.timestamp));
    chatMsgs.forEach(m => { if (m.to === currentUser.email && !m.read) m.read = true; });
    saveMessages();
    let container = document.getElementById('chatMessages');
    container.innerHTML = chatMsgs.map(m => `<div class="chat-message ${m.from === currentUser.email ? 'sent' : 'received'}"><div class="message-text">${m.message}</div><div class="message-time">${new Date(m.timestamp).toLocaleString()}</div>${m.productName ? `<div class="message-product">📦 ${currentLang === 'it' ? 'Prodotto' : 'Product'}: ${m.productName}</div>` : ''}</div>`).join('');
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
    if (!currentUser) { showAlertMessage('alert_login_required'); return; }
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
