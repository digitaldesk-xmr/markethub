// ==================== MULTILINGUA ==================
const translations = {
    it: {
        site_name: "MarketHub", nav_home: "Home", nav_products: "Prodotti", nav_dashboard: "Dashboard",
        btn_login: "Accedi", btn_register: "Registrati", hero_title: "Vendi i tuoi prodotti in tutto il mondo",
        hero_sub: "MarketHub è il marketplace dove chiunque può vendere prodotti fisici. Pagamenti sicuri, commissioni trasparenti.",
        hero_start: "Inizia a vendere", hero_browse: "Esplora prodotti", features_title: "Perché scegliere MarketHub",
        feat1_title: "Pagamenti flessibili", feat1_desc: "Carta, PayPal, Bitcoin, Ethereum e 300+ crypto",
        feat2_title: "Vendita globale", feat2_desc: "Raggiungi compratori in 120+ paesi",
        feat3_title: "Prodotti fisici", feat3_desc: "Elettronica, moda, arredamento, collezionismo",
        feat4_title: "Protezione acquisti", feat4_desc: "Recensioni verificate e assistenza clienti",
        pricing_title: "Diventa venditore", btn_choose: "Scegli", login_title: "Accedi", register_title: "Registrati",
        email_label: "Email", password_label: "Password", name_label: "Nome", confirm_label: "Conferma password",
        login_btn: "Accedi", register_btn: "Registrati", no_account: "Non hai un account?", have_account: "Hai già un account?",
        register_link: "Registrati", login_link: "Accedi", footer_payments: "Pagamenti sicuri con Stripe e NOWPayments"
    },
    en: {
        site_name: "MarketHub", nav_home: "Home", nav_products: "Products", nav_dashboard: "Dashboard",
        btn_login: "Login", btn_register: "Sign up", hero_title: "Sell your products worldwide",
        hero_sub: "MarketHub is the marketplace where anyone can sell physical products. Secure payments, transparent fees.",
        hero_start: "Start selling", hero_browse: "Browse products", features_title: "Why choose MarketHub",
        feat1_title: "Flexible payments", feat1_desc: "Card, PayPal, Bitcoin, Ethereum and 300+ cryptocurrencies",
        feat2_title: "Global selling", feat2_desc: "Reach buyers in 120+ countries",
        feat3_title: "Physical products", feat3_desc: "Electronics, fashion, furniture, collectibles",
        feat4_title: "Purchase protection", feat4_desc: "Verified reviews and customer support",
        pricing_title: "Become a seller", btn_choose: "Choose", login_title: "Login", register_title: "Sign up",
        email_label: "Email", password_label: "Password", name_label: "Name", confirm_label: "Confirm password",
        login_btn: "Login", register_btn: "Sign up", no_account: "Don't have an account?", have_account: "Already have an account?",
        register_link: "Sign up", login_link: "Login", footer_payments: "Secure payments with Stripe and NOWPayments"
    }
};

let currentLang = localStorage.getItem('markethubLang') || 'it';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('markethubLang', lang);
    translatePage();
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

// ==================== DATABASE LOCALI ==================
let products = [];
let messages = [];
let currentUser = null;

function saveProducts() { localStorage.setItem('markethubProducts', JSON.stringify(products)); }
function loadProducts() { let stored = localStorage.getItem('markethubProducts'); if (stored) products = JSON.parse(stored); else products = []; }
function saveMessages() { localStorage.setItem('markethubMessages', JSON.stringify(messages)); }
function loadMessages() { let stored = localStorage.getItem('markethubMessages'); if (stored) messages = JSON.parse(stored); else messages = []; }
function saveCurrentUser(user) { currentUser = user; localStorage.setItem('markethubUser', JSON.stringify(user)); }
function loadCurrentUser() { let user = localStorage.getItem('markethubUser'); if (user) currentUser = JSON.parse(user); }

