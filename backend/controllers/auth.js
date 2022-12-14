import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createError } from '../utils/error/errorHandler.js'
import { verifyUser } from "../utils/auth/verifyToken.js";

dotenv.config()

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username })
		if (!user) return next(createError(401, 'This user doesn\'t exist.'))
		const passwordMatches = await bcrypt.compare(req.body.password, user.password)
		if (!passwordMatches) return next(createError(400, 'This password isn\'t correct.'))
		const { password, isAdmin, ...otherDetails } = user._doc;

		const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)
		res.status(200).cookie('access_token', token, { httpOnly: true, maxAge: 360000 }).send({ ...otherDetails });
	} catch (err) {
		next(createError(401, 'Error loggin in user.'));
	}
};

export const register = async (req, res, next) => {
	verifyUser(req,res,next);
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(req.body.password, salt);
	try {
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hash
		});
		await newUser.save();
		res.status(201).send('New user OK');
	} catch (err) {
		next(createError(401, 'Error registering user.'));
	}
};