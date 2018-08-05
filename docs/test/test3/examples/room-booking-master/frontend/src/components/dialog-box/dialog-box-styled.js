import styled from "styled-components";
import {Column, Row} from "../../common-style";

export const DialogBoxBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #E9ECEF;
  opacity: 0.5;
`;

export const DialogBoxWrapper = styled(Column)`
  position: absolute;
  background: #FFFFFF;
  box-shadow: 0 1px 8px 0 rgba(0,44,92,0.28);
  border-radius: 4px;
  width: 400px;
  height: 318px;
  top: calc(50% - 190px);
  left: calc(50% - 240px);
  padding: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const DialogBoxImage = styled.div`
  height: 100px;
  width: 100px;
  background: url(${props => props.url}) center bottom no-repeat;
  background-size: contain;
`;

export const DialogBoxTitle = styled.span`
  font-family: HelveticaNeue-Medium;
  font-size: 20px;
  color: #000000;
  letter-spacing: 0;
  font-weight: bold;
  margin: 0 16px;
`;

export const DialogBoxSubtitle = styled.p`
  font-family: HelveticaNeue-Medium;
  font-size: 18px;
  color: #000000;
  letter-spacing: 0;
  margin: 10px 0;
`;

export const DialogBoxText = styled.p`
  font-family: HelveticaNeue-Medium;
  font-size: 15px;
  color: #000000;
  letter-spacing: 0;
  margin: 10px 0;

`;

export const DialogBoxSubmitWrapper = styled(Row)`
  margin-top: 30px;
`;
