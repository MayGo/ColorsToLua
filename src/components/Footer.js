import React from "react";
import { Box } from "rebass";

export const Footer = props => (
  <Box as="footer">
    <p>
      Made by{" "}
      <a
        className="link"
        href="https://maygo.github.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        MayGo
      </a>
    </p>
  </Box>
);
