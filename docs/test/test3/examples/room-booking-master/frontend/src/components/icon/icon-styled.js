import styled  from "styled-components";
import {Column} from "../../common-style";

export const IconWrapper = styled(Column)`
  width: 24px;
  height: 24px;
  background: ${props => props.background ? `#E9ECEF` : `transparent`};
  border-radius: 50%;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
`;
