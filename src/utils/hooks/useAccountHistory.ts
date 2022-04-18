import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import mainToken from '../../utils/main-token.json';
import TokenLogo from '../../assets/Null-24.svg';
import { getERC20Token } from "../utilsFunctions";
import { ethers } from 'ethers';
import SmartSwapRouter02 from '../abis/swapAbiForDecoder.json';
import { SMARTSWAPROUTER } from "../addresses";
import { ParseFloat } from '..';

const abiDecoder = require('abi-decoder');

export function timeConverter(UNIX_timestamp: any) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours() < 10 ? `0${a.getHours()}` : a.getHours();
    const min = a.getMinutes()<10 ? `0${a.getMinutes()}` : a.getMinutes();
    const sec = a.getSeconds() < 10 ? `0${a.getSeconds()}` : a.getSeconds();
    return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
}

export const APIENDPOINT: { [key: string]: string } = {
    "1": "",
    "3": "",
    "56": "api.bscscan.com/api",
    "97": "api-testnet.bscscan.com/api",
    "137": "api.polygonscan.com/api",
    "80001": "api-testnet.polygonscan.com/api",
    "42261": "testnet.explorer.emerald.oasis.dev/api",
    "42262": "explorer.emerald.oasis.dev/api",
};

export const APIKEY: { [key: string]: string } = {
    "1": "",
    "3": "",
    "56": "AATZWFQ47VX3Y1DN7M97BJ5FEJR6MGRQSD",
    "97": "AATZWFQ47VX3Y1DN7M97BJ5FEJR6MGRQSD",
    "137": "89B4F6NVVEVGC8EMDCJVRJMVGSCVHHZTR7",
    "80001": "89B4F6NVVEVGC8EMDCJVRJMVGSCVHHZTR7",
    "42261": "",
    "42262": "",
};

interface DataIncoming {
    inputAmount: string,
    outputAmount: string,
    tokenIn: string,
    tokenOut: string,
    time: string
}

export const formatAmount = (number: string, decimals: any) => {
    const num = ethers.BigNumber.from(number).toString();
    let res = ethers.utils.formatUnits(num, decimals)
    res = ParseFloat(res, 5)
    return res;

};

export const getTokenSymbol = (symbol: string) => {
    const tokenList = mainToken;
    let tokenIcon = tokenList.find(token => token.symbol === symbol);

    if (!tokenIcon) {
        return TokenLogo
    }

    return tokenIcon.logoURI
};




const useAccountHistory = () => {
    const { account, chainId, library } = useWeb3React();
    const [loading, setLoading] = useState(false);
    const [historyData, setHistoryData] = useState({} as any);

    const tokenList = async (addressName: string) => {
        const token = await getERC20Token(addressName, library);
        const name = token.name();
        const symbol = token.symbol();
        const { address } = token;
        const decimals = token.decimals();
        const standardToken = await Promise.all([name, symbol, address, decimals]);
        const resolveToken = {
            name: standardToken[0],
            symbol: standardToken[1],
            address: standardToken[2],
            decimals: standardToken[3]
        };
        return address !== '0x' ? resolveToken : null;
    };



    abiDecoder.addABI(SmartSwapRouter02);
    function decodeInput(input: string) {
        return abiDecoder.decodeMethod(input);
    }


    const contractAddress = SMARTSWAPROUTER[chainId as number];
    const api = APIENDPOINT[chainId as number];
    const apikey = APIKEY[chainId as number];


    useEffect(() => {

        const loadAccountHistory = async () => {
            if (account) {
                setLoading(true);



                try {

                    const uri = `https://${api}?module=account&action=txlist&address=${account}&startblock=0
                        &endblock=latest&sort=desc&apikey=${apikey}`;



                    const data = await fetch(uri);
                    const jsondata = await data.json();



                    const SwapTrx = jsondata.result.filter((item: any) => item.to === contractAddress.toLowerCase());



                    const dataFiltered = SwapTrx
                        .filter((items: any) => decodeInput(items.input) !== undefined && items.isError !== "1")
                        .map((items: any) => ({
                            value: items.value,
                            transactionObj: decodeInput(items.input).params,
                            timestamp: items.timeStamp,
                            transactionFee: items.gasPrice * items.gasUsed,
                        }));

                    const dataToUse = dataFiltered.length > 5 ? dataFiltered.splice(0, 5) : dataFiltered;

                    const userData = dataToUse.map((data: any) => ({
                        inputAmount:
                            Number(data.value) > 0 ? data.value : data.transactionObj[0].value,
                        outputAmount:
                            Number(data.value) > 0
                                ? data.transactionObj[0].value
                                : data.transactionObj[1].value,
                        tokenIn:
                            Number(data.value) > 0
                                ? data.transactionObj[1].value[0]
                                : data.transactionObj[2].value[0],
                        tokenOut:
                            Number(data.value) > 0
                                ? data.transactionObj[1].value[data.transactionObj[1].value.length - 1]
                                : data.transactionObj[2].value[data.transactionObj[2].value.length - 1],
                        time: timeConverter(data.timestamp)
                    }));



                    const swapDataForWallet = await Promise.all(
                        userData.map(async (data: DataIncoming) => ({
                            tokenIn: await tokenList(data.tokenIn),
                            tokenOut: await tokenList(data.tokenOut),
                            amountIn: data.inputAmount,
                            amountOut: data.outputAmount,
                            time: data.time
                        })),
                    );

                    const userSwapHistory = swapDataForWallet.map((data: any) => ({
                        token1Icon:
                            getTokenSymbol(data.tokenIn.symbol),
                        token2Icon:
                            getTokenSymbol(data.tokenOut.symbol),
                        token1: data.tokenIn,
                        token2: data.tokenOut,
                        amountIn: formatAmount(data.amountIn, data.tokenIn.decimals),
                        amountOut: formatAmount(data.amountOut, data.tokenOut.decimals),
                        time: data.time,
                    }));


                    setHistoryData(userSwapHistory);
                    setLoading(false);


                } catch (e) {
                    console.log(e);
                    setLoading(false);
                    setHistoryData({})
                }
            } else {
                console.log('Wallet disconnected')
            }
        };
        loadAccountHistory();
    }, [chainId, account]);

    return { historyData, loading }
};

export default useAccountHistory;
