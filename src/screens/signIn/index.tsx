import { Container, Slogan, Title } from './styles';
import background from '../../assets/background.png'
import { Button } from '../../components/Button';
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { WEB_CLIENT_ID } from '@env'
import { useState } from 'react';
import { Alert } from 'react-native';
import { Realm, useApp } from '@realm/react';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID // From Google Cloud Console
})

export default function SignIn() {
  const [isAuthenticationg, setIsAuthenticationg ] = useState(false);
  const app = useApp();

  const handleGoogleSignIn = async () => {
    try{
      setIsAuthenticationg(true);

      const {idToken} = await GoogleSignin.signIn();

      if(idToken){
        const credentials = Realm.Credentials.jwt(idToken);

        await app.logIn(credentials);

      }else{
        Alert.alert('Atenção', `Não foi possivel conecntar-se a sua conta`)
      }

    }catch(err){
      console.error(err)
      Alert.alert('Atenção', `Não foi possivel conecntar-se a sua conta`)
    }finally{
      setIsAuthenticationg(false);
    }
  }

  return (
    <Container source={background}>
      <Title>Ignite Fllet</Title>

      <Slogan>
        Gestão de uso de veículos
      </Slogan>

      <Button 
      title='Entrar com Google' 
      onPress={handleGoogleSignIn}
      isLoading={isAuthenticationg} 
      />
    </Container>
  );
}