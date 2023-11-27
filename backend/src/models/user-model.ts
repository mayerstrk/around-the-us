import { Schema, model, type Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { ErrorName } from '@shared/shared-enums/error-names';
import { type UserDocument } from '@shared/shared-types/resources/user.types';

interface IUserModel extends Model<UserDocument> {
	findUserByCredentials(emai: string, password: string): Promise<UserDocument>;
	findUserEmailById(id: string): Promise<{ email: string }>;
}

const userSchema = new Schema<UserDocument, IUserModel>(
	{
		name: {
			type: String,
			minlength: 2,
			maxlength: 30,
			required: true,
			default: 'Jacques Cousteau',
		},
		about: {
			type: String,
			minlength: 2,
			maxlength: 30,
			required: true,
			default: 'Explorer',
		},
		avatar: {
			type: String,
			required: true,
			validate: {
				validator: (url: string) => validator.isURL(url),
				message: 'Invalid URL',
			},
			default:
				'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: (email: string) => validator.isEmail(email),
				message: 'Invalid email',
			},
		},
		password: {
			type: String,
			required: true,
			select: false,
			validate: {
				validator: (password: string) => validator.isStrongPassword(password),
				message:
					'Password should be at least 10 characters long and contain uppercase, lowercase, numbers, and symbol characters.',
			},
		},
	},
	{ timestamps: true },
);

userSchema.static('findUserEmailById', async function (id: string): Promise<{
	email: string;
}> {
	const user = await this.findById(id).orFail({
		message: 'Invalid user ID',
		name: ErrorName.notFound,
	});
	return { email: user.email };
});

userSchema.static(
	'findUserByCredentials',
	async function (email: string, password: string): Promise<UserDocument> {
		const user = await this.findOne({ email }).select('+password').orFail({
			message: 'Invalid email or password',
			name: ErrorName.authentication,
		});

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			const error = new Error('Invalid email or password');
			error.name = ErrorName.authentication;
			throw error;
		}

		return user;
	},
);

const UserModel = model<UserDocument, IUserModel>('User', userSchema);

export { UserModel };
