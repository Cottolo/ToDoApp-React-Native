import {  Box, FlatList, Heading, Input,Text } from 'native-base'
import React from 'react'
import { Study, HomeWork, Workout } from '../../components/CategoryTag'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Buttons from '../../components/Buttons'
import { useState } from 'react';
import { API, setAuthToken } from '../../config/api';
import { useEffect } from 'react';

function AddCategory() {

  const [form, setForm] = useState({ categoryName: "" });
  const [dataCategory, setdataCategory] = useState()

  const handleOnChange = (name, value) => {
      setForm({
          [name]: value,
      })
  }

  const handleOnSubmit = async () => {
      try {
          const token = await AsyncStorage.getItem('token');

          if (token === null) {
              navigation.navigate("Login");
          } else {
            setAuthToken(token)
          }
          const config = {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + token
              },
          };

          const body = JSON.stringify(form);

          const response = await API.post("/CATEGORY", body, config)
          console.log(response);
          alert("insert category berhasil")
          setForm(response.data)
          getCategory()

      } catch (error) {
          console.log(error);
      }
  }

  const getCategory = async () => {
      try {
          const token = await AsyncStorage.getItem('token');
          const user_id = await AsyncStorage.getItem('user_id');
          if (token === null) {
              navigation.navigate("Login")
          }else{
            setAuthToken(token)
          }
          // console.log(token);
          const config = {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + token
              },
          };
          const response = await API.get('/CATEGORY', config);
          setdataCategory(response.data)
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
      getCategory()
  }, [])

  const _dataCategoryRender = ({ item }) => {
      return (
          <Box p={2} bg={"red.500"} color={"white"} rounded={10} minWidth={70} marginRight={3} marginBottom={3} >
              <Text bold style={{ color: "white", fontWeight:'bold', textAlign:'center' }}>
                  {item.categoryName}</Text>
          </Box>
      );
  };

  // console.log(form);
  console.log(dataCategory);

  return (
    <Box >

    <Box mx='5'>
    <Heading my={5} style={{fontWeight:'bold'}} >Add Category</Heading>
    <Input
                size="xl"
                color='black'
                borderColor="gray.500"
                borderWidth={1}
                borderRadius="8"
                placeholder="Name"
                mb={3}
                p='3'
                onChangeText={(value) => handleOnChange('categoryName', value)}
                value={form.categoryName}
                />
    </Box>

    <Buttons text='Add Category' onPress={handleOnSubmit} />

    <Heading mt='20' style={{fontWeight:'bold'}} mx={5} Bold>List Category</Heading>

    <Box mx={5} mt='5'  flexDirection='row'>
    <FlatList
                    numColumns={3}
                    data={dataCategory}
                    renderItem={_dataCategoryRender}
                    keyExtractor={(item) => item.id}
                />
    </ Box>
  
    </Box>
  )
}

export default AddCategory