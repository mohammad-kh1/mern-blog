import express from "express";

import validateUserInput  from "../middlewares/Users/signup.middleware.js";
import { signup ,login } from "../controller/users.controller.js";

const Router = express.Router();

Router.post("/signup" , validateUserInput  , signup);
Router.post("/login" , login);

export default Router;