import { useNavigation, useRoute } from '@react-navigation/native';
import { AsyncMessage, Container, Content, Description, Footer, Label, LicensePlate } from './styles';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';
import Feather from '@expo/vector-icons/Feather';
import theme from '../../theme';
import { BSON } from 'realm';

import { useObject, useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { Alert, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getLastSyncTimeStamp } from '../../libs/asyncStorage/syncStorage';
import { stopLocationTask } from '../../tasks/backgroundLocationTask';
import { getStorageLocation } from '../../libs/asyncStorage/locationStorage';
import { LatLng } from 'react-native-maps';
import { Map } from '../../components/Map';
import { Locations } from '../../components/Locations';
import { getAddressLocation } from '../../utils/getAddressLocation';
import { LocationInfoProps } from '../../components/LocationInfo';
import dayjs from 'dayjs';
import { ArrowFatLinesLeft } from 'phosphor-react-native';
import { Loading } from '../../components/Loading';

type RouteParamsProps = {
  id: string;
}

export default function Arrival() {
  const [dataNotSync, setDataNotSync] = useState(false);
  const [coordinates, setCoordinates] = useState<LatLng[]>([]) 
  const [departure, setDeparture] = useState<LocationInfoProps>({} as LocationInfoProps);
  const [arrival, setArrival] = useState<LocationInfoProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const route = useRoute();
  
  const { id } = route.params as RouteParamsProps;
  const realm = useRealm();
  const { goBack } = useNavigation();
  const historic = useObject(Historic, new BSON.UUID(id) as any);

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?',
      [
        {
          style: 'cancel',
          text: 'Não'
        },
        {
          text: 'Sim',
          onPress: () => removeVehicleUsage()
        },
      ]
    )
  }

  async function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert('Error', 'Não foi possivel obter os dados para registrar a chegada do veiculo')
      }

      const locations = await getStorageLocation();


      realm.write(() => {
          historic.status = 'arrival',
          historic.updated_at = new Date();
          historic.coords.push(...locations);
      })

      await stopLocationTask();
      Alert.alert('Chegada', 'Chegada registrada com sucesso!');
      goBack();
    } catch (e) {

    }
  }

  async function removeVehicleUsage() {
    try {
      realm.write(() => {
        realm.delete(historic);
      })

      await stopLocationTask();
      goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possivel registrar a chegada do veículo');
    }
  }

  async function getLocationsInfo(){
    if(!historic){
      return;
    }

    const lastySync = await getLastSyncTimeStamp();
    const updateAt = historic!.updated_at.getTime() 

    setDataNotSync(updateAt > lastySync);

    if(historic?.status === 'departure'){
      const locationsStorage = await getStorageLocation();
      setCoordinates(locationsStorage)
    }else{
      setCoordinates(historic?.coords ?? [])
    }

    if(historic?.coords[0]){
      const departureStreetName = await getAddressLocation(historic.coords[0]);
      setDeparture({
        label: `Saindo em ${departureStreetName ?? ''}`,
        description: dayjs(new Date(historic?.coords[0].timestamp)).format('DD/MM/YYYY [às] HH:mm')
      })
    }

    if(historic?.status === 'arriavel'){
      const lastLocation = historic?.coords[historic.coords.length - 1];

      const departureStreetName = await getAddressLocation(lastLocation);

      setArrival({
        label: `Chegando em ${departureStreetName ?? ''}`,
        description: dayjs(new Date(lastLocation.timestamp)).format('DD/MM/YYYY [às] HH:mm')
      })
    }

    setIsLoading(false)
  }

  const title = historic?.status == 'departure' ? 'Chegada' : 'Detalhes'

  useEffect(() => {
    getLocationsInfo();
  }, [historic])

  if(isLoading){
    return (
      <Loading />
    )
  }

  return (
    <Container>
      <Header title={title} />

      {coordinates.length > 0 && 
      
      <View style={{paddingHorizontal: 30, paddingTop: 15}}>
        <Map coordinates={coordinates}/>
      </View>
      
      }

      <Content>
        <Locations 
        arrival={arrival} 
        departure={departure} />
        <Label>
          Placa do veículo
        </Label>

        <LicensePlate>
          {historic?.license_plate}
        </LicensePlate>

        <Label>
          Finalidade
        </Label>

        <Description>
          {historic?.description}
        </Description>


      </Content>
      {
        historic?.status === 'departure' &&
        <Footer>
          <ButtonIcon onPress={handleRemoveVehicleUsage} icon={<Feather name="x" size={24} color={theme.COLORS.BRAND_MID} />} />
          <Button onPress={handleArrivalRegister} title='Registrar Chegada' />
        </Footer>
      }

      {
        dataNotSync &&
        <AsyncMessage>
          Sincronização da {historic?.status === 'departure' ? "partida" : "chegada"} pendente
        </AsyncMessage>
      }

    </Container>
  );
}