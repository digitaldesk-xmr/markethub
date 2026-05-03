import { supabase } from './utils/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, password } = req.body;
  const encoded = Buffer.from(password).toString('base64');
  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, telegram')
    .eq('email', email)
    .eq('password', encoded);
  if (error || !data || data.length === 0) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.status(200).json({ user: data[0] });
}
