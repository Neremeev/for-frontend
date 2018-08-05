import styled from "styled-components";
import {Row} from "../../common-style";

export const RoomLineWrapper = styled(Row)`
  flex-grow: 1;
  height: 28px;
  background: white;
`;

/**
 * Учитываем половинные отступы до 8 часов и до 23 часов (слева и справа соответственно)
 * чтобы начало эвентов совпадало с вертикальной линией часа
 * 13px - ширина часа, 1px - ширина линии времени => (13-1) / 2
 */
const hoursMarginHalf = (13 - 1) / 2;

export const RoomLineContent = styled(Row)`
  position: relative;
  margin: 0 ${20 + hoursMarginHalf}px;
  flex-grow: 1;
`;
