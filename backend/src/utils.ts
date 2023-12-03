import { type CustomHelpers } from 'joi';

const noSpecialCharacterRegex = /^[\p{L}\p{N}\p{Emoji} ]+$/u;

const joiIsValidUrl = (value: string, helpers: CustomHelpers) => {
	try {
		if (new URL(value).protocol !== 'https:') {
			return helpers.error('string.https', { value });
		}

		return value;
	} catch {
		return helpers.error('string.uri', { value });
	}
};

export { noSpecialCharacterRegex, joiIsValidUrl };
