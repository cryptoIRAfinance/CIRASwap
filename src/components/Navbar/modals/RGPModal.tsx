import React from 'react';
import {
    ModalOverlay,
    ModalContent,
    Modal,
    ModalCloseButton,
    useColorModeValue, ModalHeader, ModalBody, Flex, Text, Image
} from '@chakra-ui/react';
import RGPImage from '../../../assets/rgp.svg';



const RGPModal = ({showRGP, setShowRGP, RGPBalance, RGPPrice}: {
    showRGP: boolean;
    setShowRGP: Function;
    RGPBalance: string;
    RGPPrice: number;
}) => {
    const bgColor3 = useColorModeValue('lightbg.300', 'brand.300');
    const shadow = useColorModeValue(
        '0px 1px 7px -2px rgba(71, 75, 24, 0.06), 0px 2px 2px rgba(71, 75, 24, 0.06)',
        '0px 2px 4px -2px rgba(198, 210, 196, 0.12), 0px 4px 4px -2px rgba(198, 210, 196, 0.08)'
    );
    const bg = useColorModeValue('brand.300', 'brand.300');
    const buttonBorder = useColorModeValue('brand.400', 'brand.400');

    return (
        <>
            <Modal
                isOpen={showRGP}
                onClose={() => setShowRGP(false)}
                isCentered
            >
                <ModalOverlay />
                <ModalContent
                    width="90vw"
                    borderRadius="6px"
                    borderColor={bgColor3}
                    minHeight="40vh"
                    boxShadow={shadow}
                    bg={bg}
                >
                <ModalCloseButton
                    bg="none"
                size={'sm'}
                mt={6}
                mr={3}
                cursor="pointer"
                _focus={{ outline: 'none' }}
                onClick={() => setShowRGP(false)}
                p={'7px'}
                border={'1px solid'}
                borderColor={buttonBorder}
                />
                    <ModalHeader mt={4} fontWeight="regular" fontSize={'lg'}>
                        Your CIRA Breakdown
                    </ModalHeader>
                    <ModalBody mt={4}>
                        <Flex
                            mt="25px"
                            flexDirection="column"
                            h="170px"
                            alignItems="center"
                            justifyContent="center"
                            px={4}
                            rounded="md"
                        >
                            <Image src={RGPImage} boxSize={'50px'}/>
                            <Text zIndex="10" fontSize="4xl" fontWeight="bold" mt={2}>
                                {RGPBalance} CIRA
                            </Text>
                        </Flex>
                        <Flex justifyContent="space-between" mb={2}>
                            <Text zIndex="10" fontSize="16px">
                                CIRA price:
                            </Text>
                            <Text zIndex="10" fontSize="16px" >
                                ${RGPPrice}
                            </Text>
                        </Flex>
                        <Flex justifyContent="space-between" mb={2}>
                            <Text fontSize="16px">
                                CIRA in circulation:
                            </Text>
                            <Text fontSize="16px">
                                8,205,000 CIRA
                            </Text>
                        </Flex>
                        <Flex justifyContent="space-between" mb={2}>
                            <Text fontSize="16px">
                                Total CIRA token maximum supply:
                            </Text>
                            <Text fontSize="16px">
                                10,000,000
                            </Text>
                        </Flex>
                    </ModalBody>
                </ModalContent>
                </Modal>
                </>
    );
};

export default RGPModal;
