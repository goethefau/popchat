import styled from "styled-components";

export interface TypographyProps {
    size?: number
    align?: "left" | "right" | "center"
    font_weight?: "regular" | "bold" | "medium"
    theme: {
        regular: string
        medium: string
        bold: string
        $dark: string
        $light: string
        $accent_light: string
        $accent: string
        $accent_dark: string
        $accent_super_dark: string
    }
}

const system_fonts = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

export interface ThemeProps {
    theme: TypographyProps["theme"]
}

export const typography_theme_props: TypographyProps["theme"] = {
    regular: `"GT Walsheim Regular", ${system_fonts}`,
    medium: `"GT Walsheim Medium", ${system_fonts}`,
    bold: `"GT Walsheim Bold", ${system_fonts}`,
    $dark: "#1C1E41",
    $light: "#98A2B3",
    $accent_light: "#F7F9FF",
    $accent: "#8E9AF9",
    $accent_dark: "#6172F3",
    $accent_super_dark: "#4E5BA6",
}

// Page Title
export const PageTitle = styled.div<TypographyProps>`
  font-size: ${(props) => props.size || "22px"};
  font-family: "GT Walsheim Bold";
  color: ${(props) => props.theme.$dark};
  text-align: ${(props) => props.align || "center"};
`
PageTitle.defaultProps = {
    theme: typography_theme_props
}

// Page Paragraph
export const PageParagraph = styled.div<TypographyProps>`
  font-size: ${(props) => `${props.size}px`};
  text-align: ${(props) => props.align};
  color: #98A2B3;
  font-family: ${(props) => props.font_weight ? `${props.theme[props.font_weight]}` : props.theme.regular};
`
PageParagraph.defaultProps = {
    theme: typography_theme_props,
    size: 16,
    align: "center"
}