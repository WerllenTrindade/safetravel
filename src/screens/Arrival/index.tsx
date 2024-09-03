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
import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { getLastSyncTimeStamp } from '../../libs/asyncStorage/syncStorage';

type RouteParamsProps = {
  id: string;
}

export default function Arrival() {
  const [dataNotSync, setDataNotSync] = useState(false);
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

  function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert('Error', 'Não foi possivel obter os dados para registrar a chegada do veiculo')
      }

      realm.write(() => {
        historic.status = 'arrival',
          historic.updated_at = new Date();
      })

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

      goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possivel registrar a chegada do veículo');
    }
  }

  const title = historic?.status == 'departure' ? 'Chegada' : 'Detalhes'

  useEffect(() => {
    getLastSyncTimeStamp().then(lastSync => setDataNotSync(historic!.updated_at.getTime() > lastSync))
  }, [])

  return (
    <Container>
      <Header title={title} />

      <Content>
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