'use client';
import { useEffect, useMemo, useState } from 'react';
import { allowedCurrencies } from '../data/data_curr';
import { ButtonSwitch } from './ButtonSwitch';
import CurrencyRow from './currency-row/CurrencyRow';

const BASE_URL = import.meta.env.VITE_BASE_URL_OPENEX;
const API_KEY = import.meta.env.VITE_OPENEX_KEY;

export const Main = () => {
	const [currencyOptions, setCurrencyOptions] = useState([]);
	const [fromCurrency, setFromCurrency] = useState();
	const [toCurrency, setToCurrency] = useState();
	const [exchangeRate, setExchangeRate] = useState(1);
	const [amount, setAmount] = useState(1);
	const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

	const fromAmount = useMemo(
		() => (amountInFromCurrency ? amount : amount / exchangeRate || 0),
		[amount, amountInFromCurrency, exchangeRate],
	);
	const toAmount = useMemo(
		() => (amountInFromCurrency ? amount * exchangeRate || 0 : amount),
		[amount, amountInFromCurrency, exchangeRate],
	);

	useEffect(() => {
		async function loadRates() {
			const res = await fetch(`${BASE_URL}/latest.json?app_id=${API_KEY}`);
			const data = await res.json();

			const filtered = allowedCurrencies.filter((c) => data.rates[c]);
			setCurrencyOptions(filtered);

			if (!fromCurrency || !toCurrency) {
				setFromCurrency(filtered[0]);
				setToCurrency(filtered[1]);
			}

			if (fromCurrency && toCurrency) {
				setExchangeRate(
					fromCurrency === toCurrency
						? 1
						: data.rates[toCurrency] / data.rates[fromCurrency],
				);
			}
		}

		loadRates();
	}, [fromCurrency, toCurrency]);

	function handleAmountChange(e, isFrom) {
		if (e?.target?.value && /^[0-9]*$/.test(e.target.value)) {
			setAmount(e.target.value);
			setAmountInFromCurrency(isFrom);
		}
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
			<ButtonSwitch />
			<CurrencyRow
				currencyOptions={currencyOptions}
				selectedCurrency={toCurrency}
				onChangeCurrency={setToCurrency}
				onChangeAmount={(e) => handleAmountChange(e, false)}
				amount={toAmount}
			/>
		</main>
	);
};
