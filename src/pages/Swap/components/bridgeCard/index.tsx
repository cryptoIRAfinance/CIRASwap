import React, { useState, useCallback } from "react";
import {
  Box,
  Flex,
  Text,
  Img,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import MATICLOGO from "../../../../assets/Matic.svg";
import OASISLOGO from "../../../../assets/oasissvg.svg";
import { useActiveWeb3React } from "../../../../utils/hooks/useActiveWeb3React";

const BridgeCard = () => {
  const backgroundColor = useColorModeValue("brand.100", "darkg.500");
  const oasisbgColor = useColorModeValue("brand.50", "brand.500");
  const oasisTextColor = useColorModeValue("tan.500", "brand.200");
  const textColor = useColorModeValue("lightbg.700", "lightbg.500");
  const { chainId } = useActiveWeb3React();

  return (
    <>
      {chainId === 137 ||
        chainId === 80001 ||
        chainId === 42262 ||
        chainId === 42261 ? (
        <Box
          mt={5}
          h='86px'
          pt={4}
          px={3}
          fontWeight='400'
          borderRadius='6px'
          backgroundColor={
            chainId === 137 || chainId === 80001
              ? backgroundColor
              : oasisbgColor
          }
        >
          <Flex alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center'>
              <Img
                w='28px'
                h='28px'
                src={
                  chainId === 137 || chainId === 80001 ? MATICLOGO : OASISLOGO
                }
              />
              <Box ml={4}>
                <Text
                  fontWeight='normal'
                  fontSize='16px'
                  color={
                    chainId === 137 || chainId === 80001
                      ? textColor
                      : oasisTextColor
                  }
                  mb={2}
                >
                  {chainId === 137 || chainId === 80001
                    ? "Polygon Token Bridge"
                    : "Deposit tokens on Oasis Network"}
                </Text>
                {chainId === 137 || chainId === 80001 ? (
                  <Text fontWeight='normal' fontSize='14px' color={textColor}>
                    Deposit tokens to the polygon network.
                  </Text>
                ) : (
                  <Text
                    fontWeight='normal'
                    fontSize='14px'
                    color={oasisTextColor}
                  >
                    Powered by{" "}
                    <a
                      href='https://portalbridge.com/#/transfer'
                      style={{ textDecoration: "underline" }}
                      target='_blank'
                    >
                      Wormhole
                    </a>
                  </Text>
                )}
              </Box>
            </Flex>
            <Link
              href={
                chainId === 137 || chainId === 80001
                  ? "https://wallet.polygon.technology/bridge"
                  : "https://portalbridge.com/#/transfer"
              }
              isExternal
            >
              <ExternalLinkIcon
                w='28px'
                color={
                  chainId === 137 || chainId === 80001
                    ? textColor
                    : oasisTextColor
                }
                padding='2px'
                mb={3}
                h='28px'
              />
            </Link>
          </Flex>
        </Box>
      ) : (
        <Box />
      )}
    </>
  );
};

export default BridgeCard;
