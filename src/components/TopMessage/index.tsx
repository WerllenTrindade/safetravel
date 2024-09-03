import React, { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { Container, Title } from "./styles";
import theme from "../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";


type Props = {
  icon?: React.ReactNode;
  title: string;
}

export function TopMessage({title, icon}: Props){
  const inserts = useSafeAreaInsets();

  const paddingTop = inserts.top + 5

  return (
    <Container style={{ paddingTop }}>
      {
        icon && icon
      }
      <Title>
        {title}
      </Title>

    </Container>
  )
}
