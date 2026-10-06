const express = require("express");

const router = express.Router();

const controller = require("../controllers/wasteDepositsController");

// GET semua data
router.get("/", controller.getAllWasteDeposits);

// GET data berdasarkan ID
router.get("/:id", controller.getWasteDepositById);

// POST data baru
router.post("/", controller.createWasteDeposit);

// PUT update data
router.put("/:id", controller.updateWasteDeposit);

// DELETE data
router.delete("/:id", controller.deleteWasteDeposit);

module.exports = router;