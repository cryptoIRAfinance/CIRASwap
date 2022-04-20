import { Text } from '@chakra-ui/react';
import React from 'react';


interface Props {
  children: React.ReactNode;
}

const ContentBox = ({ children }: Props) => (
  // @ts-ignore
  <Text align='left' color="brand.50">{children}</Text>
);

export default ContentBox;
