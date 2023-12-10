import { Router } from 'express';
import {
	createUserController as createUser,
	signInController as signIn,
} from '../controllers/user-controllers';
import { userCredentialsValidator } from '../validator-schemas/user-validator-schemas';

// eslint-disable-next-line new-cap
const router = Router();

router.post('/around/signup', userCredentialsValidator, createUser);
router.post('/around/signin', userCredentialsValidator, signIn);

export default router;
