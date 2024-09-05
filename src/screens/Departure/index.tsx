import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicencePlateInput } from '../../components/LicencePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Container, Content, Message } from './styles';
import { TextInput, ScrollView, Alert } from 'react-native';
import { licensePlateValidate } from '../../utils/licensePlateValidate';
import { useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { useUser } from '@realm/react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useForegroundPermissions, watchPositionAsync, LocationAccuracy, LocationSubscription, LocationObjectCoords } from 'expo-location'
import { getAddressLocation } from '../../utils/getAddressLocation';
import { Loading } from '../../components/Loading';
import { LocationInfo } from '../../components/LocationInfo';
import theme from '../../theme';
import { Map } from '../../components/Map';


export default function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoadingLocation, setLoadingLocation] = useState(true);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [locationForegroundPermission, requestLocationForegroundPermission] = useForegroundPermissions();
  const [currentCoords, setCurrentCoords] = useState<LocationObjectCoords | null>(null);
  const { goBack } = useNavigation();
  
  const realm = useRealm();
  const user = useUser();
  
  const descriptionRef = useRef<TextInput>(null);
  const licencePlateRef = useRef<TextInput>(null);
  
  function handleDepartureRegister() {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licencePlateRef.current?.focus();
        return Alert.alert('Place inválida!', 'A placa é inválida, Por favor, informe a placa correta do veiculo.')
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus();
        return Alert.alert('Finalidade', 'Por favor, informe a finalidade da utilização do veículo')
      }

      if(!currentCoords?.latitude && !currentCoords?.longitude){
        return Alert.alert('Localização!', 'Não foi possivel obter a localização atual. Tente novamente!')
      }

      setIsRegistering(true);

      realm.write(() => {
        realm.create('Historic', Historic.generate({
          description,
          license_plate: licensePlate.toUpperCase(),
          user_id: user!.id
        }))
      })

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso!');

      goBack();
    } catch (error) {
      console.log(error)
      return Alert.alert('Erro', 'Não foi possivel registrar a saída do veículo')
    } finally {
      setIsRegistering(false);
    }
  }

  useEffect(() => {
    requestLocationForegroundPermission();
  },[]);


  useEffect(() => {
    if(!locationForegroundPermission?.granted){
      return;
    }
    let subscription: LocationSubscription
    
    watchPositionAsync({accuracy: LocationAccuracy.High, timeInterval: 1000,}, 
      async (location) => {
        setCurrentCoords(location.coords && location.coords);
        const address = await getAddressLocation(location.coords)
        
        if(address){
          setCurrentAddress(address);
        }

        setLoadingLocation(false);
      }
    ).then(response => {subscription = response})


    return () => {
      if(subscription){
        subscription.remove();
      }
    }
  },[locationForegroundPermission])

  if(!locationForegroundPermission?.granted){
    return (
      <Container>
        <Header title='Saida' />
        <Message>
          Você precisa permitir que o plicativo tenha acesso a localização para utilizar essa funcionalidade.
          Por favor, acesse as configurações do seus dispositivo para conceder essa permissão ao aplicativo.
        </Message>
      </Container>
    )
  }

  if(isLoadingLocation){
    return (
      <Loading/>
    )
  }

  return (
    <Container>
      <Header title='Saida' />

      <KeyboardAwareScrollView style={{ flex: 1 }} extraHeight={100}>
        <ScrollView>
          {
            currentCoords && <Map coordinates={[currentCoords]} />
          }

          <Content>
            {
              currentAddress && (
                <LocationInfo
                icon={<FontAwesome name="car" size={16} color={theme.COLORS.BRAND_LIGHT}/>}
                label="Localizacao atual" description={currentAddress}/>
              )
            }


            <LicencePlateInput
              ref={licencePlateRef}
              label='Place do Veiculo'
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType='next'
              onChangeText={setLicensePlate}
              value={licensePlate}
            />

            <TextAreaInput
              ref={descriptionRef}
              label='Finalidade'
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
              onChangeText={setDescription}
              value={description}
            />
            
            <Button
              isLoading={isRegistering}
              title='Registrar Saída'
              onPress={handleDepartureRegister} />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}