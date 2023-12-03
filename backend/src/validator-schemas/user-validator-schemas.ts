import { celebrate, Joi, Segments } from 'celebrate';
import { joiIsValidUrl } from '../utils';

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
	[Segments.BODY]: Joi.object()
		.keys({
			avatar: Joi.string().custom(joiIsValidUrl).required(),
		})
		.messages({
			'string.https': '{{#abel}} must be a valid HTTPS ulr',
		}),
});

export { userCredentialsValidator, userDetailsValidator, userAvatarValidator };
