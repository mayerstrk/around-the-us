import { useEffect } from 'react';
import PopupWithForm from '../../PopupWithForm';
import {
	PopupName,
	toggledEditProfilePopupVisibility,
} from '../../../../../../features/popups/popups-visibility-slice';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks-redux';
import {
	useUpdateProfileInfoMutation,
} from '../../../../../../features/app-data-api/app-data-api-slice';
import {
	useUserDetails,
} from '../../../../../../hooks/hooks-user-data';
import { InputName, useForm } from '../../../../../../hooks/hooks-form';

function EditProfilePopup() {
	const { values, handleChange, setValues } = useForm();
	const isOpen = useAppSelector(
		state => state.popupsVisibility.editProfilePopupIsVisible,
	);
	const dispatch = useAppDispatch();

	const [
		updateProfileInfo,
		{ isLoading: isUpdating, isSuccess: updateProfileInfoIsSuccess, reset },
	] = useUpdateProfileInfoMutation();

	const { userDetails, isSuccess: getUserDetailsIsSuccess } = useUserDetails();

	useEffect(() => {
		if (isOpen && getUserDetailsIsSuccess) {
			setValues({
				...values,
				[InputName.profileName]: userDetails.name,
				[InputName.profileAbout]: userDetails.about,
			});
		}
	}, [isOpen, getUserDetailsIsSuccess]);

	useEffect(() => {
		if (updateProfileInfoIsSuccess) {
			dispatch(toggledEditProfilePopupVisibility());
		}
	}, [updateProfileInfoIsSuccess, dispatch]);

	return (
		<PopupWithForm
			title='Edit profile'
			name={PopupName.editProfile}
			buttonText={`${isUpdating ? 'Saving...' : 'Save'}`}
			isOpen={isOpen}
			onClose={() => dispatch(toggledEditProfilePopupVisibility())}
			onSubmit={event => {
				event.preventDefault();
				reset();
				updateProfileInfo({
					name: values[InputName.profileName],
					about: values[InputName.profileAbout],
				});
			}}
		>
			<fieldset className='form__fieldset'>
				<div className='form__input-container'>
					<input
						required
						type='text'
						id='input-profileName'
						name={InputName.profileName}
						minLength={2}
						maxLength={40}
						placeholder='Name'
						className='form__input form__input_valid form__input_type_popup'
						value={values[InputName.profileName] || ''}
						onChange={handleChange}
					/>
					<span className='form__error form__error_type_name'>.</span>
				</div>
				<div className='form__input-container'>
					<input
						required
						type='text'
						id='input-profileAbout'
						name={InputName.profileAbout}
						minLength={2}
						maxLength={200}
						placeholder='About you'
						className='form__input form__input_valid form__input_type_popup'
						value={values[InputName.profileAbout] || ''}
						onChange={handleChange}
					/>
					<span className='form__error form__error_type_about'>.</span>
				</div>
			</fieldset>
		</PopupWithForm>
	);
}

export default EditProfilePopup;
