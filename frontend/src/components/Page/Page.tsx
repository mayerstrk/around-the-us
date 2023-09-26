import { type ReactNode } from 'react';

export default function Page({ children }: { children: ReactNode }) {
	return (
		<div className='page'>
			{children}
		</div>
	);
}
