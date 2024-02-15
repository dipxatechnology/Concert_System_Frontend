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
import { useState } from 'react';
import api from '../../api/api';

function ContactUs() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFeedback = async () => {
    try {
      const feedbackData = {
        username,
        email,
        message,
      }

      await api.post("/feedbacks", feedbackData)

      // event.preventDefault;
    } catch (error) {
      console.error("feedback error: ", error.message);
    }
  };

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
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input 
            placeholder='Email address'
            background='#333333' 
            border='none'
            size='lg'
            flex='1'
            onChange={(e) => setEmail(e.target.value)}
          />
        </HStack>
          <Textarea
            placeholder='Your message here'
            background='#333333' 
            border='none'
            marginTop='5px'
            size='lg'
            height='180px'
            onChange={(e) => setMessage(e.target.value)}
          />
        <Button  
          bg='brand.100' 
          width='100%' 
          marginTop='30px'
          _hover={{ bg: 'brand.200' }}
          fontWeight='bold'
          onClick={() => {
            handleFeedback();
            
          }}
        >
          Send Message {<ArrowForwardIcon boxSize={6} paddingLeft='10px' paddingTop='4px'/>}
        </Button>
      </VStack>
    </Box>
  </div>
  )
}

export default ContactUs;
