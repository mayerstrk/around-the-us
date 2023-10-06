import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toggledLogInErrorPopupVisibility } from '../../features/popups/popups-visibility-slice';
import { RoutesPaths } from '../../utills';
import { InputName, useForm } from '../../hooks/hooks-form';
import { useAppDispatch } from '../../hooks/hooks-redux';
import AppForm, { type AppFormInputs } from '../AppForm/AppForm';
import LogInErrorPopup from '../LogInErrorPopup/LogInErrorPopup';
import { useLogInMutation } from '../../features/app-data-api/app-data-api-slice';
import ProcessLoadingBar from '../ProcessLoadingBar/ProcessLoadingBar';

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
	console.log('LogIn rendered');
	const [
		logInMutation,
		{ error: logInError, isSuccess: isLogInSuccess, isLoading: isLogInLoading },
	] = useLogInMutation();

	const { values, handleChange } = useForm();
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const submitButtonTextDefault = 'Get started';

	useEffect(() => {
		if (isLogInSuccess) {
			navigate(RoutesPaths.home);
		}
	}, [isLogInSuccess, dispatch, navigate]);

	useEffect(() => {
		if (logInError) {
			dispatch(toggledLogInErrorPopupVisibility());
		}
	}, [logInError, dispatch]);

	return (
		<>
			{isLogInLoading && <ProcessLoadingBar />}
			<LogInErrorPopup />
			<AppForm
				header="Log in"
				name="log-in"
				formType="page"
				inputsArray={inputsArray}
				submitButtonText={
					isLogInLoading ? 'Loading...' : submitButtonTextDefault
				}
				values={values}
				bottomLinkText="Not a member yet? Sign up here!"
				bottomLinkPath={RoutesPaths.signUp}
				onChange={handleChange}
				onSubmit={async (event) => {
					event.preventDefault();
					await logInMutation({
						email: values[InputName.logInEmail],
						password: values[InputName.logInPassword],
					});
				}}
			/>
		</>
	);
}

export default LogIn;
