// import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RateTable } from "./RateTable";
import { CurrencyCodePicker } from "./CurrencyCodePicker";
import { AmountField } from "./AmountField";
import { getExchangeRates } from "../api";
import { getAmount, getCurrencyCode, getCurrencyData, getSupportedCurrencies } from '../store/rates';
import { useEffect } from 'react';


export function ExchangeRate() {

  const amount = useSelector(getAmount);
  const currencyCode = useSelector(getCurrencyCode);
  const currencyData = useSelector(getCurrencyData);
  // const [amount, setAmount] = useState("1.50");
  // const [currencyCode, setCurrencyCode] = useState("USD");
  // const dispatch = useDispatch();


  // useEffect(() => {
  //     dispatch(changeCurrencyCode(currencyCode));
  //   }, []);
  // const setAmount = () => {};
  // const setCurrencyCode = () => {};


  // const [currencyData, setCurrencyData] = useState({ USD: 1.0 });

  // // fetch the exchange rates each time currency code changes
  // useEffect(() => {
  //   getExchangeRates(currencyCode, supportedCurrencies).then((rates) => {
  //     setCurrencyData(rates);
  //   });
  // }, [currencyCode]);

  // const handleCurrencyCode = useCallback(
  //   (e) => setCurrencyCode(e.target.value),
  //   []
  // );

  // const handleAmountChange = useCallback((e) => {
  //   let newAmount = e.target.value;
  //   setAmount(newAmount);
  // }, []);

  return (
    <>
      <section>
        <h1 className="ExchangeRate-header">
          Exchange Rates{" "}
          <CurrencyCodePicker
            currencyCode={currencyCode}
          />
        </h1>
      </section>
      <section>
        <AmountField amount={amount} />
      </section>
      <section>
        <RateTable currencyData={currencyData} amount={amount} />
      </section>
    </>
  );
}
