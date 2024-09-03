import { Container, Containt, Label, Title } from './styles';

import HomeHeader from '../../components/HomeHeader';
import { CardStatus } from '../../components/CarStatus';
import { useNavigation } from '@react-navigation/native';


import { useQuery, useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { HistoricCard, HistoricCardProps } from '../../components/HistoricCard';
import dayjs from 'dayjs';
import { useUser } from '@realm/react';
import { getLastSyncTimeStamp, saveLastSyncTimeStamp } from '../../libs/asyncStorage/syncStorage';
import Toast from 'react-native-toast-message';
import { TopMessage } from '../../components/TopMessage';
import Feather from '@expo/vector-icons/Feather';

export default function Home() {
  const { navigate } = useNavigation();
  const historic = useQuery(Historic);
  const [vehicleInUse, setVehicleInUse] = useState({} as Historic);
  const [percentageToSync, setPercentageToSync] = useState<string | null>(null);
  const realm = useRealm();

  const user = useUser();
  const [cardHistory, setCardHistory] = useState<HistoricCardProps[]>([])

  useEffect(() => {
    fetchHistoric();
  }, [historic])

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse());
    fetchHistoric();
    fetchVehicleInUse()

    return () => {
      if(realm && !realm.isClosed){
        realm.removeListener('change', fetchVehicleInUse);
      }
    }

  }, [])

  function handleRegisterMoviment() {
    if (vehicleInUse?._id) {
      return navigate('Arrival', { id: vehicleInUse._id.toString() })
    } else {
      navigate('Departure')
    }
  }

  function fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0];
      setVehicleInUse(vehicle);
    } catch (err) {
      console.log('err')
    }
  }

  async function fetchHistoric() {
    const res = historic.filtered("status = 'arrival' SORT(created_at DESC)")

    const lestSync = await getLastSyncTimeStamp();
    console.log(lestSync)
    const formattedHistory = res.map(item => {
      return ({
        id: item._id!.toString(),
        licensePlate: item.license_plate,
        isSync: lestSync > item.updated_at!.getTime(),
        created: dayjs(item.created_at).format('[Saída em] DD/MM/YYYY [ás] HH:mm')
      })
    })
    setCardHistory(formattedHistory)
  }

  function handleHistoricDetails(id: string){
    navigate('Arrival', { id })
  }

  async function progressNotification(transferred: number, transferable: number){
    const percentage = (transferred/transferable) * 100

    if(percentage === 100){
      await saveLastSyncTimeStamp();
      await fetchHistoric();
      setPercentageToSync(null);

      Toast.show({
        type: 'info',
        text1: 'Todos os dados estão sincronizados.'
      })
    }

    if(percentage < 100){
      setPercentageToSync(`${percentage.toFixed(0)}% sincronizado`)
    }
  }

  useEffect(() => {
    realm.subscriptions.update((tab, realm) => {
      const historicByUserQuery = realm.objects('Historic').filtered(`user_id = '${user.id}'`);

      tab.add(historicByUserQuery, { name: 'historic_by_user'})
    })
  },[realm])

  useEffect(() => {
    const syncSession = realm.syncSession;

    if(!syncSession){
      return;
    }

    syncSession.addProgressNotification(Realm.ProgressDirection.Upload, Realm.ProgressMode.ReportIndefinitely, progressNotification)

    return () => syncSession.removeProgressNotification(progressNotification)
  },[])


  return (
    <Container>

      {
        percentageToSync &&
        <TopMessage title={percentageToSync} icon={<Feather name="upload-cloud" />}/>
      }

      <HomeHeader />

      <Containt>
        <CardStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMoviment} />

        <Title>Historico</Title>
        <FlatList data={cardHistory}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <HistoricCard data={item} onPress={() => handleHistoricDetails(item.id)}/>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <Label>
              Nenhum registro de utilização.
            </Label>
          }
        />
      </Containt>
    </Container>
  );
}