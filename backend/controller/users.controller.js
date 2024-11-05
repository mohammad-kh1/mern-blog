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
	console.log(newUser);
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