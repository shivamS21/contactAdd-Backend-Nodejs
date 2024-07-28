import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
/**
 * @desc Register the user
 * @router POST /api/users/register
 * @access public
 */
export const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    // find uniquely by email
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists");
    }

    // register the user if not found
    const hashedPassword = await bcrypt.hash(password, 10); // 10: saltbrowns
    console.log(hashedPassword);
    const user = await User.create({
        username, email, password: hashedPassword
    });
    // key-value pairs are necessary. if both are same, then ES6 allows for no key
    
    if (user) {
        res.status(201).json({_id: user.id, username: user.username, email: user.email})
    } else {
        res.status(400);
        throw new Error("User data is not valid.")
    }
})
/**
 * @desc Login the user
 * @router POST /api/users/login
 * @access public
 */
export const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }

    const user = await User.findOne({email});
    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }

    // compare password with the hashed password
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
                user: { 
                    username: user.username,
                    email: user.email,
                    id: user.id,
                }
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m"}
        )
        console.log('token', accessToken)
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error("password is not valid")
    }
})
/**
 * @desc Current user
 * @router GET /api/users/current
 * @access private
 */
export const currentUser = asyncHandler(async(req, res) => {
    res.json(req.user);
})