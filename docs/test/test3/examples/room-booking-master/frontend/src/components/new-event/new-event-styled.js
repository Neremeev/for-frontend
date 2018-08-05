import styled from "styled-components";
import {Row} from "../../common-style";
import {ONE_HOUR_WIDTH} from "../../constants";

export const NewEventWrapper = styled(Row).attrs({
    style: ({offset}) =>  ({left: `calc(${offset}px - ${ONE_HOUR_WIDTH/4}%)`})
})`
  background: #2B50FD;
  border-radius: 2px;
  color: white;
  height: 28px;
  width: ${ONE_HOUR_WIDTH/2}%;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  position: absolute;
  cursor: pointer;
`;
