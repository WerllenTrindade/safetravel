import React from "react";
import { Container, Departure, Info, LicensePlate } from "./styles";
import { TouchableOpacityProps } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import theme from "../../theme";

export type HistoricCardProps = {
    id: string;
    licensePlate: string;
    created: string;
    isSync: boolean;
}

type Props = TouchableOpacityProps & {
    data: HistoricCardProps;
}

export function HistoricCard({data, ...rest}: Props) {
    const { licensePlate, created, isSync } = data;
    console.log(isSync)
    return (
        <Container activeOpacity={0.7} {...rest}>
            <Info>
                <LicensePlate>
                    {licensePlate}
                </LicensePlate>
                <Departure>
                    {created}
                </Departure>
            </Info>

            {
                isSync ? 
                  <Ionicons name="checkmark" size={24} color={theme.COLORS.BRAND_LIGHT} />
                : <FontAwesome6 name="clock-rotate-left" size={24} color={theme.COLORS.BRAND_LIGHT} />
            }
        </Container>
    )
}