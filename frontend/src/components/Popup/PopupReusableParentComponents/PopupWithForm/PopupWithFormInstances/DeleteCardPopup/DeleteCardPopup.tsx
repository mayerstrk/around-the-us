import { useEffect } from 'react';
import { useDeleteCardMutation } from '../../../../../../features/app-data-api/app-data-api-slice';
import { PopupName, toggledDeleteCardPopupVisibility } from '../../../../../../features/popups/popups-visibility-slice';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks-redux';
import PopupWithForm from '../../PopupWithForm';

function DeleteCardPopup() {
	const isOpen = useAppSelector(state => state.popupsVisibility.deleteCardPopupIsVisible);
	const selectedCardId = useAppSelector(state => state.selectedCard._id);
	const dispatch = useAppDispatch();
	const [deleteCard, { reset, isSuccess, isLoading }] = useDeleteCardMutation();

	useEffect(() => {
		if (isSuccess) {
			dispatch(toggledDeleteCardPopupVisibility());
		}
	}, [isSuccess]);

	return (
		<PopupWithForm
			name={PopupName.deleteCard}
			title='Are you sure?'
			isOpen={isOpen}
			buttonText={isLoading ? 'Saving...' : 'Yes'}
			onClose={() => dispatch(toggledDeleteCardPopupVisibility())}
			onSubmit={event => {
				event.preventDefault();
				reset();
				deleteCard(selectedCardId);
			}}
		/>
	);
}

export default DeleteCardPopup;
