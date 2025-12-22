import { TrendingUp } from 'lucide-react';

export const Header = () => {
	return (
		<header className='flex flex-col items-center'>
			<h1 className='flex gap-2 text-4xl font-bold text-blue-500'>
				<TrendingUp color='green' size={45} />
				Exchange
			</h1>
			<p className='text-slate-400'>Real-time currency converter</p>
		</header>
	);
};
