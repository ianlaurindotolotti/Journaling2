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
import { useNavigate, useParams} from 'react-router-dom';
import Header from '../components/Header';

const Edit = () => {
  const navigate = useNavigate()
  const { postId } = useParams()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = async () => {
    try {
      const token = localStorage.getItem('token')
      console.log(postId)

      const response = await axios.put(
        `http://localhost:8000/edit/${postId}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
                Editar Post
              </Button>
            </Stack>
          </Box>
        </VStack>
      </Box>
    </>
    
  );
};

export default Edit