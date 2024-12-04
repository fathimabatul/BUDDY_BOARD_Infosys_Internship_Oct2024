import Deck from "../models/deck.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
ApiError;

const createDeck = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    throw new ApiError(400, "title is required");
  }

  const deck = await Deck.create({
    title,
    cards: [],
    created_by: req.user._id,
  });
  // console.log(deck);
  return res
    .status(201)
    .json(new ApiResponse(201, deck, "Deck created successfully"));
});

const updateDeck = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, cards } = req.body;

  if (!title && !cards) {
    throw new ApiError(400, "At least one field is required for update");
  }

  const deck = await Deck.findOneAndUpdate(
    { _id: id, created_by: req.user._id },
    {
      $set: {
        title: title || undefined,
        cards: cards || undefined,
        updated_at: Date.now(),
      },
    },
    { new: true }
  );

  if (!deck) {
    throw new ApiError(404, "Deck not found or unauthorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deck, "Deck updated successfully"));
});

const deleteDeck = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deck = await Deck.findOneAndDelete({
    _id: id,
    created_by: req.user._id,
  });

  if (!deck) {
    throw new ApiError(404, "Deck not found or unauthorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deck, "Deck deleted successfully"));
});

const getDeck = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deck = await Deck.findById(id).populate("cards");

  if (!deck) {
    throw new ApiError(404, "Deck not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deck, "Deck retrieved successfully"));
});

const toggleFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const deck = await Deck.findById(id);
  if (!deck) {
    throw new ApiError(404, "Deck not found");
  }

  const favoriteIndex = deck.favorites.indexOf(userId);

  if (favoriteIndex === -1) {
    deck.favorites.push(userId);
    await deck.save();
    return res
      .status(200)
      .json(new ApiResponse(200, deck, "Added to favorites"));
  } else {
    deck.favorites.splice(favoriteIndex, 1);
    await deck.save();
    return res
      .status(200)
      .json(new ApiResponse(200, deck, "Removed from favorites"));
  }
});

const getFavoriteDecks = asyncHandler(async (req, res) => {
  const decks = await Deck.find({
    favorites: req.user._id,
  })
    .populate("cards")
    .populate("favorites", "username email");

  return res
    .status(200)
    .json(new ApiResponse(200, decks, "Favorite decks retrieved successfully"));
});

const getPublicDecks = asyncHandler(async (req, res) => {
  const decks = await Deck.find({
    visibility: "public",
  })
    .populate("cards")
    .populate("favorites", "username email");

  return res
    .status(200)
    .json(new ApiResponse(200, decks, "Public decks retrieved successfully"));
});

const addCardToDeck = asyncHandler(async (req, res) => {
  const { deckId } = req.params;
  const { cardId } = req.body;

  if (!cardId) {
    throw new ApiError(400, "Card ID is required");
  }

  const deck = await Deck.findOne({
    _id: deckId,
    created_by: req.user._id,
  });

  if (!deck) {
    throw new ApiError(404, "Deck not found or unauthorized");
  }

  if (deck.cards.includes(cardId)) {
    throw new ApiError(400, "Card already exists in deck");
  }

  deck.cards.push(cardId);
  await deck.save();

  const updatedDeck = await Deck.findById(deckId)
    .populate("cards")
    .populate("favorites", "username email");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedDeck, "Card added to deck successfully"));
});

export {
  createDeck,
  updateDeck,
  deleteDeck,
  getDeck,
  toggleFavorite,
  getFavoriteDecks,
  getPublicDecks,
  addCardToDeck,
};
