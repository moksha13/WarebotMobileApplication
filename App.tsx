// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import HomeScreen from './src/screens/HomeScreen';
// import LiveDataScreen from './src/screens/LiveDataScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
// import SignupScreen from './src/screens/SignupScreen';

// // Create stack navigators
// const Stack = createStackNavigator();
// const LoginStack = createStackNavigator();
// const HomeStack = createStackNavigator();

// // Define Login Flow Stack (for Signup/Login screens)
// const LoginFlow = () => (
//   <LoginStack.Navigator screenOptions={{ headerShown: false }}>
//     <LoginStack.Screen name="SignupScreen" component={SignupScreen} />
//   </LoginStack.Navigator>
// );

// // Define Home Flow Stack (after user is authenticated)
// const HomeFlow = () => (
//   <HomeStack.Navigator screenOptions={{ headerShown: false }}>
//     <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
//     <HomeStack.Screen name="LiveDataScreen" component={LiveDataScreen} />
//     <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} />
//   </HomeStack.Navigator>
// );

// export default function App() {
//   const [authKey, setAuthKey] = useState('');

//   // Check if user is logged in by fetching token from AsyncStorage
//   const checkLoginStatus = async () => {
//     try {
//       const loginToken = await AsyncStorage.getItem('AuthToken');
//       setAuthKey(loginToken); // Set the auth key if token exists
//     } catch (error) {
//       console.error("Error checking login status:", error);
//     }
//   };

//   useEffect(() => {
//     checkLoginStatus();
//   }, []); // Removed dependency on authKey to avoid unnecessary re-triggering

//   console.log(authKey?.length, "ppppppppppppp");

//   return (
//     <NavigationContainer>
//       {authKey?.length > 0 ? <HomeFlow /> : <LoginFlow />}
//       {/* <HomeFlow /> */}
//     </NavigationContainer>
//   );
// }
import React, { useState,useEffect } from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LiveDataScreen from './src/screens/LiveDataScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SignupScreen from './src/screens/SignupScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {
  const [AuthKey, setAuthKey] = useState('');

  const checkLoginStatus = async () => {
    try {
      const loginToken:any = await AsyncStorage.getItem('AuthToken');
      setAuthKey(loginToken);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  useEffect(()=>{
    checkLoginStatus()
  },[AuthKey])

  console.log(AuthKey?.length,"ppppppppppppp")
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={AuthKey?.length===0||undefined||null?"SignupScreen":"HomeScreen"} screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LiveDataScreen" component={LiveDataScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// import React, { useState,useEffect } from 'react';
// import { View, Text, Button, StatusBar } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import HomeScreen from './src/screens/HomeScreen';
// import LiveDataScreen from './src/screens/LiveDataScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
// import SignupScreen from './src/screens/SignupScreen';

// const Stack = createStackNavigator();
// const LoginStack = createStackNavigator();
// const HomeStack = createStackNavigator();

// export default function App() {
//   const [AuthKey, setAuthKey] = useState('');

//   const LoginStackScreen = () => {
//     return (
//       <LoginStack.Navigator
//         screenOptions={{
//           animation: "slide_from_right",
//           headerTitleAlign: "center",
//           headerBackTitle: "",
//         }}
//       >
//         <LoginStack.Screen
//           name="SignupScreen"
//           component={SignupScreen}
//           options={{ headerShown: false }}
//         />
//       </LoginStack.Navigator>
//     );
//   };

//   const HomeStackScreen = () => {
//     return (
//       <HomeStack.Navigator
//         screenOptions={{
//           animation: "slide_from_right",
//           headerTitleAlign: "center",
//           headerBackTitle: "",
//         }}
//       >
//         <HomeStack.Screen
//           name="HomeScreen"
//           component={HomeScreen}
//           options={{ headerShown: false }}
//         />
//         <HomeStack.Screen
//           name="LiveDataScreen"
//           component={LiveDataScreen}
//           options={{ headerShown: false }}
//         />
//         <HomeStack.Screen
//           name="ProfileScreen"
//           component={ProfileScreen}
//           options={{ headerShown: false }}
//         />
//       </HomeStack.Navigator>
//     );
//   };

//   const checkLoginStatus = async () => {
//     try {
//       const loginToken:any = await AsyncStorage.getItem('AuthToken');
//       setAuthKey(loginToken);
//     } catch (error) {
//       console.error("Error checking login status:", error);
//     }
//   };

//   useEffect(()=>{
//     checkLoginStatus()
//   },[AuthKey])

//   console.log(AuthKey?.length,"ppppppppppppp")
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={AuthKey?.length===0||undefined||null?"Home":"Signup"} screenOptions={{
//         headerShown: false,
//       }}>
//         <Stack.Screen
//           name={AuthKey?.length===0||undefined||null?"Signup":'Home'}
//           component={AuthKey?.length>0?HomeStackScreen:LoginStackScreen}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
