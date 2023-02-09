const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Watchlist = require("../models/watchlistModel");

// @desc    Get my list
// @route   GET api/lists/:id
// @access  public
const getSingleWatchlist = asyncHandler(async (req, res) => {
  const watchlist = await Watchlist.findById(req.params.id);

  if (!watchlist) {
    res.status(404);
    throw new Error("Watchlist not found");
  }

  res.status(200).json(watchlist);
});

// @desc        Create a new watchlist
// @route       POST /api/lists
// @access      for registered and logged in Users only
const createList = asyncHandler(async (req, res) => {
  const { movieId } = req.body;

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // POST/create watchlist
  const newWatchlist = await Watchlist.create({
    user: req.user.id,
    watchlist: [],
  });

  if (newWatchlist) {
    res.status(201).json(newWatchlist);
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// @desc    Delete watchlist
// @route   DELETE api/lists/:id
// @access  private
const deleteList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const watchlist = await Watchlist.findById(req.params.id);

  if (!watchlist) {
    res.status(404);
    throw new Error("Watchlist not found");
  }

  if (watchlist.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await watchlist.remove();

  res.status(200).json({ sucess: true });
});

module.exports = {
  getSingleWatchlist,
  createList,
  deleteList,
};
