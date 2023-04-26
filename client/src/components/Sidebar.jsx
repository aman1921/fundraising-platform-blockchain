import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";

import { logo, sun } from "../assets";
import { navlinks } from "../constants";
import FitbitIcon from "@mui/icons-material/Fitbit";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
      // <FitbitIcon sx={{ color: "#4acd8d", fontSize: "80" }} />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const { disconnect } = useStateContext();

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        {/* <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} /> */}
        <ViewHeadlineIcon
          sx={{color: '#4acd8d', fontSize: '35px'}}
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
        <div
          className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center`}
        >
          {/* <LogoutIcon
            sx={{ color: 'gray'}}
          onClick={() => {

          }}
          /> */}
          <Button
            onClick={() => {disconnect();}}
            sx={{
              color: 'gray',
            }}
          >
            <LogoutIcon/>
          </Button>
        </div>
        {/* <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} /> */}
      </div>
    </div>
  );
};

export default Sidebar;
