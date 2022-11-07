import { Box, Flex, Pressable, Text } from 'native-base';

function ButtonRegis({text,onPress}) {
  return <Box alignItems="center">
      <Pressable w="90%" textAlign='center'
      onPress={onPress}>
        {({
        isHovered,
        isFocused,
        isPressed
      }) => {
        return <Box bg={isPressed ? "#888888" : isHovered ? "#888888" : "#999999" } style={{
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

export default ButtonRegis