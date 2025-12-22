import { ArrowRightLeft } from 'lucide-react';
type ButtonSwitchProps = { onSwitch: () => void };

export const ButtonSwitch = ({ onSwitch }: ButtonSwitchProps) => {
	return (
		<button
			type='button'
			className='btn-switch'
			aria-label='Swap currencies'
			onClick={onSwitch}>
			<ArrowRightLeft color='#05811a' size={25} />
		</button>
	);
};
