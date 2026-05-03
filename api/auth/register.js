import { supabase } from '../utils/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, telegram, password } = req.body;
  if (!name || !email || !telegram || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  
  const { data: existing } = await supabase.from('users').select('email').eq('email', email);
  if (existing && existing.length > 0) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  
  const encodedPassword = Buffer.from(password).toString('base64');
  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, telegram, password: encodedPassword, register_date: new Date().toISOString() }])
    .select();
  
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ user: data[0] });
}
