import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Heading,
  Text,
  Box,
  Stack,
  StackDivider,
  Button,
} from '@chakra-ui/react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'

function Home() {
  const navigate = useNavigate()
  const access_token = localStorage.getItem('token');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/home/', {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = (id) => {
    axios.post(`http://localhost:8000/delete/${id}`)
    fetchData()
  }

  const sendEdit = (id) => {
    navigate(`edit/${id}`)
  }

 
  return (
    <>
      <Header/>
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            {data.map((item, index) => (
              <Box key={index}>
                <Heading size='xs' textTransform='uppercase'>
                  {item.title}
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {item.content}
                </Text>
                <Button size="sm" marginLeft={'2'} onClick={() => sendEdit(item.id)}>Editar</Button>
                <Button size="sm" onClick={() => handleDelete(item.id)}>Deletar</Button>
              </Box>

            ))}
          </Stack>
        </CardBody>
      </Card>
    </>
    
  );
}

export default Home;
