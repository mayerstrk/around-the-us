import { Router } from 'express';
import { createUserController as createUser } from '../controllers/user-controllers';

// eslint-disable-next-line new-cap
const router = Router();

router.post('/users', createUser);

export default router;
