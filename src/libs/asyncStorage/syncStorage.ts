import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_ASYNC_KEY = '@safetravel:last_async';

export async function saveLastSyncTimeStamp(){
   const timestamp = new Date().getTime();

   await AsyncStorage.setItem(STORAGE_ASYNC_KEY, timestamp.toString());

   return timestamp;
}

export async function getLastSyncTimeStamp(){
    const timestamp = await AsyncStorage.getItem(STORAGE_ASYNC_KEY);
    
    return Number(timestamp);
}