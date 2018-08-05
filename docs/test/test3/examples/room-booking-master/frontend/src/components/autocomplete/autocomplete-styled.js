import styled, {css} from "styled-components";

export const AutocompleteWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  margin: 12px 0 8px;
`;

export const AutocompleteIconWrapper = styled.div`
  position: absolute;
  right: 12px;
  bottom: 7px;
  &:hover{
    ${props => props.type === "close" && css`cursor: pointer`}
  }
`;

export const AutocompleteItemWrapper = styled.div`
  width: 100%;
  height: 34px;
  position: relative;
  &:hover {
    background: #F6F7F9;
    font-family: HelveticaNeue-Bold;
    font-weight: bold;
  }
`;

export const AutocompleteItemAvatarWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 16px;
`;

export const AutocompleteItemTitleWrapper = styled.div`
  position: absolute;
  left: 48px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  letter-spacing: 0;
  line-height: 15px;
  cursor: default;
  &:hover {
    font-family: HelveticaNeue-Bold;
    font-weight: bold;
  }
`;

export const AutocompleteItemTitle = styled.span`
  font-family: HelveticaNeue;
  font-size: 13px;
  color: #000000;
  letter-spacing: 0;
  line-height: 15px;
`;

export const AutocompleteItemSubtitle = styled.span`
  font-family: HelveticaNeue;
  font-size: 13px;
  letter-spacing: 0;
  line-height: 15px;
  color: gray;
`;

export const AutocompleteInputWrapper = styled.input`
  outline: none;
  width: calc(100% - 24px);
  height: 11px;
  background: #FFFFFF;
  border: 2px solid #E9ECEF;
  border-radius: 4px;
  padding: 11px 10px 12px;
  line-height: 15px;
  font-family: HelveticaNeue-Light;
  font-size: 15px;
  color: #000000;
  letter-spacing: 0.55px;
  &:focus {
    border: 2px solid #007DFF;
  }
  &::placeholder {
    font-family: HelveticaNeue-Light;
    font-size: 13px;
    color: #858E98;
    letter-spacing: 0.47px;
    font-weight: 100;
  }
`;

export const AutocompleteMenuWrapper = styled.div`
  &::-webkit-scrollbar {
      width: 8px;
      height: 40px;
  }
  &::-webkit-scrollbar-thumb {
    background: #D5DFE9;
    border-radius: 100px;
  }
`;

export const AutocompleteLabel = styled.div`;
  font-family: HelveticaNeue-Bold;
  font-size: 13px;
  letter-spacing: 0;
  font-weight: bold;
  padding-bottom: 4px;
`;
