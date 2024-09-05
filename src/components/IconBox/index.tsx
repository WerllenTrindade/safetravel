import React from "react";
import { Container, SizeProps } from "./styles";

type Props = {
    size?: SizeProps;
    icon: React.ReactNode;
}

export function IconBox({icon, size = 'NORMAL'}: Props) {
    // const iconSize = size === 'NORMAL' ? 24 : 16;
    
    return (
        <Container size={size}>
            {icon}
        </Container>
    )
}