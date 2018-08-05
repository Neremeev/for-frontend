import styled, {css} from "styled-components";

export const Button = styled.button`
  border-radius: 4px;
  outline: none;
  border: none;
  margin: 0 8px;
  padding: 0 16px;
  height: 36px;
  cursor: pointer;
  
  ${props => props.primary && css`
    
    background: #007DFF;
    color: #FFFFFF;
    
    &:hover {
     background: #0059FF;
    }

    &:active {
      background: rgba(11,0,255,0.80);
    }
  `};
  
  ${props => props.default && css`
    
    background: #E9ECEF;
    color: #000000;
    
    &:hover {
     background: rgba(0,16,33,0.05);
    }

    &:active {
      background: rgba(4,29,56,0.14);
    }
  `};

  &:disabled {
    background: #E9ECEF;
    color: rgba(0,0,0,0.20);
  }
`;
