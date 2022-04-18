import React, { useState } from "react";
import {
  Text,
  Flex,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Modal,
  ModalOverlay,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
  IconButton,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { TimeIcon, CheckIcon } from "@chakra-ui/icons";
import { FiFilter } from "react-icons/fi";
import {
  handleNewestToOldest,
  handleOldestToNewest,
  handleRangeChange,
} from "../../../utils/utilsFunctions";
import { escapeRegExp } from "../../../utils";

export const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);

interface FilterProps {
  oldestToNewest: boolean;
  setOldestToNewset: React.Dispatch<React.SetStateAction<boolean>>;
  setNewestToOldest: React.Dispatch<React.SetStateAction<boolean>>;
  newestToOldest: boolean;
  range0: string | number;
  range1: string | number;
  setRange0: React.Dispatch<React.SetStateAction<string | number>>;
  setRange1: React.Dispatch<React.SetStateAction<string | number>>;
  FilterFarm: () => void;
  showPopover: boolean;
  setShowPopover: React.Dispatch<React.SetStateAction<boolean>>;
  setSavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filter = ({
  oldestToNewest,
  setOldestToNewset,
  setNewestToOldest,
  newestToOldest,
  range0,
  range1,
  setRange0,
  setRange1,
  FilterFarm,
  showPopover,
  setShowPopover,
  setSavedChanges,
}: FilterProps) => {
  const textColor = useColorModeValue("gray.700", "brand.50");
  const iconColor = useColorModeValue("gray.500", "brand.400");
  const bgColor = useColorModeValue("brand.100", "brand.600");
  const buttonBgcolor = useColorModeValue("brand.100", "brand.600");
  const buttonBgColorTwo = useColorModeValue("brand.50", "brand.500");
  const textColorTwo = useColorModeValue("gray.500", "brand.100");
  const borderColor = useColorModeValue("brand.100", "brand.500");
  const filterBorderColor = useColorModeValue("brand.300", "tan.500");
  const filterButton = useColorModeValue("brand.300", "brand.500");
  const activeButtonColor = useColorModeValue("brand.500", "tan.500");
  const inputRightAddOnBgColor = useColorModeValue("brand.50", "");
  const filterSelected = useColorModeValue("brand.300", "tan.500");
  const checkIconColor = useColorModeValue("brand.500", "brand.500");
  const sliderFilledTrackBgColor = useColorModeValue("brand.500", "brand.500");
  const buttonBgColor = useColorModeValue("brand.300", "tan.500");
  const lastButtonColor = useColorModeValue("brand.100", "brand.600");
  const lastButtonBgColor = useColorModeValue("tan.500", "brand.500");
  const inactiveButtonBorder = useColorModeValue("brand.300", "brand.500");
  const [open, setOpen] = useState(false);

  return (
    <Flex>
      <Popover closeOnBlur={false}>
        {({ isOpen, onClose }) => (
          <>
            <PopoverTrigger>
              <Flex
                h={10}
                border='1px'
                borderRadius='4px'
                borderColor={filterButton}
                cursor='pointer'
                px={4}
                alignItems='center'
              >
                <Icon mr={2} as={FiFilter} />
                <Text fontSize='14px'>Filters</Text>
              </Flex>
            </PopoverTrigger>

            <PopoverContent
              borderRadius='6px'
              bg={bgColor}
              borderColor={borderColor}
              mt='0px'
              zIndex='1'
            >
              <PopoverHeader ml={3} color={textColor} borderBottom='none'>
                Filters
              </PopoverHeader>
              <PopoverCloseButton
                bg='none'
                size={"sm"}
                mt={2}
                mr={3}
                cursor='pointer'
                _focus={{ outline: "none" }}
                p={"7px"}
                border={"1px solid"}
                borderColor={textColorTwo}
              />
              <PopoverBody>
                <Flex mx={2} fontSize='14px' flexDirection='column'>
                  <Flex
                    mt={3}
                    cursor='pointer'
                    border='1px'
                    borderColor={
                      newestToOldest ? filterBorderColor : inactiveButtonBorder
                    }
                    borderRadius='6px'
                    p={3}
                    justifyContent='space-between'
                    alignItems='center'
                    bgColor={buttonBgColor}
                    onClick={() =>
                      handleNewestToOldest(
                        setNewestToOldest,
                        setOldestToNewset,
                        oldestToNewest
                      )
                    }
                  >
                    <Text>Newest to Oldest</Text>
                    <CheckIcon
                      visibility={newestToOldest ? "visible" : "hidden"}
                      color={checkIconColor}
                    />
                  </Flex>
                  <Flex
                    cursor='pointer'
                    mt={4}
                    bgColor={buttonBgColor}
                    border='1px'
                    borderColor={
                      oldestToNewest ? filterBorderColor : inactiveButtonBorder
                    }
                    borderRadius='6px'
                    p={3}
                    justifyContent='space-between'
                    alignItems='center'
                    onClick={() =>
                      handleOldestToNewest(
                        setNewestToOldest,
                        setOldestToNewset,
                        newestToOldest
                      )
                    }
                  >
                    <Text>Oldest to Newest </Text>
                    <CheckIcon
                      visibility={oldestToNewest ? "visible" : "hidden"}
                      color={checkIconColor}
                    />
                  </Flex>
                  <Flex p={3} flexDirection='column'>
                    <Text my={3}>APY Value</Text>

                    <RangeSlider
                      onChange={(value) => {
                        console.log(value);
                        setRange0(value[0]);
                        setRange1(value[1]);
                      }}
                      aria-label={["0", "10000"]}
                      min={0}
                      max={10000}
                      defaultValue={[0, 10000]}
                      value={[range0 as number, range1 as number]}
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack bg={sliderFilledTrackBgColor} />
                      </RangeSliderTrack>
                      <RangeSliderThumb
                        bg={sliderFilledTrackBgColor}
                        index={0}
                      />
                      <RangeSliderThumb
                        bg={sliderFilledTrackBgColor}
                        index={1}
                      />
                    </RangeSlider>
                  </Flex>
                  <Flex
                    my={3}
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Input
                      value={range0}
                      onChange={(e) => {
                        handleRangeChange(setRange0, e, false);
                      }}
                      borderRadius='6px'
                      py={3}
                      px={3}
                      w='45%'
                      bgColor={buttonBgColor}
                    />
                    -
                    <Input
                      value={range1}
                      onChange={(e) => {
                        handleRangeChange(setRange1, e, true);
                      }}
                      borderRadius='6px'
                      py={3}
                      px={3}
                      w='45%'
                      bgColor={buttonBgColor}
                    />
                  </Flex>
                  <Flex
                    my={3}
                    color={lastButtonColor}
                    bgColor={lastButtonBgColor}
                    cursor='pointer'
                    borderRadius='6px'
                    p={3}
                    justifyContent='center'
                    alignItems='center'
                    onClick={() => {
                      // FilterFarm();
                      setSavedChanges(true);
                      onClose();
                    }}
                  >
                    <Text>Save Changes</Text>
                  </Flex>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </>
        )}
      </Popover>
    </Flex>
  );
};

export default Filter;
