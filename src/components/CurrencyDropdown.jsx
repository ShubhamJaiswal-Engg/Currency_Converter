import React from 'react';
import Flag from "./Flag"

const CurrencyDropdown = ({
    from,
    currencies,
    currency,
    setCurrency,
    title="",
}) => {
  return (
    <div className='mt-1 relative'>
      <label className='block text-sm text-gray-700 font-medium' htmlFor={title}>{title}</label>
      <div>
      <select value={currency} onChange={(e)=> setCurrency(e.target.value)} className='w-full p-2 border rounded-md border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500'>
        {currencies?.map((currency)=>(
          <option value={currency} key={currency}>{currency}</option>
        ))}
      </select>
      <button className='absolute top-4 inset-y-0 right-0 pr-5 flex items-center text-sm leading-5'><Flag from={from}/></button>
      </div>
    </div>
  )
}

export default CurrencyDropdown
