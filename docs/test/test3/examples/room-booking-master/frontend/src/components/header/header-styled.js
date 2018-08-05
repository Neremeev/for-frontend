import styled from "styled-components";
import {Row} from "../../common-style";

export const HeaderWrapper = styled(Row)`
  justify-content: flex-end;
  align-items: center;
  height: 71px;
  padding: 0 16px;
  border-bottom: 1px solid #E9ECEF;
  background: url(${props => props.logoUrl}) 24.5px 25px no-repeat;
  background-size: 120px 24.5px;
`;

export const HeaderItemsWrapper = styled.div`
  @media (max-width: 414px) {
    display: none;
  }
`;
