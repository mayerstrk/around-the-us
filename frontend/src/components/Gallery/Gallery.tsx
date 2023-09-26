import { type ReactNode } from 'react';
import {
	type CardData,
	useGetCardsQuery,
} from '../../features/app-data-api/app-data-api-slice';
import Card from '../Card/Card';
import { useUserId } from '../../hooks/hooks-user-data';
import GalletySkeleton from './GallerySkeleton/gallery-skeleton';

function Gallery({ children }: { children: ReactNode }) {
	const {
		data: cards = [] as CardData[],
		isLoading: cardsAreLoading,
		isError: cardsError,
		isSuccess: cardsSuccess,
	} = useGetCardsQuery();

	const { userId, isLoading: userIdIsLoading, isError: userIdError } = useUserId();

	return (
		<section className='gallery'>
			{(cardsAreLoading || userIdIsLoading) && (<GalletySkeleton length={6}/>)}
			{(cardsError || userIdError) && (<p>Oh no, there was an error</p>)}
			{(cardsSuccess && userId) && (
				<>
					<ul className='gallery__cards'>
						{cards.map(cardData => (
							<Card
								key={cardData._id}
								cardData={cardData}
								currentUserId={userId}
							/>
						))}
					</ul>
					{children}
				</>
			)}
		</section>
	);
}

export default Gallery;
