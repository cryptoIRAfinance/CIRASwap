import React from 'react';
import {
  Flex,
  Input,
  Text,
  Menu,
  Button,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { GetAddressTokenBalance } from '../../../../state/wallet/hooks';
import SelectToken from "../../../../components/Tokens/SelectToken"
import { Currency } from "@uniswap/sdk-core"
import CurrencyLogo from "../../../../components/currencyLogo"
import { escapeRegExp } from "../../../../utils";


type InputSelectorProps = {
  max: Boolean,
  onCurrencySelect: (currency: Currency | null | undefined) => void,
  currency?: Currency | null,
  otherCurrency?: Currency | null,
  tokenModal: boolean,
  setToken: React.Dispatch<React.SetStateAction<boolean>>,
  onMax?: () => void,
  onUserInput: (value: string) => void,
  value: string | undefined
};

const InputSelector = ({
  max,
  onCurrencySelect,
  currency,
  tokenModal,
  otherCurrency,
  setToken,
  onMax,
  onUserInput,
  value
}: InputSelectorProps) => {
  const inputColor = useColorModeValue('gray.600', 'tan.200');
  const balanceColor = useColorModeValue('gray.700', 'brand.100');
  const maxColor = useColorModeValue('gray.600', 'gray.600');
  const maxBgColor = useColorModeValue('brand.200', 'brand.400');
  const tokenListTriggerColor = useColorModeValue('gray.600', 'gray.600');
  const tokenListTrgiggerBgColor = useColorModeValue('brand.100', 'brand.400');

  const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);

  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput)
    }
  };

  const [balance] = GetAddressTokenBalance(currency ?? undefined);
  return (
    <>
      <Flex alignItems="center" mt={3} justifyContent="space-between">
        <Input
          fontSize="2xl"
          type="text"
          min="0"
          border="none"
          color={inputColor}
          isRequired
          placeholder="0.0"
          value={value}
          onChange={(event) => {
            enforcer(event.target.value.replace(/,/g, '.'))
          }}
          focusBorderColor="none"
        />
        <Flex>
          <Menu>
            <Button
              border="0px"
              h="40px"
              rightIcon={<ChevronDownIcon />}
              mr={3}
              bgColor={tokenListTrgiggerBgColor}
              onClick={() => setToken(tokenModal)}
              _hover={{ bg: "tan.400" }}
              _focus={{ boxShadow: "none" }}
              _active={{ bg: "tan.400" }}
              data-tut="reactour__selectToken"
            >
              <Box mr="3">
                <CurrencyLogo currency={currency ?? undefined} size={24} squared={true} />
              </Box>

              {(currency && currency.symbol && currency.symbol.length > 20
                ? currency.symbol.slice(0, 4) +
                '...' +
                currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                : currency?.symbol) || <Text color={tokenListTriggerColor}>Select a token</Text>}

            </Button>
          </Menu>
        </Flex>
      </Flex>
      <Flex mt={3} alignItems="center">
        <Text ml={4} color={balanceColor} fontSize="13px">
          Balance: {balance.currency?.isToken ? balance.toSignificant(6) : balance} {currency?.symbol}
        </Text>
        {max ? (
          <Text
            ml={2}
            color={maxColor}
            h="22px"
            w="34px"
            px="4px"
            borderRadius="4px"
            bgColor={maxBgColor}
            fontSize="13px"
            onClick={onMax}
            cursor="pointer"
          >
            Max
          </Text>
        ) : (
          <></>
        )}
      </Flex>
      <SelectToken
        onCurrencySelect={onCurrencySelect}
        tokenModal={tokenModal}
        setTokenModal={setToken}
        selectedCurrency={currency}
        otherSelectedCurrency={otherCurrency}

      />
    </>
  );
};

export default InputSelector;
