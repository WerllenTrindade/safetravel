import { Container, IconBox, Message, TextHighlight } from './styles'
import { useTheme } from 'styled-components';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacityProps } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type Props = TouchableOpacityProps & {
    licensePlate?: string | null;
}
export function CardStatus({ licensePlate = null, ...rest }: Props) {
    const theme = useTheme();

    const placa = `${licensePlate?.slice(0, 3)}-${licensePlate?.slice(3, 7)}`
    
    const message = licensePlate ? `Veículo ${placa} em uso.` : `Nenhum veículo em uso. `
    const status = licensePlate ? 'chegada' : 'saída';

    return (
        <Container {...rest}>
            <IconBox>
                {licensePlate ?
                    <FontAwesome name="car" size={32} color={theme.COLORS.BRAND_LIGHT} /> :
                    <FontAwesome5 name="key" size={32} color={theme.COLORS.BRAND_LIGHT}/>
              }
            </IconBox>
            <Message>
                {message}

                <TextHighlight>
                    {'\n'}Clique aqui para registrar a {status}
                </TextHighlight>
            </Message>
        </Container>
    )
}