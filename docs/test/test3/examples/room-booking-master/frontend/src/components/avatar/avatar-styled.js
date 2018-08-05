import styled from "styled-components";

export const Avatar = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${props => props.url});
  background-size: cover;
  border-radius: 50%;
`;
