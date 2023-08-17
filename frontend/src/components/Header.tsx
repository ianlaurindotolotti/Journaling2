import React from 'react';
import {
  Card,
  Flex,
  CardHeader,
  Heading,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'; // Import Chakra UI components

import { HamburgerIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token')
    navigate('/login');
  };

  const handleCreate = () => {
    navigate('/create')
  }

  const sendHome = () => {
    navigate("/")
  }

  return (
    <Card>
      <Flex justifyContent='space-between' alignItems='center'>
        <CardHeader>
          <Heading size='md'>Suas anotações</Heading>
        </CardHeader>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            variant='outline'
            marginRight='3'
          />
          <MenuList>
            <MenuItem onClick={sendHome}>Home</MenuItem>
            <MenuItem onClick={handleCreate}>Criar</MenuItem>
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Card>
  );
}

export default Header;
