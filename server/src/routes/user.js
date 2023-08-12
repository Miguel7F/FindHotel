const { Router } = require("express");
const { createUser } = require('../controllers/users');

const userRouter = Router();

userRouter.post('/user', createUser);


module.exports = userRouter;