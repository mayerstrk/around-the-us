import { type ReactNode } from 'react';
import { type CardData, useToggleLikeMutation, type UserData } from '../../features/app-data-api/app-data-api-slice';

import { useAppDispatch } from '../../hooks/hooks-redux';
import { toggledDeleteCardPopupVisibility, toggledImagePopupVisibility } from '../../features/popups/popups-visibility-slice';
import { selectedCard } from '../../features/selected-card/selected-card-slice';

interface CardProps {
	cardData: CardData;
	currentUserId: string;
}
interface CardImageProps {
	cardData: CardData;
	isOwner: boolean;
}
interface CardActionBarProps {
	children: ReactNode;
	name: string;
}
interface CardLikesProps {
	likes: UserData[];
	cardId: string;
	currentUserId: string;
}

function Card({ cardData, currentUserId }: CardProps) {
	const dispatch = useAppDispatch();
	return (
		<li className='card' onClick={() => dispatch(selectedCard(cardData))}>
			<CardImage
				cardData={cardData}
				isOwner={cardData.owner._id === currentUserId}
			/>
			<CardActionBar name={cardData.name}>
				<CardLikes likes={cardData.likes} cardId={cardData._id} currentUserId={currentUserId}/>
			</CardActionBar>
		</li>
	);
}

function CardImage({ cardData, isOwner }: CardImageProps) {
	const dispatch = useAppDispatch();
	return (
		<div
			className='card__photo-container'
		>
			<img
				src={cardData.link}
				alt='Place goes here'
				className='card__photo'
				onClick={() => {
					dispatch(toggledImagePopupVisibility());
				}}
			/>
			<button
				type='button'
				className={`card__delete-button ${
					isOwner ? 'card__delete-button_visible' : ''
				}`}
				onClick={() => dispatch(toggledDeleteCardPopupVisibility())}
			/>
		</div>
	);
}

function CardActionBar({ children, name }: CardActionBarProps) {
	return (
		<div className='card__bar'>
			<h2 className='card__name'>{name}</h2>
			{children}
		</div>
	);
}

function CardLikes({ likes, cardId, currentUserId }: CardLikesProps) {
	const [toggleLike, { isLoading }] = useToggleLikeMutation();
	const isLiked = likes.some((user: UserData) => user._id === currentUserId);

	return (
		<div className='card__likesContainer'>
			<button
				type='button'
				className={`card__like-button ${
					isLoading ? (isLiked ? '' : 'card__like-button_active') : (isLiked ? 'card__like-button_active' : '')
				}`}
				onClick={() => {
					toggleLike({
						cardId,
						isLiked,
					});
				}}
			/>
			<p className='card__likes'>{isLoading ? (isLiked ? likes.length - 1 : likes.length + 1) : likes.length}</p>
		</div>
	);
}

export default Card;
