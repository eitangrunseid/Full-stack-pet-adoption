const advancedCheck = () => {
    return (req, res, next) => {
        let { type, name, status, weight, height } = req.query;
        try {

			if (type === "undefined") {
				type = "%%";
			}
			if (name === "undefined") {
				name = "%%";
			}
			if (status === "undefined") {
				status = "%%";
			}
			if (weight === "undefined") {
				weight = "%%";
			}
			if (height === "undefined") {
				height = "%%";
            }
            req.query.type = type;
            req.query.name = name;
            req.query.status = status;
            req.query.weight = weight;
            req.query.height = height;
			next();
		} catch (error) {
			console.log(error);
			res.status(400).send({ message: "Failed to advancedCheck", error });
		}
	};
};
module.exports = advancedCheck;
