import { PopupName, toggledImagePopupVisibility } from '../../../../features/popups/popups-visibility-slice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks-redux';
import Popup from '../../Popup';

function ImagePopup() {
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector(state => state.popupsVisibility.imagePopupIsVisible);
	const selectedCard = useAppSelector(state => state.selectedCard);

	return (
		<Popup name={PopupName.image} isOpen={isOpen} onClose={() => dispatch(toggledImagePopupVisibility())}>
			<div className='image-popup__image-container'>
				<img className='image-popup__image' alt='Place should go here!' src={selectedCard ? selectedCard.link : ''}/>
			</div>
			<h2 className='image-popup__image-title'>{selectedCard ? selectedCard.name : ''}</h2>
		</Popup>
	);
}

export default ImagePopup;
