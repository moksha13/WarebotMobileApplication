import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
// import axios from "axios";
// import { Ionicons } from "@expo/vector-icons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { customScale } from '../utils/CustomScale';
import { useNavigation } from '@react-navigation/native';

const LiveDataScreen = () => {
  const navigation = useNavigation();
  // const [warehouse, setWarehouse] = useState(null);
  // const [devices, setDevices] = useState(null);
  // const [inventories, setInventories] = useState(null);
  // const [viewers, setViewers] = useState(null);
  // const [selectedDevice, setSelectedDevice] = useState(null);
  // const [selectedInventory, setSelectedInventory] = useState(null);
  // const [selectedViewers, setSelectedViewers] = useState(null);
  // const [botDataHistory, setBotDataHistory] = useState([]);
  // const [liveData, setLiveData] = useState({});
  const [loading, setLoading] = useState(true);
  const [scriptLoader, setScriptLoader] = useState(false);
  const [selectedWareHouse, SetSelectedWareHouse] = useState(null);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [devicesArr, setDevicesArr] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [inventoriesArr, setInventoriesArr] = useState([]);
  const [viewersArr, setViewersArr] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInventoriesExpanded, setIsInventoriesExpanded] = useState(false);
  const [botDataHistory, setBotDataHistory] = useState([]);
  const [userType, setUserType] = useState("");
  const [liveData, setLiveData] = useState({});

  const toggleInventoriesExpansion = () =>{
        setIsInventoriesExpanded(!isInventoriesExpanded)
      }

  const getDataOfOwner = async () => {
    try {
      console.log("Fetching data for owner...");
      let selectedWarehouseData = await AsyncStorage.getItem(
        "selectedWarehouse"
      );
      const devicesList = await AsyncStorage.getItem("devices");
      const inventoryList = await AsyncStorage.getItem("inventory");
      const viewersList = await AsyncStorage.getItem("viewers");
      if (selectedWarehouseData) {
        selectedWarehouseData = JSON.parse(selectedWarehouseData);
        SetSelectedWareHouse(selectedWarehouseData);
      }
      if (devicesList) {
        const JsonDevicesList = JSON.parse(devicesList);
        // console.log(JsonDevicesList,selectedDevice,"hihi")
        const filterDevicesList = JsonDevicesList?.filter(
          (item) => item.warehouse_id === selectedWarehouseData?.warehouse_id
        );
        setDevicesArr(filterDevicesList || []);
      }
      if (inventoryList) {
        const JsonInventoriesList = JSON.parse(inventoryList);
        const filterInventoriesList = JsonInventoriesList?.filter(
          (item) => item.warehouse_id === selectedWarehouseData?.warehouse_id
        );
        setInventoriesArr(filterInventoriesList || []);
      }
      if (viewersList) {
        const JsonvieweresList = JSON.parse(viewersList);
        setViewersArr(JsonvieweresList);
      }
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  };

  // console.log(inventoriesArr,"inventory_id")
  const getDataOfViewer = async () => {
    try {
      let selectedInventoriesData = await AsyncStorage.getItem(
        "selectedInventories"
      );
      const devicesList = await AsyncStorage.getItem("devices");
      let inventoryList = await AsyncStorage.getItem("inventory");
     
      if (selectedInventoriesData) {
        setSelectedInventory(JSON.parse(selectedInventoriesData));
      }
      if (devicesList) {
        const JsondevicesList = JSON.parse(devicesList);
        const JsonSelectedInventory = JSON.parse(selectedInventoriesData);
        // console.log(JsondevicesList,"jjjjjjjjjjjjjjjjj",JsonSelectedInventory, "devicesList");
        const filterDevice = JsondevicesList.filter(
          (item) => item.device_id === JsonSelectedInventory?.device_id
        );
        // console.log(filterDevice,"ppppppppp")

        setSelectedDevice(filterDevice[0]);

        setDevicesArr(JsondevicesList);
      }
      if (inventoryList) {
        setInventoriesArr(JSON.parse(inventoryList));
      }
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  };

  // console.log(selectedDevice,"llll")
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const storedUserType = await AsyncStorage.getItem("user_type");
        if (storedUserType) {
          setUserType(storedUserType);
        }
        if (storedUserType === "owner") {
          await getDataOfOwner();
        } else if (storedUserType === "viewer") {
          await getDataOfViewer();
        }
      } catch (error) {
        console.error("Error during synchronization or fetching:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // console.log(viewersArr,"lllllllllllll",inventoriesArr,"vvvvvvvvvvv")

  // useEffect(()=>{
  //   if(devicesArr){
  //     const filterDevice = devicesArr.map((item)=>item.device_id === selectedInventory?.device_id)
  //     setSelectedDevice(filterDevice)
  //   }
  // },[])

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       // Fetch the warehouse data
  //       const storedWarehouse = await AsyncStorage.getItem("selectedWarehouse");
  //       if (storedWarehouse) {
  //         setWarehouse(JSON.parse(storedWarehouse)); // Parse and set warehouse data
  //       }
  //       const selectedInventories = await AsyncStorage.getItem('selectedInventories')
  //       if (selectedInventories) {
  //         setSelectedInventory(JSON.parse(selectedInventories)); // Parse and set warehouse data
  //       }
  //       // Fetch devices and inventories data
  //       const storedDevices = await AsyncStorage.getItem("devices");
  //       const storedInventories = await AsyncStorage.getItem("inventory");
  //       const storedViewers = await AsyncStorage.getItem("viewers");
  //       let user_type =  await AsyncStorage.getItem('user_type');
  //       // console.log(storedViewers,'storedViewers',storedInventories)

  //       if (storedDevices) {
  //         const storedDevicesData = storedDevices ? JSON.parse(storedDevices) : [];
  //         if(user_type==='owner'){
  //           const filterData = storedDevicesData?.filter(
  //             (item) => item.warehouse_id === warehouse?.warehouse_id
  //           );
  //           setDevices(filterData || []);
  //         }else{
  //           const filterData = storedDevicesData?.filter(
  //             (item) => item.warehouse_id === selectedInventory?.warehouse_id
  //           );
  //           setDevices(filterData || []);
  //         }

  //       }
  //       if (storedInventories) {
  //        const inventoriesData =  JSON.parse(storedInventories) // Parse and set inventories data
  //         if(user_type==='owner'){
  //           const filterData = inventoriesData?.filter(
  //             (item) => item.warehouse_id === warehouse?.warehouse_id
  //           );
  //           setDevices(filterData || []);
  //         }else{
  //           console.log(inventoriesData,"inventoriesData")
  //           const filterData = inventoriesData?.filter(
  //             (item) => item.warehouse_id === selectedInventory?.warehouse_id
  //           );
  //           setInventories(filterData || []);
  //         }
  //       }
  //       if (user_type) {
  //         setUserType(user_type); // Parse the stored string into an array

  //       }

  //       if (storedViewers) {
  //         const viewerData = JSON.parse(storedViewers)
  //         const filterDataViewer = viewerData?.filter(
  //           (item) => item.warehouse_id === warehouse?.warehouse_id
  //         );
  //         setViewers(filterDataViewer || []);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   getData();
  // }, []);

  // const scriptData = async () => {
  //   if (!selectedDevice) return;
  //   setScriptLoader(true);
  //   console.log(selectedDevice.device_id, "selectedDevice.device_id");
  //   try {
  //     const response = await axios.get(
  //       `https://script.google.com/macros/s/AKfycbylXB05vFfOBHhKHjnqejd0xfU2k1QbtOWaar9y8A6hGAiWSlK3g3qcuHB0n7Iz5z6Xkw/exec`,
  //       {
  //         params: {
  //           bot_id: selectedDevice.device_id,
  //         },
  //       }
  //     );

  //     if (response.status !== 200) {
  //       setScriptLoader(false);
  //       throw new Error("Failed to fetch bot data");
  //     }
  //     console.log(
  //       response.data,
  //       response.status,
  //       selectedDevice.device_id,
  //       "response.status"
  //     );
  //     setScriptLoader(false);
  //     // Update bot data history with the new data point
  //     setBotDataHistory((prevData) => [
  //       ...prevData,
  //       { ...response.data.data, Time: new Date().toLocaleTimeString() }, // Add the current time to the data
  //     ]);
  //   } catch (error) {
  //     setScriptLoader(false);
  //     console.error("An error occurred:", error.message);
  //   } finally {
  //     setScriptLoader(false);
  //   }
  // };

  const scriptData = async () => {
    if (!selectedDevice) return;
    setScriptLoader(true);
    console.log(selectedDevice.device_id, "selectedDevice.device_id");
  
    try {
      const params = new URLSearchParams({
        bot_id: selectedDevice.device_id,
      }).toString();
  
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbylXB05vFfOBHhKHjnqejd0xfU2k1QbtOWaar9y8A6hGAiWSlK3g3qcuHB0n7Iz5z6Xkw/exec?${params}`
      );
  
      if (!response.ok) {
        setScriptLoader(false);
        throw new Error("Failed to fetch bot data");
      }
  
      const data = await response.json();
      console.log(data, response.status, selectedDevice.device_id, "response.status");
  
      // Update bot data history with the new data point, including timestamp
      setBotDataHistory((prevData) => [
        ...prevData,
        { ...data.data, Time: new Date().toLocaleTimeString() },
      ]);
    } catch (error) {
      console.error("An error occurred:", error.message);
    } finally {
      setScriptLoader(false);
    }
  };
  

  const handleDropDown = (event) => {
    const { value } = event.target;
    const selectedDeviceData = devices?.find(
      (item) => item?.bot_name === value
    );
    if (selectedDeviceData) {
      setSelectedDevice(selectedDeviceData);
    }
    setBotDataHistory([]);
  };

  useEffect(() => {
    if (!selectedDevice?.bot_name) return;
    scriptData();

    const intervalId = setInterval(() => {
      console.log("hiihihihi");
      scriptData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [selectedDevice?.bot_name]);

  useEffect(() => {
    let liveResponse = botDataHistory?.filter(
      (item) => item?.Bot_Id === selectedDevice?.device_id
    );
    setLiveData(liveResponse);
  }, [botDataHistory]);

  const Card = ({ title, val, max, min, bgColor }: any) => {
    return (
      <View style={[styles.card, { backgroundColor: bgColor }]}>
        <Text style={[styles.liveDataText]}>{title}</Text>
        <View style={styles.cardContainer}>
          <View style={{ width: "55%" }}>
            <Text
              style={[
                styles.liveDataText,
                {
                  textAlign: "right",
                  paddingTop: customScale(20),
                  fontSize: customScale(22),
                },
              ]}
            >
              {val}
            </Text>
          </View>
          <View style={styles.tempContainer}>
            <Text style={styles.liveDataText}>
              {max}
              <Text
                style={[styles.liveDataText, { fontSize: customScale(10) }]}
              >
                max
              </Text>
            </Text>
            <Text style={styles.liveDataText}>
              {min}
              <Text
                style={[styles.liveDataText, { fontSize: customScale(10) }]}
              >
                max
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  };
  
  console.log(selectedInventory,"selectedInventory")
  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (userType === "owner") {
      return (
        <>
          <Text
            style={[
              styles.text,
              {
                borderColor: "#ccc",
                borderWidth: 1,
                marginHorizontal: customScale(10),
                marginBottom: customScale(6),
                paddingVertical: customScale(6),
              },
            ]}
          >
            {selectedWareHouse?.Warehouse_name}
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: "#fff",
                width: "95%",
                margin: customScale(10),
                borderRadius: 0,
                borderColor: "#ccc",
                borderWidth: 1,
              },
            ]}
          >
            <Text
              style={{
                paddingHorizontal: customScale(10),
                paddingTop: customScale(10),
                fontSize: customScale(16),
              }}
            >
              Devices
            </Text>
            {devicesArr && (
              <Dropdown
                data={devicesArr}
                labelField="bot_name"
                valueField="device_id"
                value={selectedDevice}
                onChange={(item) => {
                  setSelectedDevice(item);
                }}
                style={[styles.dropdown, { marginBottom: customScale(0) }]}
                placeholder="Devices"
              />
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: customScale(20),
              }}
            >
              <Card
                title="Temperature"
                val={
                  botDataHistory?.length > 0 ? liveData[0]?.Temperature : "_ _"
                }
                max={selectedDevice?.temp_max}
                min={selectedDevice?.temp_min}
                bgColor={"#fff"}
              />
              <Card
                title="Gas"
                val={botDataHistory?.length ? liveData[0]?.Gas : "_ _"}
                max={selectedDevice?.gas_max}
                min={selectedDevice?.gas_min}
                bgColor={"#fff"}
              />
              <Card
                title="Humidity"
                val={botDataHistory?.length ? liveData[0]?.Humidity : "_ _"}
                max={selectedDevice?.humidity_max}
                min={selectedDevice?.humidity_min}
                bgColor={"#fff"}
              />
            </View>
          </View>

          <View style={styles.container1}>
            <View style={styles.toggleExpansionContainer}>
              <TouchableOpacity
                onPress={toggleInventoriesExpansion}
                style={styles.arrowContainer}
              >
                <Text style={{ fontSize: customScale(16) }}>Inventories</Text>
                {/* <Icon
                  name={isInventoriesExpanded ? "angle-up" : "angle-down"}
                  size={20}
                  color="#000"
                /> */}
                 <FontAwesome // Use FontAwesome explicitly
          name={isExpanded ? 'angle-up' : 'angle-down'}
          size={20}
          color="#000"
        />
              </TouchableOpacity>
              {isInventoriesExpanded && (
                <View>
                  <FlatList
                    data={inventoriesArr}
                    renderItem={({ item }) => (
                      <View style={styles.itemContainer}>
                        <View style={styles.separator} />
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{ fontSize: customScale(15) }}>
                         {item.inventory_id } 
                        </Text>
                        <Text style={{ fontSize: customScale(15) }}>
                            {item.goods}
                        </Text>
                        </View>
                      </View>
                    )}
                    keyExtractor={(item) => item.inventory_id}
                  />
                </View>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate("HomeStack",{screen:"ProfileScreen"})} // Replace with your profile navigation logic
          >
            <Text style={styles.profileButtonText}>P</Text>
          </TouchableOpacity>
        </>
      );
    }

    if (userType === "viewer") {
      return (
        <>
          <Text
            style={[
              styles.text,
              {
                borderColor: "#ccc",
                borderWidth: 1,
                marginHorizontal: customScale(10),
                marginBottom: customScale(6),
                paddingVertical: customScale(6),
              },
            ]}
          >
            {selectedInventory?.inventory_id}
          </Text>
          <View
            style={[
              styles.card,
              {
                backgroundColor: "#fff",
                width: "95%",
                margin: customScale(10),
                borderRadius: 0,
                borderColor: "#ccc",
                borderWidth: 1,
              },
            ]}
          >
            <Text
              style={{
                paddingHorizontal: customScale(10),
                paddingTop: customScale(10),
                fontSize: customScale(16),
              }}
            >
              Device Name: {selectedDevice?.bot_name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: customScale(20),
              }}
            >
              <Card
                title="Temperature"
                val={
                  botDataHistory?.length > 0 ? liveData[0]?.Temperature : "_ _"
                }
                max={selectedDevice?.temp_max}
                min={selectedDevice?.temp_min}
                bgColor={"#fff"}
              />
              <Card
                title="Gas"
                val={botDataHistory?.length ? liveData[0]?.Gas : "_ _"}
                max={selectedDevice?.gas_max}
                min={selectedDevice?.gas_min}
                bgColor={"#fff"}
              />
              <Card
                title="Humidity"
                val={botDataHistory?.length ? liveData[0]?.Humidity : "_ _"}
                max={selectedDevice?.humidity_max}
                min={selectedDevice?.humidity_min}
                bgColor={"#fff"}
              />
            </View>
          </View>
           <View style={styles.containerinventory}>
      <Text style={styles.header}>Inventory Details</Text>

      {selectedInventory?.goods && (
        <Text style={styles.detail}>
          <Text style={styles.label}>Goods Name: </Text>
          {selectedInventory.goods}
        </Text>
      )}
      {selectedInventory?.goods_quantity && (
        <Text style={styles.detail}>
          <Text style={styles.label}>Quantity: </Text>
          {selectedInventory.goods_quantity}
        </Text>
      )}
      {selectedInventory?.total_weight && (
        <Text style={styles.detail}>
          <Text style={styles.label}>Total Weight: </Text>
          {selectedInventory.total_weight} kg
        </Text>
      )}
      {selectedInventory?.device_id && (
        <Text style={styles.detail}>
          <Text style={styles.label}>Device ID: </Text>
          {selectedInventory.device_id}
        </Text>
      )}
      {selectedInventory?.created_at && (
        <Text style={styles.detail}>
          <Text style={styles.label}>Created At: </Text>
          {selectedInventory.created_at}
        </Text>
      )}
      {selectedInventory?.inventory_id && (
        <Text style={styles.detail}>
          <Text style={styles.label}>Inventory ID: </Text>
          {selectedInventory.inventory_id}
        </Text>
      )}
      {selectedInventory?.goods_type && (
        <Text style={styles.detail}>
          <Text style={styles.label}>Goods Type: </Text>
          {selectedInventory.goods_type}
        </Text>
      )}
      {selectedInventory?.goods_weight && (
        <Text style={styles.detail}>
          <Text style={styles.label}>Goods Weight: </Text>
          {selectedInventory.goods_weight} kg
        </Text>
      )}
      {selectedInventory?.goods_description && (
        <Text style={styles.detail}>
          <Text style={styles.label}>Description: </Text>
          {selectedInventory.goods_description}
        </Text>
      )}
      {selectedInventory?.market_value && (
        <Text style={styles.detail}>
          <Text style={styles.label}>Market Value: </Text>
          ₹{selectedInventory.market_value}
        </Text>
      )}
      {selectedInventory?.last_update && (
        <Text style={styles.detail}>
          <Text style={styles.label}>Last Updated: </Text>
          {selectedInventory.last_update}
        </Text>
      )}
      {selectedInventory?.warehouse_id && (
        <Text style={styles.detail}>
          <Text style={styles.label}>Warehouse ID: </Text>
          {selectedInventory.warehouse_id}
        </Text>
      )}
    </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate("HomeStack",{screen:"ProfileScreen"})} // Replace with your profile navigation logic
          >
            <Text style={styles.profileButtonText}>P</Text>
            {/* <Ionicons name="person-outline" size={28} color="#fff" /> */}
          </TouchableOpacity>
        </>
      );
    }

    return <Text style={styles.text}>No data available</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>{renderContent()}</SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#fff",
    paddingTop: customScale(20),
  },
  text: {
    textAlign: "center",
    fontSize: customScale(18),
    fontWeight: "bold",
    fontStyle: "normal",
    fontFamily: "Roboto",
  },
  liveDataText: {
    fontSize: customScale(12),
    fontWeight: "bold",
    fontStyle: "normal",
    fontFamily: "Roboto",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: customScale(5),
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    padding: customScale(6),
    width: "30%",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  tempContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: customScale(70),
  },
  container1: {
    paddingHorizontal: customScale(10),
  },
  title: {
    fontSize: customScale(20),
    marginBottom: 16,
  },
  dropdown: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    paddingLeft: 8,
    marginTop: customScale(8),
    fontSize: customScale(16),
  },
  selectedValue: {
    marginTop: 16,
    fontSize: 16,
  },
  profileButton: {
    position: "absolute",
    bottom: 20,
    left: "80%",
    right: "10%",
    backgroundColor: "#489f72",
    borderRadius: customScale(25),
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    width: customScale(50),
    height: customScale(50),
  },
  profileButtonText: {
    color: "#fff",
    fontSize: customScale(16),
    fontWeight: "bold",
  },
  value: {
    fontSize: 14,
    color: "#333",
  },

  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleExpansionContainer: {
    padding: customScale(10),
    borderWidth: 1,
    borderRadius: customScale(5),
    borderColor: "#ccc",
    marginTop: customScale(16),
  },
  itemContainer: {},
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: customScale(6),
  },
  containerinventory: {
    padding: 16,
    paddingTop:10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 14,
  },
  header: {
    fontSize: customScale(16),
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
    color: '#333',
  },
  detail: {
    fontSize: customScale(12),
    marginBottom: 4,
    color: '#555',
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
  },
  
});

export default LiveDataScreen;
