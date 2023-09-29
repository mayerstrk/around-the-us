import { type RequestUser } from '../shared-types/resources/user.types';

function isRequestUser(value: unknown): value is RequestUser {
	if (typeof value !== 'object' || value === null) return false;

	const keys = Object.keys(value);
	return (
		keys.length === 1 &&
		keys[0] === '_id' &&
		typeof (value as any)._id === 'string'
	);
}

export { isRequestUser };
