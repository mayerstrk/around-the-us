import { type SyntheticEvent } from 'react';
import Popup, { type PopupProps } from '../../Popup';

interface PopupWithFormProps extends PopupProps {
	title: string;
	onSubmit: (evt: SyntheticEvent) => void;
	buttonText: string;
}

function PopupWithForm({
	name,
	isOpen,
	onClose,
	title,
	onSubmit,
	children,
	buttonText,
}: PopupWithFormProps) {
	return (
		<Popup name={name} isOpen={isOpen} onClose={onClose}>
			<h3 className={`popup__title popup__title_type_${name}`}>{title}</h3>
			<form
				className={`form form_type_${name}`}
				name={name}
				onSubmit={onSubmit}
			>
				{children}
				<SubmitButton buttonText={buttonText}/>
			</form>
		</Popup>
	);
}

function SubmitButton({ buttonText }: { buttonText: string }) {
	return (
		<button type='submit' className='form__button'>
			{buttonText}
		</button>
	);
}

export default PopupWithForm;
export type { PopupWithFormProps };
