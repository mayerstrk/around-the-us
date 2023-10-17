import { Router } from 'express';
import {
	createUserController as createUser,
	logInController as logIn,
} from '../controllers/user-controllers';
import { userCredentialsValidator } from '../validator-schemas/user-validator-schemas';

// eslint-disable-next-line new-cap
const router = Router();

router.post('/signup', userCredentialsValidator, createUser);
router.post('/signin', userCredentialsValidator, logIn);

export default router;
