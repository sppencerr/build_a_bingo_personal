const express = require('express');
const router = express.Router();
const cardsController = require("../controllers/cardsController");

//Get a list of charities
router
  .route("/bingoCards")
  .get(cardsController.findAll);

//Find the info on a specific charity
router
	.route("/bingoCard/:id")
	.get(cardsController.findById)
	.put(cardsController.update);

router
	.route("/bingoCard")
	.post(cardsController.create);

module.exports = router;