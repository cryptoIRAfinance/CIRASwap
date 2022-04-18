import * as React from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { IoMoonOutline } from "react-icons/io5";
import { SunIcon } from "@chakra-ui/icons";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(IoMoonOutline, SunIcon);

  return (
    <IconButton
      size="md"
      bgColor={"brand.300"}
      fontSize="lg"
      variant="ghost"
      marginLeft="4"
      borderWidth="1px"
      onClick={toggleColorMode}
      _hover={{ bg: 'tan.400' }}
      _focus={{ boxShadow: "none" }}
      _active={{ bg: "brand.200" }}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};
