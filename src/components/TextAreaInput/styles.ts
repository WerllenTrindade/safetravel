import styled from 'styled-components/native';
import theme from '../../theme';
import { TextInput } from 'react-native';

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  border-radius: 6px;

  background-color: ${theme.COLORS.GRAY_700};
  height: 150px;

`

export const Label = styled.Text`
  font-size: ${theme.FONT_SIZE.SM}px;
  color: ${theme.COLORS.GRAY_300};
  font-family: ${theme.FONT_FAMILY.REGULAR};
`

export const Input = styled(TextInput)`
font-size: ${theme.FONT_SIZE.MD}px;
  color: ${theme.COLORS.GRAY_200};
  font-family: ${theme.FONT_FAMILY.REGULAR};

  vertical-align: top;
  margin-top: 16px;
`