import React from "react";
import {
  Flex,
  Spacer,
  Box,
  Img,
  Text,
  Stack,
  Link,
  Button,
  Image,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import SocialMedia from "./SocialMedia";
import DappsDropdown from "./DappsDropdown";
import WalletConnection from "./WalletConnection";

import LightLogo from "./../../assets/logo/logo-light.svg";
import DarkLogo from "./../../assets/logo/logo-dark.svg";
import MetamaskLogo from "./../../assets/metamaskLogo.png";
import MobileNavDrawer from "./MobileNavDrawer";
import NetworkConnector from "../NetworkConnector";
import { useActiveWeb3React } from "../../utils/hooks/useActiveWeb3React";

const Nav = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    activeStyle={{
      color: "brand.500",
    }}
  >
    {label}
  </NavLink>
);

const Index = () => {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const location = useLocation().pathname;
  const Logo = useColorModeValue(LightLogo, DarkLogo);
  const mobileNavColor = useColorModeValue("brand.400", "brand.400");
  const mobileNavBorderColor = useColorModeValue("brand.400", "brand.400");
  const { library } = useActiveWeb3React();
  return (
    <>
      {location === "/" ? null : (
        <Flex px={6} py={2} boxShadow="sm">
          {isMobileDevice ? (
            <>
              <Flex w="100%" justifyContent="space-between" h="10">
                <Box mr={6}>
                  <NavLink to="https://cryptoira.finance">
                    {" "}
                    <Img src={Logo} />
                  </NavLink>
                </Box>
                <MobileNavDrawer />
              </Flex>
              <Flex
                h="70px"
                zIndex="2"
                position="fixed"
                left={0}
                bottom={0}
                justify="space-between"
                alignItems="center"
                borderTop="1px"
                borderColor={mobileNavBorderColor}
                w="100%"
                bgColor={mobileNavColor}
                mr={4}
              >
                <Flex ml={4}>
                  <WalletConnection />
                </Flex>
                <Flex mr={4}>
                  <NetworkConnector />
                  <ColorModeSwitcher />
                  <SocialMedia />
                </Flex>
              </Flex>
            </>
          ) : (
            <>
              <Flex h="10">
                <Box mr={4}>
                  <Link href="https://cryptoira.finance">
                    {" "}
                    <Img src={Logo} />{" "}
                  </Link>
                </Box>
                <DappsDropdown />

                <Flex
                  mr="4px"
                  w="400px"
                  h="10"
                  align="center"
                  justify="space-around"
                  fontSize="14px"
                  className="HeaderRide"
                >
              

                </Flex>
              </Flex>
              <Spacer />

              <Flex h="8" justify="flex-end">
                <NetworkConnector />
                <Flex h="8" justify="flex-end" className="Wallet">
                  <WalletConnection />
                </Flex>
                <SocialMedia />
                <ColorModeSwitcher />
              </Flex>
            </>
          )}
        </Flex>
      )}
    </>
  );
};

export default Index;
