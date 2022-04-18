import { Button, useColorModeValue } from '@chakra-ui/react';
import React from 'react';


const NextBtn = () => {
    const bgColor = useColorModeValue("brand.500", "tan.500");
    return (
        <>

            <Button background='white' variant='brand' color={bgColor}>
                Next
            </Button>
        </>
    );
};

export default NextBtn;
