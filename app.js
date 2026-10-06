require("dotenv").config();

const express = require("express");
const cors = require("cors");

const wasteDepositsRoutes = require("./routes/wasteDepositsRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint utama
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RESTful API Bank Sampah - Michella Valery",
    author: "Michella Valery",
    npm: "2327240088"
  });
});

// Routes
app.use("/waste-deposits", wasteDepositsRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan"
  });
});

// Error handler
app.use(errorHandler);

// Untuk localhost
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;