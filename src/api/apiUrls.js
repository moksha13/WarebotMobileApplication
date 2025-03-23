export const baseURL = `http://warebotapi-LB-1440935854.ap-south-1.elb.amazonaws.com/`;
export const liveURL = `https://script.google.com/macros/s/AKfycbylXB05vFfOBHhKHjnqejd0xfU2k1QbtOWaar9y8A6hGAiWSlK3g3qcuHB0n7Iz5z6Xkw/exec`
import AsyncStorage from "@react-native-async-storage/async-storage";
export function AuthToken() {
  const token = AsyncStorage.getItem("AuthToken");
  if (!token) {
    console.error("Authentication token is missing.");
    return;
  }

  return token
}