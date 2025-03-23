// Correct default export
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../api/apiUrls";

export const SyncDataFunction = async () => {
  // await AsyncStorage.setItem('user_type', JSON.stringify('viewer'));
  // await AsyncStorage.setItem('devices', JSON.stringify(viewerData.devices));
  // await AsyncStorage.setItem('inventory', JSON.stringify(viewerData.inventory_items));
  // await AsyncStorage.setItem('loginUserDetails', JSON.stringify(viewerData.user));
  //use above code for viewer incase u want to work on viewer and below for owner it will automatically work if api works
  const user_type = await AsyncStorage.getItem('user_type');
  const ownerId = await AsyncStorage.getItem('OwnerId');
  let token = await AsyncStorage.getItem('AuthToken');
  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
console.log("iam called")
  try {
    const response =
      user_type === 'owner'
        ? await fetch(`${baseURL}owner/dashboard/O/${ownerId}`, requestOptions)
        : await fetch(`${baseURL}owner/dashboard/V/${ownerId}`, requestOptions);

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    // console.log("0000000000000", JSON.stringify(data))
    if (user_type === 'owner') {
      await AsyncStorage.setItem('warehouses', JSON.stringify(data.warehouses));
      await AsyncStorage.setItem('requestsInventory', JSON.stringify(data.requests));
      await AsyncStorage.setItem('totalRequests', JSON.stringify(data.total_requests));
      await AsyncStorage.setItem('viewers', JSON.stringify(data.viewers))
    }

    await AsyncStorage.setItem('devices', JSON.stringify(data.devices));
    await AsyncStorage.setItem('inventory', JSON.stringify(data.inventory_items));
    await AsyncStorage.setItem('loginUserDetails', JSON.stringify(data.user));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

