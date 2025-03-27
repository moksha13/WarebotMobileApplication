import { StyleSheet, TouchableOpacity, Text, View, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { customScale } from '../utils/CustomScale';
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from '../utils/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../api/apiUrls';
import HomeScreen from './HomeScreen';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
    const navigation = useNavigation(); 
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        user_type: 'viewer'
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        password: '',
    });

    const [AuthKey, setAuthKey] = useState('');
    const [loading, setLoading] = useState(true)

    const checkLoginStatus = async () => {
        try {
          const loginToken = await AsyncStorage.getItem('AuthToken');
          setAuthKey(loginToken); // Set the token (or null if not found)
        } catch (error) {
          console.error("Error checking login status:", error);
        } finally {
          setLoading(false); // Set loading to false once the token is fetched
        }
      };

  useEffect(()=>{
    checkLoginStatus()
  },[])

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: '',
        }));
    };

    const validateInputs = () => {
        const errors = {};

        if (formData.password.length === 0) {
            errors.password = 'Password is required';
        }

        if (formData.name.length === 0) {
            errors.name = 'Username is required';
        }

        setErrors(errors);
        return errors;
    };

    const SubmitLoginApi = async () => {
        console.log(";lll")
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: formData.name,
                password: formData.password,
                user_type: formData.user_type
            })
        };
        try {
            console.log("00000000000")
            const response = await fetch(`${baseURL}auth/login_token`, requestOptions);
            const data = await response.json();
            console.log(response,data,"oooo////")
            if (!response.ok) {
                setErrors({ password: data.detail });
            } else {
                console.log(data,"data=====")
                await AsyncStorage.setItem('AuthToken', data?.access_token);
                await AsyncStorage.setItem('user_type', data.user_type);
                await AsyncStorage.setItem('OwnerId', data.user_id);
                await AsyncStorage.setItem('loginData', JSON.stringify(data));
                navigation.navigate('HomeStack', {
                    screen: 'HomeScreen', 
                  });
            }
        } catch (error) {
            console.error('Error occurred during login request:', error);
        }
    };

    const handleOnSubmit = (evt) => {
        evt.preventDefault();

        const errors = validateInputs();

        if (Object.keys(errors).length === 0) {
            SubmitLoginApi();
        } else {
            console.log(errors);
        }
    };

    console.log(AuthKey,"AuthKey")

    if (loading) {
        // Show loader until AuthKey is fetched
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ marginTop: 20 }}>Loading...</Text>
          </View>
        );
      }
    if(AuthKey){
        return <HomeScreen/>
    }

    return (
            <View style={styles.container}>
            <Text style={styles.headingText}>Login</Text>
            <Text style={styles.description}>Please login to get started</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 5,
                        backgroundColor: formData.user_type === 'owner' ? '#489f72' : 'white',
                        borderWidth: formData.user_type !== 'owner' ? 1 : 0,
                        borderColor: '#489f72',
                    }}
                    onPress={() => setFormData({ ...formData, user_type: 'owner' })}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: formData.user_type === 'owner' ? 'white' : 'black',
                        }}
                    >
                        Owner
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 5,
                        backgroundColor: formData.user_type === 'owner' ? 'white' : '#489f72',
                        borderWidth: 1,
                        borderColor: '#489f72',
                    }}
                    onPress={() => setFormData({ ...formData, user_type: 'viewer' })}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: formData.user_type !== 'owner' ? 'white' : 'black',
                        }}
                    >
                        Viewer
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>USERNAME</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter your name"
                        placeholderTextColor="#B0B0B0"
                        value={formData.name}
                        onChangeText={(value) => handleInputChange('name', value)}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                </View>

                <View style={styles.labelContainer}>
                    <Text style={styles.label}>PASSWORD</Text>
                    <View style={[styles.inputField, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor="#B0B0B0"
                            value={formData.password}
                            onChangeText={(value) => handleInputChange('password', value)}
                            secureTextEntry={!passwordVisible}
                        />
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Icon
                                name={passwordVisible ? 'eye' : 'eye-slash'}
                                size={20}
                                color="#B0B0B0"
                                style={{ left: -25 }}
                            />
                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleOnSubmit}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: customScale(10) }}>
                    <Text style={[styles.checkedText, { color: '#646982' }]}>Do you have an account?</Text>
                    <TouchableOpacity onPress={() => console.log("iam clicked")}>
                        <Text style={[styles.forgotText, { marginLeft: 4 }]}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
