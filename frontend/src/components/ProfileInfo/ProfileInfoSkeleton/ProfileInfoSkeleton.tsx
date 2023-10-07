import { SkeletonRows, SkeletonRowsGradual } from '../../SkeletonRows/SkeletonRows';

export default function ProfileInfoSkeleton() {
	return (
		<>
			<div className='profile-skeleton__avatar'>
				<SkeletonRowsGradual height={3} flexAlign='center'/>
			</div>
			<div className='profile-skeleton__details'>
				<SkeletonRows height={4} flexAlign='center'/>
			</div>
		</>
	);
}

