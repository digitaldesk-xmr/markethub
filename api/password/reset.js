import { supabase } from '../utils/supabase.js';

function generateRandomPassword(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let pwd = '';
  for (let i = 0; i < length; i++) pwd += chars[Math.floor(Math.random() * chars.length)];
  return pwd;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { email } = req.body;
  const { data: user } = await supabase.from('users').select('email').eq('email', email);
  if (!user || user.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const newPassword = generateRandomPassword();
  const encoded = Buffer.from(newPassword).toString('base64');
  await supabase.from('users').update({ password: encoded }).eq('email', email);
  
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  const formData = new FormData();
  formData.append('access_key', accessKey);
  formData.append('subject', '🔐 Recupero password MarketHub');
  formData.append('to_email', email);
  formData.append('new_password', newPassword);
  await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
  
  res.status(200).json({ success: true });
}
