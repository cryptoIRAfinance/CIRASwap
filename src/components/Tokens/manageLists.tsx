import React,{useState, useMemo, useEffect, memo,useCallback} from "react"
import {
    useColorModeValue,
    Box,
    Flex,
    Text,
    Switch,
    Button,
    Link
} from "@chakra-ui/react"
import "./tooltip.css"
import { CheckIcon,SettingsIcon } from "@chakra-ui/icons";
import ModalInput from "./input"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../state";
import { RootState } from "../../state";
import { uriToHttp } from "../../utils/functions/uriToHttp";
import { removeList,disableList,enableList,acceptListUpdate } from "../../state/lists/actions";
import { useAllLists } from "../../state/lists/hooks";
import { UNSUPPORTED_LIST_URLS } from "../../utils/constants/lists";
import parseENSAddress from "../../utils/ENS/parseENSaddress";
import { TokenList,Version } from "@uniswap/token-lists";
import useFetchListCallback from "../../utils/hooks/useFetchListCallback";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import ListLogo from "../Logo/ListLogo";
import { useActiveWeb3React } from '../../utils/hooks/useActiveWeb3React';
import { useActiveListUrls,useIsListActive } from "../../state/lists/hooks";
type IModal= {
  setListURL:React.Dispatch<React.SetStateAction<string>>
  setTokenList: (list: TokenList) => void
  setOpenImportToken:(open: boolean) => void
                  
}

