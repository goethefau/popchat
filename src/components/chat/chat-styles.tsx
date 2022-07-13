import styled from "styled-components";
import {ThemeProps, typography_theme_props} from "../page_components/typography";

// Chat Container
export const ChatContainer = styled.div`
  flex-grow: 1;
  display:flex;
  flex-direction: column;
  padding-bottom: 36px;
`

// Chat Header
export const ChatHeaderStyled = styled.div`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

// Chat Messages
export const ChatMessageStyled = styled.span`
  padding: 14px 24px;
  background-color: ${(props) => `${props.theme.$accent_light}`};
  width: auto;
  display: inline-block;
  border-radius: 0px 16px 16px 16px;
  font-size:14px;
`
export const ChatMessagesContainer = styled.div`
  position: absolute;
  top:0;
  left:0;
  max-height:100%;
  width:100%;
  overflow-y: scroll;
`

ChatMessageStyled.defaultProps = {
    theme: typography_theme_props,
}

export const ChatSendMessageInputWrapper = styled.div<ThemeProps>`
  background-color: ${props => `${props.theme.$accent_light}`};
  padding: 16px 18px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  textarea {
    flex-grow: 1;
    width: 100%;
    background-color: transparent;
    border: none;
    height: 100%;
    resize: none;
    color: ${props => `${props.theme.$dark}`};
    margin: 0 18px;

    &::placeholder {
      color: ${props => `${props.theme.$light}`}
    }

    &:focus {
      outline: none;
    }
  }
`

ChatSendMessageInputWrapper.defaultProps = {
    theme: typography_theme_props,
}

export const ChatSendButton = styled.button<ThemeProps>`
  cursor: pointer;
  border:none;
  outline: none;
  border-radius: 50%;
  background-color: ${props => `${props.theme.$accent_dark}`};
  height:52px;
  width: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms;
  
  &:hover,&:disabled {
    filter: brightness(85%);
    
  }
`

ChatSendButton.defaultProps = {
    theme: typography_theme_props
}