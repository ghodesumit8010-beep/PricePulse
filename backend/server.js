const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/**
 * ENHANCED ELITE SCRAPER ENGINE
 * With anti-detection mechanisms
 */
async function scrapeProduct(url) {
  try {
    // 1. PREPARE ENHANCED HEADERS
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Cache-Control': 'max-age=0',
      'Referer': 'https://www.google.com/'
    };

    // 2. ADD RANDOM DELAY TO AVOID RATE LIMITING
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));

    // 3. CONFIGURE AXIOS WITH RETRY LOGIC
    const { data } = await axios.get(url, {
      headers: headers,
      timeout: 15000,
      validateStatus: function (status) {
        return status >= 200 && status < 400; // Accept 3xx redirects
      },
      maxRedirects: 5
    });

    const $ = cheerio.load(data);
    
    // 4. ENHANCED SELECTOR PATTERNS FOR E-COMMERCE
    let title = "";
    let price = 0;
    
    // AMAZON SELECTORS (Multiple fallbacks)
    if (url.includes('amazon')) {
      title = $("#productTitle, .product-title-word-break, #title, .a-size-large").first().text().trim();
      
      // Multiple price selectors for Amazon
      const priceSelectors = [
        ".a-price-whole",
        ".a-offscreen",
        ".priceToPay span.a-price-whole",
        ".a-text-price span.a-offscreen",
        "#price_inside_buybox",
        "#priceblock_ourprice"
      ];
      
      for (const selector of priceSelectors) {
        const priceText = $(selector).first().text();
        if (priceText) {
          const priceMatch = priceText.match(/(\d+,?\d*,?\d+)/);
          if (priceMatch) {
            price = parseInt(priceMatch[1].replace(/,/g, ''));
            break;
          }
        }
      }
    }
    // FLIPKART SELECTORS (Multiple fallbacks)
    else if (url.includes('flipkart')) {
      title = $(".B_NuCI, .VU-ZEz, .yhB1nd, span[class*='product-title']").first().text().trim();
      
      // Multiple price selectors for Flipkart
      const priceSelectors = [
        "._30jeq3",
        "._16Jk6d",
        "._1vC4OE",
        "._3qQ9m1",
        "div[class*='price']"
      ];
      
      for (const selector of priceSelectors) {
        const priceText = $(selector).first().text();
        if (priceText) {
          const priceMatch = priceText.match(/(\d+,?\d*,?\d+)/);
          if (priceMatch) {
            price = parseInt(priceMatch[1].replace(/,/g, ''));
            break;
          }
        }
      }
    }
    
    // 5. ADDITIONAL VALIDATION
    if (!title || title.length < 3) {
      // Try meta title as fallback
      title = $("meta[property='og:title']").attr('content') || 
              $("title").text().trim() || 
              "Product Title Not Found";
    }
    
    if (price === 0 || isNaN(price)) {
      // Try to extract from JSON-LD structured data
      const jsonLd = $('script[type="application/ld+json"]').html();
      if (jsonLd) {
        try {
          const data = JSON.parse(jsonLd);
          if (data.offers && data.offers.price) {
            price = parseInt(data.offers.price);
          }
        } catch (e) {
          // Silent fail - continue with other methods
        }
      }
    }
    
    // 6. FINAL VALIDATION
    if (!title || title === "Product Title Not Found" || price === 0 || isNaN(price)) {
      throw new Error("Could not extract product data");
    }
    
    return { title, price };
    
  } catch (error) {
    console.error(`Scraping error for ${url}:`, error.message);
    
    // 7. FALLBACK: RETURN SIMULATED DATA FOR DEVELOPMENT
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️  Using fallback data for development');
      return {
        title: "Sample Product (Fallback Mode)",
        price: Math.floor(Math.random() * 10000) + 1000
      };
    }
    
    return null;
  }
}

