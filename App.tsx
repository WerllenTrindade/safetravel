import 'react-native-get-random-values'
import { ThemeProvider } from 'styled-components/native'
import theme from './src/theme';
import './src/libs/dayjs'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { Loading } from './src/components/Loading';
import { StatusBar } from 'react-native';
import SignIn from './src/screens/SignIn';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { REALM_APP_ID } from '@env'
import { AppProvider, UserProvider } from '@realm/react'
import Home from './src/screens/Home';
import { Routes } from './src/routers';
import { RealmProvider, syncConfig } from './src/libs/realm';
import { TopMessage } from './src/components/TopMessage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNetInfo } from '@react-native-community/netinfo'

export default function App() {
  const { isConnected } = useNetInfo();
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (

    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}>
          {!isConnected && <TopMessage
            title={'Você está off-line.'}
            icon={<MaterialCommunityIcons size={25} color={theme.COLORS.WHITE} name="wifi-off" />}
          />}
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent />
          <UserProvider fallback={SignIn}>
            <RealmProvider sync={syncConfig} fallback={Loading}>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
