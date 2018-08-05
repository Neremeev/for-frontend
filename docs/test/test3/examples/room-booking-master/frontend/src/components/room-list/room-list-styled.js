import styled from 'styled-components';
import {Row, Column} from "../../common-style";

export const RoomListWrapper = styled(Row)`
  width: 100%;
  //min-height: 100vh;
`;

export const RoomListContent = styled.div`
  width: 100%
`;

export const RoomListFloorWrapper = styled(Column)`
  padding-bottom: 20px;
`;

export const RoomListFloor = styled.div`
  font-family: HelveticaNeue-Bold;
  font-size: 11px;
  color: #858E98;
  letter-spacing: 0.4px;
`;
