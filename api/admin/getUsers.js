import { supabase } from '../utils/supabase.js';

export default async function handler(req, res) {
  const auth = req.headers.authorization;
  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { data: users } = await supabase.from('users').select('*').order('register_date', { ascending: false });
  res.status(200).json(users);
}
