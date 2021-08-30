const Ajv = require("ajv").default;
const ajv = new Ajv();
const addFormats = require("ajv-formats");
addFormats(ajv);

const validationMid = (schema) => {
	return (req, res, next) => {
		try {
			const validate = ajv.compile(schema);
			const valid = validate(req.body);
			if (!valid) {
				res.status(400).send({ message: "invalid input" });
				return
			}
			next();
		} catch (error) {
			console.log(error);
		}
	};
};

exports.validationMid = validationMid;
