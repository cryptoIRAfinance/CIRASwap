import { Button, useColorModeValue } from '@chakra-ui/react';
import React from 'react';


const DoneBtn = () => {
    const bgColor = useColorModeValue("brand.500", "tan.500");
    return (
        <>

            <Button background='white' variant='brand' color={bgColor}>
                Done
            </Button>
        </>
    );
};

export default DoneBtn;
