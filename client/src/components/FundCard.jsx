import React from 'react';
import { useLocation } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import { tagType, thirdweb } from '../assets';
import { daysLeft } from '../utils';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Button } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
  const remainingDays = daysLeft(deadline);
  const location = useLocation();
  function getFacebookShareUrl(url) {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  }  

  // function getFacebookShareUrl(url) {
  //   const fbAppId = "1290474781682029";
  //   return `https://www.facebook.com/dialog/share?app_id=${fbAppId}&display=popup&href=${encodeURIComponent(url)}&version=v3.2`;
  // }
  
  const campaignUrl = window.location.origin;

  function handleFacebookShareClick(e) {
    e.stopPropagation();
    // const campaignUrl = `https://fundraising-palteform.netlify.app`;
    const facebookShareUrl = getFacebookShareUrl(campaignUrl);
    window.open(facebookShareUrl, "_blank");
  }

  function handleTwitterShareClick(e) {
    e.stopPropagation();
    // const campaignUrl = window.location.origin;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Please support this campaign: ${campaignUrl}`)}`;
    window.open(twitterShareUrl, "_blank");
  }

  function handleWhatsAppShare(e) {
    e.stopPropagation();
    const encodedUrl = encodeURIComponent(campaignUrl);
    const whatsappMessage = `Please support this campaign: ${encodedUrl}`;
    // const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
    const whatsappLink = `https://web.whatsapp.com/send?text=${whatsappMessage}`;
    window.open(whatsappLink, "_blank");
  }
  
  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={handleClick}>
      <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]"/>

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          {/* <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain"/> */}
          <p className="ml-[12px] mr-[10px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">Share on</p>
          <Button
            startIcon={<FacebookIcon />}
            sx={{ color: '#4acd8d' }}
            onClick={handleFacebookShareClick}
          >
          </Button>
          <Button
            startIcon={<TwitterIcon />}
            sx={{ color: '#4acd8d' }}
            onClick={handleTwitterShareClick}
          >
          </Button>
          <Button
            startIcon={<WhatsAppIcon />}
            sx={{ color: '#4acd8d' }}
            onClick={handleWhatsAppShare}
          >
          </Button>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{title}</h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{description}</p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{amountCollected}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Raised of  {target}</p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{remainingDays}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Days Left</p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            {/* <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain"/> */}
            {/* <PersonIcon/> */}
            <PersonOutlineIcon/>
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{owner}</span></p>
        </div>
      </div>
    </div>
  )
}

export default FundCard