import { toggledLogInErrorPopupVisibility, toggledRegisterSuccessPopupVisibility } from '../../features/popups/popups-visibility-slice';
import { RoutesPaths } from '../../utills';
import { InputName, useForm } from '../../hooks/hooks-form';
import { useAppOutletContext } from '../../hooks/hooks-react-router';
import { useAppDispatch } from '../../hooks/hooks-redux';
import AppForm, { type AppFormInputs } from '../AppForm/AppForm';
import LogInErrorPopup from '../Popup/PopupInstances/LogInErrorPopup/LogInErrorPopup';
import RegisterSuccessPopup from '../Popup/PopupInstances/RegisterSuccessPopup/RegisterSuccessPopup';

const inputsArray: AppFormInputs = [
	{
		required: true,
		type: 'email',
		id: 'input-sign-up-email',
		name: InputName.signUpEmail,
		placeholder: 'Email',
	},
	{
		required: true,
		type: 'password',
		id: 'input-sign-up-password',
		name: InputName.signUpPassword,
		placeholder: 'Password',
	},
];

function SignUp() {
	const { register } = useAppOutletContext();
	const { values, handleChange } = useForm();
	const dispatch = useAppDispatch();

	// Const credentials = {
	// 	email: 'mirzaflores@gmail.com',
	// 	password: 'pop',
	// };

	return (
		<>
			<RegisterSuccessPopup/>
			<LogInErrorPopup/>
			<AppForm
				header='Sign up'
				name='log-in'
				formType='page'
				inputsArray={inputsArray}
				submitButtonText='Sign up'
				bottomLinkText='Already a member? Log in here!'
				bottomLinkPath={RoutesPaths.logIn}
				values={values}
				onChange={handleChange}
				onSubmit={async event => {
					event.preventDefault();
					const { isSuccess, isError } = await register({
						email: values[InputName.signUpEmail],
						password: values[InputName.signUpPassword],
					});
					if (isSuccess) {
						dispatch(toggledRegisterSuccessPopupVisibility());
					}

					if (isError) {
						dispatch(toggledLogInErrorPopupVisibility());
					}
				}}
			/>
		</>
	);
}

// 	Return (
// 		<>
// 			<h1>Sign up</h1>
// 			<button
// 				type='submit'
// 				onClick={() => {
// 					register(credentials);
// 				}}
// 			>Sign up
// 			</button>
// 		</>

// 	);
// }

export default SignUp;
