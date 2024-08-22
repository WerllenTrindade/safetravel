import React, { forwardRef } from "react";
import { Container, Input, Label } from "./styles";
import theme from "../../theme";
import { TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  label: string;
}

const LicencePlateInput = forwardRef<TextInput, Props>(({label, ...rest}, ref) => {
  return (
    <Container>
      <Label>{label}</Label>

      <Input
      ref={ref}
      {...rest}
      maxLength={7}
      autoCapitalize="characters"
      placeholderTextColor={theme.COLORS.GRAY_400}
      />
    </Container>
  )
})

export { LicencePlateInput }