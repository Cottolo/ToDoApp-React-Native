import { Box, Flex, Pressable, Text } from 'native-base';

function Buttons({text,onPress}) {
  return <Box alignItems="center">
      <Pressable
      onPress={onPress}
      w="90%" textAlign='center'>
        {({
        isHovered,
        isFocused,
        isPressed
      }) => {
        return <Box bg={isPressed ? "#FF7777" : isHovered ? "#FF7777" : "#FF5555" } style={{
          transform: [{
            scale: isPressed ? 0.9 : 1
          }]
        }} pb='1' rounded="8" borderWidth="1" borderColor="coolGray.300">
              
              <Flex>
                {isFocused ? <Text mt="2" fontSize='3xl' Bold color="white" textAlign='center'>
                    {text}
                  </Text> : <Text mt="2" fontSize='3xl' Bold color="white">
                    {text}
                  </Text>}
              </Flex>  
            </Box>;
      }}
      </Pressable>
    </Box>;
}

export default Buttons