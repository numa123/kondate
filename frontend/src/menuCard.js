import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

function menuCard(props) {
  return (
    <Box>
      <Flex align={'center'}>
        {props.name}
        {props.genre}
        {props.memo}
      </Flex>
    </Box>
  );
}

export default menuCard;
