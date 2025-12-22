import ReactCountryFlag from 'react-country-flag';
import Select from 'react-select';

export default function CurrencyRow({
	currencyOptions,
	selectedCurrency,
	onChangeCurrency,
	onChangeAmount,
	amount,
}) {
	const options = currencyOptions.map((option) => ({
		value: option,
		label: (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
				}}>
				<ReactCountryFlag countryCode={option.slice(0, 2)} svg />
				{option}
			</div>
		),
	}));

	return (
		<div className='container-input'>
			<input
				type='number'
				className='input'
				value={amount || ''}
				onChange={onChangeAmount}
				onKeyPress={(e) => {
					// prevent non-numeric input
					if (!/[0-9]/.test(e.key)) {
						e.preventDefault();
					}
				}}
			/>
			<Select
				value={options.find((option) => option.value === selectedCurrency)}
				onChange={(option) => onChangeCurrency(option ? option.value : '')}
				options={options}
				styles={{
					control: (provided) => ({
						...provided,
						cursor: 'pointer',
					}),
					dropdownIndicator: (provided) => ({
						...provided,
						color: 'rgb(95, 150, 253)',
					}),
				}}
			/>
		</div>
	);
}
