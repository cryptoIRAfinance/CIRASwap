import React, { useState, useCallback } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import InputSelector from './InputSelector';
import { Field } from '../../../../state/swap/actions';
import { Currency } from "@uniswap/sdk-core";


interface ToProps {
  onUserOutput: (value: string) => void,
  onCurrencySelection: Function,
  currency: Currency | undefined,
  otherCurrency: Currency | undefined,
  value: string
}


const To: React.FC<ToProps> = ({
  onCurrencySelection,
  currency,
  otherCurrency,
  onUserOutput,
  value

}) => {
  const borderColor = useColorModeValue('brand.200', 'brand.500');
  const [tokenModal, setTokenModal] = useState(false);

  const handleInputSelect = useCallback(
    (outputCurrency) => {

      onCurrencySelection(Field.OUTPUT, outputCurrency);
      setTokenModal((state) => !state)
    },
    [onCurrencySelection],
    // [],
  );


  return (
    <>
      <Box
        h="102px"
        mb={4}
        mt={4}
        borderRadius="6px"
        border="1px"
        borderColor={borderColor}
        className='SelectToken'
      >
        <InputSelector

          onCurrencySelect={handleInputSelect}
          currency={currency}
          otherCurrency={otherCurrency}
          tokenModal={tokenModal}
          setToken={() => setTokenModal((state) => !state)}
          onUserInput={onUserOutput}
          value={value}
          max={false} />

      </Box>
    </>
  );
};

export default To;