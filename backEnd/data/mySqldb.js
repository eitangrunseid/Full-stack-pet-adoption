const mysql = require("mysql");
const SQL = require("@nearform/sql");
const path = require("path");
const Postgrator = require("postgrator");


const postgrator = new Postgrator({
	migrationDirectory: path.resolve(__dirname, "../migrations"),
	driver: "mysql",
	host: "127.0.0.1",
	port: 3306,
	database: "pet_adoption",
	username: "root",
	password: "051514242",
	schemaTable: "migrations",
});
exports.postgrator = postgrator;

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "051514242",
	database: "pet_adoption",
});

const query = (queryText) => {
	return new Promise((resolve, reject) => {
		db.query(queryText, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};
exports.query = query;

const addUser = async (column, values) => {
	try {
		const queryResult = await query(
			 `INSERT INTO users (${column}) VALUES (${values})`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.addUser = addUser;

const addPet = async (column, values) => {
	try {
		const queryResult = await query(
			`INSERT INTO pets (${column}) VALUES (${values})`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.addPet = addPet;

const getUserById = async (id) => {
	try {
		const queryResult = await query(
			`SELECT * FROM users WHERE user_id = ${id}`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.getUserById = getUserById;

const getUserByEmail = async (email) => {
	try {
		const queryResult = await query(
			SQL`SELECT * FROM users WHERE email = ${email}`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.getUserByEmail = getUserByEmail;

const updateUser = async (newValues, userId, hashPassword) => {
	try {
		const {firstName, lastName, email, phone, bio } = newValues
		const queryResult = await query(
			SQL`UPDATE users SET first_name=${firstName},last_name=${lastName}, email=${email}, password=${hashPassword}, phone=${phone}, bio=${bio} WHERE user_id = ${userId}`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.updateUser = updateUser;

const getPetById = async (id) => {
	try {
		const queryResult = await query(
			`SELECT * FROM pets WHERE pet_id = ${id}`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.getPetById = getPetById;

const getPetBySearchInput = async (searchInput) => {
	try {
		const queryResult = await query(
			`SELECT * FROM pets WHERE name LIKE "%${searchInput}%" OR type LIKE "%${searchInput}%"`
			);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.getPetBySearchInput = getPetBySearchInput;

const getPetByAdvancedSearch = async (type, name, status, weight, height) => {
	try {
		const queryResult = await query(
			`SELECT * FROM pets WHERE type LIKE "${
				type === "%%" ? type : `%${type}%`
			}" AND name LIKE "${
				name === "%%" ? name : `%${name}%`
			}" AND status LIKE "${
				status === "%%" ? status : `%${status}%`
			}" AND weight LIKE "${
				weight === "%%" ? weight : `%${weight}%`
			}" AND height LIKE "${height === "%%" ? height : `%${height}%`}";`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.getPetByAdvancedSearch = getPetByAdvancedSearch;

const editPetImg = async (petId, path) => {
	try {
		const queryResult = await query(
			SQL`UPDATE pets SET pet_pic = ${path} WHERE pet_id = ${petId}`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.editPetImg = editPetImg;

const getPetByStatus = async (userId) => {
	try {
		const queryResult = await query(
			SQL`SELECT * FROM pets WHERE user_id = ${userId} AND status = "Adopted" OR status = "Foster"`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.getPetByStatus = getPetByStatus;

const updatePetByUserId = async (userId, petId, petStatus) => {
	try {
		const queryResult = await query(
			SQL`UPDATE pets SET user_id = ${userId}, status = ${petStatus} WHERE pet_id = ${petId}`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.updatePetByUserId = updatePetByUserId;

const getAllPets = async () => {
	try {
		const queryResult = await query(
			SQL`SELECT * FROM pets;`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.getAllPets = getAllPets;

const getAllUsers = async () => {
	try {
		const queryResult = await query(SQL`SELECT * FROM users`);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.getAllUsers = getAllUsers;

const getAddedUser = async () => {
	try {
		const queryResult = await query(
			`SELECT * FROM users ORDER BY user_id DESC LIMIT 1;`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.getAddedUser = getAddedUser;

const addLikePet = async (petId, userId) => {
	try {
		const queryResult = await query(
			SQL`INSERT INTO likedpets (pet_id, user_id) VALUES (${petId}, ${userId})`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.addLikePet = addLikePet;

const getLikePet = async (userId) => {
	try {
		const queryResult = await query(
			SQL`SELECT * FROM pets
			INNER JOIN likedpets
			ON pets.pet_id = likedpets.pet_id
			AND likedpets.user_id = ${userId}`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.getLikePet = getLikePet;

const removeLikePet = async (petId, userId) => {
	try {
		const queryResult = await query(
			SQL`DELETE FROM likedpets WHERE
			pet_id = ${petId} AND user_id = ${userId}`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.removeLikePet = removeLikePet;

const returnPet = async (petId) => {
	try {
		const queryResult = await query(
			SQL`UPDATE pets SET
			status = "available", user_id = null WHERE pet_id = ${petId}`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.returnPet = returnPet;