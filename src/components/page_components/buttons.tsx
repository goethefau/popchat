import styled from "styled-components";
import {typography_theme_props, TypographyProps} from "./typography";


interface ButtonProps {
    theme: TypographyProps["theme"]
}

// Button
export const Button = styled.button<ButtonProps>`
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`
Button.defaultProps = {
    theme: typography_theme_props
}

// Rounded Button
export const RoundedButton = styled(Button)<ButtonProps>`
  height: 48px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content:center;
  border-radius: 8px;
  border: 1px solid #CBD0D9;
`

RoundedButton.defaultProps = {
    theme: typography_theme_props
}