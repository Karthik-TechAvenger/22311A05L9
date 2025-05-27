const express = require("express");
const router = express.Router();

const {
  getStockData,
  getStockCorrelation,
} = require("../services/StockService");

router.get("/stocks/:ticker", async (req, res) => {
  try {
    const { ticker } = req.params;
    const { minutes, aggregation } = req.query;
    const result = await getStockData(ticker, parseInt(minutes), aggregation);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/stockcorrelation", async (req, res) => {
  try {
    const { minutes, ticker } = req.query;
    if (!Array.isArray(ticker) || ticker.length !== 2) {
      return res.status(400).json({ error: "Exactly two tickers required" });
    }
    const result = await getStockCorrelation(
      ticker[0],
      ticker[1],
      parseInt(minutes)
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
