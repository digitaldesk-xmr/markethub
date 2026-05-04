// REGISTRAZIONE - versione migliorata
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('registerMessage');
    msg.innerHTML = '';
    msg.className = 'alert';
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const telegram = document.getElementById('regTelegram').value;
    const pwd = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirmPassword').value;
    
    if (pwd !== confirm) {
        msg.innerHTML = 'Le password non coincidono';
        msg.className = 'alert error';
        return;
    }
    
    try {
        const res = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, telegram, password: pwd })
        });
        const data = await res.json();
        
        if (!res.ok) {
            msg.innerHTML = data.error || 'Errore durante la registrazione';
            msg.className = 'alert error';
            return;
        }
        
        msg.innerHTML = '✅ Registrazione completata! Controlla la tua email per il benvenuto.';
        msg.className = 'alert success';
        setTimeout(() => {
            closeRegisterModal();
            openLoginModal();
        }, 2000);
        
    } catch (err) {
        msg.innerHTML = 'Errore di connessione al server';
        msg.className = 'alert error';
    }
});
