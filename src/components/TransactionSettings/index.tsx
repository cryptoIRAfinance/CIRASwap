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
  Input,
  InputGroup,
  InputRightAddon,
  Button,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { SettingsIcon } from "../../theme/components/Icons";
import { ExclamationIcon } from "../../theme/components/Icons";
import {
  useUserSlippageTolerance,
  useUserTransactionTTL,
} from "../../state/user/hooks";
import { escapeRegExp } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state";
import { detailsTab, transactionTab } from "../../state/transaction/actions";
import { removeSideTab } from "../../utils/utilsFunctions";
import { useUserGasPricePercentage } from "../../state/gas/hooks";
import { BsArrowsExpand, BsTornado } from "react-icons/bs";

enum SlippageError {
  InvalidInput = "InvalidInput",
  RiskyLow = "RiskyLow",
  RiskyHigh = "RiskyHigh",
}

enum DeadlineError {
  InvalidInput = "InvalidInput",
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);

const TransactionSettings = () => {
  const textColor = useColorModeValue("gray.700", "gray.700");
  const iconColor = useColorModeValue("gray.600", "brand.400");
  const bgColor = useColorModeValue("brand.100", "brand.400");
  const buttonBgcolor = useColorModeValue("brand.300", "brand.300");
  const buttonBgColorTwo = useColorModeValue("brand.200", "brand.300");
  const textColorTwo = useColorModeValue("gray.700", "gray.700");
  const borderColor = useColorModeValue("brand.600", "brand.600");
  const activeButtonColor = useColorModeValue("gray.600", "gray.600");
  const inputRightAddOnBgColor = useColorModeValue("brand.200", "brand.500");
  const [slippageValue, setSlippageValue] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    setSlippageValue(e.target.value);
  };
  const [userSlippageTolerance, setUserSlippageTolerance] =
    useUserSlippageTolerance();
  const [slippageInput, setSlippageInput] = useState("");
  const [userGasInput, setUserGasInput] = useState("");
  const [ttl, setTtl] = useUserTransactionTTL();
  const [deadlineInput, setDeadlineInput] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [userGasPricePercentage, setUserGasPricePercentage] =
    useUserGasPricePercentage();

  const transactionState = useSelector(
    (state: RootState) => state.transactions.removeSideTab
  );
  const detailsState = useSelector(
    (state: RootState) => state.transactions.removeDetailsTab
  );

  const userGasPricePercent = useSelector(
    (state: RootState) => state.gas.userGasPrice
  );

  const showTransactionTab = () => {
    dispatch(transactionTab({ removeSideTab: false }));
    window.localStorage.removeItem("history");
  };

  const hideTransactionTab = () => {
    dispatch(transactionTab({ removeSideTab: true }));
    removeSideTab("history");
  };

  const showDetails = () => {
    dispatch(detailsTab({ removeDetailsTab: false }));
    window.localStorage.removeItem("details");
  };

  const hideDetails = () => {
    dispatch(detailsTab({ removeDetailsTab: true }));
    removeSideTab("details");
  };

  const slippageInputIsValid =
    slippageInput === "" ||
    (userSlippageTolerance / 100).toFixed(2) ===
      Number.parseFloat(slippageInput).toFixed(2);

  let slippageError: SlippageError | undefined;
  if (slippageInput !== "" && !slippageInputIsValid) {
    slippageError = SlippageError.InvalidInput;
  } else if (slippageInputIsValid && userSlippageTolerance < 50) {
    slippageError = SlippageError.RiskyLow;
  } else if (slippageInputIsValid && userSlippageTolerance > 500) {
    slippageError = SlippageError.RiskyHigh;
  } else {
    slippageError = undefined;
  }

  const parseCustomGas = (value: string) => {
    if (value === "" || inputRegex.test(escapeRegExp(value))) {
      setUserGasInput(value);

      try {
        const valueAsIntFromRoundedFloat = Number.parseInt(value);
        if (
          !Number.isNaN(valueAsIntFromRoundedFloat) &&
          valueAsIntFromRoundedFloat < 5000
        ) {
          // setUserSlippageTolerance(valueAsIntFromRoundedFloat);
          setUserGasPricePercentage(valueAsIntFromRoundedFloat);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const parseCustomSlippage = (value: string) => {
    if (value === "" || inputRegex.test(escapeRegExp(value))) {
      setSlippageInput(value);

      try {
        const valueAsIntFromRoundedFloat = Number.parseInt(
          (Number.parseFloat(value) * 100).toString()
        );
        if (
          !Number.isNaN(valueAsIntFromRoundedFloat) &&
          valueAsIntFromRoundedFloat < 5000
        ) {
          setUserSlippageTolerance(valueAsIntFromRoundedFloat);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deadlineInputIsValid =
    deadlineInput === "" || (ttl / 60).toString() === deadlineInput;
  let deadlineError: DeadlineError | undefined;
  if (deadlineInput !== "" && !deadlineInputIsValid) {
    deadlineError = DeadlineError.InvalidInput;
  } else {
    deadlineError = undefined;
  }

  const parseCustomDeadline = (value: string) => {
    setDeadlineInput(value);

    try {
      const valueAsInt: number = Number.parseInt(value) * 60;
      if (!Number.isNaN(valueAsInt) && valueAsInt > 0) {
        setTtl(valueAsInt);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex
      alignItems='center'
      fontWeight='bold'
      rounded={100}
      className='Setting'
    >
      <Popover>
        <PopoverTrigger>
          <IconButton
            bg='transparent'
            color="brand.400"
            icon={<SettingsIcon />}
            _hover={{ background: "transparent" }}
            _focus={{ background: "transparent !important" }}
          />
        </PopoverTrigger>
        <PopoverContent
          borderRadius='6px'
          bg={bgColor}
          borderColor={borderColor}
          mt='0px'
        >
          <PopoverHeader color={textColor} fontSize='14px' borderBottom='none'>
            Settings
          </PopoverHeader>
          <PopoverCloseButton
            bg='none'
            color="gray.700"
            size={"sm"}
            mt={2}
            mr={3}
            cursor='pointer'
            _focus={{ outline: "none" }}
            p={"7px"}
            border={"1px solid"}
            borderColor={"inputRightAddOnBgColor"}
            
          />
          <PopoverBody>
            <Flex mb={3}>
              <Text fontSize='14px' mr={2} color={textColor}>
                Slippage Tolerance
              </Text>
              <Tooltip
                
                _focus={{ outline: 'none' }}
                _hover={{ color: 'brand.100'}}
                
                label='Your transactions will revert if the price changes unfavorably by more than this percentage.'
                aria-label='A tooltip'
                placement='right-end'
                bgColor="brand.200"
                color="gray.700"
              >
                <IconButton
                  aria-label='Icon button'
                  icon={<ExclamationIcon/>}
                  colorScheme='ghost'
                  h='auto'
                  minWidth='10px'
                />
              </Tooltip>
            </Flex>
            <Flex w='100%' mb={8}>
              <Button
                value='0.1'
                onClick={() => {
                  setSlippageInput("");
                  setUserSlippageTolerance(10);
                }}
                mr={2}
                bgColor={buttonBgcolor}
                borderWidth='1px'
                borderColor={borderColor}
                color={textColorTwo}
                // pl={6}
                // pr={6}
                _hover={{
                  border: `1px solid ${activeButtonColor}`,
                  color: `${borderColor}`,
                  background: `$buttonBgColorTwo`,
                }}
                _focus={{
                  border: `1px solid ${activeButtonColor}`,
                  color: `${activeButtonColor}`,
                  background: `$buttonBgColorTwo`,
                }}
              >
                0.1%
              </Button>
              <Button
                value='0.5'
                onClick={() => {
                  setSlippageInput("");
                  setUserSlippageTolerance(50);
                }}
                mr={2}
                bgColor={buttonBgcolor}
                borderWidth='1px'
                borderColor={borderColor}
                color={textColorTwo}
                // pl={6}
                // pr={6}
                _hover={{
                  border: `1px solid ${activeButtonColor}`,
                  color: `${borderColor}`,
                  background: `$buttonBgColorTwo`,
                }}
                _focus={{
                  border: `1px solid ${activeButtonColor}`,
                  color: `${activeButtonColor}`,
                  background: `$buttonBgColorTwo`,
                }}
              >
                0.5%
              </Button>
              <Button
                value='1.0'
                onClick={() => {
                  setSlippageInput("");
                  setUserSlippageTolerance(100);
                }}
                mr={2}
                bgColor={buttonBgcolor}
                borderWidth='1px'
                borderColor={borderColor}
                color={textColorTwo}
                // pl={6}
                // pr={6}
                _hover={{
                  border: `1px solid ${activeButtonColor}`,
                  color: `${borderColor}`,
                  background: `$buttonBgColorTwo`,
                }}
                _focus={{
                  border: `1px solid ${activeButtonColor}`,
                  color: `${activeButtonColor}`,
                  background: `$buttonBgColorTwo`,
                }}
              >
                1.0%
              </Button>

              <InputGroup w='150%'>
                <Input
                  placeholder={(userSlippageTolerance / 100).toFixed(2)}
                  value={slippageInput}
                  onBlur={() => {
                    parseCustomSlippage(
                      (userSlippageTolerance / 100).toFixed(2)
                    );
                  }}
                  onChange={(event) => {
                    if (event.currentTarget.validity.valid) {
                      parseCustomSlippage(
                        event.target.value.replace(/,/g, ".")
                      );
                    }
                  }}
                  textAlign='right'
                  p={1}
                  borderRight='none'
                  color={textColor}
                  borderRadius='4px'
                  borderColor={borderColor}
                  borderWidth='1px'
                  _active={{ outline: 'none'}}
                  _focus={{ outline: 'none'}}
                />
                <InputRightAddon
                  children='%'
                  bg='ghost'
                  p={1}
                  borderColor={borderColor}
                  borderWidth='1px'
                  color="gray.700"

                />
              </InputGroup>
            </Flex>
            {!!slippageError && (
              <Text
                fontSize='14px'
                color={
                  slippageError === SlippageError.InvalidInput
                    ? "red.700"
                    : "red.600"
                }
                mb='8px'
              >
                {slippageError === SlippageError.InvalidInput
                  ? "Enter a valid slippage percentage"
                  : slippageError === SlippageError.RiskyLow
                  ? "Your transaction may fail"
                  : "Your transaction may be frontrun"}
              </Text>
            )}
            <Flex mb={3}>
              <Text fontSize='14px' mr={2} color={textColorTwo}>
                Increase Gas Fee By
              </Text>
              <Tooltip
                bgColor="brand.200"
                color="gray.700"
                label='Increase Gas Fee for transaction.'
                aria-label='A tooltip'
                placement='right-end'
              >
                <IconButton
                  aria-label='Icon button'
                  icon={<ExclamationIcon color={textColorTwo} />}
                  colorScheme='ghost'
                  h='auto'
                  minWidth='10px'
                />
              </Tooltip>
            </Flex>
            <Flex w='100%' mb={8}>
              <Button
                value='0.1'
                onClick={() => {
                  setUserGasInput("");
                  setUserGasPricePercentage(10);
                }}
                mr={2}
                bgColor={buttonBgcolor}
                borderWidth='1px'
                borderColor={borderColor}
                color={textColorTwo}
                // pl={6}
                // pr={6}
                _hover={{
                  border: `1px solid ${activeButtonColor}`,
                  color: `${borderColor}`,
                  background: `$buttonBgColorTwo`,
                }}
                _focus={{
                  border: `1px solid ${activeButtonColor}`,
                  color: `${activeButtonColor}`,
                  background: `$buttonBgColorTwo`,
                }}
              >
                10%
              </Button>
              <Button
                value='0.5'
                onClick={() => {
                  setUserGasInput("");
                  setUserGasPricePercentage(50);
                }}
                mr={2}
                bgColor={buttonBgcolor}
                borderWidth='1px'
                borderColor={borderColor}
                color={textColorTwo}
                // pl={6}
                // pr={6}
                _hover={{
                  border: `1px solid ${activeButtonColor}`,
                  color: `${borderColor}`,
                  background: `$buttonBgColorTwo`,
                }}
                _focus={{
                  border: `1px solid ${activeButtonColor}`,
                  color: `${activeButtonColor}`,
                  background: `$buttonBgColorTwo`,
                }}
              >
                50%
              </Button>
              <Button
                value='1.0'
                onClick={() => {
                  setUserGasInput("");
                  setUserGasPricePercentage(100);
                }}
                mr={2}
                bgColor={buttonBgcolor}
                borderWidth='1px'
                borderColor={borderColor}
                color={textColorTwo}
                // pl={6}
                // pr={6}
                _hover={{
                  border: `1px solid ${activeButtonColor}`,
                  color: `${borderColor}`,
                  background: `$buttonBgColorTwo`,
                }}
                _focus={{
                  border: `1px solid ${activeButtonColor}`,
                  color: `${activeButtonColor}`,
                  background: `$buttonBgColorTwo`,
                }}
              >
                100%
              </Button>

              <InputGroup w='150%'>
                <Input
                  placeholder={userGasPricePercent.toString()}
                  value={userGasInput}
                  onBlur={() => {
                    parseCustomGas(userGasPricePercent.toString());
                  }}
                  onChange={(event) => {
                    if (event.currentTarget.validity.valid) {
                      parseCustomGas(event.target.value.replace(/[^0-9]/g, ""));
                    }
                  }}
                  textAlign='right'
                  color={textColor}
                  p={1}
                  borderRight='none'
                  borderRadius='4px'
                  borderColor={borderColor}
                  borderWidth='1px'
                  _active={{ outline: 'none'}}
                  _focus={{ outline: 'none'}}
                />
                <InputRightAddon
                  children='%'
                  bg='ghost'
                  p={1}
                  borderColor={borderColor}
                  borderWidth='1px'
                  color="gray.700"
                />
              </InputGroup>
            </Flex>

            <Flex mb={3}>
              <Text fontSize='14px' mr={2} color={textColorTwo}>
                Transaction Deadline
              </Text>
              <Tooltip
                bgColor="brand.200"
                color="gray.700"
                label='Your transaction will revert if it is pending for more than this period of time.'
                aria-label='A tooltip'
                placement='right-end'
              >
                <IconButton
                  aria-label='Icon button'
                  icon={<ExclamationIcon color={textColorTwo} />}
                  colorScheme='ghost'
                  h='auto'
                  minWidth='10px'
                />
              </Tooltip>
            </Flex>
            <InputGroup mb={3} w='68%'>
              <Input
                _active={{ outline: 'none'}}
                _focus={{ outline: 'none'}}
                textAlign='left'
                borderRight='none'
                borderRadius='4px'
                p={1}
                borderColor={borderColor}
                borderWidth='1px'
                inputMode='numeric'
                pattern='^[0-9]+$'
                color={deadlineError ? "red" : undefined}
                onBlur={() => {
                  parseCustomDeadline((ttl / 60).toString());
                }}
                placeholder={(ttl / 60).toString()}
                value={deadlineInput}
                onChange={(event) => {
                  if (event.currentTarget.validity.valid) {
                    parseCustomDeadline(event.target.value);
                  }
                }}
              />
              <InputRightAddon
                children='Min'
                bg='ghost'
                p={1}
                bgColor={inputRightAddOnBgColor}
                borderColor={borderColor}
                borderWidth='1px'
              />
            </InputGroup>
            <Flex>
              <Button
                onClick={detailsState ? showDetails : hideDetails}
                border='1px solid'
                bgColor={buttonBgcolor}
                borderColor={"brand.500"}
                color={activeButtonColor}
                // my={3}
                mr={2}
                _hover={{
                  border: `1px solid ${activeButtonColor}`,
                  color: `${activeButtonColor}`,
                  background: "brand.200",
                }}
                _focus={{
                  border: `1px solid ${activeButtonColor}`,
                  color: `${activeButtonColor}`,
                  background: `$buttonBgColorTwo`,
                }}
              >
                {detailsState ? "Show Details Tab" : "Hide Details Tab"}
              </Button>
              <Button
                onClick={
                  transactionState ? showTransactionTab : hideTransactionTab
                }
                ml={2}
                border='1px solid'
                bgColor={buttonBgcolor}
                borderColor={"brand.500"}
                color={activeButtonColor}
                _hover={{
                  border: `1px solid ${activeButtonColor}`,
                  color: `${activeButtonColor}`,
                  background: "brand.200",
                }}
                _focus={{
                  border: `1px solid ${activeButtonColor}`,
                  color: `${activeButtonColor}`,
                  background: `$buttonBgColorTwo`,
                }}
              >
                {transactionState ? "Show History Tab" : "Hide History Tab"}
              </Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default TransactionSettings;
