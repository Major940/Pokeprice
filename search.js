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
    
    const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?${params.toString()}`;
    
    const ebayResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${EBAY_TOKEN}`,
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_FR',
        'Accept': 'application/json'
      }
    });
    
    const responseText = await ebayResponse.text();
    
    // Check if response is JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Parse error. Response text:', responseText.substring(0, 500));
      return res.status(500).json({ 
        error: 'Invalid response from eBay',
        details: responseText.substring(0, 200),
        status: ebayResponse.status
      });
    }
    
    if (!ebayResponse.ok) {
      console.error('eBay API Error:', ebayResponse.status, data);
      return res.status(ebayResponse.status).json({ 
        error: `eBay API error: ${ebayResponse.status}`,
        details: data.errors?.[0]?.message || 'Unknown error'
      });
    }
    
    if (!data.itemSummaries || data.itemSummaries.length === 0) {
      return res.json({
        sales: [],
        totalCount: 0
      });
    }
    
    const sales = data.itemSummaries
      .filter(item => item.price && parseFloat(item.price.value) > 0)
      .map(item => ({
        title: item.title || 'Sans titre',
        price: parseFloat(item.price.value),
        date: new Date().toLocaleDateString('fr-FR'),
        url: item.itemWebUrl || '#',
        image: item.image?.imageUrl || null
      }));
    
    return res.json({ 
      sales, 
      totalCount: data.total || sales.length 
    });
    
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
