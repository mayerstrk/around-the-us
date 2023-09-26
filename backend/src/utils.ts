const linkValidationRegex =
	/^http(s)?:\/\/(www.)?[\w.~:/?%#\]@!$&'()*+,;=]{1,256}$/i;

const mongooseLinkValidator = (link: string): boolean =>
	linkValidationRegex.test(link);

export { linkValidationRegex, mongooseLinkValidator };
