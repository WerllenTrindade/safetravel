import styled, {css} from 'styled-components/native';
import theme from '../../theme';

export type SizeProps = "SMALL" | "NORMAL"

type Props = {
  size: SizeProps
}

const varianteSizeStyles = (size: SizeProps) => {
  return {
    SMALL: css`
      width: 32px;
      height: 32px;
      `,
    NORMAL: css`
    width: 46px;
    height: 46px;
    `,
  }[size]
}

export const Container = styled.View<Props>`
  background-color: ${theme.COLORS.GRAY_700};

  justify-content: center;
  align-items: center;

  margin-right: 12px;

  ${({size}) => varianteSizeStyles(size)};
`