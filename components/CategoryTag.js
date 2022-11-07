import { Box, Text } from 'native-base'
import React from 'react'

export const Study = () => {
  return (
<Box w='50px' h='20px' bg='#81C8FF'  rounded='5'>
    <Text fontSize='10px' m='auto' fontWeight='800' color='white' textAlign='center' >Study</Text>
</Box>
    )
}


export const HomeWork = () => {
    return (
  <Box w='75px' h='20px' bg='#FF8181'  rounded='5'>
      <Text fontSize='10px' m='auto' fontWeight='800' color='white' textAlign='center' >Home Work</Text>
  </Box>
      )
  }


  export const Workout = () => {
    return (
  <Box w='59px' h='20px' bg='#FFB681'  rounded='5'>
      <Text fontSize='10px' m='auto' fontWeight='800' color='white' textAlign='center' >Workout</Text>
  </Box>
      )
  }
