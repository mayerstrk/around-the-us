import {
	PopupName,
	toggledRegisterSuccessPopupVisibility,
} from '../../features/popups/popups-visibility-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks-redux';
import Popup from '../Popup/Popup';
import signUpSuccessImage from './register-success-popup-images/sign-up-success.svg'; // eslint-disable-line n/file-extension-in-import

function RegisterSuccessPopup() {
	const isOpen = useAppSelector(
		(state) => state.popupsVisibility.signUpSuccessPopupIsVisible,
	);
	const dispatch = useAppDispatch();
	return (
		<Popup
			name={PopupName.signUpSuccess}
			isOpen={isOpen}
			onClose={() => dispatch(toggledRegisterSuccessPopupVisibility())}
		>
			<img
				src={signUpSuccessImage}
				alt="Checkmark black badge"
				className="popup__auth-image"
			/>
			<p className="popup__auth-message">
				Success! You have now been signed up.
			</p>
		</Popup>
	);
}

export default RegisterSuccessPopup;
