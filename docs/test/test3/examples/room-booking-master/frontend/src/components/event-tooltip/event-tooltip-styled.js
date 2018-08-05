import styled from "styled-components";
import {Column, Row} from "../../common-style";
import Tooltip from "react-tooltip";

const tooltipWidth = 338;
const tooltipHeight = 115;

export const EventTooltipWrapper = styled(Tooltip)`
  pointer-events: auto !important;
  height: ${tooltipHeight}px;
  width: ${tooltipWidth}px;
  background: #FFFFFF !important;
  box-shadow: 0 1px 16px 0 rgba(0,44,92,0.28);
  border-radius: 8px !important;
  justify-content: center;
  padding: 0 !important;
  
  &:hover {
    visibility: visible !important;
    opacity: 1 !important;
  }
`;

export const EventContentWrapper = styled(Column)`
  width: 100%;
  height: 115px;
  position: relative;
`;

export const EventContent = styled(Column)`
  flex-basis: 100%;
  padding: 16px;
`;

export const EventTitle = styled(Column)`
  font-family: HelveticaNeue-Bold;
  font-size: 15px;
  color: #000000;
  letter-spacing: 0;
  line-height: 24px;
  font-weight: bold;
`;

export const EventIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const EventSubtitle = styled(Column)`
  font-family: HelveticaNeue;
  font-size: 13px;
  color: #000000;
  letter-spacing: 0;
  line-height: 17px;
`;

export const EventParticipantsWrapper = styled(Row)`
  margin-top: 16px;
`;

export const EventParticipants = styled(Row)`
  font-family: Helvetica;
  font-size: 13px;
  letter-spacing: 0;
  line-height: 17px;
`;

export const EventMainParticipant = styled.span``;

export const EventParticipantsOther = styled.span`
  color: gray;
`;
