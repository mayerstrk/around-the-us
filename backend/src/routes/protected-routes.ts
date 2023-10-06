import { Router } from 'express';
import {
	addCardController as addCard,
	deleteCardController as deleteCard,
	unlikeCardController,
	getCardsController as getCards,
	likeCardController as likeCard,
} from '../controllers/card-controllers';
import {
	getUsersController as getUsers,
	getUserController as getUser,
	updateProfileInfoController as updateProfileInfo,
	updateAvatarController as updateAvatar,
	logOutController as logOut,
	validateTokenController as validateToken,
} from '../controllers/user-controllers';
import {
	userAvatarValidator,
	userDetailsValidator,
} from '../validator-schemas/user-validator-schemas';
import {
	addCardValidator,
	cardByIdValidator,
} from '../validator-schemas/cards-validator-schemas';

// eslint-disable-next-line new-cap
const router = Router();
router.get('/auth', validateToken);

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.patch('/users/me', userDetailsValidator, updateProfileInfo);
router.patch('/users/me/avatar', userAvatarValidator, updateAvatar);

router.get('/cards', getCards);
router.put('/cards/:cardId/likes', cardByIdValidator, likeCard);
router.post('/cards', addCardValidator, addCard);
router.delete('/cards/:cardId', cardByIdValidator, deleteCard);
router.delete('/cards/:cardId/likes', cardByIdValidator, unlikeCardController);

router.post('/logout', logOut);

export default router;
