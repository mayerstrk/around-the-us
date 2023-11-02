import { type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	toggledAuthErrorPopupVisibility,
	toggledSignUpSuccessPopupVisibility,
} from '../../features/popups/popups-visibility-slice';
import { RoutesPaths } from '../../utils';
import { InputName, useForm } from '../../hooks/hooks-form';
import { useAppDispatch } from '../../hooks/hooks-redux';
import AppForm, { type AppFormInputs } from '../AppForm/AppForm';
import { useCreateUserMutation } from '../../features/app-data-api/app-data-api-slice';
import ProcessLoadingBar from '../ProcessLoadingBar/process-loading-bar';

const inputsArray: AppFormInputs = [
	{
		required: true,
		autoComplete: 'off',
		type: 'email',
		id: 'input-sign-up-email',
		name: InputName.signUpEmail,
		placeholder: 'Email',
	},
	{
		required: true,
		type: 'password',
		autoComplete: 'new-password',
		id: 'input-sign-up-password',
		name: InputName.signUpPassword,
		placeholder: 'Password',
		minLength: 8,
	},
];

function SignUp({ children }: { children: ReactNode }) {
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
			dispatch(toggledSignUpSuccessPopupVisibility());
			setTimeout(() => {
				dispatch(toggledSignUpSuccessPopupVisibility());
				navigate(RoutesPaths.home);
			}, 2000);
			// Dispatch(toggledSignUpSuccessPopupVisibility());
		}
	}, [isCreateUserSuccess, dispatch, navigate]);

	useEffect(() => {
		if (isCreateUserError) {
			dispatch(toggledAuthErrorPopupVisibility());
		}
	}, [isCreateUserError, dispatch]);

	return (
		<>
			{isCreateUserLoading && <ProcessLoadingBar />}
			{children}
			<AppForm
				header="Sign up"
				name="sign-in"
				formType="page"
				inputsArray={inputsArray}
				submitButtonText={
					isCreateUserLoading ? 'Loading...' : submitButtonTextDefault
				}
				bottomLinkText="Already a member? Log in here!"
				bottomLinkPath={RoutesPaths.signIn}
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
