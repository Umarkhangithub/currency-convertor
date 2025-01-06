import { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("usd");
  // console.log('fromCurrency is : ',fromCurrency)
  const [toCurrency, setToCurrency] = useState("inr");
  // console.log('toCurrency is : ',toCurrency)
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(null);

  const API_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency.toLocaleLowerCase()}.json`;
  // console.log('API_URL is : ',API_URL)

  useEffect(() => {
    // Fetch currency data when component mounts or when fromCurrency changes
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        // Remove the template literal syntax error
        console.log(Object.keys(data[fromCurrency.toLowerCase()]));
        setCurrencies(Object.keys(data[fromCurrency.toLowerCase()]));
        setExchangeRate(
          data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()]
        );
      })
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, [fromCurrency, API_URL, toCurrency]);

  useEffect(() => {
    if (exchangeRate) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  console.log("currencies is : ", currencies);

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleFromCurrencyChange = (e) => setFromCurrency(e.target.value);
  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
    setExchangeRate(null); // Reset to ensure re-fetch
  };

  return (
    <div className="flex flex-col items-center justify-center backdrop-blur-md shadow-sm border-2 border-gray-300 rounded-md py-8 px-20">
      <h1 className="text-xl font-bold mb-2 text-white">Currency Converter</h1>
      <div className="flex flex-col items-center justify-center  p-5">
        <input
          className="border-2 border-gray-300 bg-zinc-900 text-white
           rounded-md p-2 outline-none"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter Amount"
        />
        <select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          className="border-2 border-gray-300 rounded-md p-2 outline-none w-full my-5 bg-zinc-900 text-white"
        >
          {currencies.map((currency) => (
            <option
              className="border-2 border-gray-300 rounded-md p-2"
              key={currency}
              value={currency}
              selected = {fromCurrency}
            >
              {currency}
            </option>
          ))}
        </select>
        <span className="text-white">to</span>
        <select
          className="border-2 border-gray-300 rounded-md p-2 outline-none w-full my-5  bg-zinc-900 text-white"
          value={toCurrency}
          onChange={handleToCurrencyChange}
        >
          {currencies.map((currency) => (
            <option
              selected={currency === toCurrency}
              key={currency}
              value={currency}
            >
              {currency}
            </option>
          ))}
        </select>
      </div>
      <h2 className="text-2xl font-bold bg-transparent text-white">
        {amount} {fromCurrency.toUpperCase()} = {convertedAmount} {toCurrency.toUpperCase()}
      </h2>
    </div>
  );
};

export default CurrencyConverter;
