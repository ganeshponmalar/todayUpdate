import user from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new user({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json("user created successfully")
    } catch (error) {
        next(error);
    }

}


export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await user.findOne({email});
        console.log(validUser,'validpassword')
        if(!validUser)return next(errorHandler(404,'user not found'));

          const validPassword = bcryptjs.compareSync(password,validUser.password);
                console.log(validPassword,'valid password')
          if(!validPassword)return next(errorHandler(401,"Invalid cerdentials"));

          const token =  jwt.sign({id: validUser._id},process.env.JWT_SECRET)
          console.log(token,'token')
          const {password: pass,...rest} = validUser._doc;
          res.cookie('access_token',token,{httpOnly:true})

          .status(200)
          .json(rest)
    } catch (error) {
        next(error)
    }
}