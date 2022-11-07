import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import React from "react";
import Home from "./src/screens/home";
import ListTodo from "./src/screens/ListTodo";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import { useState } from "react";
import AddCategory from "./src/screens/AddCategory";
import AddTodo from "./src/screens/AddTodo";
import DetailList from "./src/screens/DetailList";

const stack = createNativeStackNavigator();
const Tab= createBottomTabNavigator();

export const myTab = ()=>{
  return(
    <Tab.Navigator 
    initialRouteName="Home"
    screenOptions={({route}) => ({
      headerMode: '',
      headerTintColor: "",
      headerStyle: {backgroundColor: ""},
      tabBarIcon: ({focused, color, size}) => {
        let iconName

        if(route.name === "List Todo"){
          iconName = focused ? "list" : "list-outline"
        } else if(route.name === "Add Category"){
          iconName = focused ? "grid" : "grid-outline"
        } else if(route.name === "Add Todo"){
          iconName = focused ? "add-circle" : "add-circle-outline"
        }

        return <Ionicons name={iconName} size={20} color="orange" />
      },
      tabBarActiveTintColor: "red",
      tabBarInactiveTintColor: "blue"

    })}
    >
    <Tab.Screen name="List Todo" component={ListTodo} 
    options={{
        headerShown :false
    }}/>
    <Tab.Screen name="Add Todo" component={AddTodo} 
    options={{
      headerShown : false
    }}/>
    <Tab.Screen name="Add Category" component={AddCategory} 
    options={{
      headerShown : false
    }}/>
    </Tab.Navigator> 
    )
}

function Container() {
  const [isLogin,setIsLogin] = useState(true)
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Home" 
        component={Home}
        options={{
          headerShown : false
        }}
        />
            
        <stack.Screen name="Login" 
        component={Login}
        options={{
          headerShown : false
        }}
        />
       
        <stack.Screen name="Register"
        component={Register}
        options={{
          headerShown : false
        }}
        />

        <stack.Screen name="MyTab"
        component={myTab}
        options={{
          headerShown : false
        }}/>

        <stack.Screen
          name="Detail List"
          component={DetailList}
          options={{
          }}
        />

      </stack.Navigator> 
    </NavigationContainer>
  );
}

export default Container;
