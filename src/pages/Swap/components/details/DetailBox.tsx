import React from "react";
import { Box, Text, useColorModeValue, VStack } from "@chakra-ui/react";

interface DetailBoxProps {
  details:any[],
  inputDetails: string | undefined
}

const DetailBox = ({details,inputDetails}:DetailBoxProps) => {
  const textColor = useColorModeValue("gray.800", "gray.900");
  const borderColor = useColorModeValue("brand.400", "brand.400");
  const secondaryText = useColorModeValue("tan.50", "brand.900");
  const bgColor = useColorModeValue("brand.200", "brand.400");

  return (
    <Box
      border={`1px solid ${borderColor}`}
      bgColor={bgColor}
      borderRadius={"6px"}
      p={3}
      my={4}
      mx={3}
      textAlign={"center"}
    >
      <VStack>
        <Box>
          <Text color={secondaryText} fontSize={"14px"} my={"4px"}>
            Token Name
          </Text>
          <Text
            fontSize={"16px"}
            fontWeight={"400"}
            color={textColor}
            my={"4px"}
          >
            {details.length >= 1 && inputDetails !== '' ? details[0].name : details.length <= 1 && inputDetails !== '' ? inputDetails  : 'Crypto IRA'}
          </Text>
        </Box>

        <Box my={"8px"}>
          <Text color={secondaryText} fontSize={"14px"} my={"4px"}>
            Token Amount
          </Text>
          <Text fontSize={"16px"} color={textColor} my={"4px"}>
            {details.length >= 1 && inputDetails !== '' ? details[0].supply : details.length <= 1 && inputDetails !== '' ? '' : '10,000,000'}
          </Text>
        </Box>

        <Box my={"8px"}>
          <Text color={secondaryText} fontSize={"14px"} my={"4px"}>
            Description
          </Text>
          <Text fontSize={"16px"} color={textColor} my={"4px"}>
            {details.length >= 1 && inputDetails !== '' ? details[0].description : details.length <= 1 && inputDetails !== '' ? '' : 'Crypto IRA is a deflationary asset and native currency for CIRASwap. CIRA is re-defining safe and secure De-Fi'}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default DetailBox;
