import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


/* Register kar User la*/
//req= request, res= response
export const register = async (req, res) => {
    try{

        const {
            // username,
            firstName,
            lastName,
            email,
            password,
            picturepath,
            coverPicturePath,
            companies,
            location,
            occupation
        }=req.body;
        
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt); //Only password 
        const newUser = new User({
            // username,
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturepath,
            coverPicturePath,
            companies,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 5000),
            impressions: Math.floor(Math.random() * 5000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); //201 is for created , 200 is for OK
    }
    catch(err){
        res.status(500).json({error: err.message}); //500 is for internal server error
    }
}

/**
 * Login kar User la
 */
export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json("Invalid credentials");
        }
        const token =jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "24h"});
        delete user.password;
        res.status(200).json({user, token});
    }catch(err){
        res.status(500).json({error: err.message}); //message customize karu shakto
    }}