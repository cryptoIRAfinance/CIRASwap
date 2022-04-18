import { Flex,Grid, Text, Box,useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { ArrowRightIcon } from '../../../../theme/components/Icons';
import {DataType} from "./TransactionHistory";
import TokenIcon from '../../../../assets/Null-24.svg';

const MarketHistory = ({data} : {data: DataType}) => {

    const activeTabColor = useColorModeValue('brand.50', 'gray.700');
    const nonActiveTabColor = useColorModeValue('brand.500', 'brand.200');
    const borderColor = useColorModeValue('brand.400', 'brand.400');
    const successColor = useColorModeValue('green.600', 'green.100');
    const bgColor = useColorModeValue("brand.200", "brand.400");
    const textColor = useColorModeValue("tan.50", "gray.900");
    const textColor2 = useColorModeValue("lightbg.50", "lightbg.50");

    return (
        <Flex  >
        <Box
          width="100%"
          m={4}
          border_top="0"
          justifyContent="space-between"
          px={4}
          py={4}
          border="1px"
          borderColor={borderColor}
          bgColor={bgColor}
          borderRadius={'6px'}
        >
            <Text
              color={textColor}
              fontSize="14px"
              lineHeight="0"
              mt={3}
              mb={2}
            >
              Operation
            </Text>
            <Flex py={2}>
            <Flex mr={4}>
              <img src={data.token1Icon || TokenIcon} width={25} height={25} alt="logo" />
              <Text fontSize="sm" color={textColor2} ml={2}>
                {data.amountIn} <span>{data.token1.symbol}</span>
              </Text>
            </Flex>
           <ArrowRightIcon/>
            <Flex ml={4}>
              <img src={data.token2Icon || TokenIcon} width={25} height={25} alt="logo" />
              <Text fontSize="sm" color={textColor2} ml={2}>
                {data.amountOut} <span>{data.token2.symbol}</span>
              </Text>
            </Flex>
          </Flex>

          
            
          <Grid templateColumns="repeat(3, 2fr)" gap={7} py={2}>
              <Box>
                <Text
                  fontSize="12px"
                  lineHeight="0"
                  color={textColor}
                  mb="8px"
                >
                  Type
                </Text>
                <Text    color={textColor2} fontSize="14px" fontWeight="regular">
                  Straight Swap
                </Text>
              </Box>
              <Box>
                <Text
                  color={textColor}
                  fontSize="12px"
                  lineHeight="0"
                  mb="8px"
                >
                  If Price(Above)
                </Text>
                <Text    color={textColor2} fontSize="14px" fontWeight="regular">
                  @ 0.004500
                </Text>
              </Box>
              <Box>
                <Text
                  color={textColor}
                  fontSize="12px"
                  lineHeight="0"
                  mb="8px"
                >
                  Interval
                </Text>
                <Text    color={textColor2} fontSize="14px" fontWeight="regular">
                  --
                </Text>
              </Box>
            </Grid>
            
          <Grid templateColumns="repeat(3, 2fr)" gap={7} py={2}>
              <Box>
                <Text
                  fontSize="12px"
                  lineHeight="0"
                  color={textColor}
                  mb="8px"
                >
                  Time
                </Text>
                <Text    color={textColor2} fontSize="14px" fontWeight="regular">
                  {data.time}
                </Text>
              </Box>
              <Box>
                <Text
                  color={textColor}
                  fontSize="12px"
                  lineHeight="0"
                  mb="8px"
                >
                Status
                </Text>
                <Text    color={successColor} fontSize="14px" fontWeight="regular">
                Completed
                </Text>
              </Box>
              
            </Grid>
          
          
          </Box>
          
        </Flex>
    )
};

export default MarketHistory
