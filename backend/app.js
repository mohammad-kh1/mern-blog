import express from "express";
import dotenv from "dotenv";

// LOCAL
import DB from "./db/db.js";


dotenv.config();
DB();

const app = express();
const PORT = process.env.PORT || 5001;








app.listen(PORT , () => {
	console.log(`SERVER RUNNING ON ${PORT}`);
	console.log(`DB CONNECTED`);
});