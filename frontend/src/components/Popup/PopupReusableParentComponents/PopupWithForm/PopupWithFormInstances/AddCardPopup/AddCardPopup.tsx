import { useEffect } from 'react';
import PopupWithForm from '../../PopupWithForm';
import {
	useAddCardMutation,
} from '../../../../../../features/app-data-api/app-data-api-slice';
import {
	PopupName,
	toggledAddCardPopupVisibility,
} from '../../../../../../features/popups/popups-visibility-slice';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks-redux';
import { useForm, InputName } from '../../../../../../hooks/hooks-form';

function AddCardPopup() {
	const { values, handleChange, setValues } = useForm();

	const isOpen = useAppSelector(
		state => state.popupsVisibility.addCardPopupIsVisible,
	);
	const dispatch = useAppDispatch();
	const [addCard, { isLoading: addCardIsLoading, isSuccess: addCardIsSuccess, reset }] = useAddCardMutation();

	useEffect(() => {
		if (addCardIsSuccess) {
			dispatch(toggledAddCardPopupVisibility());
			setValues({
				...values,
				[InputName.cardName]: '',
				[InputName.cardLink]: '',
			});
		}
	}, [addCardIsSuccess]);

	return (
		<PopupWithForm
			name={PopupName.addCard}
			isOpen={isOpen}
			title='New place'
			buttonText={addCardIsLoading ? 'Saving...' : 'Create'}
			onClose={() => dispatch(toggledAddCardPopupVisibility())}
			onSubmit={event => {
				event.preventDefault();
				reset();
				addCard({ name: values[InputName.cardName], link: values[InputName.cardLink] });
			}}
		>
			<div className='form__input-container'>
				<input
					required
					type='text'
					maxLength={30}
					id='input-cardName'
					name={InputName.cardName}
					placeholder='Name'
					className='form__input form__input_valid form__input_type_popup'
					value={values[InputName.cardName] || ''}
					onChange={handleChange}
				/>
				<span className='form__error form__error_type_title'>.</span>
			</div>
			<div className='form__input-container'>
				<input
					required
					type='url'
					id='input-cardLink'
					name={InputName.cardLink}
					placeholder='Image URL'
					className='form__input form__input_valid form__input_type_popup'
					value={values[InputName.cardLink] || ''}
					onChange={handleChange}
				/>
				<span className='form__error form__error_type_url'>.</span>
			</div>
		</PopupWithForm>
	);
}

export default AddCardPopup;
