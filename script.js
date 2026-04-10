// ==================== MULTILINGUA COMPLETO ==================
const translations = {
    it: {
        site_name: "🛒 MarketHub",
        nav_home: "Home",
        nav_products: "Prodotti",
        nav_dashboard: "Dashboard",
        btn_login: "Accedi",
        btn_register: "Registrati",
        hero_title: "Vendi i tuoi prodotti in tutto il mondo",
        hero_sub: "MarketHub è il marketplace dove chiunque può vendere prodotti fisici. Pagamenti sicuri, commissioni trasparenti.",
        hero_start: "Inizia a vendere",
        hero_browse: "Esplora prodotti",
        stat_sellers: "Venditori attivi",
        stat_products: "Prodotti venduti",
        stat_countries: "Paesi raggiunti",
        features_title: "Perché scegliere MarketHub",
        feat1_title: "Pagamenti flessibili",
        feat1_desc: "Carta, PayPal, Bitcoin, Ethereum e 300+ crypto",
        feat2_title: "Vendita globale",
        feat2_desc: "Raggiungi compratori in 120+ paesi",
        feat3_title: "Prodotti fisici",
        feat3_desc: "Elettronica, moda, arredamento, collezionismo",
        feat4_title: "Protezione acquisti",
        feat4_desc: "Recensioni verificate e assistenza clienti",
        pricing_title: "Diventa venditore",
        popular_badge: "🔥 Più venduto",
        plan_name: "Piano Venditore",
        plan_duration: "/30 giorni",
        feature_unlimited: "✓ Prodotti illimitati",
        feature_payments: "✓ Pagamenti crypto e carte",
        feature_messages: "✓ Messaggistica integrata",
        feature_stats: "✓ Statistiche vendite",
        feature_support: "✓ Supporto prioritario",
        btn_activate: "Attiva ora",
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
        subscription_title: "Abbonamento Venditore - €9,90",
        payment_choice: "Scegli il metodo di pagamento:",
        pay_card: "💳 Paga con Carta (Stripe)",
        pay_crypto: "💰 Paga con Crypto (NOWPayments)",
        footer_payments: "Il marketplace globale per prodotti fisici"
    },
    en: {
        site_name: "🛒 MarketHub",
        nav_home: "Home",
        nav_products: "Products",
        nav_dashboard: "Dashboard",
        btn_login: "Login",
        btn_register: "Sign up",
        hero_title: "Sell your products worldwide",
        hero_sub: "MarketHub is the marketplace where anyone can sell physical products. Secure payments, transparent fees.",
        hero_start: "Start selling",
        hero_browse: "Browse products",
        stat_sellers: "Active sellers",
        stat_products: "Products sold",
        stat_countries: "Countries reached",
        features_title: "Why choose MarketHub",
        feat1_title: "Flexible payments",
        feat1_desc: "Card, PayPal, Bitcoin, Ethereum and 300+ cryptocurrencies",
        feat2_title: "Global selling",
        feat2_desc: "Reach buyers in 120+ countries",
        feat3_title: "Physical products",
        feat3_desc: "Electronics, fashion, furniture, collectibles",
        feat4_title: "Purchase protection",
        feat4_desc: "Verified reviews and customer support",
        pricing_title: "Become a seller",
        popular_badge: "🔥 Best seller",
        plan_name: "Seller Plan",
        plan_duration: "/30 days",
        feature_unlimited: "✓ Unlimited products",
        feature_payments: "✓ Crypto & card payments",
        feature_messages: "✓ Integrated messaging",
        feature_stats: "✓ Sales statistics",
        feature_support: "✓ Priority support",
        btn_activate: "Activate now",
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
        subscription_title: "Seller Subscription - €9.90",
        payment_choice: "Choose payment method:",
        pay_card: "💳 Pay with Card (Stripe)",
        pay_crypto: "💰 Pay with Crypto (NOWPayments)",
        footer_payments: "The global marketplace for physical products"
    }
};

let currentLang = localStorage.getItem('markethubLang') || 'it';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('markethubLang', lang);
    translatePage();
}

function translatePage() {
    // Traduci tutti gli elementi con data-key
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
    
    // Traduci anche gli elementi con data-key che sono dentro altri tag (es. span)
    document.querySelectorAll('[data-key]').forEach(el => {
        let key = el.getAttribute('data-key');
        if (translations[currentLang] && translations[currentLang][key]) {
            if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
                el.innerHTML = translations[currentLang][key];
            }
        }
    });
}

// Assicurati che translatePage venga chiamata al caricamento
document.addEventListener('DOMContentLoaded', () => {
    translatePage();
    // ... resto del tuo codice esistente
});
