import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FundCard from './FundCard';
import { loader, search } from '../assets';
import { daysLeft } from '../utils';

const DisplayCampaigns = ({ title, isLoading, campaigns, searchQuery }) => {
  const navigate = useNavigate();
  const [allCampaigns,setAllCampaigns]=useState(campaigns);
  useEffect(()=>{
    setAllCampaigns(allCampaigns.filter((campaign)=>daysLeft(campaign.deadline)>0));
    // console.log(campaigns);
  },[])
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }
  console.log("campaigns=", campaigns);
  console.log("search query in display campaigns",searchQuery);
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({allCampaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading &&
          allCampaigns.length > 0 &&
          allCampaigns
            .filter(
              (ele) =>
                (ele.title.toLowerCase().includes(searchQuery) ||
                ele.description.toLowerCase().includes(searchQuery))
            )
            .map((campaign) => {
            <FundCard
            key={campaign.id}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
            />
})}
      </div>
    </div>
  );
}

export default DisplayCampaigns