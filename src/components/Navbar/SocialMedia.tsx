import { Box, Flex, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuDivider,
  MenuList,
  Button,
  IconButton,
  Link,
  Icon,
} from '@chakra-ui/react';
import { IoEllipsisHorizontalOutline } from 'react-icons/io5';


const SocialMediaLinks = () => {
  const [show, setShow] = useState(false);
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        bgColor={"brand.300"}
        size="md"
        ml={4}
        variant="ghost"
        fontSize="lg"
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        _hover={{ bg: 'tan.400' }}
        _focus={{ boxShadow: "none" }}
        _active={{ bg: "brand.200" }}
        icon={<IoEllipsisHorizontalOutline />}

      />
      <MenuList bg="brand.300" color={'gray.800'}>
        <a
          target="_blank"
          href="https://www.linkedin.com/" rel="noreferrer"
        >
          <MenuItem _hover={{ bg: 'tan.400' }}>Linkedin</MenuItem>
        </a>

        <a target="_blank" href="https://www.medium.com/cryptoIRAfinance" rel="noreferrer">
          <MenuItem _hover={{ bg: 'tan.400' }}>Medium</MenuItem>
        </a>
        <MenuDivider />
        <a target="_blank" href="https://www.t.me/cryptoIRAchat" rel="noreferrer">
          <MenuItem _hover={{ bg: 'tan.400' }}>Telegram</MenuItem>
        </a>
        <a target="_blank" href="https://twitter.com/cryptoIRAfinance" rel="noreferrer">
          <MenuItem _hover={{ bg: 'tan.400' }}>Twitter</MenuItem>
        </a>
        <MenuDivider />
        <a target="_blank" href="https://github.com/cryptoIRAfinance" rel="noreferrer">
          <MenuItem _hover={{ bg: 'tan.400' }}>Github</MenuItem>
        </a>
        <a target="_blank" href="https://discord.gg/" rel="noreferrer">
          <MenuItem _hover={{ bg: 'tan.400' }}>Discord</MenuItem>
        </a>
      </MenuList>
    </Menu>
  );
};

export default SocialMediaLinks;
