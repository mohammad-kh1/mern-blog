import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// LOCAL
import DB from "./db/db.js";
import authRoutes from "./routes/users.route.js";

dotenv.config();
DB();

const app = express();
const PORT = process.env.PORT || 5001;


// middlewares

app.use(express.json());
app.use(cookieParser());


app.use("/api/users/" , authRoutes);







app.listen(PORT , () => {
	console.log(`SERVER RUNNING ON ${PORT}`);
	console.log(`DB CONNECTED`);
});