import {  Box, Button, CheckIcon, Heading, Icon, Input, Modal, Select, TextArea, View, } from 'native-base'
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Buttons from '../../components/Buttons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../config/api";
import axios from "axios";

import React from 'react'
import { useIsFocused } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';

function AddTodo() {
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState({ id: null });
  const [dataCategory, setdataCategory] = useState([]);
  const isFocused = useIsFocused();

  function handleChange(name, value) {
    setList({
      ...list,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token === null) {
        navigation.navigate("Login");
      }

      const response = await API.post("/list1", list, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      alert(`Berhasil!`);
    } catch (e) {
      console.log(e);
      alert("Gagal!");
    }
  };

  const getCategory = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("id");
      setList({
        userId,
      });

      if (token === null) {
        navigation.navigate("Login");
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      const response = await API.get(`/category?$lookup=*&userId=${userId}`, config);
      setdataCategory(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getCategory();
    }
  }, [isFocused]);

  return (
    < Box >
    <Box mx={5}>
    <Heading mb='5' style={{fontWeight: 'bold'}} >Add List</Heading>

    <Input
                size="xl"
                color='black'
                borderColor="gray.500"
                borderWidth={1}
                borderRadius="8"
                placeholder="Name"
                mb={3}
                mt={2}
                p='3'
                />

        <Select
          py={3}
          borderRadius="8"
          borderColor="gray.500"
          color='black'
          size="xl"
          placeholder='Category'
          accessibilityLabel="Category"
          _selectedItem={{
            endIcon: <CheckIcon size={5} />,
          }}
          >
          <Select.Item label="Study" value="Study" />
          <Select.Item label="Home Work" value="Home Work" />
          <Select.Item label="Workout" value="Workout" />
        </Select>

        <Input
                size="xl"
                mt={3}
                color='black'
                borderColor="gray.500"
                borderWidth={1}
                borderRadius="8"
                placeholder="Choose Date"
                mb={3}
                p='3'
                InputRightElement={
                  <Icon
                    mr="1"
                    size="5"
                    color="gray.400"
                    as={<MaterialIcons  name="date-range" />}
                  />
                }
                />
           <TextArea
                size="xl"
                type='text'
                color='black'
                borderColor="gray.500"
                borderWidth={1}
                borderRadius="8"
                placeholder="Description"
                mb='20'
                p='3'
                />

        </Box>
        <Buttons text='Add List' />

        {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Select Date</Modal.Header>
          <Modal.Body>
            <View>
              <Text fontSize={15}>
                {list.date ? list.date.toDateString() : "Select date"}
              </Text>
              <DatePicker
                value={list.date ? list.date : new Date()}
                onChange={(value) => handleChange("date", value)}
                format="yyyy-mm-dd"
                name="date"
              />
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal> */}
    </ Box>
  )
}

export default AddTodo