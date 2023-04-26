import React from 'react';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const CountBoxPrice = ({ title, value, price }) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h6 className="font-epilogue font-bold text-[20px] text-white p-2 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">{value} ETH</h6>
      <h6 className="font-epilogue font-bold text-[18px] text-white p-2 bg-[#1c1c24] w-full text-center truncate"><CurrencyRupeeIcon/> {(value*price).toFixed(2)}</h6> 
      <p className="font-epilogue font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rouned-b-[10px] text-center">Raised of {title} ETH</p>
      <p className="font-epilogue font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rouned-b-[10px] text-center"><CurrencyRupeeIcon/> {(title*price).toFixed(2)}</p>
    </div>
  )
}

export default CountBoxPrice