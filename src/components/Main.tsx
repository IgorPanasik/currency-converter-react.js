'use client';
import { useEffect, useMemo, useState } from 'react';
import { allowedCurrencies } from '../data/data_curr.js';
import { RatesSchema } from '../schemas/schemas.js';
import { ButtonSwitch } from './ButtonSwitch.js';
import CurrencyRow from './currency-row/CurrencyRow.jsx';

const BASE_URL = import.meta.env.VITE_BASE_URL_OPENEX;
const API_KEY = import.meta.env.VITE_OPENEX_KEY;

export const Main = () => {
	const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
	const [fromCurrency, setFromCurrency] = useState<string | undefined>();
	const [toCurrency, setToCurrency] = useState<string | undefined>();
	const [inputAmount, setInputAmount] = useState<string>('');
	const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
	const [rates, setRates] = useState<Record<string, number>>({});

	const amountNumber = useMemo(() => Number(inputAmount || '0'), [inputAmount]);

	const exchangeRate = useMemo(() => {
		if (!fromCurrency || !toCurrency) return 1;
		if (!rates[fromCurrency] || !rates[toCurrency]) return 1;
		return fromCurrency === toCurrency
			? 1
			: rates[toCurrency] / rates[fromCurrency];
	}, [fromCurrency, toCurrency, rates]);

	const fromAmount = useMemo(
		() =>
			amountInFromCurrency
				? Number(amountNumber.toFixed(2))
				: Number((amountNumber / exchangeRate).toFixed(2)),
		[amountNumber, amountInFromCurrency, exchangeRate],
	);

	const toAmount = useMemo(
		() =>
			amountInFromCurrency
				? Number((amountNumber * exchangeRate).toFixed(2))
				: Number(amountNumber.toFixed(2)),
		[amountNumber, amountInFromCurrency, exchangeRate],
	);

	useEffect(() => {
		async function loadRates() {
			const res = await fetch(`${BASE_URL}/latest.json?app_id=${API_KEY}`);
			const data = await res.json();

			const parsed = RatesSchema.safeParse(data);
			if (!parsed.success) {
				console.error('Invalid API response', parsed.error);
				return;
			}

			const filtered = allowedCurrencies.filter((c) => data.rates[c]);
			setCurrencyOptions(filtered);
			setRates(data.rates);

			if (!fromCurrency || !toCurrency) {
				setFromCurrency(filtered[0]);
				setToCurrency(filtered[1]);
			}
		}
		loadRates();
	}, []);

	function handleAmountChange(
		e: React.ChangeEvent<HTMLInputElement>,
		isFrom: boolean,
	) {
		const v = e.target.value;
		if (/^[0-9]*$/.test(v)) {
			setInputAmount(v);
			setAmountInFromCurrency(isFrom);
		}
	}

	function handleSwitchCurrencies() {
		setFromCurrency(toCurrency);
		setToCurrency(fromCurrency);
		setAmountInFromCurrency(true);
	}

	return (
		<main className='flex flex-col items-center gap-2'>
			<CurrencyRow
				currencyOptions={currencyOptions}
				selectedCurrency={fromCurrency}
				onChangeCurrency={setFromCurrency}
				onChangeAmount={(e) => handleAmountChange(e, true)}
				amount={fromAmount}
			/>
			<ButtonSwitch onSwitch={handleSwitchCurrencies} />
			<CurrencyRow
				currencyOptions={currencyOptions}
				selectedCurrency={toCurrency}
				onChangeCurrency={setToCurrency}
				onChangeAmount={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleAmountChange(e, false)
				}
				amount={toAmount}
			/>
		</main>
	);
};
