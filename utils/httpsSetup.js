function generateMockData(minutes) {
  const now = Date.now();
  return Array.from({ length: minutes }, (_, i) => {
    const timestamp = new Date(now - i * 60000).toISOString();
    const price = 100 + Math.random() * 20;
    return { timestamp, price: parseFloat(price.toFixed(2)) };
  }).reverse();
}

async function fetchMockData(ticker, minutes) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(generateMockData(minutes)), 100);
  });
}

module.exports = { fetchMockData };
