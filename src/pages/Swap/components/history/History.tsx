import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, useColorModeValue, Spinner } from '@chakra-ui/react';
import { CloseIcon, AddIcon, RemoveIcon } from '../../../../theme/components/Icons';
import { removeSideTab, checkSideTab } from '../../../../utils/utilsFunctions';
import TransactionHistory from './TransactionHistory';
import useAccountHistory from "../../../../utils/hooks/useAccountHistory";
import useMarketHistory from "../../../../utils/hooks/useMarketHistory";
import { DataType } from "./TransactionHistory";
import MarketHistory from "./MarketHistory";
import { transactionTab } from "../../../../state/transaction/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../state";

const History = () => {
  const activeTabColor = useColorModeValue('brand.600', 'brand.600');
  const nonActiveTabColor = useColorModeValue('brand.200', 'brand.100');
  const iconColor = useColorModeValue('brand.400', 'brand.400');
  const borderColor = useColorModeValue('brand.400', 'brand.400');

  // const [sideBarRemoved, setSideBarRemoved] = useState<Boolean>(false);

  const [show, setShow] = useState<Boolean>(false);
  const [showMarketHistory, setShowMarketHistory] = useState(false);

  const sideBarRemoved = useSelector((state: RootState) => state.transactions.removeSideTab);

  const { historyData, loading } = useAccountHistory();
  const { marketHistoryData, loadMarketData } = useMarketHistory();

  const userData = Object.keys(historyData).map((i) => historyData[i]);
  const historyArray = Object.keys(marketHistoryData).map((i) => marketHistoryData[i]);

  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    const isActive = checkSideTab('history');
    dispatch(transactionTab({ removeSideTab: isActive }))

  }, []);


  return (
    <Flex
      border="1px"
      borderColor={borderColor}
      borderRadius="6px"
      display={sideBarRemoved && "none"}
      alignItems="center"

    >
      <Box w="100%" pl={3} my={4} pr={3}>
        <Flex alignItems="center" justifyContent="space-between" px={4}>
          <Flex>
            <Text
              fontWeight="400"
              mr={3}
              fontSize="16px"
              className='History'
              color={!showMarketHistory ? activeTabColor : nonActiveTabColor}
              cursor="pointer"
              onClick={() => {
                setShowMarketHistory(false);
              }}
            >
              Transaction History
            </Text>
            <Text fontWeight="400" cursor="pointer" fontSize="16px" color={showMarketHistory ? activeTabColor : nonActiveTabColor} onClick={() => {
              setShowMarketHistory(true);
            }}>
              Market History
            </Text>
          </Flex>
          <Flex alignItems="center" fontWeight="bold" rounded={100} bg="#">
            {show ? (<Flex
              border="2px"
              alignItems="center"
              justifyContent="center"
              mr={2}
              color={iconColor}
              borderColor={iconColor}
              w="22px"
              h="22px"
              borderRadius="6px"
              onClick={() => {
                setShow(false);
              }}
            >
              <RemoveIcon />

            </Flex>) : (<Flex
              border="2px"
              alignItems="center"
              justifyContent="center"
              mr={2}
              color={iconColor}
              borderColor={iconColor}
              w="22px"
              h="22px"
              borderRadius="6px"
              onClick={() => {
                setShow(true);
              }}
            >
              <AddIcon onClick={() => setShow(true)} />


            </Flex>)}
            <Flex
              border="2px"
              alignItems="center"
              justifyContent="center"
              color={iconColor}
              borderColor={iconColor}
              w="22px"
              h="22px"
              borderRadius="6px"
              cursor="pointer"
              onClick={() => {
                dispatch(transactionTab({ removeSideTab: true }));
                removeSideTab('history');
              }}
            >
              <CloseIcon />
            </Flex>
          </Flex>
        </Flex>

      </Box>
      <Box
        overflowY={'auto'}
        maxHeight={'80vh'}
        sx={{
          '&::-webkit-scrollbar': {
            width: '16px',
            borderRadius: '8px',
            backgroundColor: `rgba(128, 154, 124, 0.1)`,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: `rgba(128, 154, 124, 0.25)`,
          },
        }}
      
      >
        <Flex justifyContent={'center'}>
          {show && loadMarketData || show && loading && <Spinner my={3} size={'md'} />}
        </Flex>

        {show && showMarketHistory && marketHistoryData && historyArray.map((data: DataType) => (
          <MarketHistory key={data.time} data={data} />
        ))}

        {show && !showMarketHistory && historyData && userData.map((data: DataType) => (
          <TransactionHistory key={data.time} data={data} />
        ))}
      </Box>
    </Flex>
  );
};
export default History;