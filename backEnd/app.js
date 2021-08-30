const express = require("express");
const cors = require("cors");
const { postgrator } = require("./data/mySqldb")
const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/register", require("./routes/register"));
app.use("/pets", require("./routes/pets"));
app.use("/users", require("./routes/users"));
app.use("/search", require("./routes/search"));


postgrator
	.migrate()
	.then((result) => {
		console.log("migaration completed");
		app.listen(PORT, () => {
			console.log(`server started http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
