import { supabase } from '../utils/supabase.js';

export default async function handler(req, res) {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email required' });
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('seller_email', email)
    .order('created_at', { ascending: false });
  
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(products);
}
