import { Box, Icon, Image, Text } from "native-base";
import React from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Study } from "../../components/CategoryTag";
import DoneIcon from "../../assets/done.png";

function DetailList({route}) {
  console.log(route.params.item);
  return (
    <Box m={5}>
      <Box
        px="3"
        py="3"
        bg="#DAEFFF"
        rounded="8"
        borderWidth="1"
        borderColor="coolGray.300">
        <Box flexDirection="row"
        justifyContent="space-between"
        >
          <Box w="75%" justifyContent="center">
            <Text fontSize="2xl" style={{ fontWeight: "700" }}>
              {route.params.item.title}
            </Text>
          </Box>
          <Box my="2">
            <Study />
            <Box flexDirection="row" mt="5" justifyContent="center">
              <Box bg="#D9D9D9" w="30px" rounded="100%" h="30">
                <Image w="30" h="30" source={DoneIcon} />
              </Box>
            </Box>
          </Box>
        </Box>
        <Text>
          {route.params.item.description}
        </Text>
        <Box flexDirection="row" mt="5">
          <Icon size="5" mr={2} as={<MaterialIcons name="date-range" />} />
          <Text color="gray.600">19 July 2022</Text>
        </Box>
      </Box>
    </Box>
  );
}

export default DetailList;
