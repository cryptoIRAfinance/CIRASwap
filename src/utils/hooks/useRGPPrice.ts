import { useEffect, useState } from 'react';
import {useActiveWeb3React} from "./useActiveWeb3React";
import { ethers } from 'ethers';
import { smartSwapLPTokenPoolOne } from "../Contracts";
import { SMARTSWAPLP_TOKEN1ADDRESSES } from "../addresses";

export const useRGPPrice = () => {
  const { chainId , library} = useActiveWeb3React();
  const [RGPPrice, setRGPPrice] = useState<string | number>(0);

  useEffect(() => {
    const getRGPprice = async () => {
      try {
        const RGPBUSDToken = await smartSwapLPTokenPoolOne(SMARTSWAPLP_TOKEN1ADDRESSES[chainId as number], library);
        const reserves = await RGPBUSDToken.getReserves();
        setRGPPrice(ethers.utils.formatUnits(reserves[0].mul(10000).div(reserves[1]), 4));
      } catch (error) {
        setRGPPrice(0);
        console.log(error)
      }
    };
    getRGPprice();
  }, [chainId, library]);
  return [RGPPrice];
};
