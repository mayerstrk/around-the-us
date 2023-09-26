import { SkeletonRows, SkeletonRowsGradual } from '../../SkeletonRows/SkeletonRows';

export default function CardSkeleton() {
	return (
		<li className='card-skeleton'>
			<div className='card-skeleton__photo-container'>
				<SkeletonRows height={8} flexAlign='center'/>
			</div>
			<div className='card-skeleton__bar'>
				<SkeletonRowsGradual height={3} gap='5px'/>
			</div>
		</li>
	);
}
