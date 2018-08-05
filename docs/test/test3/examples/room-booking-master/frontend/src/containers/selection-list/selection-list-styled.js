import styled, {css} from "styled-components";
import {Column, Row} from "../../common-style";

export const SelectionListWrapper = styled(Column)`
  width: 100%;
  height: auto;
  margin: 12px 0;
`;

export const SelectionListLabel = styled.div`
  font-family: HelveticaNeue-Bold;
  font-size: 13px;
  letter-spacing: 0;
  padding-bottom: 4px;
`;

export const SelectionList = styled(Column)`
  width: 100%;
  margin-top: -4px;
`;

export const SelectionListItemWrapper = styled(Row)`
  width: calc(100% - 20px);
  height: 38px;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  border-radius: 4px;
  cursor: pointer;
  padding: 0 10px;
  margin: 4px 0;
  
  ${props => props.type === "default" && css`
    background: #E9ECEF;
    color: #000000;
    
    &:hover {
     background: rgba(0,16,33,0.05);
    }

    &:active {
      background: rgba(4,29,56,0.14);
    }
  `};
  
  ${props => props.type === "primary" && css`
    background: #007DFF;
    color: #FFFFFF;
    
    &:hover {
     background: #0059FF;
    }

    &:active {
      background: rgba(11,0,255,0.80);
    }
  `};
`;

export const SelectionListItemTitle = styled.span`
  font-family: HelveticaNeue-Bold;
  font-size: 13px;
  letter-spacing: 0;
  line-height: 17px;
`;

export const SelectionListItemSubtitle = styled.span`
  font-family: HelveticaNeue;
  font-size: 13px;
  letter-spacing: 0;
  line-height: 17px;
  margin: 0 16px;
`;

export const SelectionListItemIconWrapper = styled.div`
  position: absolute;
  right: 12px;
`;
