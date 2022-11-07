import * as React from 'react'
import { Box, Image, Input,Pressable } from "native-base";
import { Text } from "react-native";
import LoginIcon from "../../assets/LoginIcon.png";
import Buttons from "../../components/Buttons";
import { API } from '../../config/api';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Register({navigation}) {
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    password: '',
  });


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
    
        const response = await API.post('/auth/register', body, config);
        console.log(response);
        
        if (response) {
            await AsyncStorage.setItem('token', response.data.token);
        }
            
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
            console.log(value);
            navigation.navigate("Login")
        }
            
     } catch (error) {
        console.log(error);
        alert(error.response.data.message);
    }
};
  console.log(form);
  return (
        <Box>
          <Box>
            <Box d alignItems="center">
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
                onChangeText={(value) => handleOnChange('email', value)}
                value={form.email}
              />
                <Input
                mt={4}
                size="2xl"
                color='black'
                borderColor="gray.500"
                borderWidth={1}
                borderRadius="8"
                p={3}
                placeholder="Name"
                onChangeText={(value) => handleOnChange('firstName', value)}
                value={form.firstName}
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
                onChangeText={(value) => handleOnChange('password', value)}
                value={form.password}
              />
              
            </Box>
          <Buttons text="Register" onPress={handleOnPress} />
          <Text style={{marginHorizontal:'auto', marginTop:15, fontSize:20 }}>Joined Us Before? 
          <Pressable ><Text onPress={() => navigation.navigate("Login")} style={{fontWeight:'bold', color:'red', fontSize:22}} > Login</Text></Pressable>
          </Text>
          </Box>
        </Box>
      );
    }
export default Register