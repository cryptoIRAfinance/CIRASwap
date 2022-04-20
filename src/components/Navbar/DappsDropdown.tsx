import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuDivider,
  MenuList,
  Button,
  Badge,
  Text,
  Spacer,
  IconButton,
  Link,
  Icon,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { ChevronDownIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { AiOutlineAppstore } from "react-icons/ai";

function DappsDropdown() {
  return (
    <>
      <Menu>
        <MenuButton
          mr={1}
          variant="ghost"
          bg="brand.300"
          as={Button}
          color="gray.700"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: "brand.200" }}
          _active={{ bg: "brand.200" }}
          _focus={{ bg: "brand.300", boxShadow: "transparent" }}
          
          rightIcon={<ChevronDownIcon />}
          
          fontSize="14px"
          className='HeaderDApps'
        >
          DApps
        </MenuButton>
        <MenuList bg="brand.400">
          <MenuItem _hover={{ bg: 'brand.200' }}
          _focus={{ bg: "transparent" }}>
          <Link href="https://swap.cryptoira.finance">
                      <Stack direction={'column'} spacing={0} >
              <Text color={"brand.50"}>CIRA Swap</Text>
              <Text color={'gray.800'}>  Direct Token Swapping</Text>
            </Stack>
          </Link>

          </MenuItem>
          <MenuItem _hover={{ bg: 'brand.200' }}>
            <Link href="https://staking.cryptoira.finance" isExternal style={{ textDecoration: 'none' }}>
              <Stack direction={'column'} spacing={0} >
                <Text color={"brand.50"}> LP Staking</Text>
                <Text color={'gray.800'}>  Stake CIRA-WBNB to Earn CIRA</Text>
              </Stack>
            </Link>
          </MenuItem>
          <MenuItem _hover={{ bg: 'brand.200' }}>
          <Link href="https://tracker.cryptoira.finance" isExternal style={{ textDecoration: 'none' }}>
            <Stack direction={'column'} spacing={0} >
              <Text color={"brand.50"}>  BUSD Dividend Tracker </Text>
              <Text color={'gray.800'}>  See your BUSD Earnings!</Text>
              </Stack>
            </Link>


          </MenuItem>

        </MenuList>
      </Menu>
    </>
  );
}

export default DappsDropdown;
