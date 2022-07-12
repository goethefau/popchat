import styled from "styled-components";
import {typography_theme_props, TypographyProps} from "../page_components/typography";


export const ChatContainer = styled.div`
  flex-grow: 1;
`

export const ChatHeaderStyled = styled.div`
  height:68px;
  display: flex;
  align-items:center;
  justify-content:space-between;
  padding: 0 24px;
`

ChatHeaderStyled.defaultProps = {
    theme: typography_theme_props
}
