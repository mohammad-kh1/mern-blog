import mongoose from "mongoose";
import { Schema } from "mongoose";

const UsersSchema = new Schema({

	ID:{
		tpye:mongoose.Schema.Types.ObjectId,
	},

	firstName : {
		type:String,
	},
	lastName:{
		type:String,
	},
	email:{
		type:String,
		required:true,
		unique:true,
		lowercase:true,
		trim:true,
	},
	password:{
		type:String,
		required:true,
	},
	date:{
		type:Date,
		default: Date.now
	},
	username:{
		type:String,
		required:String,
		unique:true,
	}


});

const User = mongoose.model("Users" , UsersSchema);

export default User;