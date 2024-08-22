import { Container, Containt  } from './styles';
import background from '../../assets/background.png'
import { Button } from '../../components/Button';
import HomeHeader from '../../components/HomeHeader';
import { CardStatus } from '../../components/CarStatus';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const { navigate } = useNavigation();

  function handleRegisterMoviment(){
    navigate('Departure')
  }

  return (
    <Container>
      <HomeHeader />

      <Containt>
        <CardStatus onPress={handleRegisterMoviment} />
      </Containt>


    </Container>
  );
}