const express = require("express");
const {
	addPet,
	getPetById,
	getPetByStatus,
	updatePetByUserId,
	getAllPets,
	addLikePet,
	getLikePet,
	removeLikePet,
	returnPet,
} = require("../data/mySqldb");
const router = express.Router();
const authenticate = require("../middlewares/authentication");

router.get("/pets", async (req, res) => {
	try {
		const pets = await getAllPets();
		res.send(pets);
	} catch (err) {
		console.log(err);
	}
});

router.post("/addPet", authenticate(), async (req, res) => {
	try {
		const {
			type,
			name,
			status,
			breed,
			color,
			allergies,
			weight,
			height,
			diet,
			pet_pic
		} = req.body;
		const values = `'${type}','${name}','${status}','${breed}','${color}','${allergies}','${weight}','${height}','${diet}','${pet_pic}'`;
		const column =
			"type, name, status, breed, color, allergies, weight, height, diet, pet_pic";
		await addPet(column, values);
		const allPets = await getAllPets();
		res.send(allPets);
	} catch (err) {
		console.log(err);
	}
});

router.post("/status", authenticate(), async (req, res) => {
	try {
		const { userId, petId, petStatus } = req.body;
		await updatePetByUserId(userId, petId, petStatus);
		const pet = await getPetById(petId);
		res.send(pet);
	} catch (err) {
		console.log(err);
	}
});

router.get("/userPets", authenticate(), async (req, res) => {
	try {
		const userId = req.decoded.appUserId;
		const userPets = await getPetByStatus(userId);
		res.send(userPets);
	} catch (err) {
		console.log(err);
	}
});

router.get("/savedPets", authenticate(), async (req, res) => {
	try {
		const userId = req.decoded.appUserId;
		const likedPetsData = await getLikePet(userId);
		res.send(likedPetsData);
	} catch (err) {
		console.log(err);
	}
});


router.post("/savedPet", authenticate(), async (req, res) => {
	try {
		const userId = req.decoded.appUserId;
		const { petId } = req.body;
		await addLikePet(petId, userId);
		res.send({ message: "successfully liked that pet" });
	} catch (err) {
		console.log(err);
	}
});


router.post("/removeSavedPet", authenticate(), async (req, res) => {
	try {
		const userId = req.decoded.appUserId;
		const { petId } = req.body;
		await removeLikePet(petId, userId);
		res.send({ message: "successfully removed that liked pet" });
	} catch (err) {
		console.log(err);
	}
});


router.post("/returnPet", authenticate(), async (req, res) => {
	try {
		const { petId } = req.body;
		await returnPet(petId);
		res.send({ message: "successfully removed that pet" });
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;

