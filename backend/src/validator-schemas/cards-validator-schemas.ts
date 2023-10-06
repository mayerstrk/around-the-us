import { celebrate, Joi, Segments } from 'celebrate';

// Card Creation
const addCardValidator = celebrate({
	[Segments.BODY]: Joi.object().keys({
		name: Joi.string().min(2).max(30).required(),
		link: Joi.string().uri().required(),
	}),
});

// Like, Unlike, and Delete Card by ID
const cardByIdValidator = celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		cardId: Joi.string().required(), // Assuming cardId is a string, adjust as needed
	}),
});

export { addCardValidator, cardByIdValidator };
