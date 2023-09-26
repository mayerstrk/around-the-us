import { useAppSelector } from '../../hooks/hooks-redux';
import Gallery from '../Gallery/Gallery';
import ImagePopup from '../Popup/PopupInstances/ImagePopup/ImagePopup';
import AddCardPopup from '../Popup/PopupReusableParentComponents/PopupWithForm/PopupWithFormInstances/AddCardPopup/AddCardPopup';
import DeleteCardPopup from '../Popup/PopupReusableParentComponents/PopupWithForm/PopupWithFormInstances/DeleteCardPopup/DeleteCardPopup';
import EditAvatarPopup from '../Popup/PopupReusableParentComponents/PopupWithForm/PopupWithFormInstances/EditAvatarPopup/EditAvatarPopup';
import EditProfilePopup from '../Popup/PopupReusableParentComponents/PopupWithForm/PopupWithFormInstances/EditProfilePopup/EditProfilePopup';
import ProfileInfo from '../ProfileInfo/ProfiileInfo';

function Main() {
	const isUserAuthorized = useAppSelector(state => state.userAuthenticationData.isAuthorized);

	return (
		// eslint-disable-next-line operator-linebreak
		isUserAuthorized ?
			<main className='main'>
				<ProfileInfo>
					<EditProfilePopup/>
					<EditAvatarPopup/>
				</ProfileInfo>
				<Gallery>
					<AddCardPopup/>
					<ImagePopup/>
					<DeleteCardPopup/>
				</Gallery>
			</main>
			: <p>User not Authorized</p>
	);
}

export default Main;
