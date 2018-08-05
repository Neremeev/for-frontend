import styled, {css} from "styled-components";
import {Row, Column} from "../../common-style";

export const TimeLineContent = styled(Row)`
  position: relative;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  width: 100%;
`;

export const TimeLineHour = styled(Column)`
  position: relative;
  font-family: HelveticaNeue-Bold;
  font-size: 11px;
  color: #252525;
  letter-spacing: 0.4px;
  font-weight: bold;
  width: 13px;
  align-items: center;
  
  ${props => props.disabled && css`color: #858E98`}
`;

export const TimeLineWrapper = styled(Column)`
  margin: 0 20px 0px 20px;
  flex-grow: 1;
`;

export const HourDivider = styled(Column)`
  position: absolute;
  width: 1px;
  min-height: calc(100vh - 72px - 46px);
  height: 100%;
  flex-grow: 1;
  background: rgba(19,100,205,0.10);
  left: 50%;
  transform: translateX(-50%);
  margin-top: 16px;
`;
