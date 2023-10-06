import { celebrate, Joi, Segments } from 'celebrate';

const userCredentialsValidator = celebrate({
	[Segments.BODY]: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required(),
	}),
});

const userDetailsValidator = celebrate({
	[Segments.BODY]: Joi.object().keys({
		name: Joi.string().min(2).max(30).required(),
		about: Joi.string().min(2).max(30).required(),
	}),
});

const userAvatarValidator = celebrate({
	[Segments.BODY]: Joi.object().keys({
		avatar: Joi.string().uri().required(),
	}),
});

export { userCredentialsValidator, userDetailsValidator, userAvatarValidator };
