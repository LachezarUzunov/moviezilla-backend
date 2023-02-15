const express = require("express");
const {
  getSingleWatchlist,
  createList,
  deleteList,
  updateList,
} = require("../controllers/watchlistController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// GET, POST, UPDATE and DELETE watchlist
router.get("/mine", protect, getSingleWatchlist);
router.post("/", protect, createList);
router.put("/:id", protect, updateList);
router.delete("/:id", protect, deleteList);

module.exports = router;
