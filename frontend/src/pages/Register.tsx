import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  VStack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/register/', {
        username,
        password,
      });
      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/login');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'An error occurred during registration.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Registration error:', error);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="center">
        <Box
          w={{ base: '100%', sm: '80%', md: '60%', lg: '40%' }}
          borderWidth={1}
          rounded="lg"
          p={6}
          shadow="md"
        >
          <Stack spacing={6}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="blue" onClick={handleRegister}>
              Register
            </Button>
            <Box>
              Já possui uma conta?{' '}
              <Link to="/login" color="blue.500">
                Entrar
              </Link>
            </Box>
          </Stack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Register;
