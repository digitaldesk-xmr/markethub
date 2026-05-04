import { supabase } from '../utils/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, telegram, password } = req.body;
  if (!name || !email || !telegram || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  
  // Controlla se utente esiste già
  const { data: existing } = await supabase.from('users').select('email').eq('email', email);
  if (existing && existing.length > 0) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  
  // Salva utente (password in base64)
  const encodedPassword = Buffer.from(password).toString('base64');
  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, telegram, password: encodedPassword, register_date: new Date().toISOString() }])
    .select();
  
  if (error) return res.status(500).json({ error: error.message });
  
  // ✅ INVIA EMAIL DI BENVENUTO VIA WEB3FORMS
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (accessKey) {
    try {
      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('subject', '✅ Benvenuto su MarketHub');
      formData.append('to_email', email);
      formData.append('from_name', 'MarketHub');
      formData.append('message', `Ciao ${name},\n\nGrazie per esserti registrato su MarketHub!\n\nAttendi che l'amministratore attivi il tuo abbonamento.\n\nTeam MarketHub`);
      await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
    } catch (err) {
      console.error('Errore invio email benvenuto:', err);
      // Non bloccare la registrazione se l'email fallisce
    }
  }
  
  res.status(201).json({ user: data[0] });
}
