const { fetchMockData } = require("../utils/httpsSetup.js");

function aggregatePrices(data, method) {
  const prices = data.map((p) => p.price);
  if (method === "min") return Math.min(...prices);
  if (method === "max") return Math.max(...prices);
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
  return parseFloat(avg.toFixed(2));
}

function calculatePearson(xs, ys) {
  const n = xs.length;
  const avgX = xs.reduce((a, b) => a + b, 0) / n;
  const avgY = ys.reduce((a, b) => a + b, 0) / n;
  const numerator = xs.reduce(
    (sum, x, i) => sum + (x - avgX) * (ys[i] - avgY),
    0
  );
  const denominator = Math.sqrt(
    xs.reduce((sum, x) => sum + Math.pow(x - avgX, 2), 0) *
      ys.reduce((sum, y) => sum + Math.pow(y - avgY, 2), 0)
  );
  return parseFloat((numerator / denominator).toFixed(4));
}

async function getStockData(ticker, minutes, aggregation) {
  const price_history = await fetchMockData(ticker, minutes); // Replace with real API later
  let result = price_history;
  if (aggregation) {
    result = aggregatePrices(price_history, aggregation);
  }
  return {
    "average stock price": aggregation === "average" ? result : undefined,
    price_history,
  };
}

async function getStockCorrelation(ticker1, ticker2, minutes) {
  const data1 = await fetchMockData(ticker1, minutes);
  const data2 = await fetchMockData(ticker2, minutes);
  const prices1 = data1.map((p) => p.price);
  const prices2 = data2.map((p) => p.price);
  const correlation = calculatePearson(prices1, prices2);
  return {
    correlation,
    stocks: {
      [ticker1]: {
        "average stock price": aggregatePrices(data1, "average"),
        price_history: data1,
      },
      [ticker2]: {
        "average stock price": aggregatePrices(data2, "average"),
        price_history: data2,
      },
      message: `Correlation calculated over the last ${minutes} minutes`,
    },
  };
}

module.exports = { getStockData, getStockCorrelation };