const ManageList:React.FC<IModal> = ({
          setListURL,
          setTokenList,
          setOpenImportToken,
}) => {
console.log(123)
// temporary fetched list for import flow
const [tempList, setTempList] = useState<TokenList>()
const [addError, setAddError] = useState<string | undefined>()

    const borderColor= useColorModeValue('brand.400', 'brand.400');
    const lightTextColor = useColorModeValue("gray.700", "gray.700");
    const heavyTextColor = useColorModeValue("gray.700", "gray.700");
    const borderColor2 = useColorModeValue("brand.400","brand.500")
    const boxColor = useColorModeValue("brand.400","brand.500")
    const boxColor2 = useColorModeValue("brand.400","brand.500")
    const backgroundColor = useColorModeValue("brand.200","brand.500")
    const color = useColorModeValue("gray.700","gray.700")
    const selectedList = useColorModeValue("brand.400","brand.500")
    const switchColor = useColorModeValue("brand.200","brand.300")
    const [activeCopy, setActiveCopy] = useState<string[] | undefined>()
    const lists = useAllLists()
    const [tokenInput,setTokenInput] = useState("")     

 const handleInput = (e:any) => {
    const input = e.target.value
    setTokenInput(input)
  }
  const fetchList = useFetchListCallback()

  const handleImport = useCallback(() => {
    if (!tempList) return
    setListURL(tokenInput)
    setTokenList(tempList)
    setOpenImportToken(true)
  }, [tempList])

  const validUrl: boolean = useMemo(() => {
    return uriToHttp(tokenInput).length > 0 || Boolean(parseENSAddress(tokenInput))
  }, [tokenInput])

   function listVersionLabel(version: Version): string {
    return `v${version.major}.${version.minor}.${version.patch}`
  }

   // sort by active but only if not visible
   const activeListUrls = useActiveListUrls()
  useEffect(() => {
   
    if (!activeCopy && activeListUrls) {
      setActiveCopy(activeListUrls)
    }
  }, [activeCopy, activeListUrls])

 // check if list is already imported
 const isImported = Object.keys(lists).includes(tokenInput)

 const sortedLists = useMemo(() => {
  const listUrls = Object.keys(lists)
  return listUrls
    .filter((listUrl) => {
      // only show loaded lists, hide unsupported lists
      let bool = Boolean(lists[listUrl].current) && !UNSUPPORTED_LIST_URLS.includes(listUrl)
      return bool
    })
    .sort((u1, u2) => {
      const { current: l1 } = lists[u1]
      const { current: l2 } = lists[u2]
      // first filter on active lists
      if (activeCopy?.includes(u1) && !activeCopy?.includes(u2)) {
        return -1
      }
      if (!activeCopy?.includes(u1) && activeCopy?.includes(u2)) {
        return 1
      }

      if (l1 && l2) {
        return l1.name.toLowerCase() < l2.name.toLowerCase()
          ? -1
          : l1.name.toLowerCase() === l2.name.toLowerCase()
          ? 0
          : 1
      }
      if (l1) return -1
      if (l2) return 1
      return 0
    })
}, [lists, activeCopy])
  useEffect(() => {
    async function fetchTempList() {
      fetchList(tokenInput, false)
        .then((list) => {
          setTempList(list)
        })
        .catch(() => setAddError('Error importing list'))
    }
    // if valid url, fetch details for card
    if (validUrl) {
      fetchTempList()
    } else {

      setTempList(undefined)
      if (tokenInput !== '') {
        setAddError('Enter valid list location')
      }
    }

    // reset error
    if (tokenInput === '') {
      setAddError(undefined)
    }
  }, [fetchList, tokenInput, validUrl])


  const ListRow = memo(function ListRow( { listUrl }:{ listUrl: string }){
      const listsByUrl = useSelector<RootState, RootState['lists']['byUrl']>((state) => state.lists.byUrl)
  const dispatch = useDispatch<AppDispatch>()
  const { current: list, pendingUpdate: pending } = listsByUrl[listUrl]

  const handleAcceptListUpdate = useCallback(() => {
    if (!pending) return
    dispatch(acceptListUpdate(listUrl))
  }, [dispatch, listUrl, pending])

  const handleRemoveList = useCallback(() => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Please confirm you would like to remove this list')) {
      dispatch(removeList(listUrl))
    }
  }, [dispatch, listUrl])


  const isActive = useIsListActive(listUrl)
  const handleEnableList = useCallback(() => {
    dispatch(enableList(listUrl))
  }, [dispatch, listUrl])

  const handleDisableList = useCallback(() => {
    dispatch(disableList(listUrl))
  }, [dispatch, listUrl])
  if (!list) return null
  return (
  <Flex 
  justifyContent="space-between"
  p="2"
  py="4"
  cursor="pointer"
  bgColor={isActive ? selectedList : switchColor}
  border={`1px solid ${isActive ? borderColor : borderColor2}`}
  borderRadius="6px"
  my="4">      
      <Box mt="2" mr="3">
        {list.logoURI ? (
                <ListLogo size="40px"squared logoURI={list.logoURI} alt={`${list.name} list logo`} />
                ) : (
                <div style={{ width: '24px', height: '24px', marginRight: '1rem' }} />
        )}
      </Box>
        
        <Flex width="80%">
          <Box mt="3">
              <Text color={heavyTextColor} fontWeight="700" 
                fontSize="15px">{list.name}
              </Text>
              <Flex>
                  <Text color={lightTextColor} 
             fontSize="12px">{list.tokens.length} Tokens  </Text>
           <Box className="tooltip">
             <SettingsIcon ml="2" mt="-2"/>
           <Box fontSize="16px" className="tooltiptext" background={boxColor2}>
           <Text mb="2">{list && listVersionLabel(list.version)}</Text>
           <Link isExternal href={`https://tokenlists.org/token-list?url=${listUrl}`} style={{ textDecoration: 'none' }}>
           See <ExternalLinkIcon />
           </Link>
           <Box>
            <Button mt="3" p="2" onClick={handleRemoveList} backgroundColor={backgroundColor}
            color={"color"}
            _hover={{ bg: "brand.200" }}
            >
              Delete
            </Button>
            {pending && (
                    <Button variant="text" onClick={handleAcceptListUpdate} style={{ fontSize: '12px' }}>
                      Update list
                    </Button>
                  )}
            </Box>
      </Box>
</Box>
             
           </Flex> 
          </Box>
                 
        </Flex> 
                 <Box mt="2">
                      <Switch size="lg" py="1" 
                      defaultChecked={isActive}
                      colorScheme={"brand"}
                                      
                      onChange={() => {
                        if (isActive) {
                          handleDisableList()
                        } else {
                          handleEnableList()
                        }
                      }}
                      />
                  </Box>
                        
  </Flex>   
  )
  })
    return (
        
        <>
        <Box pt="0" bgColor="brand.200" borderRadius="md" pb="0">
          <ModalInput 
          
          placeholder="https:// or ipfs:// or ENS name"
          searchQuery ={tokenInput}
          changeInput={handleInput}
          /> 
        </Box>
        {addError ? (
          <Text color="red.400" my="2" style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {addError}
          </Text>
        ) : null}
     
                     <Box
                          margin="0px auto" mt="4">
                            {tempList && (
                            <Flex justifyContent="space-between">
                              <Flex>
    {tempList.logoURI && <ListLogo logoURI={tempList.logoURI} size="40px" alt={tempList.name} squared={false}  />}
    <Box ml="4">
                <Text bold>{tempList.name}</Text>
                  <Text color="textSubtle">
                    {tempList.tokens.length} Tokens
                  </Text>
 </Box>
 </Flex>
 <Box>
 {isImported ? (
                <Box>
                  {/* <CheckmarkIcon width="16px" mr="10px" /> */}
                  <Text mt="2"><CheckIcon mr="2"/>Loaded</Text>
                </Box>
              ) : (
                <Button width="fit-content" onClick={handleImport}>
                 Import
                </Button>
              )}
 </Box>
                            </Flex>
                            )}
                             {sortedLists.map((listUrl) =>{
                               return  (
                             <ListRow key={listUrl} listUrl={listUrl} />
                             )
                
      })}
      
                
                </Box>
            
          </>
    )
}

export default React.memo(ManageList) 


