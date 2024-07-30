const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//Index,Create Route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing));

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route,Update Route,Delete Route
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isOwner, isLoggedIn,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
    .delete(isOwner, isLoggedIn,wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit" ,isOwner, isLoggedIn, wrapAsync(listingController.renderEditForm));

module.exports = router;