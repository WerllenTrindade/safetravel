import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_ASYNC_KEY = '@ignitefleet:location';

type Locationprops = {
    latitude: number,
    longitude: number,
    timestamp: number
}

export async function getStorageLocation(){
    const storage = await AsyncStorage.getItem(STORAGE_ASYNC_KEY);
    
    const response: Locationprops[] = storage ? JSON.parse(storage) : [];

    return response;
}

export async function saveStorageLocation(location: Locationprops){
    const storage = await getStorageLocation();
    storage.push(location);

    await AsyncStorage.setItem(STORAGE_ASYNC_KEY, JSON.stringify(storage));
}

export async function removeStorageLocation(){
    await AsyncStorage.removeItem(STORAGE_ASYNC_KEY);
}