import React from "react";
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { WNATIVEADDRESSES } from "../../utils/addresses";
import { SupportedChainSymbols } from "../../utils/constants/chains";
import { useWeb3React } from "@web3-react/core";

const LiquidityDetails = (props: LiquidityDetail) => {
  const borderColor = useColorModeValue("brand.300", "brand.500");
  const addButtonBgColor = useColorModeValue("brand.500", "tan.500");
  const addButtonColor = useColorModeValue("#FFFFFF", "brand.50");
  const removeButtonBorderColor = useColorModeValue("brand.500", "tan.500");
  const removeButtonBgColor = useColorModeValue("#FFFFFF", "brand.700");
  const removeButtonColor = useColorModeValue("brand.500", "tan.500");
  const bgColor = useColorModeValue("#FFFFFF", "brand.700");
  const textColor = useColorModeValue("gray.700", "brand.50");
  const history = useHistory();
  const { chainId } = useWeb3React();

  const checkCurrencyId = (id: string): string => {
    console.log("checking");
    const native = WNATIVEADDRESSES[chainId as number];
    const nativeId = SupportedChainSymbols[chainId as number];
    console.log(native, nativeId);

    const currencyId = id === native ? nativeId : id;

    console.log(currencyId);
    return currencyId;
  };
  return (
    <Flex
      w='100%'
      h='100%'
      justifyContent='center'
      flexDirection='column'
      align='center'
    >
      <Flex
        h='100%'
        p={3}
        w='100%'
        color={textColor}
        bgColor={bgColor}
        flexDirection='column'
        border='1px'
        borderRadius='6px'
        fontSize='14px'
        borderColor={borderColor}
        mb={3}
      >
        <Flex py={2} justify='space-between'>
          <Text>Your total pool tokens:</Text>
          <Text>{props.pair.poolToken}</Text>
        </Flex>
        <Flex py={2} justify='space-between'>
          <Text>
            Pooled{" "}
            {props.pair.path[0].token == "WBNB"
              ? "BNB"
              : props.pair.path[0].token == "WETH"
              ? "ETH"
              : props.pair.path[0].token == "WMATIC"
              ? "MATIC"
              : props.pair.path[0].token == "WROSE"
              ? "ROSE"
              : props.pair.path[0].token == "wROSE"
              ? "ROSE"
              : props.pair.path[0].token}
            :
          </Text>
          <Text>{props.pair.pooledToken0}</Text>
        </Flex>
        <Flex py={2} justify='space-between'>
          <Text>
            Pooled{" "}
            {props.pair.path[1].token == "WBNB"
              ? "BNB"
              : props.pair.path[1].token == "WETH"
              ? "ETH"
              : props.pair.path[1].token === "WMATIC"
              ? "MATIC"
              : props.pair.path[1].token === "WROSE"
              ? "ROSE"
              : props.pair.path[1].token === "wROSE"
              ? "ROSE"
              : props.pair.path[1].token}
          </Text>
          <Text>{props.pair.pooledToken1}</Text>
        </Flex>
        <Flex py={2} justify='space-between'>
          <Text>Your pool share:</Text>
          <Text>{parseFloat(props.pair.poolShare).toFixed(6)}%</Text>
        </Flex>
      </Flex>
      <Flex mt={-1} alignItems='center' w='100%' justifyContent='space-between'>
        <Button
          color={addButtonColor}
          h='40px'
          bgColor={addButtonBgColor}
          w='48%'
          py={3}
          mb={2}
          _hover={{ bgColor: addButtonBgColor, color: addButtonColor }}
          _active={{ bgColor: addButtonBgColor, color: addButtonColor }}
          onClick={() =>
            history.push(
              `/add/${checkCurrencyId(
                props.pair.path[0].fromPath
              )}/${checkCurrencyId(props.pair.path[1].toPath)}`
            )
          }
        >
          Add
        </Button>
        <Button
          border='1px'
          _hover={{ bgColor: removeButtonBgColor, color: removeButtonColor }}
          _active={{ bgColor: removeButtonBgColor, color: removeButtonColor }}
          bgColor={removeButtonBgColor}
          borderColor={removeButtonBorderColor}
          color={removeButtonColor}
          h='40px'
          w='48%'
          mb={2}
          py={3}
          onClick={() =>
            history.push(
              `/remove/${props.pair.path[0].fromPath}/${props.pair.path[1].toPath}`
            )
          }
          // as={<Link to="/remove" />}
        >
          Remove
        </Button>
      </Flex>
    </Flex>
  );
};

interface LiquidityDetail {
  pair: {
    path: {
      token: string;
    }[];
    pairAddress: string;
    poolToken: string;
    poolShare: string;
    pooledToken0: string;
    pooledToken1: string;
  };
}
export default LiquidityDetails;
