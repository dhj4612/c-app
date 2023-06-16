import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveStore = async (key, data) => {
  try {
    return await AsyncStorage.setItem(key, typeof data === "string" ? data : JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

export const loadStore = async (key) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (e) {
    console.log(e)
  }
}

export const loadStoreParse = async (key) => {
  try {
    const dataStr = await AsyncStorage.getItem(key)
    return dataStr ? JSON.parse(dataStr) : dataStr
  } catch (e) {
    console.log(e)
  }
}

export const removeStore = async (key) => {
  try {
    return await AsyncStorage.removeItem(key)
  } catch (e) {
    console.log(e)
  }
}
