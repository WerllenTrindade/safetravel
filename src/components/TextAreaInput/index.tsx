import React, { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { Container, Input, Label } from "./styles";
import theme from "../../theme";

type Props = TextInputProps & {
  label: string;
}

const TextAreaInput = forwardRef<TextInput, Props>(({ label, ...rest }, ref) => {
  return (
    <Container>
      <Label>
        {label}
      </Label>

      <Input
        ref={ref}
        {...rest}
        multiline
        autoCapitalize="sentences"
        placeholderTextColor={theme.COLORS.GRAY_400}
      />
    </Container>
  )
})

export { TextAreaInput }