import React, { useContext, createContext, useEffect,useState } from 'react';

// import { useAddress, useContract, useMetamask, useContractWrite, useDisconnect } from '@thirdweb-dev/react';
import {useDisconnect} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import {abi as ABI} from './ABI';

// import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // const { contract } = useContract('0x148b4f6660Cac709c15FA47930d8f6E58d48a91d');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [address, setAddress] = useState(null);
  const signer = provider.getSigner();
  const getAddress = (async () => {
    const address = await signer.getAddress();
    setAddress(address);
  });
  getAddress();
  // useEffect(() => {
  //   const init = async () => {
  //     address = await signer.getAddress();
  //     console.log("address", address);
  //   }
  //   init();
  // }, [signer]);
  const connect = async () => await window.ethereum.enable()
      const contract = new ethers.Contract('0x0044564edD337A5270c141776c221eAe66a58eE2', ABI, signer)
  const disconnect = (() => {
      setAddress(null);
    });

  const publishCampaign = async (form) => {
    try {
      // const data = await createCampaign([
      //   address, // owner
      //   form.title, // title
      //   form.description, // description
      //   form.target,
      //   new Date(form.deadline).getTime(), // deadline,
      //   form.image
      // ])
      await contract.createCampaign(address, form.title, form.description, form.target, new Date(form.deadline).getTime(), form.image);

      console.log("contract call success")
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getCampaigns = async () => {
    const campaigns = await contract.getCampaigns();
    // console.log("contract", contract);
    // console.log("camp log ",campaigns);
    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));

    return parsedCampaings;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    // const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount)});
    const data=await contract.donateToCampaign(pId, { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    // const donations = await contract.call('getDonators', pId);
    const donations=await contract.getDonators(pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        disconnect,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);