import {
	PopupName,
	toggledAuthErrorPopupVisibility,
} from '../../features/popups/popups-visibility-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks-redux';
import Popup from '../Popup/Popup';
import authErrorImage from './auth-error-popup-images/auth-error-x.svg'; // eslint-disable-line n/file-extension-in-import

function AuthErrorPopup() {
	const isOpen = useAppSelector(
		(state) => state.popupsVisibility.authErrorPopupIsVisible,
	);
	const errorMessage = useAppSelector((state) => state.error.message);
	const dispatch = useAppDispatch();
	return (
		<Popup
			name={PopupName.authError}
			isOpen={isOpen}
			onClose={() => dispatch(toggledAuthErrorPopupVisibility())}
		>
			<img
				src={authErrorImage}
				alt="Failed red badge"
				className="popup__auth-image"
			/>
			<p className="popup__auth-message">{errorMessage}</p>
		</Popup>
	);
}

export default AuthErrorPopup;
