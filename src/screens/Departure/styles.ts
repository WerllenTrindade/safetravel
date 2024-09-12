import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.GRAY_800};
`
export const Content = styled.View`
  flex: 1;
  gap: 16px;
  padding: 32px;
  margin-top: 16px;
`

export const Message = styled.Text`
  color: ${({theme}) => theme.COLORS.WHITE};
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  text-align: center;
  margin-top: 24px;
  margin-bottom: 44px;
  
`

export const MesssageContent = styled.View`
  flex: 1;
  justify-items: center;
  padding: 24px;
`

