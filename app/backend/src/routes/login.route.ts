import express = require('express');
import Token from '../auth/jwt.token';
import LoginFields from '../middlewares/login.middeleware';
import User from '../database/models/user.model';
import LoginService from '../database/services/login.service';
import LoginController from '../database/controllers/login.controller';

const router = express.Router();

const loginService = new LoginService(User, new Token());
const loginController = new LoginController(loginService);
const validateFields = new LoginFields();

router.post('/', validateFields.checkLoginFields, loginController.loginUser);
router.get('/role', loginController.getLoginRole);

export default router;
