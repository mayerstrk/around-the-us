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
router.get('/around/auth', validateToken);

router.get('/around/users', getUsers);
router.get('/around/users/me', getUser);
router.patch('/around/users/me', userDetailsValidator, updateProfileInfo);
router.patch('/around/users/me/avatar', userAvatarValidator, updateAvatar);

router.get('/around/cards', getCards);
router.put('/around/cards/:cardId/likes', cardByIdValidator, likeCard);
router.post('/around/cards', addCardValidator, addCard);
router.delete('/around/cards/:cardId', cardByIdValidator, deleteCard);
router.delete(
	'/around/cards/:cardId/likes',
	cardByIdValidator,
	unlikeCardController,
);

router.post('/around/logout', logOut);

export default router;
