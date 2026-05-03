import { supabase } from '../utils/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const auth = req.headers.authorization;
  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { email } = req.body;
  await supabase.from('subscriptions').delete().eq('email', email);
  res.status(200).json({ success: true });
}
