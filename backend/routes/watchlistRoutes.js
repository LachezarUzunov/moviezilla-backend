const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// GET, POST, UPDATE and DELETE watchlist
router.get("/", protect, getWatchlist);
router.post("/", protect, createList);
router.put("/:id", protect, updateList);
router.delete("/:id", protect, deleteList);

module.exports = router;
