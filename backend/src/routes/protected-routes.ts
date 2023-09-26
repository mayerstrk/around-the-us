import { Router } from 'express';
import {
	createCardController as createCard,
	deleteCardController as deleteCard,
	unlikeCardController,
	getCardsController as getCards,
	likeCardController as likeCard,
} from '../controllers/card-controllers';
import {
	getUsersController as getUsers,
	getUserController as getUser,
	createUserController as createUser,
	updateProfileInfoController as updateProfileInfo,
	updateAvatarController as updateAvatar,
} from '../controllers/user-controllers';

// eslint-disable-next-line new-cap
const router = Router();

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.patch('/users/me', updateProfileInfo);
router.patch('/users/me/avatar', updateAvatar);
router.post('/users', createUser);

router.get('/cards', getCards);
router.put('/cards/:cardId/likes', likeCard);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.delete('/cards/:cardId/likes', unlikeCardController);

export default router;
