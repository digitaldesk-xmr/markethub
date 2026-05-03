import { supabase } from '../utils/supabase.js';

export default async function handler(req, res) {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email required' });
  
  const { data: user } = await supabase.from('users').select('id, name, email, telegram').eq('email', email);
  if (!user || user.length === 0) return res.status(404).json({ error: 'User not found' });
  
  const { data: sub } = await supabase.from('subscriptions').select('expires_date').eq('email', email);
  const isActive = sub && sub.length > 0 && new Date(sub[0].expires_date) > new Date();
  
  res.status(200).json({ user: user[0], subscription: { active: isActive, expires: sub?.[0]?.expires_date || null } });
}
