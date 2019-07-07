import React from "react";
import { Box } from "rebass";
import { A } from "./App.styles";

export const Footer = props => (
  <Box as="footer">
    <p>
      Made by{" "}
      <A
        href="https://maygo.github.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        MayGo
      </A>
    </p>
  </Box>
);
