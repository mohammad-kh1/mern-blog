import express from "express";

import validateUserInput  from "../middlewares/Users/signup.middleware.js";
import {signup} from "../controller/users.controller.js";

const Router = express.Router();

Router.post("/signup" , validateUserInput  , signup);

export default Router;