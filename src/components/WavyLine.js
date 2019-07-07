import React from "react";
import styled from "styled-components";

const Holder = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 5px;
`;
const SmallLine = styled.div`
  position: absolute;
  width: 100%;
  height: 5px;
`;
const SmallLine1 = styled(SmallLine)`
  background: linear-gradient(
    45deg,
    transparent,
    transparent 49%,
    #1771f1 49%,
    transparent 51%
  );
  background-size: 10px 10px;
`;
const SmallLine2 = styled(SmallLine)`
  background: linear-gradient(
    -45deg,
    transparent,
    transparent 49%,
    #1771f1 49%,
    transparent 51%
  );
  background-size: 10px 10px;
`;

export const WavyLine = () => (
  <Holder>
    <SmallLine1 />
    <SmallLine2 />
  </Holder>
);
