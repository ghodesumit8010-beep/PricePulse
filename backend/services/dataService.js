/**
 * PricePulse Mock Database
 * Add your demo products here.
 */
const mockDatabase = {
  "sony xm5": {
    name: "Sony WH-1000XM5 Wireless Headphones",
    platforms: [
      { platform: "Amazon", price: 29990, seller: "Appario Retail", rating: 4.8, badge: "Official Store" },
      { platform: "Flipkart", price: 31500, seller: "RetailNet", rating: 4.5, badge: "Assured" }
    ],
    history: {
      avg30Day: 26500,
      allTimeLow: 24999,
      trend: "Increasing"
    },
    context: {
      nextSale: "Republic Day Sale (Jan 20)",
      daysToSale: 11,
      productCycle: "Mature"
    }
  },
  "iphone 15": {
    name: "Apple iPhone 15 (128 GB) - Blue",
    platforms: [
      { platform: "Amazon", price: 69900, seller: "Apple Authorised", rating: 4.9, badge: "Official" },
      { platform: "Flipkart", price: 68999, seller: "SuperComNet", rating: 4.7, badge: "Assured" }
    ],
    history: {
      avg30Day: 71000,
      allTimeLow: 65999,
      trend: "Decreasing"
    },
    context: {
      nextSale: "Weekend Flash Sale",
      daysToSale: 2,
      productCycle: "Current"
    }
  }
};

const getProductHistory = async (query) => {
  const key = query.toLowerCase();
  // Simple check for our mock products
  if (key.includes("sony")) return mockDatabase["sony xm5"];
  if (key.includes("iphone")) return mockDatabase["iphone 15"];
  
  // Default fallback for demo
  return mockDatabase["sony xm5"];
};

module.exports = { getProductHistory };