import styled, {css} from 'styled-components';
import {Row, Column} from "../../common-style";

export const RoomListItemTitle = styled.span`
  font-family: HelveticaNeue-Medium;
  font-size: 15px;
  padding-bottom: 2px;
  
  ${props => !props.disabled && css`
    ${RoomListItemContent}:active & {
      font-family: HelveticaNeue-Bold;
      color: #1D54FE;
    }
    ${RoomListItemContent}:hover & {
      font-family: HelveticaNeue-Bold;
      color: #0070E0;
    }
  `};
`;

export const RoomListItemWrapper = styled(Row)`
  width: 100%;
  align-items: center;
`;

export const RoomListItemSubtitle = styled.p`
  font-family: HelveticaNeue;
  font-size: 13px;
  margin: 0;
`;

export const RoomListItemContent = styled(Column)`
  line-height: 17px;
  padding: 8px 0;
  width: 220px;
  
  ${props => props.disabled && css`
      color: #858E98;
  `};
`;
