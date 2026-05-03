export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { productData, imageBase64 } = req.body;
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  
  const formData = new FormData();
  formData.append('access_key', accessKey);
  formData.append('subject', `🆕 Nuovo ${productData.category === 'Servizi' ? 'servizio' : 'prodotto'} da ${productData.sellerName}`);
  formData.append('to_email', 'ops.channel@proton.me');
  Object.entries(productData).forEach(([k, v]) => formData.append(k, v));
  if (imageBase64) formData.append('product_image', imageBase64);
  
  const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
  const result = await response.json();
  res.status(200).json(result);
}
