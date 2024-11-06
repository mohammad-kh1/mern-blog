import express from "express";
import Users from "../models/users.model.js";
import { body } from "express-validator"; 
import bcrypt from "bcryptjs";
import generateTokenAndSaveToCookie from "../utils/jwt.js";

export const signup = async(req, res)=> {
	const {firstName , lastName , email , password , passwordConfirm , username } = req.body;

	const userEmail = await Users.findOne({email});
	const usernameRequest = await Users.findOne({username});
	if(userEmail){
		return res.status(400).json({message:"email is already exists"});
	}
	if(usernameRequest){
		return res.status(400).json({message:"username is already exists"});
	}
    const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password , salt);

	const newUser = new Users({
		firstName,
		lastName,
		password:hashedPassword,
		email,
		username,
	});
	if(newUser){
		generateTokenAndSaveToCookie(newUser._id  ,res);
		await newUser.save();
		return res.status(201).json({
			message:"user created successfuly",
			user:{
				id:newUser._id
			},
			firstName:newUser.firstName,
			lastName : newUser.lastName,
			email: newUser.email,
			username: newUser.username
		});
	}else{
		return res.status(400).json({message:"invalid registration data"});
	}
}

export const login = async (req , res) => {

	try{
		const {emailOrUsername , password} = req.body;
		let user=null;
		if(emailOrUsername.includes("@")){
			 user= await Users.findOne({email:emailOrUsername});
		}else{
			 user = await Users.findOne({username:emailOrUsername});
		}

		const isMatch =  await bcrypt.compare(password , user?.password);
		if(!isMatch){
			return res.status(400).json({message:"invalid credentials"});
		}
		generateTokenAndSaveToCookie(user._id , res);

		return res.status(200).json({message:"successfuly login" , user:{
			id:user._id,
			firstName:user.firstName,
			lastName:user.lastName,
			username:user.username,
			email:user.email,
		}});
	}catch(error){
		console.log(error.message);
		return res.status(500).json({message:"server error"});
	}

}

export const logoutUser = (req , res) => {
	try{
		res.cookie("token" , {expires:new Date(0) , maxAge:0}).json({message:"Logged out"});

	}catch(error){
		console.log(error);
		return res.status(500).json({message:"server errror"});
	}
}