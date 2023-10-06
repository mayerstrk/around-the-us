import { Router } from 'express';
import {
	createUserController as createUser,
	logInController as logIn,
} from '../controllers/user-controllers';
import { userCredentialsValidator } from '../validator-schemas/user-validator-schemas';

// eslint-disable-next-line new-cap
const router = Router();

router.post('/signUp', userCredentialsValidator, createUser);
router.post('/logIn', userCredentialsValidator, logIn);

export default router;
