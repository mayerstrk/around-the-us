import { useState } from 'react';
import {
	toggledErrorPopupVisibility,
	wasClicked,
} from '../../features/popups/popups-visibility-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks-redux';

function ErrorPopup() {
	const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);

	const dispatch = useAppDispatch();

	const isOpen = useAppSelector(
		(state) => state.popupsVisibility.errorPopupIsVisible,
	);

	const error = useAppSelector((state) => state.error);

	const onSeeDetailsClick = () => {
		setIsErrorMessageVisible(!isErrorMessageVisible);
	};

	return (
		<div
			className={`popup_type_error ${isOpen ? 'popup_visible' : ''} error`}
			onClick={() => dispatch(wasClicked())}
		>
			<p className="error__text">
				<span className="error__see-more" onClick={onSeeDetailsClick}>
					{isErrorMessageVisible
						? 'See Less   '
						: 'An error occured (click to see details)'}
				</span>
				<span
					className={
						isErrorMessageVisible
							? 'error__message_visible'
							: 'error__message_hidden'
					}
				>
					{error.globalErrorMessage && error.globalErrorMessage}
				</span>
			</p>
			<button
				type="button"
				className="error__close-button"
				onClick={() => {
					setIsErrorMessageVisible(false);
					dispatch(toggledErrorPopupVisibility());
				}}
			/>
		</div>
	);
}

export default ErrorPopup;
