import { Container, IconBox, Message, TextHighlight } from './styles'
import { useTheme } from 'styled-components';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacityProps } from 'react-native';


type Props = TouchableOpacityProps & {
    licensePlate?: string | null;
}
export function CardStatus({ licensePlate = null, ...rest }: Props) {
    const theme = useTheme();

    // const Icon = licensePlate ? Key : Car;
    const message = licensePlate ? `Veículo ${licensePlate} em uso` : `Nenhum veículo em uso.`
    const status = licensePlate ? 'chegada' : 'saída';

    return (
        <Container {...rest}>
            <IconBox>
                <FontAwesome name="car" size={32} color={theme.COLORS.BRAND_LIGHT} />
            </IconBox>
            <Message>
                {message}

                <TextHighlight>
                    Clique aqui para registrar a {status}
                </TextHighlight>
            </Message>
        </Container>
    )
}