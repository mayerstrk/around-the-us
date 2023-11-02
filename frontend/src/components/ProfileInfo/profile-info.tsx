import { type ReactNode } from 'react';
import {
	type UserAvatar,
	type UserDetails,
} from '@shared/shared-types/resources/user.types';
import { useGetUserQuery } from '../../features/app-data-api/app-data-api-slice';
import { useAppDispatch } from '../../hooks/hooks-redux';
import {
	toggledAddCardPopupVisibility,
	toggledEditProfilePopupVisibility,
	toggleEditAvatarPopupVisibility,
} from '../../features/popups/popups-visibility-slice';
import addButton from './profile-info-images/add-button.svg'; // eslint-disable-line n/file-extension-in-import
import ProfileInfoSkeleton from './ProfileInfoSkeleton/profile-info-skeleton';

function ProfileInfo({ children }: { children: ReactNode }) {
	const { data: user, isLoading, isError, isSuccess } = useGetUserQuery();

	return (
		<section className="profile">
			{isLoading && <ProfileInfoSkeleton />}
			{isError && <p>Oh no, an error occurred</p>}
			{isSuccess && (
				<>
					<ProfileAvatar avatar={user.avatar} />
					<ProfileDetails name={user.name} about={user.about} />
					<ProfileAddCardButton />
					{children}
				</>
			)}
		</section>
	);
}

function ProfileAvatar({ avatar }: UserAvatar) {
	const dispatch = useAppDispatch();
	return (
		<div
			className="profile__avatar-container"
			onClick={() => dispatch(toggleEditAvatarPopupVisibility())}
		>
			<img src={avatar} alt="Profile picture" className="profile__avatar" />
		</div>
	);
}

function ProfileDetails({ name, about }: UserDetails) {
	return (
		<div className="profile__details">
			<div className="profile__name-container">
				<h1 className="profile__name">{name}</h1>
				<ProfileEditButton />
			</div>
			<p className="profile__about">{about}</p>
		</div>
	);
}

function ProfileEditButton() {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(toggledEditProfilePopupVisibility());
	};

	return (
		<button
			type="button"
			className="profile__edit-button"
			onClick={handleClick}
		/>
	);
}

function ProfileAddCardButton() {
	const dispatch = useAppDispatch();

	const handleClick = () => dispatch(toggledAddCardPopupVisibility());

	return (
		<button type="button" className="profile__add-button" onClick={handleClick}>
			<img
				src={addButton}
				alt="add button"
				className="profile__add-plus-sign"
			/>
		</button>
	);
}

export default ProfileInfo;
