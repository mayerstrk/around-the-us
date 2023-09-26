import CardSkeleton from '../../Card/CardSkeleton/CardSkeleton';

export default function GalletySkeleton({ length }: { length: number }) {
	const cards = [];
	for (let i = 0; i < length; i++) {
		cards.push(<CardSkeleton key={`cardSkeleton${i}`}/>);
	}

	return (
		<ul className='gallery-skeleton__cards'>{cards.map(card => card)}</ul>
	);
}
