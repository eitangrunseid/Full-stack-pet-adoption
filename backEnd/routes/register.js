const express = require("express");
const router = express.Router();
const {
	addUser,
	getAddedUser,
	getUserByEmail,
	updateUser
} = require("../data/mySqldb");
const bcrypt = require("bcrypt");
const auth = require("../lib/auth");

const { validationMid } = require("../middlewares/validation");
const authenticate = require("../middlewares/authentication");

const {
	signUpSchema,loginSchema, updateProfileSchema
} = require("../schemaController/schema");

router.post("/signUp", validationMid(signUpSchema), async (req, res) => {
	try {
		const { firstName, lastName, email, password, phone } = req.body;
		const passwordHash = await bcrypt.hash(password, 10);

		const reqValues = `'${phone}','${email}','${passwordHash}','${firstName}','${lastName}'`;
		const column = "phone, email, password, first_name, last_name";
		await addUser(column, reqValues);
		const newUser = await getAddedUser()
		const user = await getUserByEmail(email);
		const token = auth.sign({ appUserId: user.user_id });

		res.send({ user: newUser[0], token: token });
	} catch (err) {
		console.log(err);
	}
});


router.post("/login", validationMid(loginSchema), async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await getUserByEmail(email);
		if (!user) {
			res.status(401).send({ message: "can't find this user" });
			return;
		}
		const isPasswordMatch = await bcrypt.compare(password, user[0].password);
		if (!isPasswordMatch) {
			res.status(401).send("incorrect password");
			return;
		}
		const token = auth.sign({ appUserId: user[0].user_id });
		res.send({ text: "valid login input", token, user });
	} catch (error) {
		console.error(error);
	}
});

router.put(
	"/updateProfile",
	validationMid(updateProfileSchema),
	authenticate(),
	async (req, res) => {
		try {
			if (
				!req.body.firstName ||
				!req.body.lastName ||
				!req.body.email ||
				!req.body.password ||
				!req.body.phone
			) {
				res.status(400).send({ message: "you must update all the fields" });
			}
			const passwordHash = await bcrypt.hash(req.body.password, 10);

			const userId = req.decoded.appUserId;
			await updateUser(req.body, userId, passwordHash);
			res.send({ msg: "your profile was successfully updated" });
		} catch (error) {
			console.log(error);
		}
	}
);

module.exports = router;
