import React from "react";
import { Study, HomeWork, Workout } from "../../components/CategoryTag";
import {Pressable,Box,Image,CheckIcon,Icon,Input,Select,Heading,Text,FlatList} from "native-base";
import Profile from "../../assets/favicon.png";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import DoneIcon from "../../assets/done.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API, setAuthToken } from "../../config/api";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'

const Data = [
  {
    id: 1,
    title: "Study-Golang",
    description:
      "Learn Golang to improve fundamentals and familiarize with coding.",
  },
  {
    id: 2,
    title: "Study-HTML",
    description:
      "Learn HTML to improve fundamentals and familiarize with coding.",
  },
];


function ListTodo({ navigation }) {
  const [data, setData] = useState([]);
  
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      if (token === null) {
        navigation.navigate("Login");
      } else {
        setAuthToken(token)
      }
      
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token 
        },
    };
      
      const res = await API.get("/auth/user", config);
      console.log("ini res", res.data);
      setData(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };
// ========================================================================================

const [dataList,setdataList] = useState([])

const getListTodo = async() =>{
  try {
      const token = await AsyncStorage.getItem('token');
      const user_id = await AsyncStorage.getItem('user_id');
      
      if (token === null) {
          navigation.navigate("Login")
      }
      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token
          },
      };
      const response = await API.get(`/Lists?user_id=${user_id}`, config);
      setdataList(response.data)
  } catch (error) {
      console.log(error);
  }
}

//===========================================================================================

const [search, setSearch] = React.useState("");
console.log(search);
function handleChange(name,value,) {
  setSearch({
    ...search,
    [name]: value,}
  );
  srcbyName()
};

const srcbyName = async() =>{
  try {
      const token = await AsyncStorage.getItem('token');
      const user_id = await AsyncStorage.getItem('user_id');
      if (token === null) {
          navigation.navigate("Login")
      }
      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token
          },
      };
      const response = await API.get(`/Listss?name[$contains]=${search}`, config);
      setdataList(response.data)
  } catch (error) {
      console.log(error);
  }
}

console.log(data);

  return (
    <Box>
        <Box
        mx={5}
        style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Box>
          <Text style={{ fontSize: "35px", fontWeight: "bold" }}>
            Hi {data.firstName}
          </Text>
          <Text style={{ color: "red" }}>200 Lists</Text>
        </Box>
        <Box>
          <Image
            w={50}
            h="50"
            rounded={100}
            source={Profile}
            borderColor="red.500"
            borderWidth={3}
          ></Image>
        </Box>
      </Box>
      <Box>
        <Pressable>
          {({ isHovered, isFocused, isPressed }) => {
            return (
              <Box>
                <Input
                  placeholder="Search List..."
                  bg={isHovered ? "blue.200" :isFocused ? "blue.300" : ""}
                  color="black"
                  borderRadius="4"
                  px="1"
                  p={isHovered ? "4" :isFocused ? "4" : "3" }
                  mx="5"
                  mt="5"
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 1.1 : 1,
                      },
                    ],
                  }}
                  fontSize="14"
                  InputLeftElement={
                    <Icon
                      m="2"
                      ml="3"
                      size="6"
                      color="gray.400"
                      as={<MaterialIcons name="search" />}
                    />
                  }
                  InputRightElement={
                    <Icon
                      m="2"
                      mr="3"
                      size="6"
                      color="gray.400"
                      as={<MaterialIcons name="list" />}
                    />
                  }
                />
              </Box>
            );
          }}
        </Pressable>
      </Box>
      <Box flexDirection="row" justifyContent="space-evenly" mt={4} mx={3}>
        <Input
          placeholder="Choose Date"
          py={3}
          fontSize="12"
          InputLeftElement={
            <Icon
              ml="1"
              size="5"
              color="gray.400"
              as={<MaterialIcons name="date-range" />}
            />
          }
          color="black"
          my={1}
          marginRight={2}
          w="120"
          type="date"
        />

        <Select
          py={3}
          w="100"
          fontSize={12}
          size="xl"
          color="black"
          accessibilityLabel="Category"
          placeholder="Category"
          _selectedItem={{
            endIcon: <CheckIcon size={5} />,
          }}
          mt="1"
        >
          <Select.Item label="Study" value="Study" />
          <Select.Item label="Homework" value="Homework" />
          <Select.Item label="Workout" value="Workout" />
        </Select>

        <Select
          py={3}
          marginLeft={2}
          w="100"
          fontSize={12}
          size="xl"
          color="black"
          accessibilityLabel="Status"
          placeholder="Status"
          _selectedItem={{
            endIcon: <CheckIcon size={5} />,
          }}
          mt="1"
        >
          <Select.Item label="Done" value="Done" />
          <Select.Item label="ToDo" value="ToDO" />
          <Select.Item label="Doing" value="Doing" />
        </Select>
      </Box>

      <FlatList
        mx={5}
        data={Data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            mt={4}
            onPress={() => navigation.navigate("Detail List", { item })}
          >
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  px="3"
                  py="3"
                  bg={isPressed ? "#AAFFAA" : isHovered ? "#AAEFFF" : "#DAEFFF"}
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 1.1 : 1,
                      },
                    ],
                  }}
                  p={isHovered ? "2" : isHovered ? "2" : ""}
                  rounded="8"
                  borderWidth="1"
                  borderColor="coolGray.300"
                >
                  <Box w="75%">
                    <Text
                      fontSize="2xl"
                      style={{ fontWeight: "700" }}
                      strikeThrough
                    >
                      {item.title}
                    </Text>
                    <Text strikeThrough>{item.description}</Text>
                    <Box flexDirection="row" mt="5">
                      <Icon size="5" as={<MaterialIcons name="date-range" />} />
                      <Text color="gray.600">19 July 2022</Text>
                    </Box>
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
              );
            }}
          </Pressable>
        )}
      />
    </Box>
  );
}

export default ListTodo;