// ==================== AUTH ==================
function showLogin() { document.getElementById('loginModal').classList.add('active'); }
function closeLogin() { document.getElementById('loginModal').classList.remove('active'); }
function showRegister() { document.getElementById('registerModal').classList.add('active'); }
function closeRegister() { document.getElementById('registerModal').classList.remove('active'); }
function switchToLogin() { closeRegister(); showLogin(); }
function switchToRegister() { closeLogin(); showRegister(); }

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadMessages();
    loadCurrentUser();
    translatePage();
    
    if (window.location.pathname.includes('dashboard.html')) loadDashboard();
    if (window.location.pathname.includes('products.html')) displayAllProducts();
    if (window.location.pathname.includes('messages.html')) displayConversations();
    if (window.location.pathname.includes('upload-product.html')) setupUploadForm();
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let email = document.getElementById('loginEmail').value;
            let pwd = document.getElementById('loginPassword').value;
            let users = JSON.parse(localStorage.getItem('markethubUsers') || '[]');
            let user = users.find(u => u.email === email && u.password === btoa(pwd));
            if (user) {
                saveCurrentUser({ id: user.id, name: user.name, email: user.email });
                alert('Login successful!');
                closeLogin();
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let name = document.getElementById('regName').value;
            let email = document.getElementById('regEmail').value;
            let pwd = document.getElementById('regPassword').value;
            let confirm = document.getElementById('regConfirmPassword').value;
            if (pwd !== confirm) { alert('Passwords do not match'); return; }
            let users = JSON.parse(localStorage.getItem('markethubUsers') || '[]');
            if (users.find(u => u.email === email)) { alert('Email already registered'); return; }
            let newUser = { id: Date.now(), name, email, password: btoa(pwd), joinDate: new Date().toISOString() };
            users.push(newUser);
            localStorage.setItem('markethubUsers', JSON.stringify(users));
            alert('Registered! Please login');
            closeRegister();
            showLogin();
        });
    }
});

function logout() { localStorage.removeItem('markethubUser'); window.location.href = 'index.html'; }

// ==================== SUBSCRIPTION ==================
function checkSubscriptionStatus() {
    let sub = JSON.parse(localStorage.getItem('markethubSubscription'));
    if (sub && new Date(sub.expiresDate) > new Date()) return true;
    localStorage.removeItem('markethubSubscription');
    return false;
}

function startSubscription() {
    if (!currentUser) { alert('Please login first'); showLogin(); return; }
    let modal = document.getElementById('subscriptionModal');
    modal.classList.add('active');
}

function closeSubscriptionModal() { document.getElementById('subscriptionModal').classList.remove('active'); }

function payWithStripe() {
    window.open('https://buy.stripe.com/your-stripe-link', '_blank');
    activateSubscription();
    closeSubscriptionModal();
}

function payWithCrypto() {
    window.open('https://nowpayments.io/payment?api_key=YOUR_API_KEY&price_amount=9.90&price_currency=EUR', '_blank');
    activateSubscription();
    closeSubscriptionModal();
}

function activateSubscription() {
    let subscription = {
        plan: 'Seller',
        startDate: new Date().toISOString(),
        expiresDate: new Date(Date.now() + 30 * 86400000).toISOString()
    };
    localStorage.setItem('markethubSubscription', JSON.stringify(subscription));
    alert('Subscription activated for 30 days!');
    if (window.location.pathname.includes('dashboard.html')) loadDashboard();
}

// ==================== DASHBOARD ==================
function loadDashboard() {
    if (!currentUser) { window.location.href = 'index.html'; return; }
    document.getElementById('userName').innerText = currentUser.name;
    let userProducts = products.filter(p => p.sellerEmail === currentUser.email);
    document.getElementById('totalProducts').innerText = userProducts.length;
    document.getElementById('totalSales').innerText = Math.floor(Math.random() * 50);
    document.getElementById('totalRevenue').innerText = '€' + (Math.random() * 2000).toFixed(2);
    document.getElementById('totalViews').innerText = Math.floor(Math.random() * 1000);
    
    let subActive = checkSubscriptionStatus();
    let subDiv = document.getElementById('subscriptionStatus');
    if (subActive) {
        let sub = JSON.parse(localStorage.getItem('markethubSubscription'));
        subDiv.innerHTML = `✅ Active until ${new Date(sub.expiresDate).toLocaleDateString()}`;
        subDiv.className = 'subscription-status active';
    } else {
        subDiv.innerHTML = `⚠️ No active subscription. <a href="#" onclick="startSubscription()">Activate now €9.90</a>`;
        subDiv.className = 'subscription-status inactive';
    }
    
    let recent = document.getElementById('recentProductsList');
    if (recent) {
        recent.innerHTML = userProducts.slice(0, 4).map(p => `
            <div class="product-card" onclick="viewProduct(${p.id})">
                <div class="product-image">${p.image && p.image !== '📦' ? `<img src="${p.image}">` : '📦'}</div>
                <div class="product-info">
                    <div class="product-title">${p.name}</div>
                    <div class="product-price">€${p.price}</div>
                </div>
            </div>
        `).join('');
        if (userProducts.length === 0) recent.innerHTML = '<p>No products yet. <a href="upload-product.html">Upload your first product</a></p>';
    }
}

