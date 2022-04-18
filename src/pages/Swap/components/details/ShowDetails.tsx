import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import { CloseIcon, AddIcon, SubtractIcon } from '../../../../theme/components/Icons';
import { removeSideTab, checkSideTab } from '../../../../utils/utilsFunctions';
import { ArrowDownIcon } from "@chakra-ui/icons";
import DetailBox from "./DetailBox";
import { animated, Transition } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../state';
import { useDetails } from '../../../../utils/hooks/useDetails';
import { detailsTab } from "../../../../state/transaction/actions";

const ShowDetails = () => {
  const textColor = useColorModeValue('tan.200', 'gray.700');
  const iconColor = useColorModeValue('brand.400', 'brand.400');
  const borderColor = useColorModeValue('brand.300', 'brand.500');
  const boxColor = useColorModeValue("brand.100", "brand.200");
  


  const [viewInfo, setViewInfo] = useState<Boolean>(false);
  const swapDetails = useSelector((state: RootState) => state.swap);

  const dispatch = useDispatch<AppDispatch>();

  const sideBarRemoved = useSelector((state: RootState) => state.transactions.removeDetailsTab);

  const { inputdetails, outputdetails } = useDetails(swapDetails);



  useEffect(() => {
    const isActive = checkSideTab('details');
    dispatch(detailsTab({ removeDetailsTab: isActive }));

  }, []);

  return (
    <Flex
      border="1px"
      borderColor={borderColor}
      borderRadius="6px"
      display={sideBarRemoved && 'none'}
      alignItems="center"

    >
      <Box w="100%" my={4} pl={3} pr={3}>
        <Flex alignItems="center" justifyContent="space-between" px={4}>
          <Text fontWeight="400" fontSize="16px" color={'Gray.700'}>
            Details
          </Text>
          <Flex alignItems="center" fontWeight="bold" rounded={100} bg="#">
            <Flex
              border="2px"
              alignItems="center"
              justifyContent="center"
              mr={2}
              color={iconColor}
              borderColor={iconColor}
              w="22px"
              h="22px"
              borderRadius="6px"
              className='Token_Details'
            >
              {viewInfo ?
                <SubtractIcon onClick={() => setViewInfo(!viewInfo)} /> :
                <AddIcon onClick={() => setViewInfo(!viewInfo)} />}
            </Flex>
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
                dispatch(detailsTab({ removeDetailsTab: true }));
                removeSideTab('details');
              }}
            >
              <CloseIcon />
            </Flex>
          </Flex>
        </Flex>
        <Transition
          items={viewInfo}
          from={{ opacity: 0, x: 0, y: -100 }}
          enter={{ opacity: 1, x: 0, y: 0 }}
          leave={{ opacity: 0, x: 0, y: -100 }}
          delay={1}
        >
          {(styles, viewInfo) =>
            viewInfo &&
            <animated.div style={styles}>
              <DetailBox details={inputdetails} inputDetails={swapDetails.INPUT.currencyId} />
              <Flex justifyContent={'center'}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  width="40px"
                  height="40px"
                  my={'8px'}
                  bgColor={boxColor}
                  border={`3px solid ${borderColor}`}
                  color={textColor}
                  boxSizing="border-box"
                  borderRadius="12px">
                  <ArrowDownIcon w={5} h={10} />
                </Box>
              </Flex>
              <DetailBox details={outputdetails} inputDetails={swapDetails.OUTPUT.currencyId} />
            </animated.div>
          }
        </Transition>
      </Box>
    </Flex>
  );
};

export default ShowDetails;