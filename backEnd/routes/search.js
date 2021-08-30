const express = require("express");
const SQL = require("@nearform/sql");
const router = express.Router();
const {
	getPetBySearchInput,
	getPetByAdvancedSearch
} = require("../data/mySqldb.js");
const authenticate = require("../middlewares/authentication");
const advancedCheck = require("../middlewares/advancedCheck");

router.get("/advancedSearch", authenticate(),advancedCheck(), async (req, res) => {
	try {
		const { type, name, status, weight, height } = req.query;
		const searchResults = await getPetByAdvancedSearch(
			type,
			name,
			status,
			weight,
			height
		);
		res.send(searchResults);
	} catch (err) {
		console.log(err);
	}
});

router.post("/search", authenticate(), async (req, res) => {
	try {
		const basicSearchInput = req.body.search;
		const searchByInput = await getPetBySearchInput(basicSearchInput);

		res.send(searchByInput);
	} catch (err) {
		console.log(err);
	}
});
module.exports = router;
