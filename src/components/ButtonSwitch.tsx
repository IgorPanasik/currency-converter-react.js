import { ArrowRightLeft } from 'lucide-react';
type ButtonSwitchProps = { onSwitch: () => void };

export const ButtonSwitch = ({ onSwitch }: ButtonSwitchProps) => {
	return (
		<button
			type='button'
			className='inline-flex items-center justify-center px-6 py-2 bg-transparent rounded-full transition-colors duration-300 cursor-pointer border-2 border-gray-400 hover:bg-gray-100 hover:border-green-700'
			aria-label='Swap currencies'
			onClick={onSwitch}>
			<ArrowRightLeft color='#05811a' size={25} />
		</button>
	);
};
