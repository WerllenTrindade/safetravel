import { ThemeProvider } from 'styled-components/native'
import theme from './src/theme';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { Loading } from './src/components/Loading';
import { StatusBar } from 'react-native';
import SignIn from './src/screens/SignIn';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { REALM_APP_ID } from '@env'
import { AppProvider, UserProvider } from '@realm/react'
import Home from './src/screens/Home';
import { Routes } from './src/routers';

export default function App() {
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
        <SafeAreaProvider style={{ flex: 1 }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent />
          <UserProvider fallback={SignIn}>
            <Routes />
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
