// ==================== SUPABASE INTEGRATION ==================
import SUPABASE_CONFIG from "./supabase-config.js";

const SUPABASE_URL = SUPABASE_CONFIG.URL;
const SUPABASE_ANON_KEY = SUPABASE_CONFIG.ANON_KEY;

// Helper per chiamate Supabase
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
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Supabase error: ${response.status} - ${error}`);
    }
    return response.json();
}

// Leggi tutti i prodotti
async function loadProductsFromSupabase() {
    try {
        const data = await supabaseFetch('products?select=*');
        products = data;
        console.log("Prodotti caricati da Supabase:", products.length);
        return products;
    } catch (error) {
        console.error("Errore caricamento prodotti:", error);
        return [];
    }
}

// Aggiungi un prodotto
async function addProductToSupabase(product) {
    try {
        const data = await supabaseFetch('products', {
            method: 'POST',
            body: JSON.stringify(product)
        });
        if (data && data.length > 0) {
            const newProduct = { ...product, id: data[0].id };
            products.push(newProduct);
            return newProduct.id;
        }
        return null;
    } catch (error) {
        console.error("Errore aggiunta prodotto:", error);
        return null;
    }
}

// Aggiorna le visualizzazioni di un prodotto
async function updateProductViews(productId, views) {
    try {
        await supabaseFetch(`products?id=eq.${productId}`, {
            method: 'PATCH',
            body: JSON.stringify({ views: views })
        });
        const index = products.findIndex(p => p.id == productId);
        if (index !== -1) products[index].views = views;
    } catch (error) {
        console.error("Errore aggiornamento views:", error);
    }
}

// Cancella un prodotto (solo per admin, opzionale)
async function deleteProductFromSupabase(productId) {
    try {
        await supabaseFetch(`products?id=eq.${productId}`, {
            method: 'DELETE'
        });
        products = products.filter(p => p.id != productId);
    } catch (error) {
        console.error("Errore cancellazione prodotto:", error);
    }
}

// ==================== IL RESTO DEL TUO script.js (invariato) ==================
// ... tutte le altre funzioni (multilingua, auth, messaggi, dashboard, upload form, etc.)
// Devono rimanere identiche a come le avevi. Le uniche funzioni da modificare sono
// quelle che prima usavano localStorage per i prodotti (loadProducts, saveProducts, addProduct, updateProduct)
// Ora useranno le funzioni Supabase qui sopra.

// In particolare:
// - In upload-product.html, chiama addProductToSupabase() invece di products.push()
// - In products.html, chiama loadProductsFromSupabase() invece di loadProducts()
// - In viewProduct(), chiama updateProductViews()
// - Nella dashboard, filtra products globali con sellerEmail === currentUser.email
