import { ChakraProvider } from '@chakra-ui/react'
import Router from './routers'

function App() {
  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  )
}

export default App
