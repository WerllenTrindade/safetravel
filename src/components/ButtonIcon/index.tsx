import { IconProps } from 'phosphor-react-native';
import theme from '../../theme';
import { Container} from './styles'
import { TouchableOpacityProps } from 'react-native';


type Props = TouchableOpacityProps & {
    icon: React.ReactNode;
}
export function ButtonIcon({ icon: Icon, ...rest }: Props) {
    return (
        <Container {...rest}>
           {Icon}
        </Container>
    )
}