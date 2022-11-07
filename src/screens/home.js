import React from "react";
import { Box, Image} from 'native-base';
import { Text } from "react-native";
import Buttons from "../../components/Buttons";
import ButtonR from "../../components/ButtonRegis";
import HomeImage from "../../assets/homeimage.png";
import Waystodo from "../../assets/ways to do.png";

function Home({navigation}) {
  return (
    <Box>
      <Box alignItems="center" >
      <Image 
      w='350'
      h='350'
      source={HomeImage}/>
      </Box>
      <Box  alignItems="center" >
      <Image 
      w='300'
      h='55'
      source={Waystodo}/>
      </Box>
      <Box alignItems="center" my="4">
        <Text style={{textAlign: 'center', marginHorizontal:20 }} >
        Write your activity and finish your activity. 
        Fast, Simple and Easy to Use
        </Text> 
      </Box>
      <Box>
        <Buttons onPress={() => navigation.navigate("Login")} text="login" />
      </Box>
      <Box mt={3}>
        <ButtonR onPress={()=> navigation.navigate("Register")} text="Register" />
      </Box>
    </Box>
  );
}

export default Home;
