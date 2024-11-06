import express from "express";

import validateUserInput  from "../middlewares/Users/signup.middleware.js";
import { signup ,login , logoutUser } from "../controller/users.controller.js";

const Router = express.Router();

Router.post("/signup" , validateUserInput  , signup);
Router.post("/login" , login);
Router.post("/logout" , logoutUser);

export default Router;