// ==================== UPLOAD PRODUCT ==================
function setupUploadForm() {
    let fileInput = document.getElementById('productImageFile');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            let preview = document.getElementById('imagePreview');
            if (this.files && this.files[0]) {
                let reader = new FileReader();
                reader.onload = ev => preview.innerHTML = `<img src="${ev.target.result}" style="max-width:200px;border-radius:12px;">`;
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    
    let form = document.getElementById('uploadProductForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!currentUser) { alert('Please login'); return; }
            if (!checkSubscriptionStatus()) { alert('Subscription required. Please activate.'); startSubscription(); return; }
            
            let file = document.getElementById('productImageFile').files[0];
            let imageData = '📦';
            if (file) imageData = await readFileAsDataURL(file);
            
            let newProduct = {
                id: Date.now(),
                name: document.getElementById('productName').value,
                description: document.getElementById('productDescription').value,
                price: parseFloat(document.getElementById('productPrice').value),
                category: document.getElementById('productCategory').value,
                seller: currentUser.name,
                sellerEmail: currentUser.email,
                sellerId: currentUser.id,
                image: imageData,
                condition: document.getElementById('productCondition').value,
                quantity: parseInt(document.getElementById('productQuantity').value),
                shippingFrom: document.getElementById('productShippingFrom')?.value || 'IT',
                shippingCost: parseFloat(document.getElementById('productShippingCost')?.value || 0),
                date: new Date().toISOString()
            };
            products.push(newProduct);
            saveProducts();
            document.getElementById('uploadMessage').innerHTML = '✅ Product published!';
            document.getElementById('uploadMessage').className = 'alert success';
            setTimeout(() => window.location.href = 'dashboard.html', 1500);
        });
    }
}

