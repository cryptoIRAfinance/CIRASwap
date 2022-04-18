import React from "react"
import {
    ModalOverlay,
    ModalContent,
    Modal, 
    ModalCloseButton,
    ModalBody,
    ModalHeader,
    useDisclosure,
    useColorModeValue,
    Flex,
    Text,
    Button,
    Image
} from "@chakra-ui/react"
import { useAddUserToken } from "../../state/user/hooks";
import { ArrowBackIcon } from "@chakra-ui/icons"
import Warning from '../../assets/warning.svg'; 
import LightWarning from '../../assets/lightWarning.svg'; 
import { WarningIcon } from "../../theme/components/Icons";
import { Token } from "@uniswap/sdk-core";
import CurrencyLogo from "../currencyLogo";

export type IModal= {
tokens?:Token[],
open:boolean,
setDisplayImportedToken:React.Dispatch<React.SetStateAction<boolean>>,
handleCurrencySelect?: (currency: Token) => void
}

const NewToken:React.FC<IModal> = ({
  tokens,
  open,
  setDisplayImportedToken,
  handleCurrencySelect}) => {

  const addToken = useAddUserToken()

    const bgColor = useColorModeValue("brand.50", "brand.500");
    const boxShadow= useColorModeValue('brand.100', 'brand.400');
    const lightTextColor = useColorModeValue("gray.600", "brand.50");
    const heavyTextColor = useColorModeValue("gray.700", "brand.50");
    const textColor = useColorModeValue("brand.500","tan.500")
    const boxColor = useColorModeValue("brand.100","brand.600")
    const dangerColor = useColorModeValue("red.600","red.800")
    const dangerBackground = useColorModeValue("red.200","brand.50")
    const WarningLogo = useColorModeValue(LightWarning,Warning)
    const {
        onClose,
      } = useDisclosure();

    return (
        
        <>
        <Modal isOpen={open} onClose={onClose} isCentered >
            <ModalOverlay />
            <ModalContent
                width="95vw"
                borderRadius="6px"
                bgColor={bgColor}
            >
                 <ModalCloseButton
                  bg="none"
                  size={'sm'}
                  mt={3}
                  mr={3}
                  cursor="pointer"
                  _focus={{ outline: 'none' }}
                  onClick={()=>setDisplayImportedToken(false)}
                  p={'7px'}
                  border='1px solid'
              />
          <ModalHeader color={heavyTextColor} fontWeight="500"
         boxShadow={`0px 1px 0px ${boxShadow}`}>
            <ArrowBackIcon
              w={10}
              h={6}
              cursor="pointer"
              marginLeft="-12px"
              onClick={()=>setDisplayImportedToken(false)}
            />
            <Flex
              flexDirection="row"
              justifyContent="space-evenly"
              marginTop="-49px"
            >
              <Text marginLeft="0px" marginTop="22px" fontSize="16px">
                Import Token
              </Text>
            </Flex>
          </ModalHeader>
                <ModalBody pb="30px">
                  <Flex justifyContent="center" py="30px" alignItems="center" flexDirection="column">
                  <Image src={WarningLogo}  pb="20px"/> 
                  <Text textAlign="center" color={heavyTextColor}>
                      This token doesn't appear on the active token list(s). Make sure this is the token that you want to trade.
                          </Text>
                    </Flex>
                
                    {tokens?.map((token,id)=>{
                      return (
                          <Flex 
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                bgColor={boxColor} borderRadius="6px"
                my="3"
                py="25px" key={id}>
                 <CurrencyLogo currency={token} />
                    <Text my="3" color={heavyTextColor}>{token?.symbol}</Text>
                    <Text color={lightTextColor}>{token?.name}</Text>
                    <Text my="3" color={textColor}>{token?.address}</Text>
                    <Button color={dangerColor} _hover={{bgColor:"#FFE6EE"}} bgColor={dangerBackground}><WarningIcon color={dangerColor} /> Unknown Source</Button>
                </Flex>
                      )
                    })

                    } 
              
                <Button color="white" bgColor={textColor} isFullWidth mt="3" height="48px"
                onClick={() => {
                  tokens?.map(token=> {
                    addToken(token)
                    setDisplayImportedToken(false)
                    handleCurrencySelect && handleCurrencySelect(token) 
                    
                  })
                
                }}
                > Import</Button>
                      </ModalBody>
            </ModalContent>
          </Modal>
          </>
    )
}

export default NewToken
