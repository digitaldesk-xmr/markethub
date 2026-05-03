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
  res.status(200).json({ success: true });
}
