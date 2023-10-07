export function SkeletonRows({ height, flexAlign, gap }: { height: number; flexAlign?: string; gap?: 'string' }) {
	const burger = [];

	for (let i = 0; i < height; i++) {
		burger.push(<SkeletonRow key={i} width='70%'/>);
	}

	return (
		<ul className='skeleton-rows' style={{ alignItems: flexAlign, gap }}>
			{burger.map(bun => bun)}
		</ul>
	);
}

export function SkeletonRowsGradual({ height, flexAlign, gap }: { height: number; flexAlign?: string; gap?: string }) {
	const burger = [];

	for (let i = 0; i < height; i++) {
		const width = i === 0 || i === height - 1 ? '50%' : '70%';
		burger.push(<SkeletonRow key={i} width={width}/>);
	}

	return (
		<ul className='skeleton-rows' style={{ alignItems: flexAlign, gap }}>
			{burger.map(bun => bun)}
		</ul>
	);
}

function SkeletonRow({ width }: { width: string }) {
	return <li className='skeleton-rows__row' style={{ width }}/>;
}
