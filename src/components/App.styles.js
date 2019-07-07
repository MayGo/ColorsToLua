import styled from "styled-components";

export const CopyIconWrapper = styled.div`
  width: 20px;
  height: 20px;
  padding: 20px;
  margin-top: -20px;
  position: relative;
  cursor: pointer;
`;

export const LoadingWrapper = styled.div`
  margin-top: -20px;
  padding: 20px;
  & > div {
    margin: 0;
    width: 50px;
    height: 20px;
  }
`;

export const CopiedText = styled.div`
  position: absolute;
  top: 15px;
  left: 40px;
  color: blue;
`;

export const Heading = styled.h1`
  font-family: "Quicksand", cursive;
`;
