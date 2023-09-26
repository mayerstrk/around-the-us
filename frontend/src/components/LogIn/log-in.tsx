import { toggledLogInErrorPopupVisibility } from '../../features/popups/popups-visibility-slice';
import { RoutesPaths } from '../../utills';
import { InputName, useForm } from '../../hooks/hooks-form';
import { useAppOutletContext } from '../../hooks/hooks-react-router';
import { useAppDispatch } from '../../hooks/hooks-redux';
import AppForm, { type AppFormInputs } from '../AppForm/AppForm';
import LogInErrorPopup from '../Popup/PopupInstances/LogInErrorPopup/LogInErrorPopup';

const inputsArray: AppFormInputs = [
	{
		required: true,
		type: 'email',
		id: 'input-log-in-email',
		name: InputName.logInEmail,
		placeholder: 'Email',
	},
	{
		required: true,
		type: 'password',
		id: 'input-log-in-password',
		name: InputName.logInPassword,
		placeholder: 'Password',
	},
];

function LogIn() {
	const { setToken } = useAppOutletContext();
	const { values, handleChange } = useForm();
	const dispatch = useAppDispatch();

	return (
		<>
			<LogInErrorPopup/>
			<AppForm
				header='Sign in'
				name='log-in'
				formType='page'
				inputsArray={inputsArray}
				submitButtonText='Sign in'
				values={values}
				bottomLinkText='Not a member yet? Sign up here!'
				bottomLinkPath={RoutesPaths.signUp}
				onChange={handleChange}
				onSubmit={async event => {
					event.preventDefault();
					const { isError } = await setToken({
						email: values[InputName.logInEmail],
						password: values[InputName.logInPassword],
					});

					if (isError) {
						dispatch(toggledLogInErrorPopupVisibility());
					}
				}}
			/>
		</>

	);
}

export default LogIn;
