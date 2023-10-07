import {
	PopupName,
	toggledLogInErrorPopupVisibility,
} from '../../features/popups/popups-visibility-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks-redux';
import Popup from '../Popup/Popup';
import logInErrorImage from './log-in-error-popup-images/log-in-error.svg'; // eslint-disable-line n/file-extension-in-import

function LogInErrorPopup() {
	const isOpen = useAppSelector(
		(state) => state.popupsVisibility.logInErrorPopupIsVisible,
	);
	const dispatch = useAppDispatch();
	return (
		<Popup
			name={PopupName.logInError}
			isOpen={isOpen}
			onClose={() => dispatch(toggledLogInErrorPopupVisibility())}
		>
			<img
				src={logInErrorImage}
				alt="Failed red badge"
				className="popup__auth-image"
			/>
			<p className="popup__auth-message">
				Oops, something went wrong! Please try again.
			</p>
		</Popup>
	);
}

export default LogInErrorPopup;
