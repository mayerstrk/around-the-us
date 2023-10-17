import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	toggledLogInErrorPopupVisibility,
	toggledRegisterSuccessPopupVisibility,
} from '../../features/popups/popups-visibility-slice';
import { RoutesPaths } from '../../utils';
import { InputName, useForm } from '../../hooks/hooks-form';
import { useAppDispatch } from '../../hooks/hooks-redux';
import AppForm, { type AppFormInputs } from '../AppForm/AppForm';
import LogInErrorPopup from '../LogInErrorPopup/LogInErrorPopup';
import RegisterSuccessPopup from '../RegisterSuccessPopup/RegisterSuccessPopup';
import { useCreateUserMutation } from '../../features/app-data-api/app-data-api-slice';
import ProcessLoadingBar from '../ProcessLoadingBar/ProcessLoadingBar';

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
	const [
		createUser,
		{
			isSuccess: isCreateUserSuccess,
			isError: isCreateUserError,
			isLoading: isCreateUserLoading,
		},
	] = useCreateUserMutation();
	const submitButtonTextDefault = 'Join us';
	const { values, handleChange } = useForm();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isCreateUserSuccess) {
			dispatch(toggledRegisterSuccessPopupVisibility());
			setTimeout(() => {
				navigate(RoutesPaths.home);
			}, 2000);
			dispatch(toggledRegisterSuccessPopupVisibility());
		}
	}, [isCreateUserSuccess, dispatch, navigate]);

	useEffect(() => {
		if (isCreateUserError) {
			dispatch(toggledLogInErrorPopupVisibility());
		}
	}, [isCreateUserError, dispatch]);

	return (
		<>
			{isCreateUserLoading && <ProcessLoadingBar />}
			<RegisterSuccessPopup />
			<LogInErrorPopup />
			<AppForm
				header="Sign up"
				name="log-in"
				formType="page"
				inputsArray={inputsArray}
				submitButtonText={
					isCreateUserLoading ? 'Loading...' : submitButtonTextDefault
				}
				bottomLinkText="Already a member? Log in here!"
				bottomLinkPath={RoutesPaths.logIn}
				values={values}
				onChange={handleChange}
				onSubmit={async (event) => {
					event.preventDefault();
					createUser({
						email: values[InputName.signUpEmail],
						password: values[InputName.signUpPassword],
					});
				}}
			/>
		</>
	);
}

export default SignUp;
