const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authentication");
const { getAllUsers, getUserById} = require("../data/mySqldb")

router.get("/", authenticate(), async (req, res) => {
	try {
		const users = await getAllUsers();
		res.send(users);
	} catch (err) {
		console.log(err);
	}
});

router.get("/user", authenticate(), async (req, res) => {
	try {
		const { appUserId } = req.decoded;
		const user = await getUserById(appUserId);
		res.send(user[0]);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
