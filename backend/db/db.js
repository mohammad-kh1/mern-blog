import mongoose from "mongoose" ;

const DB = () => {
	mongoose.connect(process.env.MONGO_URI);
}


export default DB;