// importo express
const express = require("express");
// setto il router
const router = express.Router();

// importo il controller dei post
const postsController = require("../controllers/postsController");

// ROTTE DI CRUD PER I POST //

// index
router.get("/", postsController.index);

// show
router.get("/:id", postsController.show);

// store
router.post("/", postsController.store);

// update
router.put("/:id", postsController.update);

//modify
router.patch("/:id", postsController.modify);

// destroy
router.delete("/:id", postsController.destroy);

// esportiamo il router
module.exports = router;
