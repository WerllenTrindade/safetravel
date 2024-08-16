import { Container, Slogan, Title } from './styles';
import background from '../../assets/background.png'
import { Button } from '../../components/Button';

export default function SignIn() {
  return (
    <Container source={background}>
      <Title>Ignite Fllet</Title>

      <Slogan>
        Gestão de uso de veículos
      </Slogan>

      <Button title='Entrar com Google' />
    </Container>
  );
}