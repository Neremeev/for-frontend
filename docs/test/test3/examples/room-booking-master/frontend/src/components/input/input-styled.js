import styled, {css} from "styled-components";
import {Column} from "../../common-style";

export const InputContainerWrapper = styled(Column)`
  margin: 12px 0;
  height: auto;
  position: relative;
  width: 100%;
`;

export const InputLabel = styled.div`
  font-family: HelveticaNeue-Bold;
  font-size: 13px;
  letter-spacing: 0;
  font-weight: bold;
  padding-bottom: 4px;
`;

export const InputWrapper = styled.input`
  type: ${props => props.type | "text"}
  outline: none;
  width: calc(100% - 24px);
  height: 11px;
  background: #FFFFFF;
  border: 2px solid #E9ECEF;
  border-radius: 4px;
  padding: 11px 10px 12px;
  line-height: 15px;
  font-family: HelveticaNeue-Light;
  font-size: 15px;
  color: #000000;
  letter-spacing: 0.55px;
  
  &:focus {
    border: 2px solid #007DFF;
  }
  
  &::placeholder {
    font-family: HelveticaNeue-Light;
    font-size: 13px;
    color: #858E98;
    letter-spacing: 0.47px;
    font-weight: 100;
  }
  
  ${props => props.type === "date" && css`
    ::-webkit-calendar-picker-indicator {
      color: #AFB4B8;
      opacity: 1;
      border-width: thin;
    }
    ::-webkit-calendar-picker-indicator:hover {
      color: #000;
      background: white;
    }
  `};
`;
