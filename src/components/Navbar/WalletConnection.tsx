import React, { useState } from 'react';
import {
  Flex,
  Text,
  Button,
  useColorModeValue,
  useMediaQuery,
  useDisclosure
} from '@chakra-ui/react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { IoWalletOutline } from 'react-icons/io5';
import { shortenAddress } from '../../utils';
import WalletModal from './modals/walletModal';
import NetworkModal from "./modals/networkModal";
import { useNativeBalance, useRGPBalance } from '../../utils/hooks/useBalances';
import { useRGPPrice } from '../../utils/hooks/useRGPPrice';
import StatusIcon from './StatusIcon';
import RGPModal from "./modals/RGPModal";
import UnsupportNetwork from './UnsupportNetwork';
import { useActiveWeb3React } from "../../utils/hooks/useActiveWeb3React";

export default function WalletConnection() {
  const [isMobileDevice] = useMediaQuery('(max-width: 1200px)');
  const { account, error, connector } = useActiveWeb3React();
  const bg = useColorModeValue('tan.200', 'brand.500');
  const bgColor = useColorModeValue('brand.300', 'brand.300');
  const bgColor2 = useColorModeValue('brand.200', 'darkBg.50');
  const bgColor3 = useColorModeValue('tan.200', 'brand.300');
  const shadow = useColorModeValue(
    '0px 1px 7px -2px rgba(57, 70, 55, 0.06), 0px 2px 2px rgba(57, 70, 55, 0.06)',
    '0px 2px 4px -2px rgba(143, 164, 139, 0.12), 0px 4px 4px -2px rgba(143, 164, 139, 0.08)'
  );

  const [Balance, Symbol] = useNativeBalance();
  const [displayWallet, setDisplayWallet] = useState(false);
  const [displayNetwork, setDisplayNetwork] = useState(false);
  const [RGPBalance] = useRGPBalance();
  const [RGPPrice] = useRGPPrice();
  const [showRGP, setShowRGP] = useState(false);
  const [modalDisplay, setDisplayModal] = useState(false);

  if (account) {
    return (
      <>
        <Button
          display={isMobileDevice ? 'none' : undefined}
          variant="rgpButton"
          bg={bgColor}
          onClick={() => setShowRGP(true)}
          fontSize="14px"

        >
          {RGPBalance} {RGPBalance ? 'CIRA' : '0.0000 CIRA'}
        </Button>
        <RGPModal showRGP={showRGP} setShowRGP={setShowRGP} RGPBalance={RGPBalance} RGPPrice={RGPPrice} />
        <Flex
          ml={2}
          w={isMobileDevice ? '160px' : 'max-content'}
          borderRadius="md"
          border={'1px solid'}
          borderColor={bgColor2}
          h="10"
          justify="space-between"
        >
          <Flex
            display={isMobileDevice ? 'none' : undefined}
            align="center"
            justify="center"
            bg={bgColor}
            px={2}
            borderRadius="md"

          >
            <Text fontWeight={'bold'} fontSize="14px">
              {Balance} {Symbol}
            </Text>
          </Flex>
          <Button
            
                    _hover={{ bg: "brand.200" }}
                    _focus={{ boxShadow: "none" }}
                    
            onClick={() => setDisplayWallet((state) => !state)}
            variant={'ghost'}
            fontSize="14px"
            rightIcon={<StatusIcon connector={connector} />}
          >
            {shortenAddress(account)}
          </Button>
        </Flex>
        <WalletModal
          displayWallet={displayWallet}
          accounts={account}
          setDisplayWallet={setDisplayWallet}
        />
      </>
    );
  } else if (error) {
    return (
      <>{error.name === "UnsupportedChainIdError" ? <> <Button

        bg="red.300" rightIcon={<IoWalletOutline />} variant="brand"

        onClick={() => setDisplayModal(state => !state)}
      >
        Unsupported Network
      </Button>
        <UnsupportNetwork openModal={modalDisplay} setDisplayModal={setDisplayModal} />
      </> : 'Error'}</>

    );
  } else {
    return (
      <>
        <Button
          data-tut="reactour__WalletConnect"
          bgColor="brand.300"
          onClick={() => {
            setDisplayNetwork(state => !state);
            localStorage.removeItem('walletconnect')
          }}
          rightIcon={<IoWalletOutline />}
          variant="brand"
        >
          Connect Wallet
        </Button>
        <NetworkModal displayNetwork={displayNetwork} setDisplayNetwork={setDisplayNetwork} />
      </>
    );
  }
}
