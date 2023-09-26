import { PopupName, toggledRegisterSuccessPopupVisibility } from '../../../../features/popups/popups-visibility-slice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks-redux';
import Popup from '../../Popup';
import registerSuccessImage from './images/register-success.svg';

function RegisterSuccessPopup() {
	const isOpen = useAppSelector(state => state.popupsVisibility.registerSuccessPopupIsVisible);
	const dispatch = useAppDispatch();
	return (
		<Popup name={PopupName.registerSuccess} isOpen={isOpen} onClose={() => dispatch(toggledRegisterSuccessPopupVisibility())}>
			<img src={registerSuccessImage} alt='Checkmark black badge' className='popup__auth-image'/>
			<p className='popup__auth-message'>Success! You have now been registered.</p>
		</Popup>
	);
}

export default RegisterSuccessPopup;
