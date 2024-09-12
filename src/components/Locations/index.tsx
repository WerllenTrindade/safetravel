import React from "react";
import { Container } from "./styles";
import { LocationInfo, LocationInfoProps } from "../LocationInfo";
import { Line } from "react-native-svg";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type Props = {
    departure: LocationInfoProps
    arrival: LocationInfoProps | null
}

export function Locations({ arrival = null, departure }: Props) {
    return (
        <Container>
            <LocationInfo
                description={departure.description}
                icon={<FontAwesome name="car" />}
                label={departure.label}
            />
            {
                arrival &&
                <>
                    <Line />
                    <LocationInfo
                        description={arrival.description}
                        icon={<FontAwesome5 name="flag-checkered" />}
                        label={arrival.label}
                    />
                </>
            }
        </Container>
    )
}