function readFileAsDataURL(file) {
    return new Promise(resolve => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

// ==================== PRODUCTS ==================
function displayAllProducts() {
    let container = document.getElementById('productsList');
    if (!container) return;
    if (products.length === 0) {
        container.innerHTML = '<p style="text-align:center; grid-column:1/-1;">No products yet. Be the first to sell!</p>';
        return;
    }
    container.innerHTML = products.map(p => `
        <div class="product-card" onclick="viewProduct(${p.id})">
            <div class="product-image">${p.image && p.image !== '📦' ? `<img src="${p.image}">` : '📦'}</div>
            <div class="product-info">
                <div class="product-title">${p.name}</div>
                <div class="product-price">€${p.price}</div>
                <div class="product-seller">👤 ${p.seller}</div>
            </div>
        </div>
    `).join('');
}

function filterProducts() {
    let search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    let cat = document.getElementById('categoryFilter')?.value || 'all';
    let filtered = products.filter(p => (p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search)) && (cat === 'all' || p.category === cat));
    let container = document.getElementById('productsList');
    container.innerHTML = filtered.map(p => `
        <div class="product-card" onclick="viewProduct(${p.id})">
            <div class="product-image">${p.image && p.image !== '📦' ? `<img src="${p.image}">` : '📦'}</div>
            <div class="product-info">
                <div class="product-title">${p.name}</div>
                <div class="product-price">€${p.price}</div>
                <div class="product-seller">👤 ${p.seller}</div>
            </div>
        </div>
    `).join('');
}

function viewProduct(productId) {
    let p = products.find(p => p.id === productId);
    if (!p) return;
    let modal = document.getElementById('productModal');
    document.getElementById('productDetail').innerHTML = `
        <div style="text-align:center">
            ${p.image && p.image !== '📦' ? `<img src="${p.image}" style="max-width:100%;max-height:300px;border-radius:16px;">` : '<div style="font-size:4rem">📦</div>'}
            <h2>${p.name}</h2>
            <p>${p.description}</p>
            <div style="font-size:2rem;color:#f97316;margin:1rem 0">€${p.price}</div>
            <div style="background:rgba(255,255,255,0.05);padding:1rem;border-radius:16px;">
                <p>👤 Seller: ${p.seller}</p>
                <p>📍 Ships from: ${p.shippingFrom} - €${p.shippingCost}</p>
                <p>📦 Stock: ${p.quantity}</p>
            </div>
        </div>
    `;
    document.getElementById('paymentButtons').innerHTML = `
        <button class="btn btn-primary" onclick="buyWithCard(${p.id})">💳 Buy with Card</button>
        <button class="btn btn-secondary" onclick="buyWithCrypto(${p.id})">💰 Buy with Crypto</button>
        <button class="btn" onclick="contactSeller('${p.sellerEmail}','${p.seller}',${p.id},'${p.name}')">💬 Contact Seller</button>
    `;
    modal.classList.add('active');
}

function closeProductModal() { document.getElementById('productModal').classList.remove('active'); }

function buyWithCard(productId) {
    let p = products.find(p => p.id === productId);
    window.open(`https://buy.stripe.com/your-stripe-link?amount=${p.price}&product=${encodeURIComponent(p.name)}`, '_blank');
    alert("After payment, contact the seller for shipping.");
}

function buyWithCrypto(productId) {
    let p = products.find(p => p.id === productId);
    window.open(`https://nowpayments.io/payment?api_key=YOUR_API_KEY&price_amount=${p.price}&price_currency=EUR&order_description=${encodeURIComponent(p.name)}`, '_blank');
    alert("After payment, contact the seller for shipping.");
}

// ==================== MESSAGES ==================
function contactSeller(sellerEmail, sellerName, productId, productName) {
    if (!currentUser) { alert('Please login first'); showLogin(); return; }
    let msg = prompt(`Message to ${sellerName} about "${productName}":`);
    if (msg) {
        let newMsg = {
            id: Date.now(),
            from: currentUser.email,
            fromName: currentUser.name,
            to: sellerEmail,
            toName: sellerName,
            productId: productId,
            productName: productName,
            message: msg,
            timestamp: new Date().toISOString(),
            read: false
        };
        messages.push(newMsg);
        saveMessages();
        alert('Message sent! The seller will reply in Messages section.');
    }
}

function getUserConversations() {
    if (!currentUser) return [];
    let userMessages = messages.filter(m => m.from === currentUser.email || m.to === currentUser.email);
    let map = new Map();
    userMessages.forEach(msg => {
        let other = msg.from === currentUser.email ? { email: msg.to, name: msg.toName } : { email: msg.from, name: msg.fromName };
        if (!map.has(other.email)) {
            map.set(other.email, {
                userEmail: other.email,
                userName: other.name,
                lastMessage: msg.message,
                lastTimestamp: msg.timestamp,
                productName: msg.productName,
                unread: msg.to === currentUser.email && !msg.read
            });
        } else {
            let existing = map.get(other.email);
            if (new Date(msg.timestamp) > new Date(existing.lastTimestamp)) {
                existing.lastMessage = msg.message;
                existing.lastTimestamp = msg.timestamp;
            }
            if (msg.to === currentUser.email && !msg.read) existing.unread = true;
        }
    });
    return Array.from(map.values()).sort((a, b) => new Date(b.lastTimestamp) - new Date(a.lastTimestamp));
}

function displayConversations() {
    let container = document.getElementById('conversationsList');
    if (!container) return;
    let convs = getUserConversations();
    if (convs.length === 0) { container.innerHTML = '<p>No conversations yet</p>'; return; }
    container.innerHTML = convs.map(c => `
        <div class="conversation-item" onclick="loadChat('${c.userEmail}','${c.userName}')">
            <div class="conversation-name">${c.userName}</div>
            <div class="conversation-last">${c.lastMessage.substring(0, 50)}...</div>
            <div class="conversation-product">📦 ${c.productName}</div>
            ${c.unread ? '<span class="unread-badge">New</span>' : ''}
        </div>
    `).join('');
}

let currentChatWith = null;

function loadChat(userEmail, userName) {
    currentChatWith = { email: userEmail, name: userName };
    document.getElementById('chatHeader').innerHTML = `<h3>💬 Chat with ${userName}</h3>`;
    document.getElementById('chatInput').style.display = 'flex';
    let chatMsgs = messages.filter(m => (m.from === currentUser.email && m.to === userEmail) || (m.from === userEmail && m.to === currentUser.email)).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    chatMsgs.forEach(m => { if (m.to === currentUser.email && !m.read) m.read = true; });
    saveMessages();
    let container = document.getElementById('chatMessages');
    container.innerHTML = chatMsgs.map(m => `
        <div class="chat-message ${m.from === currentUser.email ? 'sent' : 'received'}">
            <div class="message-text">${m.message}</div>
            <div class="message-time">${new Date(m.timestamp).toLocaleString()}</div>
            ${m.productName ? `<div class="message-product">📦 Product: ${m.productName}</div>` : ''}
        </div>
    `).join('');
    container.scrollTop = container.scrollHeight;
}

function sendMessage() {
    let text = document.getElementById('messageText').value;
    if (!text.trim() || !currentChatWith) return;
    let newMsg = {
        id: Date.now(),
        from: currentUser.email,
        fromName: currentUser.name,
        to: currentChatWith.email,
        toName: currentChatWith.name,
        productId: null,
        productName: null,
        message: text,
        timestamp: new Date().toISOString(),
        read: false
    };
    messages.push(newMsg);
    saveMessages();
    document.getElementById('messageText').value = '';
    loadChat(currentChatWith.email, currentChatWith.name);
    displayConversations();
}