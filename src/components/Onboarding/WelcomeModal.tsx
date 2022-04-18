import React  from "react"
import {
    ModalOverlay,
    ModalContent,
    Modal,
    useColorModeValue,
    Box,
    Flex,
    Text,
    Button,
    Image,
} from "@chakra-ui/react"
import logo from '../../assets/logoRGP.png'


export type IModal = {
    openModal: boolean,
    closeModal: Function
    startToure: Function,
    welcomeText: string,
    textHeader: string
}

const WelcomeModal: React.FC<IModal> = ({
    openModal,
    closeModal,
    startToure,
    welcomeText,
    textHeader
}) => {
    const bgColor = useColorModeValue("brand.50", "brand.500");
    const secondarybgColor = useColorModeValue("tan.200", "brand.100");
    const textColor = useColorModeValue("gray.700", "brand.50");

    const brandButtonColor = useColorModeValue("brand.500", "tan.500");
    const buttonColor = useColorModeValue("brand.500", "tan.500");



    function startTour1() {
        closeModal(false);
        startToure()
    }

    return (
        <>
            <Modal isCentered isOpen={openModal} onClose={() => closeModal(false)}>
                <ModalOverlay />
                <ModalContent
                    width="95vw"
                    borderRadius="6px"
                    paddingBottom="20px"
                    bgColor={bgColor}
                    minHeight="40vh"
                >

                    <Box
                        bgColor={secondarybgColor}
                        textAlign="center"
                        color="brand.500"
                        padding="25px 0"
                        fontWeight="normal"
                    >
                        <Flex
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                        >

                            <Image src={logo} alt="logo" />
                        </Flex>
                    </Box>
                    <Flex justifyContent="space-between" alignContent='center' flexDirection="column" alignItems="center" py="4">
                        <Text color={textColor} margin="6px 0" fontSize="20px">
                            {textHeader}
                        </Text>


                    </Flex>
                    <Flex justifyContent="space-between" alignContent="center" flexDirection="column" alignItems="center" py="4">
                        <Text color={textColor} textAlign="center" fontSize="16px" mx={8}>
                            {welcomeText}
                        </Text>

                    </Flex>

                    <Flex justifyContent="space-between" alignContent="center" flexDirection="column" alignItems="center" py="4">

                        <Button
                            variant="brand"
                            padding="24px 0"
                            width="80%"
                            isFullWidth
                            boxShadow="none"
                            border="0"
                            mt={3}
                            background={brandButtonColor}
                            color="brand.50"
                            cursor="pointer"
                            onClick={startTour1}

                        >
                            Take this short tour
                        </Button>


                        <button onClick={() => closeModal(false)}>
                            <Text
                                py={3}
                                decoration='underline'
                                fontSize="16px"
                                fontWeight="normal"
                                color={buttonColor}>
                                Skip tour</Text>
                        </button>


                    </Flex>



                </ModalContent>
            </Modal>
        </>
    )
};

export default WelcomeModal
