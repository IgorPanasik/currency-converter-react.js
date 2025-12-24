import ReactCountryFlag from 'react-country-flag';
import Select, { SingleValue } from 'react-select';

type CurrencyRowProps = {
	currencyOptions: string[];
	selectedCurrency: string | undefined;
	onChangeCurrency: (currency: string) => void;
	onChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
	amount: number | string;
};

export default function CurrencyRow({
	currencyOptions,
	selectedCurrency,
	onChangeCurrency,
	onChangeAmount,
	amount,
}: CurrencyRowProps) {
	type OptionType = {
		value: string;
		label: React.ReactNode;
	};

	const options: OptionType[] = currencyOptions.map((option) => ({
		value: option,
		label: (
			<div className='flex items-center gap-1'>
				<ReactCountryFlag countryCode={option.slice(0, 2)} svg />
				{option}
			</div>
		),
	}));

	return (
		<div className='container-input flex flex-col gap-[10px] sm:flex-row sm:justify-between'>
			<input
				aria-label='Enter the amount'
				type='text'
				inputMode='numeric'
				pattern='[0-9]*'
				className='px-2 py-1 text-base rounded-[5px] border border-gray-300
             transition-colors duration-300 ease-in bg-[#f8ecec]
             outline-2 outline-[#0b44ad]
             focus:outline-[#077c03] active:outline-[#077c03]'
				value={amount || ''}
				onChange={onChangeAmount}
				placeholder='1'
				onBeforeInput={(e) => {
					const inputEvent = e.nativeEvent as InputEvent;
					if (!/^\d*$/.test(inputEvent.data ?? '')) {
						e.preventDefault();
					}
				}}
			/>
			<Select<OptionType, false>
				value={
					options.find((option) => option.value === selectedCurrency) || null
				}
				onChange={(option: SingleValue<OptionType>) =>
					onChangeCurrency(option ? option.value : '')
				}
				options={options}
				styles={{
					control: (provided) => ({
						...provided,
						cursor: 'pointer',
					}),
					dropdownIndicator: (provided) => ({
						...provided,
						color: '#5f96fd',
					}),
				}}
			/>
		</div>
	);
}
