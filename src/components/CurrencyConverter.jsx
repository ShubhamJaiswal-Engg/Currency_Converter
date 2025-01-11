import React, { useEffect, useState } from 'react'
import { BsArrowLeftRight } from "react-icons/bs";
import CurrencyDropdown from './CurrencyDropdown';
import countryData from "./countrycode.json";
import { use } from 'react';

const CurrencyConverter = () => {
  let[currencies,setCurrencies] = useState([]);
  let [amount,setAmount]= useState(1);
  let [from,setFrom] = useState("USD");
  let [tocurr,setTocurr] = useState("INR");

  let[currencyConverter ,setCurrencyConverter]= useState(null)
  let[converting, setConverting] = useState(false);
  let[checker, setChecker] = useState(false);


  const fetchCurrencies = async ()=>{
    try{
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
      
    }catch(error){
      console.log("Error Fetching",error);
    };
  };

const convertCurrency= async()=>{

  if(!amount) return
  else if (amount == 0){
    setChecker(true);
    setCurrencyConverter(null);
    return
  }
  setConverting(true)
  try{
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${tocurr}`);
    const data = await res.json();
    setCurrencyConverter(data.rates[tocurr] + " " + tocurr);
    setChecker(false)
  }catch(error){
    console.log("Error Fetching",error);
  }finally{setConverting(false)}
};


const swapCurrencies=()=>{
  setFrom(tocurr);
  setTocurr(from);

}
  useEffect(()=>{
    fetchCurrencies();
  },[]);
  
  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
     <h1 className='mb-5 text-2xl font-semibold text-gray-700'>Currency Converter</h1>
     <div className='mt-4'>
      <label htmlFor="amount" className='block text-sm font-medium text-gray-700'>Amount:</label>
      <input type="number"  min={1} value={amount} onChange={(e)=>setAmount(e.target.value)} className='w-full mb-5 p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus: ring-indigo-500 ' id="amount" />
     </div>
     <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
    <CurrencyDropdown  currencies={currencies} from={from} setCurrency={setFrom} currency={from} title='From:'/>
      <div className='flex justify-center -mb-5 sm:mb-0'>
        <button onClick={swapCurrencies}  className='bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-300'><BsArrowLeftRight className='text-xl text-gray-700'/></button>
      </div>
      <CurrencyDropdown setCurrency={setTocurr} from={tocurr} currency={tocurr} currencies={currencies} title='To:' />
     </div>
      <div className='flex justify-end mt-6'>
      <button onClick={convertCurrency} className={ `bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${ converting ? "animate-pulse" :""}`}>
        Convert
      </button>
     </div>
     { currencyConverter && (
     <div  className="mt-4 text-right text-lg text-green-600 font-medium">Converted Amount: {currencyConverter}</div>
     )}
     {checker &&
     (<div  className="mt-4 text-right text-lg text-green-600 font-medium">Converted Amount: 0 </div>)}
    </div>
  )
}

export default CurrencyConverter;
