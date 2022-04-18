import React ,{ useCallback } from 'react';
import {
  Flex,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';

type IProps = {
  placeholder:string;
  searchQuery:string;
  changeInput:(event: any) => void
}

const ModalInput = ({placeholder,changeInput,searchQuery}: IProps) => {
  const inputColor = useColorModeValue('gray.600', 'gray.600');
  const borderColor = useColorModeValue('brand.400', 'brand.400');
  return (
    <>
      <Flex alignItems="center" mt={3} justifyContent="space-between">
        <Input
          type="string"
          border={`1px solid ${borderColor}`}
          color={inputColor}
          onChange={(e)=>changeInput(e)}
          height="48px"
          isRequired
          display="flex"
          alignItems="center"
          placeholder={placeholder}
          _placeholder={{ color: `${inputColor}`,fontSize:"18px", }}
          _active={{ outline: 'none'}}
          _focus={{ outline: 'none'}}
          value={searchQuery}
          fontSize="18px"
        />
      </Flex>
    </>
  );
};

export default ModalInput;
