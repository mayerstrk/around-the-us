import { type ReactNode, useEffect, type MouseEvent } from 'react';
import { type PopupName } from '../../features/popups/popups-visibility-slice';

interface PopupOptions {
	classes: string;
}

interface PopupProps {
	children?: ReactNode;
	name: PopupName;
	isOpen: boolean;
	onClose: () => void;
	options?: PopupOptions;
}

function Popup({ children, name, isOpen, onClose, options }: PopupProps) {
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const closeOnEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', closeOnEsc);

		return () => {
			document.removeEventListener('keydown', closeOnEsc);
		};
	}, [isOpen, onClose]);

	const handleOverlay = (event: MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className={`popup popup_type_${name} ${isOpen ? 'popup_visible' : ''}`}
			onClick={handleOverlay}
		>
			<div
				className={`popup__window popup__window_type_${name} ${options?.classes && options.classes}`}
			>
				<button
					type='button'
					className='popup__close-button'
					onClick={onClose}
				/>
				{children}
			</div>
		</div>
	);
}

export default Popup;
export type { PopupProps };
