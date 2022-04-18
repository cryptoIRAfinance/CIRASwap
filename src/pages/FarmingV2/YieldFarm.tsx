import React, { useState } from "react";
import { Box, Flex, Button, Spinner, Text, Img } from "@chakra-ui/react";
import ShowYieldFarmDetails from "./ShowYieldFarmDetails";
import { useColorModeValue } from "@chakra-ui/react";
import { RGPIcon } from "./Icon";
import { LIGHT_THEME, DARK_THEME } from "./index";
import { useWeb3React } from "@web3-react/core";
import Darklogo from "../../assets/rgpdarklogo.svg";

const YieldFarm = ({
  content,
  farmDataLoading,
  wallet,
  URLReferrerAddress,
}: {
  content: {
    pid: number;
    id: string;
    totalLiquidity: string;
    earn: string;
    img: string;
    ARYValue: string;
    lpSymbol: string;
    tokensStaked: string[];
    availableToken: string;
    deposit: string;
    poolAllowance: any;
    RGPEarned: string;
    poolVersion: number | string;
  };
  farmDataLoading: boolean;
  wallet: any;
  URLReferrerAddress: string;
}) => {
  const mode = useColorModeValue(LIGHT_THEME, DARK_THEME);
  const { chainId, library } = useWeb3React();
  const active = chainId && library;
  const [showYieldfarm, setShowYieldFarm] = useState(false);

  const formatAmount = (value: any) => parseFloat(value).toLocaleString();

  const totalLiquidityValue = () => {
    if (farmDataLoading) return <Spinner speed='0.65s' color='gray.700' />;

    if (content.totalLiquidity) {
      return `$ ${formatAmount(content.totalLiquidity)}`;
    }
  };

  return (
    <>
      <Flex
        justifyContent='space-between'
        flexDirection={["column", "column", "row"]}
        border='1px solid brand.300'
        background={
          mode === LIGHT_THEME
            ? "#FFFFFF !important"
            : mode === DARK_THEME
            ? "brand.700 !important"
            : "#FFFFFF !important"
        }
        color={
          mode === LIGHT_THEME
            ? "gray.700"
            : mode === DARK_THEME
            ? "brand.400"
            : "gray.700"
        }
        borderColor={
          mode === LIGHT_THEME
            ? "brand.100 !important"
            : mode === DARK_THEME
            ? "brand.700 !important"
            : "brand.100 !important"
        }
        padding='15px 20px'
        width={["100%", "100%", "100%"]}
      >
        <Flex justifyContent='space-between' width='100%'>
          <Box
            marginTop='15px'
            align='left'
            display={["block", "block", "none"]}
            opacity='0.5'
          >
            Deposit
          </Box>
          <Box marginTop='15px' align='left'>
            {content.deposit}
          </Box>
        </Flex>
        <Flex justifyContent='space-between' width='100%'>
          <Box
            marginTop='15px'
            align='left'
            display={["block", "block", "none"]}
            opacity='0.5'
          >
            Earn
          </Box>
          <Flex
            justifyContent='space-between'
            marginTop='15px'
            paddingLeft='30px'
            // align='left'
            alignItems='center'
          >
            {/* <RGPIcon />  */}
            <Img w='24px' src={Darklogo} />{" "}
            <Text marginLeft='10px'>{content.earn}</Text>
          </Flex>
        </Flex>
        <Flex justifyContent='space-between' width='100%'>
          <Box
            marginTop='15px'
            align='left'
            display={["block", "block", "none"]}
            opacity='0.5'
          >
            APY
          </Box>
          <Box marginTop='15px' paddingLeft='50px' align='left'>
            {formatAmount(content.ARYValue)} %
          </Box>
        </Flex>
        <Flex
          justifyContent='space-between'
          width='100%'
          marginBottom={["10px", "10px", "0"]}
        >
          <Box
            marginTop='15px'
            align='left'
            display={["block", "block", "none"]}
            opacity='0.5'
          >
            Total Liquidity
          </Box>
          <Box marginTop='15px' paddingLeft='65px' align='right'>
            {totalLiquidityValue()}
          </Box>
        </Flex>
        <Box align='right' mt={["4", "0"]} ml='2'>
          {Number(content.pid) === 1 ? (
            <Button
              w={["100%", "100%", "146px"]}
              h='40px'
              border='2px solid brand.500'
              background={
                mode === LIGHT_THEME && active
                  ? "#FFFFFF !important"
                  : mode === DARK_THEME && active
                  ? "brand.500 !important"
                  : mode === LIGHT_THEME && !active
                  ? "#FFFFFF !important"
                  : mode === DARK_THEME && !active
                  ? "brand.700 !important"
                  : "#FFFFFF !important"
              }
              color={
                mode === LIGHT_THEME && active
                  ? "brand.500"
                  : mode === DARK_THEME && active
                  ? "#FFFFFF"
                  : mode === LIGHT_THEME && !active
                  ? "brand.500"
                  : mode === DARK_THEME && !active
                  ? "tan.500"
                  : "gray.700"
              }
              borderColor={
                mode === LIGHT_THEME && active
                  ? "tan.500 !important"
                  : mode === DARK_THEME && active
                  ? "brand.500 !important"
                  : mode === LIGHT_THEME && !active
                  ? "tan.500 !important"
                  : mode === DARK_THEME && !active
                  ? "tan.500 !important"
                  : "brand.500 !important"
              }
              borderRadius='6px'
              mb='4'
              _hover={{ color: "darkbg.300" }}
              onClick={() => setShowYieldFarm(!showYieldfarm)}
              className={"unlock"}
            >
              Unlock
            </Button>
          ) : (
            <Button
              w={["100%", "100%", "146px"]}
              h='40px'
              border='2px solid brand.500'
              background={
                mode === LIGHT_THEME && active
                  ? "#FFFFFF !important"
                  : mode === DARK_THEME && active
                  ? "brand.500 !important"
                  : mode === LIGHT_THEME && !active
                  ? "#FFFFFF !important"
                  : mode === DARK_THEME && !active
                  ? "brand.700 !important"
                  : "#FFFFFF !important"
              }
              color={
                mode === LIGHT_THEME && active
                  ? "brand.500"
                  : mode === DARK_THEME && active
                  ? "#FFFFFF"
                  : mode === LIGHT_THEME && !active
                  ? "brand.500"
                  : mode === DARK_THEME && !active
                  ? "tan.500"
                  : "gray.700"
              }
              borderColor={
                mode === LIGHT_THEME && active
                  ? "tan.500 !important"
                  : mode === DARK_THEME && active
                  ? "brand.500 !important"
                  : mode === LIGHT_THEME && !active
                  ? "tan.500 !important"
                  : mode === DARK_THEME && !active
                  ? "tan.500 !important"
                  : "brand.500 !important"
              }
              borderRadius='6px'
              mb='4'
              _hover={{ color: "darkbg.300" }}
              onClick={() => setShowYieldFarm(!showYieldfarm)}
              className={"unlock"}
            >
              Unlock
            </Button>
          )}
        </Box>
      </Flex>
      {showYieldfarm && (
        <ShowYieldFarmDetails
          content={content}
          wallet={wallet}
          URLReferrerAddress={URLReferrerAddress}
        />
      )}
    </>
  );
};

export default YieldFarm;
