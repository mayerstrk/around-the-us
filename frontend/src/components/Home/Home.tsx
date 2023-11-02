import Gallery from '../Gallery/Gallery';
import ImagePopup from '../ImagePopup/ImagePopup';
import AddCardPopup from '../AddCardPopup/AddCardPopup';
import DeleteCardPopup from '../DeleteCardPopup/DeleteCardPopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import ProfileInfo from '../ProfileInfo/profile-info';

function Home() {
	return (
		<div className="home">
			<ProfileInfo>
				<EditProfilePopup />
				<EditAvatarPopup />
			</ProfileInfo>
			<Gallery>
				<AddCardPopup />
				<ImagePopup />
				<DeleteCardPopup />
			</Gallery>
		</div>
	);
}

export default Home;
