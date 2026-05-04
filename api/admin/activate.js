import { supabase } from '../utils/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const auth = req.headers.authorization;
  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { email, days = 30 } = req.body;
  const expires = new Date(); expires.setDate(expires.getDate() + days);
  
  const { data: existing } = await supabase.from('subscriptions').select('email').eq('email', email);
  if (existing && existing.length > 0) {
    await supabase.from('subscriptions').update({ expires_date: expires.toISOString() }).eq('email', email);
  } else {
    await supabase.from('subscriptions').insert([{ email, expires_date: expires.toISOString(), activated_by: 'admin' }]);
  }
  
  // ✅ INVIA EMAIL DI ATTIVAZIONE ABBONAMENTO
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (accessKey) {
    try {
      // Recupera nome utente
      const { data: user } = await supabase.from('users').select('name').eq('email', email);
      const userName = user?.[0]?.name || 'Venditore';
      
      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('subject', '🎉 Abbonamento MarketHub attivato!');
      formData.append('to_email', email);
      formData.append('from_name', 'MarketHub');
      formData.append('message', `Ciao ${userName},\n\nIl tuo abbonamento è stato attivato per 30 giorni.\n\nOra puoi pubblicare annunci su MarketHub.\n\nTeam MarketHub`);
      await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
    } catch (err) {
      console.error('Errore invio email attivazione:', err);
    }
  }
  
  res.status(200).json({ success: true });
}
