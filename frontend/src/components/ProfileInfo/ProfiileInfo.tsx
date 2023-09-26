import { useEffect, type ReactNode } from 'react';
import { useGetUserQuery, type UserDetails } from '../../features/app-data-api/app-data-api-slice';
import { useAppDispatch } from '../../hooks/hooks-redux';
import { toggledAddCardPopupVisibility, toggledEditProfilePopupVisibility, toggleEditAvatarPopupVisibility } from '../../features/popups/popups-visibility-slice';
import { userFetched } from '../../features/current-user/current-user-slice';
import addButton from './Profile__images/add-button.svg';
import ProfileInfoSkeleton from './ProfileInfoSkeleton/ProfileInfoSkeleton';

function ProfileInfo({ children }: { children: ReactNode }) {
	const { data: user, isLoading, isError, isSuccess } = useGetUserQuery();
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (user) {
			dispatch(userFetched(user));
		}
	}, [user]);

	return (
		<section className='profile'>
			{isLoading && (<ProfileInfoSkeleton/>)}
			{isError && (<p>Oh no, an error occurred</p>)}
			{isSuccess && (
				<>
					<ProfileAvatar avatarUrl={user.avatar}/>
					<ProfileDetails name={user.name} about={user.about}/>
					<ProfileAddCardButton/>
					{children}
				</>
			)}
		</section>
	);
}

function ProfileAvatar({ avatarUrl }: { avatarUrl: string }) {
	const dispatch = useAppDispatch();
	return (
		<div className='profile__avatar-container' onClick={() => dispatch(toggleEditAvatarPopupVisibility())}>
			<img src={avatarUrl} alt='Profile picture' className='profile__avatar'/>
		</div>
	);
}

function ProfileDetails({ name, about }: UserDetails) {
	return (
		<div className='profile__details'>
			<div className='profile__name-container'>
				<h1 className='profile__name'>{name}</h1>
				<ProfileEditButton/>
			</div>
			<p className='profile__about'>{about}</p>
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
			type='button'
			className='profile__edit-button'
			onClick={handleClick}
		/>
	);
}

function ProfileAddCardButton() {
	const dispatch = useAppDispatch();

	const handleClick = () => dispatch(toggledAddCardPopupVisibility());

	return (
		<button type='button' className='profile__add-button' onClick={handleClick}>
			<img
				src={addButton}
				alt='add button'
				className='profile__add-plus-sign'
			/>
		</button>
	);
}

export default ProfileInfo;
