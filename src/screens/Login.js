import * as React from 'react'
import { Box, Center, Image, Input,Pressable } from "native-base";
import { Text } from "react-native";
import LoginIcon from '../../assets/LoginIcon.png';
import Buttons from "../../components/Buttons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { API } from '../../config/api';

function Login({navigation}) {
  const [form,setForm] = useState({
    email : '',
    password : ''
  })

  const [isLoading, setIsLoading] = useState(false);
    
  const handleOnChange = (name, value) => {
      setForm({
          ...form,
          [name]: value,
      });
  };

  const handleOnPress = async () => {
    try {
        const config = {
            headers: {
            'Content-type': 'application/json',
            },
        };
    
        const body = JSON.stringify(form);
        setIsLoading(true)
        const response = await API.post('/auth/login', body, config);
        // console.log(response);
        setIsLoading(false)           
        if (response) {
            await AsyncStorage.setItem('token', response.data.token);
        }
        
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
            // console.log(value);
            navigation.navigate("MyTab")
        }
            
    } catch (error) {
        console.log(error);
        alert(error.response.data.message);
        setIsLoading(false)           

    }
};

  return (
    <Box>
        {isLoading ? 
        <Center 
        style={{
          width:'100%',
          backgroundColor : '#0ffff0',
          margin :'auto',
          height : '100vh'
        }}
        >
        <Text 
        style={{   
        color: 'grey',
        fontSize: 50,
        fontWeight: '800',

        }}>Loading ...</Text>
        </Center>
        :
      <Box>
        <Box alignItems="center">
          <Image w="257" h="184" mb={5} source={LoginIcon}></Image>
        </Box>
      
        <Box w="90%" mx="auto" mb={4}>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>Login</Text>
          <Input
            mt={4}
            size="2xl"
            color='black'
            borderColor="gray.500"
            borderWidth={1}
            borderRadius="8"
            p={3}
            placeholder="Email"
            type='email'
            value={form.email}
            onChangeText={(value) => handleOnChange('email', value)}
          />
          <Input
            mt={4}
            size="2xl"
            color='black'
            borderColor="gray.500"
            borderWidth={1}
            borderRadius="8"
            p={3}
            placeholder="Password"
            type="password"
            value={form.password}
            onChangeText={(value) => handleOnChange('password', value)}
          />
          
        </Box>

      <Buttons onPress={handleOnPress} text="Login"  />
      
      <Text style={{marginHorizontal:'auto', marginTop:20, fontSize:20 }}>New User? 
      <Pressable ><Text onPress={() => navigation.navigate("Register")} style={{fontWeight:'bold', color:'red', fontSize:22}} > Register</Text></Pressable>
      </Text>
      </Box>
  }
    </Box>
  );
}

export default Login;
