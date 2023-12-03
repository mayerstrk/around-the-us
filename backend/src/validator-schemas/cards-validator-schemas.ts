import { celebrate, Joi, Segments } from 'celebrate';
import { joiIsValidUrl, noSpecialCharacterRegex } from '../utils';

const addCardValidator = celebrate({
	[Segments.BODY]: Joi.object()
		.keys({
			name: Joi.string()
				.min(2)
				.max(30)
				.required()
				.pattern(noSpecialCharacterRegex),

			link: Joi.string().custom(joiIsValidUrl).required(),
		})
		.messages({
			'string.https': '{{#label}} must be a valid HTTPS URL',
		}),
});
// Like, Unlike, and Delete Card by ID
const cardByIdValidator = celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		cardId: Joi.string().length(24).hex().required(),
	}),
});

export { addCardValidator, cardByIdValidator };
