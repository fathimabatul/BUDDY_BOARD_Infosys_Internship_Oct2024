import Deck from "../models/deck.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
ApiError;
import mongoose from "mongoose";

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
  try {
    const { id } = req.params;

    // Ensure the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid deck ID");
    }

    const deck = await Deck.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: "$creator",
      },
      {
        $addFields: {
          created_by: "$creator.name",
        },
      },
      {
        $lookup: {
          from: "cards",
          localField: "cards",
          foreignField: "_id",
          as: "cards",
        },
      },
      {
        $unwind: {
          path: "$cards",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "cards.created_by",
          foreignField: "_id",
          as: "card_creator",
        },
      },
      {
        $unwind: {
          path: "$card_creator",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          "cards.created_by": "$card_creator.name",
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          cards: { $push: "$cards" },
          created_by: { $first: "$created_by" },
          visibility: { $first: "$visibility" },
          is_blocked: { $first: "$is_blocked" },
          favorites: { $first: "$favorites" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "favorites",
          foreignField: "_id",
          as: "favorites",
        },
      },
      {
        $project: {
          "favorites.email": 1,
          "favorites.name": 1,
          title: 1,
          cards: 1,
          created_by: 1,
          visibility: 1,
          is_blocked: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    if (!deck.length) {
      throw new ApiError(404, "Deck not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, deck[0], "Deck retrieved successfully"));
  } catch (error) {
    console.error("Error retrieving deck:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal server error"));
  }
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
  const decks = await Deck.aggregate([
    {
      $match: {
        favorites: req.user._id,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "created_by",
        foreignField: "_id",
        as: "creator",
      },
    },
    {
      $unwind: "$creator",
    },
    {
      $addFields: {
        created_by: "$creator.name",
      },
    },
    {
      $project: {
        creator: 0, // Exclude the creator field from the final output
      },
    },
    {
      $lookup: {
        from: "cards",
        localField: "cards",
        foreignField: "_id",
        as: "cards",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "favorites",
        foreignField: "_id",
        as: "favorites",
      },
    },
    {
      $project: {
        "favorites.email": 1,
        title: 1,
        cards: 1,
        created_by: 1,
        visibility: 1,
        is_blocked: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, decks, "Favorite decks retrieved successfully"));
});

const getPublicDecks = asyncHandler(async (req, res) => {
  const decks = await Deck.aggregate([
    {
      $match: {
        visibility: "public",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "created_by",
        foreignField: "_id",
        as: "creator",
      },
    },
    {
      $unwind: "$creator",
    },
    {
      $addFields: {
        created_by: "$creator.name",
      },
    },
    {
      $project: {
        creator: 0, // Exclude the creator field from the final output
      },
    },
    {
      $lookup: {
        from: "cards",
        localField: "cards",
        foreignField: "_id",
        as: "cards",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "favorites",
        foreignField: "_id",
        as: "favorites",
      },
    },
    {
      $project: {
        "favorites.username": 1,
        "favorites.email": 1,
        title: 1,
        cards: 1,
        created_by: 1,
        visibility: 1,
        is_blocked: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

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

const searchDecks = asyncHandler(async (req, res) => {
  // console.log("function called");
  const {
    title,
    exactMatch = false,
    cardsCount,
    favoritesCount,
    postedAfter,
  } = req.query;
  // console.log(req);

  try {
    const pipeline = [
      // Initial match for public decks
      {
        $match: {
          visibility: "public",
          is_blocked: false,
        },
      },
    ];

    if (title) {
      pipeline.push({
        $match: {
          title: exactMatch ? title : { $regex: title, $options: "i" },
        },
      });
    }

    pipeline.push({
      $addFields: {
        cardsCount: { $size: "$cards" },
      },
    });

    if (cardsCount) {
      pipeline.push({
        $match: {
          cardsCount: { $gte: parseInt(cardsCount) },
        },
      });
    }

    if (postedAfter) {
      pipeline.push({
        $match: {
          createdAt: { $gte: new Date(postedAfter) },
        },
      });
    }

    pipeline.push({
      $addFields: {
        favoritesCount: { $size: "$favorites" },
      },
    });

    if (favoritesCount) {
      pipeline.push({
        $match: {
          favoritesCount: { $gte: parseInt(favoritesCount) },
        },
      });
    }

    pipeline.push({
      $lookup: {
        from: "users",
        localField: "created_by",
        foreignField: "_id",
        as: "creator",
      },
    });

    pipeline.push({
      $unwind: {
        path: "$creator",
        preserveNullAndEmptyArrays: true,
      },
    });

    pipeline.push({
      $lookup: {
        from: "cards",
        localField: "cards",
        foreignField: "_id",
        as: "cards",
      },
    });

    pipeline.push({
      $project: {
        title: 1,
        cardsCount: 1,
        created_by: 1,
        createdAt: 1,
        favoritesCount: 1,
        "creator.username": 1,
      },
    });

    // console.log("Aggregation Pipeline:", JSON.stringify(pipeline, null, 2));
    // console.log(pipeline);

    const decks = await Deck.aggregate(pipeline);

    return res
      .status(200)
      .json(
        new ApiResponse(200, decks, "Search results retrieved successfully")
      );
  } catch (error) {
    console.error("Error in searchDecks:", error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
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
  searchDecks,
};
