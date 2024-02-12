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
import Cookies from 'js-cookie';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login({ setLoggedIn }) {
  const [ show, setShow ] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleClick = () => setShow(!show);

  const handleLogin = async () => {
    try {
      const loginData = {
        username,
        password,
      };

      // Make an API request to authenticate the user and obtain a token
      const response = await api.post("/auth", loginData);

      // Extract the token from the response
      const { accessToken } = response.data;
      console.log(accessToken);

      // Store the token in a secure manner (e.g., in cookies)
      Cookies.set("accessToken", accessToken, { expires: 1 });

      // Set the setlogged in into true
      setLoggedIn(true);

      // Redirect or perform actions after successful login
      navigate("/");
      console.log("Login successful");
    } catch (error) {
      console.error("Login failed:", error.message); // Handle login failure
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
              placeholder='Username'
              background='#333333' 
              border='none'
              marginTop='40px'
              size='lg'
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputGroup>
            <Input 
              placeholder='Password' 
              background='#333333' 
              border='none'
              type={show ? 'text' : 'password'}
              size='lg'
              onChange={(e) => setPassword(e.target.value)}
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
            onClick={handleLogin}
          >
            Log in
          </Button>
        </VStack>
      </Box>
    </div>
  ) 
}
