export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { cardName } = req.body;
  
  if (!cardName) {
    return res.status(400).json({ error: 'Card name is required' });
  }
  
  const EBAY_TOKEN = 'v^1.1#i^1#p^3#I^3#r^1#f^0#t^Ul4xMF8xMDpGN0I5MEY1NTk4Qzc4RDk4RDIwMjNCRUYxQUU3MDgzQl8yXzEjRV4yNjA=';
  
  try {
    const params = new URLSearchParams({
      'q': `pokemon ${cardName}`,
      'limit': '50',
      'filter': 'buyingOptions:{AUCTION|FIXED_PRICE},itemLocationCountry:FR',
      'sort': 'price'
    });
    
    const ebayResponse = await fetch(
      `https://api.ebay.com/buy/browse/v1/item_summary/search?${params.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${EBAY_TOKEN}`,
          'X-EBAY-C-MARKETPLACE-ID': 'EBAY_FR'
        }
      }
    );
    
    if (!ebayResponse.ok) {
      return res.status(ebayResponse.status).json({ error: `eBay error: ${ebayResponse.status}` });
    }
    
    const data = await ebayResponse.json();
    
    const sales = (data.itemSummaries || [])
      .filter(item => item.price)
      .map(item => ({
        title: item.title,
        price: parseFloat(item.price.value),
        date: new Date().toLocaleDateString('fr-FR'),
        url: item.itemWebUrl,
        image: item.image?.imageUrl
      }));
    
    return res.json({ sales, totalCount: sales.length });
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
