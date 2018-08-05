import styled from "styled-components";
import {Row, Column} from "../../common-style";

export const RoomBookingTimeLineWrapper = styled(Row)`
  width: 100%;
  box-shadow: inset 0 1px #E9ECEF;
`;

export const RoomBookingDiagramWrapper = styled(Row)`
  width: 100%;
  min-height: calc(100vh - 72px - 46px);
  background: 
    linear-gradient(#E9ECEF, #E9ECEF) no-repeat 245px 0,
    linear-gradient(#f6f7f9, #f6f7f9) no-repeat 244px 0;
  background-size: 1px 100%, 100%;
  box-shadow: inset 0 1px #E9ECEF;
`;

export const RoomBookingDiagramContent = styled(Column)`
  width: 100%;
  margin: 22px 0 0 25px;
`;
