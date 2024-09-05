import React from "react";
import { Container, Description, Info, Label } from "./styles";
import { IconBox } from "../IconBox";

export type LocationInfoProps = {
    label: string;
    description: string;
}

type Props = LocationInfoProps & {
    icon: React.ReactNode; 
}

export function LocationInfo({ description, icon, label }: Props) {
    return (
        <Container>
            <IconBox icon={icon} />
            <Info>
                <Label numberOfLines={1}>
                    {label}
                </Label>
                <Description numberOfLines={1}>
                    {description}
                </Description>
            </Info>
        </Container>
    )
}