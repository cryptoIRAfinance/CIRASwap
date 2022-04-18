import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    Text,
    Spinner,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Modal,
    ModalBody,
    useColorModeValue,
    useDisclosure,
    Circle, Button, Link
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { RootState } from '../../../state';
import { setCloseModal, TrxState } from '../../../state/application/reducer';


const TransactionStateModal: React.FC = () => {
    const bgColour = useColorModeValue("brand.50", "brand.500");
    const textColour = useColorModeValue("gray.600", "brand.50");
    const smallTxtColour = useColorModeValue("gray.500", "brand.400");
    const closeBtnColour = useColorModeValue("brand.400", "brand.400");
    const closeButtonBgColour = useColorModeValue("brand.400", "brand.500");
    const successBgColour = useColorModeValue("green.400", "green.400");
    const errorBgColour = useColorModeValue("red.500", "red.500");

    const [modalOpen, setModalOpen] = useState(false)
    const dispatch = useDispatch();
    const modalDetails = useSelector((state: RootState) => state.application.modal);
    console.log({ modalDetails })
    const setOpen = modalDetails === null ? false : true

    function handleCloseModal() {
        dispatch(setCloseModal())
    }
    return (
        <>
            <Modal isOpen={setOpen} onClose={handleCloseModal} isCentered>
                <ModalOverlay />
                <ModalContent bg={bgColour} color="brand.50" borderRadius="6px"
                    paddingBottom="15px" width="95vw">
                    <ModalCloseButton
                        bg="none"
                        color={closeBtnColour}
                        cursor="pointer"
                        _focus={{ outline: 'none' }}
                        onClick={handleCloseModal}
                        border={'1px solid'}
                        size={'sm'}
                        mt={3}
                        mr={3}
                        p={'7px'}
                    />
                    <ModalBody align="center" my={2}>

                        {modalDetails?.trxState === TrxState.WaitingForConfirmation ?
                            <Spinner
                                thickness="4px"
                                speed="0.53s"
                                emptyColor="transparent"
                                color="brand.500"
                                size="xl"
                                width="100px"
                                height="100px"
                                my={10}
                            /> : modalDetails?.trxState === TrxState.TransactionSuccessful ?
                                <Circle size="90px" background={successBgColour} my={8}>
                                    <Circle size="80px" background={bgColour} my={3}>
                                        <CheckIcon fontSize="40px" color={successBgColour} />
                                    </Circle>
                                </Circle> :
                                modalDetails?.trxState === TrxState.TransactionFailed ?
                                    <Circle size="90px" background={errorBgColour} my={8}>
                                        <Circle size="80px" background={bgColour} my={3}>
                                            <CloseIcon width="30px" height="30" color={errorBgColour} />
                                        </Circle>
                                    </Circle> : null}


                        <Text fontSize="20px" fontWeight="normal" color={textColour}>
                            {modalDetails?.trxState === TrxState.TransactionSuccessful ?
                                "Transaction Succesful" :
                                modalDetails?.trxState === TrxState.WaitingForConfirmation ?
                                    " Waiting for Confirmation" :
                                    modalDetails?.trxState === TrxState.TransactionFailed ?
                                        " Transaction Not Successful" : null}
                        </Text>

                        {modalDetails?.trxState === TrxState.WaitingForConfirmation ?
                            <Text fontSize="16px" py={5} fontWeight="bold" color={textColour}>
                                {modalDetails?.message}
                            </Text> :
                            modalDetails?.trxState === TrxState.TransactionFailed ?
                                <>
                                    <Text
                                        py={3}
                                        fontSize="14px"
                                        fontWeight="normal"
                                        color="tan.500">
                                        <a href="#" target="_blank">
                                            Retry
                                        </a>

                                    </Text>
                                    <Text
                                        py={3}
                                        fontSize="14px"
                                        fontWeight="normal"
                                        color={errorBgColour}>
                                        {modalDetails?.message}

                                    </Text>
                                </>
                                : modalDetails?.trxState === TrxState.TransactionSuccessful ? <Text
                                    py={3}
                                    fontSize="14px"
                                    fontWeight="normal"
                                    color="tan.500">

                                    {modalDetails?.urlNetwork && (<Link href={`https://${modalDetails?.urlNetwork}`} isExternal> View on Etherscan </Link>)}
                                </Text> : null}

                        {modalDetails?.trxState === TrxState.WaitingForConfirmation ?
                            <Text size="12px" color={smallTxtColour}  >
                                Go to your wallet to confirm this
                            </Text> :
                            <Button
                                variant="brand"
                                padding="24px 0"
                                width="100%"
                                isFullWidth
                                boxShadow="none"
                                border="0"
                                mt={3}
                                background={closeButtonBgColour}
                                color="brand.50"
                                cursor="pointer"
                                onClick={handleCloseModal}
                            >
                                Close
                            </Button>}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )

}


export default TransactionStateModal
