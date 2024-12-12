import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createDeck,
  updateDeck,
  deleteDeck,
  getDeck,
  getPublicDecks,
  getFavoriteDecks,
  toggleFavorite,
  addCardToDeck,
  searchDecks,
  getUserDecks,
} from "../controllers/deck.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.route("/").post(createDeck);

router.route("/public").get(getPublicDecks);

router.route("/favorites").get(getFavoriteDecks);

router.route("/search").get(searchDecks);

router.route("/getUserDecks").get(getUserDecks);

router.route("/:id").get(getDeck).put(updateDeck).delete(deleteDeck);

router.route("/:id/favorite").post(toggleFavorite);

router.route("/:deckId/cards").post(addCardToDeck);

export default router;
