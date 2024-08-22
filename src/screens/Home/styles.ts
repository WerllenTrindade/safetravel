import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.GRAY_800};
`
export const Containt = styled.View`
  background-color: ${({theme}) => theme.COLORS.GRAY_700};
  
  margin: 30px;
  border-radius: 8px;
`
