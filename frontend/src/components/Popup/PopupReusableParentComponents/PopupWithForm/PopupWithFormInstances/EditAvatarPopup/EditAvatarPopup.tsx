import { useEffect } from 'react';
import { useUpdateAvatarMutation } from '../../../../../../features/app-data-api/app-data-api-slice';
import { PopupName, toggleEditAvatarPopupVisibility } from '../../../../../../features/popups/popups-visibility-slice';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks-redux';
import PopupWithForm from '../../PopupWithForm';
import { InputName, useForm } from '../../../../../../hooks/hooks-form';

function EditAvatarPopup() {
	const isOpen = useAppSelector(state => state.popupsVisibility.editAvatarPopupIsVisible);
	const dispatch = useAppDispatch();

	const { values, handleChange, setValues } = useForm();

	const [
		updateAvatar,
		{ isLoading: isUpdating, isSuccess, reset },
	] = useUpdateAvatarMutation();

	useEffect(() => {
		if (isSuccess) {
			dispatch(toggleEditAvatarPopupVisibility());
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isOpen) {
			setValues({ ...values, [InputName.avatarLink]: '' });
		}
	}, [isOpen]);

	return (
		<PopupWithForm
			name={PopupName.editAvatar}
			isOpen={isOpen}
			title='Change Profile Picture'
			buttonText={isUpdating ? 'Saving...' : 'Save'}
			onClose={() => dispatch(toggleEditAvatarPopupVisibility())}
			onSubmit={event => {
				event.preventDefault();
				reset();
				updateAvatar([undefined, { avatar: values[InputName.avatarLink] }]);
			}}
		>
			<div className='form__input-container'>
				<input
					required
					type='url'
					id='input-profileUrl'
					name='avatarLink'
					placeholder='Image URL'
					className='form__input form__input_valid form__input_type_popup'
					value={values[InputName.avatarLink] || ''}
					onChange={handleChange}

				/>
				<span className='form__error form__error_type_url'>.</span>
			</div>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;