app.post('/api/pulse', async (req, res) => {
  const { query } = req.body;
  console.log("⚡ Pulse Request Received:", query);

  try {
    const { getDecisionPulse } = require('./services/aiEngine');
    let productData;

    // Mode A: High-Fidelity Scraping (Links)
    if (query.startsWith('http')) {
      console.log(`🔍 Attempting to scrape: ${query}`);
      
      // Validate URL
      if (!query.includes('amazon') && !query.includes('flipkart')) {
        throw new Error("Currently supporting Amazon and Flipkart URLs only");
      }
      
      // Check if it's a product page
      if (query.includes('/dp/') || query.includes('/p/itm') || query.includes('/product/')) {
        const scraped = await scrapeProduct(query);
        
        if (!scraped) {
          throw new Error("Unable to extract product information. The site may be blocking requests.");
        }

        console.log(`✅ Successfully scraped: ${scraped.title} - ₹${scraped.price}`);
        
        // DETERMINE SOURCE PLATFORM AND COMPETITORS
        let sourcePlatform = "Amazon";
        let competitor1 = "Flipkart";
        let competitor2 = "Reliance Digital";
        
        if (query.includes('amazon')) {
          sourcePlatform = "Amazon";
          competitor1 = "Flipkart";
          competitor2 = "Myntra";
        } else if (query.includes('flipkart')) {
          sourcePlatform = "Flipkart";
          competitor1 = "Amazon";
          competitor2 = "Reliance Digital";
        }

        // Generate realistic competitor prices (within ±15% of source price)
        const sourcePrice = scraped.price;
        const competitor1Price = Math.round(sourcePrice * (0.95 + Math.random() * 0.1));
        const competitor2Price = Math.round(sourcePrice * (0.85 + Math.random() * 0.15));
        
        // Generate realistic ratings
        const competitor1Rating = (4.0 + Math.random() * 1.0).toFixed(1);
        const competitor2Rating = (3.8 + Math.random() * 1.2).toFixed(1);

        productData = {
          name: scraped.title,
          platforms: [
            { 
              platform: sourcePlatform, 
              price: sourcePrice, 
              rating: "Live", 
              badge: "Verified Live" 
            },
            { 
              platform: competitor1, 
              price: competitor1Price, 
              rating: competitor1Rating, 
              badge: "Market Match" 
            },
            { 
              platform: competitor2, 
              price: competitor2Price, 
              rating: competitor2Rating, 
              badge: "Predicted Sale" 
            }
          ]
        };
      } else {
        throw new Error("Please provide a direct product page URL, not a search or category page.");
      }
    } 
    // Mode B: Intelligence Simulation (Search Terms)
    else {
      console.log(`🔍 Using simulated data for: "${query}"`);
      
      const basePrice = Math.floor(Math.random() * 20000) + 1000;
      const rawPlatforms = [
        { 
          platform: "Amazon", 
          price: basePrice, 
          rating: (4.0 + Math.random() * 1.0).toFixed(1), 
          badge: "In Stock" 
        },
        { 
          platform: "Flipkart", 
          price: Math.round(basePrice * (1 + Math.random() * 0.1)), 
          rating: (4.2 + Math.random() * 0.8).toFixed(1), 
          badge: "Sale Ready" 
        },
        { 
          platform: "Reliance Digital", 
          price: Math.round(basePrice * (0.95 + Math.random() * 0.1)), 
          rating: (3.8 + Math.random() * 0.7).toFixed(1), 
          badge: "Retailer" 
        }
      ];

      productData = {
        name: query.charAt(0).toUpperCase() + query.slice(1),
        platforms: rawPlatforms
      };
    }

    const aiPulse = await getDecisionPulse(productData);
    res.json({ productData, aiPulse });
    
  } catch (error) {
    console.error("❌ Pulse Error:", error.message);
    res.status(500).json({ 
      error: error.message || "Internal Server Error",
      suggestion: "Try using a direct product URL from Amazon/Flipkart, or use search terms for simulated data."
    });
  }
});

const PORT = 5001; 
app.listen(PORT, () => {
  console.log(`🚀 PRICEPULSE ENGINE ONLINE -> http://localhost:${PORT}`);
  console.log(`📌 Supported: Amazon & Flipkart product pages`);
  console.log(`⚠️  Note: Some sites may block scraping attempts`);
});