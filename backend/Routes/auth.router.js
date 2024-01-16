import express from 'express';

import { signup } from '../controlers/auth.controller.js';
// auth.router.js

import { signIn } from '../controlers/auth.controller.js';

// Your router logic here...

const router = express.Router();

router.post("/signup",signup)
router.post("/signIn",signIn)

export default router


