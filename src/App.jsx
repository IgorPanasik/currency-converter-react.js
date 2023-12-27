import { useEffect, useState } from "react";
import CurrencyRow from "./components/currency-row/CurrencyRow";

import "./style.css";
import "./components/currency-row/container-input.css";

const BASE_URL = "http://apilayer.net/api/live";
const access_key = "f864919e4b93ad4484dff5e99ab59a3a";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeQuote, setExhangeQuote] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeQuote;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeQuote;
  }

  useEffect(() => {
    fetch(
      `${BASE_URL}?access_key=${access_key}&currencies=USD,EUR,JPY,GBP,AUD,CAD,CHF,CNY,SEK,NZD,BYN,RUB&source=USD&format=1`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.quotes) {
          const firstCurrency = Object.keys(data.quotes)[0].slice(3);
          setCurrencyOptions([
            data.source,
            ...Object.keys(data.quotes).map((key) => key.slice(3)),
          ]);
          setFromCurrency(data.source);
          setToCurrency(firstCurrency);
          setExhangeQuote(data.quotes["USD" + firstCurrency]);
        }
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      if (fromCurrency === toCurrency) {
        setExhangeQuote(1);
      } else {
        fetch(
          `${BASE_URL}?access_key=${access_key}&source=${fromCurrency}&currencies=${toCurrency}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data && data.quotes) {
              setExhangeQuote(data.quotes[fromCurrency + toCurrency]);
            }
          });
      }
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(option) => setFromCurrency(option)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">↑↓</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(option) => setToCurrency(option)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </div>
  );
}

export default App;
