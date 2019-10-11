import styled from "styled-components"

export const MarginX = styled.div`
  margin-left: ${props => props.unit || "0.5rem"}
  margin-right: ${props => props.unit || "0.5rem"}
`;

export const FlexDiv = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent || "center"};
`;