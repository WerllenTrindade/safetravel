import { TouchableOpacity } from 'react-native';
import { Container, Greeeting, Message, Name, Picture } from './styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import theme from '../../theme';
import { useApp, useUser} from '@realm/react';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeHeader() {
  const user = useUser();
  const app = useApp();
  const inserts = useSafeAreaInsets();

  const paddingTop = inserts.top + 32

  async function handleSignOut(){
    app.currentUser?.logOut();
  }

  console.log(user?.profile.pictureUrl)
  return (
    <Container style={{ paddingTop }}>
      <Picture 
      source={{uri: user?.profile.pictureUrl}}
      placeholder="L184i9kCbIof00ayjZay~qj[ayj@"
       />

      <Greeeting>
        <Message>
          Olá 
        </Message>

        <Name>
          {user?.profile.name}
        </Name>
      </Greeeting>

    <TouchableOpacity activeOpacity={0.7} onPress={handleSignOut}>
    <AntDesign name="poweroff" size={28} color={theme.COLORS.GRAY_400} />
    </TouchableOpacity>
    </Container>
  );
}