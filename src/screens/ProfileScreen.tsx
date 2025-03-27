import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
// import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { customScale } from "../utils/CustomScale";
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await AsyncStorage.getItem("loginUserDetails");
        if (userData) {
          setUser(JSON.parse(userData)); // Parse and set user data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const formatDob = (dob) => {
    if (!dob) return "N/A";
    const date = new Date(dob);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Clears all AsyncStorage data
      navigation.navigate("SignupStack",{screen:"SignupScreen"});
      console.log("User logged out and AsyncStorage cleared");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }
  console.log(user?.image, "user.image");
  return (
    <SafeAreaView style={styles.container}>
      {/* <LinearGradient colors={["#fff", "#2c3e50"]} style={styles.gradient}> */}
        <TouchableOpacity style={styles.logoutIcon} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.profileHeader}>
            {user.image && user.image !== "string" ? (
              <Image
                source={{
                  uri: user.image,
                }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxKkRTfVYnEoRFxb__kU8dINGVTI-T2Sj01i-Jc8-wOqP-wibTPwd6Jbl-4LXO_BVmeT8&usqp=CAU",
                }}
                style={styles.profileImage}
              />
            )}
            <Text style={styles.userName}>{user.name || "N/A"}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Username</Text>
              <Text style={styles.infoText}>{user.username || "N/A"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.infoText}>{user.email || "N/A"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.infoText}>{user.phone || "N/A"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Date of Birth</Text>
              <Text style={styles.infoText}>{formatDob(user.dob)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.infoText}>{user.address || "N/A"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>User Type</Text>
              <Text style={styles.infoText}>{user.user_type || "N/A"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Sex</Text>
              <Text style={styles.infoText}>{user.sex || "N/A"}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    backgroundColor: "#fff",
  },
  gradient: {
    flex: 1,
    paddingTop: customScale(20),
    paddingBottom: customScale(20),
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: customScale(2),
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: customScale(10),
  },
  profileImage: {
    width: customScale(100),
    height: customScale(100),
    borderRadius: customScale(50),
    borderWidth: 5,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  userName: {
    fontSize: customScale(20),
    fontWeight: "bold",
    color: "#444",
    marginTop: customScale(5),
  },
  infoContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: customScale(12),
    paddingHorizontal: customScale(20),
    paddingVertical: customScale(10),
    elevation: 5,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  infoItem: {
    marginBottom: customScale(10),
  },
  label: {
    fontSize: customScale(14),
    color: "#888",
  },
  infoText: {
    fontSize: customScale(16),
    fontWeight: "bold",
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#489f72",
    paddingVertical: customScale(10),
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
  },
  logoutIcon: {
    position: "absolute",
    top: customScale(20),
    right: customScale(20),
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 50,
    padding: 8,
    marginTop: customScale(10),
  },
});

export default ProfileScreen;

// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient'; // Install expo-linear-gradient if using Expo
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ProfileScreen = () => {
//   const [user, setUser]= useState('')

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const useData = await AsyncStorage.getItem("loginUserDetails");
//         if (useData) {
//           setUser(JSON.parse(useData)); // Parse and set warehouse data
//         }

//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     getData();
//   }, []);

// console.log(user,"useruseruser")
//   const handleLogout = () => {
//     console.log("User logged out");
//   };

//    // const user = {
//   //   name: "John Doe",
//   //   email: "johndoe@example.com",
//   //   phone: "+1234567890",
//   //   image: "https://randomuser.me/api/portraits/men/1.jpg", // Replace with dynamic image URL if needed
//   // };

//   // {"account_active": true,
//   //   "address": "string",
//   //   "admin_id": 1,
//   //    "created_at": "2024-08-18T12:26:49.491270",
//   //    "dob": "2024-08-18T12:24:44.195Z",
//   //    "email": "test@gmail.com",
//   //    "hashed_password": "$2b$12$sCCFdXAyXz7LXNY2l.VAdO8Y9m2nxO0V2HIuOG52aFiswF2S.7eSy",
//   //    "id": 1, "image": "string",
//   //    "name": "rishitha",
//   //    "phone": "string",
//   //    "sex": "male",
//   //     "subscription": false,
//   //     "total_devices": null,
//   //     "total_viewers": null,
//   //     "user_id": "O08-18-511d3a826e",
//   //      "user_type": "owner",
//   //       "username": "test123"}

//   return (
//     <SafeAreaView style={styles.container}>
//       <LinearGradient
//         colors={['#1e2a49', '#2c3e50']}
//         style={styles.gradient}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           <View style={styles.profileHeader}>
//             <Image source={{ uri: user.image }} style={styles.profileImage} />
//             <Text style={styles.userName}>{user.name}</Text>
//           </View>
//           <View style={styles.infoContainer}>
//           <View style={styles.infoItem}>
//               <Text style={styles.label}>Username</Text>
//               <Text style={styles.infoText}>{user.username}</Text>
//             </View>

//             <View style={styles.infoItem}>
//               <Text style={styles.label}>Email</Text>
//               <Text style={styles.infoText}>{user.email}</Text>
//             </View>

//             <View style={styles.infoItem}>
//               <Text style={styles.label}>Phone</Text>
//               <Text style={styles.infoText}>{user.phone}</Text>
//             </View>
//           </View>
//           <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//             <Text style={styles.logoutButtonText}>Logout</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   gradient: {
//     flex: 1,
//     paddingTop: 50,
//     paddingBottom: 50,
//   },
//   scrollContent: {
//     alignItems: 'center',
//     paddingBottom: 20,
//   },
//   profileHeader: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   profileImage: {
//     width: 130,
//     height: 130,
//     borderRadius: 65,
//     borderWidth: 5,
//     borderColor: '#fff',
//     marginBottom: 15,
//     backgroundColor: '#fff',
//   },
//   userName: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginTop: 10,
//   },
//   infoContainer: {
//     backgroundColor: '#fff',
//     width: '90%',
//     borderRadius: 15,
//     padding: 20,
//     elevation: 5,
//     marginBottom: 30,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },
//   },
//   infoItem: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     color: '#888',
//   },
//   infoText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   logoutButton: {
//     backgroundColor: '#e74c3c',
//     paddingVertical: 14,
//     width: '80%',
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 30,
//   },
//   logoutButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default ProfileScreen
