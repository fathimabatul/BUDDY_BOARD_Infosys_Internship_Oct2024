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
} from "../controllers/deck.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.route("/").post(createDeck);

router.route("/:id").get(getDeck).put(updateDeck).delete(deleteDeck);

router.route("/:id/favorite").post(toggleFavorite);

router.route("/public").get(getPublicDecks);

router.route("/favorites").get(getFavoriteDecks);

router.route("/:deckId/cards").post(addCardToDeck);

export default router;
