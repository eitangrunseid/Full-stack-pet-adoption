const jwt = require("jsonwebtoken");
const secretKey = "oijfkdsfjodsf843jfe89jfd9843fj9438fj9843jf9843fj9843";

const sign = (data) => {
	return jwt.sign(data, secretKey, { expiresIn: 10000 });
};
exports.sign = sign;