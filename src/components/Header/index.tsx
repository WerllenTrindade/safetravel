import React from "react";
import { Container, Title } from "./styles";
import { TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from "styled-components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

type Props = {
    title: string;
}

export function Header({title}: Props) {
    const { COLORS } = useTheme();
    const { goBack } = useNavigation();
    const insets = useSafeAreaInsets();
    const paddingTop = insets.top + 42

    return (
        <Container style={{ paddingTop }}>
            <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
                <AntDesign name="arrowleft" size={24} color={COLORS.BRAND_LIGHT} />
            </TouchableOpacity>

            <Title>{title}</Title>
        </Container>
    )
}