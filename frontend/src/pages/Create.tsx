import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CreatePost = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = async () => {
    try {
      const token = localStorage.getItem('token'); // Fetch the JWT token from local storage

      const response = await axios.post(
        'http://localhost:8000/create/',
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      console.log('Post created:', response.data);
      setTitle('');
      setContent('');
      navigate('/');
    } catch (error) {
      console.error('Post creation error:', error);
    }
  };

  return (
    <>
      <Header/>
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
                <FormLabel>Título</FormLabel>
                <Input
                  type="text"
                  placeholder="Digite o título do post"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Post</FormLabel>
                <Input
                  type="text"
                  placeholder="Digite o conteúdo do post"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </FormControl>
              <Button colorScheme="blue" onClick={handleCreatePost}>
                Criar post
              </Button>
            </Stack>
          </Box>
        </VStack>
      </Box>
    </>
    
  );
};

export default CreatePost;
