import React from "react";
import {
  Flex,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  useColorModeValue,
  Text,
  Link,
  Collapse,
  useMediaQuery,
  MenuItem,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import { CloseIcon } from "../../theme/components/Icons";
import { NavLink } from "react-router-dom";
import useToggle from "../../utils/hooks/useToggle";
import { SupportedChainId } from "../../constants/chains";
import { useActiveWeb3React } from "../../utils/hooks/useActiveWeb3React";

const MobileNavDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOn, toggleIsOn] = useToggle();
  const HamburgerIconBorderColor = useColorModeValue("brand.400", "brand.400");
  const HamburgerIconColor = useColorModeValue("brand 50", "brand.50");
  const SwapBgColor = useColorModeValue("brand.400", "brand.400");
  const closeButtonBorder = useColorModeValue("brand.400", "brand.400");
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");

  const { chainId } = useActiveWeb3React();

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
  return (
    <>
      <Flex
        border="1px"
        borderColor={HamburgerIconBorderColor}
        alignItems="center"
        borderRadius="6px"
        w="40px"
        h="40px"
        justifyContent="center"
        p="18px"
      >
        <HamburgerIcon
          color={HamburgerIconColor}
          onClick={onOpen}
          cursor={"pointer"}
          w="24px"
          h="24px"
        />
      </Flex>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader mt={5}>
            <Flex
              onClick={onClose}
              alignItems="center"
              cursor="pointer"
              justifyContent="center"
              borderRadius="6px"
              w="24px"
              h="24px"
              border="1px"
              borderColor={closeButtonBorder}
            >
              <CloseIcon />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Flex ml={-6}>
              <Flex flexDirection="column">
                <Text ml={6} color="gray.400" fontSize="12px" mb={2}>
                  MENU
                </Text>

                <NavLink
                  activeStyle={{
                    color: "brand.500",
                  }}
                  to="/swap"
                >
                  <Flex
                    mb={2}
                    alignItems="center"
                    w="320px"
                    h="40px"
                    justifyContent="space-between"
                    onClick={toggleIsOn}
                    bgColor={isOn ? SwapBgColor : "transparent"}
                  >
                    <Flex ml={6}>
                      <Nav label="Swap" to="/swap" />
                    </Flex>
                    {isOn ? (
                      <ChevronUpIcon mr={2} />
                    ) : (
                      <ChevronDownIcon mr={2} />
                    )}
                  </Flex>
                </NavLink>
                <Collapse animateOpacity in={isOn}>
                  <Flex
                    display={isOn ? "" : "none"}
                    flexDirection="column"
                    ml={10}
                    mb={3}
                  >
                    <Text
                      _hover={{ color: "brand.500" }}
                      mb={2}
                      onClick={onClose}
                    >
                      <Nav
                        label="Set Price"
                        to={
                          chainId === SupportedChainId.BINANCETEST ? "#" : "#"
                        }
                      />
                    </Text>
                  </Flex>
                </Collapse>
                <Flex ml={6} mb={3}>
                </Flex>
                <Text ml={6} color="gray.400" mt={5} fontSize="12px" mb={2}>
                  DAPPS
                </Text>
                <Flex mb={3} alignItems="center" ml={6} onClick={onClose}>
                  <Nav label="SmartSwap" to="/swap" />
                </Flex>
                <Flex ml={6} mb={3}>
                  <Link href="https://staking.cryptoira.finance" isExternal>
                    <Text>LP Staking</Text>
                  </Link>
                </Flex>
                <Flex ml={6} mb={3}>
                  <Text></Text>
                </Flex>
                <Flex ml={6} mb={3}>
                  <Text></Text>
                </Flex>

                <Flex ml={6} mb={3}>
                  <Text></Text>
                </Flex>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNavDrawer;
