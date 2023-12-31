import { useEffect, useState } from "react";
import CurrencyRow from "./components/currency-row/CurrencyRow";

import "./style.css";
import "./components/currency-row/container-input.css";

const BASE_URL = "https://openexchangerates.org/api";
const API_KEY = "60c83d0333734d3ca9ed1b4b7797b940";
const allowedCurrencies = [
  "USD",
  "EUR",
  "JPY",
  "GBP",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "SEK",
  "NZD",
  "BYN",
  "RUB",
  "INR",
  "BRL",
  "ZAR",
];

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate || 0;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate || 0;
  }

  useEffect(() => {
    fetch(`${BASE_URL}/latest.json?app_id=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = allowedCurrencies[0];
        const filteredCurrencies = allowedCurrencies.filter(
          (currency) => data.rates[currency]
        );
        setCurrencyOptions(filteredCurrencies);
        setFromCurrency(firstCurrency);
        setToCurrency(filteredCurrencies[1]);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      if (fromCurrency === toCurrency) {
        setExchangeRate(1);
      } else {
        fetch(`${BASE_URL}/latest.json?app_id=${API_KEY}`)
          .then((res) => res.json())
          .then((data) => {
            setExchangeRate(data.rates[toCurrency] / data.rates[fromCurrency]);
          });
      }
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    if (e && e.target && /^[0-9]*$/.test(e.target.value)) {
      setAmount(e.target.value);
      setAmountInFromCurrency(true);
    }
  }

  function handleToAmountChange(e) {
    if (e && e.target && /^[0-9]*$/.test(e.target.value)) {
      setAmount(e.target.value);
      setAmountInFromCurrency(false);
    }
  }

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(value) => setFromCurrency(value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="rgb(65, 130, 250)"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
          />
        </svg>
      </div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(value) => setToCurrency(value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </div>
  );
}

export default App;
