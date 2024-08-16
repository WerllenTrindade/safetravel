import React from "react";
import { Container, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";
import { Loading } from "../Loading";

interface Props extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
}

export function Button({ title, isLoading, ...rest }: Props) {
  return (
    <Container disabled={isLoading} {...rest} activeOpacity={0.7}>
      {
        isLoading
          ? <Loading />
          : <Title>{title}</Title>
      }
    </Container>
  )
}