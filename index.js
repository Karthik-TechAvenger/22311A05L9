const express = require("express");
const cors = require("cors");
require("dotenv").config();

const stockRoutes = require("./Routes/StockRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", stockRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`HTTP server running on http://localhost:${PORT}`);
});
