import { 
  Text, 
  Box, 
  VStack, 
  Input, 
  Button,
  HStack,
  Textarea,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import './contact.css';

function ContactUs() {
  return(
    <div 
      style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
    <Box className='contact-style' >
      <VStack alignItems='flex-start'>
        <Text fontSize='4xl' as='b' isTruncated>
          Got anything for us? Leave a
          <Box as='span' color='#D45161' paddingLeft={'10px'}>message!</Box>
        </Text>
        <Text fontSize='lg' color='grey' marginTop='5px'>
          Or contact us via Customer Support.
        </Text>
        <HStack marginTop='30px' align='stretch' spacing={4} width='100%'>
          <Input 
            placeholder='Full name'
            background='#333333' 
            border='none'
            size='lg'
            flex='1'
          />
          <Input 
            placeholder='Email address'
            background='#333333' 
            border='none'
            size='lg'
            flex='1'
          />
        </HStack>
          <Textarea
            placeholder='Your message here'
            background='#333333' 
            border='none'
            marginTop='5px'
            size='lg'
            height='180px'
          />
        <Button  
          bg='brand.100' 
          width='100%' 
          marginTop='30px'
          _hover={{ bg: 'brand.200' }}
          fontWeight='bold'
        >
          Send Message {<ArrowForwardIcon boxSize={6} paddingLeft='10px' paddingTop='4px'/>}
        </Button>
      </VStack>
    </Box>
  </div>
  )
}

export default ContactUs;
