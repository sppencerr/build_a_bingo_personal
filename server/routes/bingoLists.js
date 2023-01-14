const router = require("express").Router();
const listsController = require("../controllers/listsController");

//Pull all events for event feed
router
  .route("/bingoLists")
  .get(listsController.findAll);

//Create a new event in the DV
router
	.route("/bingoList")
	.post(listsController.create);

//Get a specific event
router
	.route("/bingoList/:id")
	.get(listsController.findById)
	.put(listsController.update)
	.delete(listsController.remove)

module.exports = router;