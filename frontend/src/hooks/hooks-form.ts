import { useState, type ChangeEvent } from 'react';

const enum InputName {
	profileName = 'profileName',
	profileAbout = 'profileAbout',
	cardName = 'cardName',
	cardLink = 'cardLink',
	avatarLink = 'avatarLink',
	logInEmail = 'logInEmail',
	logInPassword = 'logInPassword',
	signUpEmail = 'signUpEmail',
	signUpPassword = 'signUpPassword ',
}

type InputValues = { [key in InputName]: string };

const useForm = () => {
	const [values, setValues] = useState<InputValues>({} as InputValues);

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		if (event.target) {
			const { value, name } = event.target;
			setValues({ ...values, [name]: value });
		} else {
			throw new Error('Sorry');
		}
	}

	return { values, handleChange, setValues };
};

export { InputName, type InputValues, useForm };
