import { useState } from 'react';
import { 
  Text, 
  Box, 
  VStack, 
  Input, 
  InputGroup, 
  InputRightElement,
  Checkbox,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import './login.css';

export default function Login() {
  const [ show, setShow ] = useState(false);
  const handleClick = () => setShow(!show);
  return(
    <div 
      style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <Box className='login-style' >
        <VStack alignItems='flex-start'>
          <Text fontSize='5xl' as='b'>
            Welcome back!
          </Text>
          <Text fontSize='lg' color='grey' marginTop='5px'>
            Don't have an account?
            <Link to='/signup'>
              <Box as='span' color='#D45161' paddingLeft={'5px'}>Sign up</Box>
            </Link>.
          </Text>
            <Input 
              placeholder='Email address'
              background='#333333' 
              border='none'
              marginTop='40px'
              size='lg'
            />
            <InputGroup>
            <Input 
              placeholder='Password' 
              background='#333333' 
              border='none'
              type={show ? 'text' : 'password'}
              size='lg'
            />
            <InputRightElement>
            {show ? 
              <IconButton 
                icon={<ViewOffIcon color='white'/>} 
                onClick={handleClick}
                style={{ backgroundColor: 'transparent' }} 
              />
              : 
              <IconButton 
                icon={<ViewIcon color='white'/>} 
                onClick={handleClick}
                style={{ backgroundColor: 'transparent' }} 
              />
            }
            </InputRightElement>
          </InputGroup>
          <Checkbox 
            size='lg' 
            colorScheme='red' 
            color='grey' 
            marginTop='20px'
          >
            Remember me
          </Checkbox>
          <Button  
            bg='brand.100' 
            width='100%' 
            marginTop='20px'
            _hover={{ bg: 'brand.200' }}
            fontWeight='bold'
          >
            Log in
          </Button>
        </VStack>
      </Box>
    </div>
  ) 
}
