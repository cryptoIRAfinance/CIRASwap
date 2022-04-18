import React, { useEffect } from 'react';
import {
  Box,
  IconButton,
  Flex,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Link,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCheckCircle, AiOutlineExclamationCircle } from 'react-icons/ai';
import { RootState } from '../../state';
import { removeToast } from './toastSlice';
import { animated, useSpring } from 'react-spring';
import './toast.css';

export interface ToastProps {
  message: string;
  URL?: string;
  error?: boolean;
  remove: Function;
}

function Toast({ message, URL, error, remove }: ToastProps) {
  const bgColor3 = useColorModeValue('lightbg.300', 'brand.500');
  const buttonBorder = useColorModeValue('brand.400', 'brand.400');
  const successIcon = useColorModeValue('lightbg.800', 'lightbg.700');
  const errorIcon = useColorModeValue('red.600', 'red.400');
  const textColor = useColorModeValue('black', '#fff');
  const bg = useColorModeValue('brand.400', 'brand.400');
  const shadow = useColorModeValue(
    '0px 1px 7px rgba(57, 70, 55, 0.08)',
    '0px 2px 4px -2px rgba(221, 219, 196, 0.12), 0px 4px 4px -2px rgba(221, 219, 196, 0.08)'
  );

  const faderStyle = useSpring({
    from: { width: '100%' },
    to: { width: '0%' },
    config: { duration: 6000 },
  });

  useEffect(() => {
    setTimeout(() => {
      remove();
    }, 6000);

  }, []);

  return (
    <Box
      height={'140px'}
      background={bg}
      width={'350px'}
      borderRadius={'6px'}
      boxShadow={shadow}
      border={'1px solid'}
      position={'relative'}
      borderColor={bgColor3}
      justifyContent={'center'}
    >
      <Flex h={'100%'}>
        <Box flex={'1'}>
          <HStack h={'100%'} p={3} w={'90%'}>
            {error ?
                <AiOutlineExclamationCircle color={errorIcon} size={'40px'} />
                :
                <AiOutlineCheckCircle color={successIcon} size={'40px'} />
            }
            <VStack alignItems={'start'} textAlign={'start'} px={'10px'}>
              <Text fontSize='16px' fontWeight='bold' color={textColor}>
                {message}
              </Text>
              {!error &&
              <Link
                  href={`${URL}`}
                  isExternal
                  variant={'link'}
                  color={'brand.200'}
              >
                View on Explorer
              </Link>
              }
            </VStack>
          </HStack>
        </Box>
      </Flex>
      <IconButton
        icon={<CloseIcon />}
        onClick={() => remove()}
        aria-label={'Close Toast'}
        backgroundColor="transparent"
        position={'absolute'}
        top={'16px'}
        right={'16px'}
        bg="none"
        size={'xs'}
        cursor="pointer"
        _focus={{ outline: 'none' }}
        p={'7px'}
        border={'1px solid'}
        borderColor={buttonBorder}
      />
      {!error && <animated.div className={'progress'} style={faderStyle} />}
    </Box>
  );
}

export const Notify = () => {
  const toastDetails = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();

  return (
    <Box position={'fixed'} mt={'20px'} right={'50px'} zIndex={'1000'}>
      {toastDetails.message && (
        <Toast
          message={toastDetails.message}
          URL={toastDetails.URL}
          error={toastDetails.error}
          remove={() => dispatch(removeToast())}
        />
      )}
    </Box>
  );
};

export default Notify;
