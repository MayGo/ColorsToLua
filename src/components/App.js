import React, { useState, useEffect } from "react";
import { Footer } from "./Footer";
import { Editor } from "./Editor";
import { ImageUploadPreview } from "./ImageUploadPreview";
import { Converter } from "../Converter";
import { Copy } from "styled-icons/fa-regular/Copy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IconWrapper } from "./App.styles";
import { Flex } from "rebass";

const GitHubLink = props => (
  <div style={{ marginTop: 20 }}>
    <a
      className="github-button"
      href="https://github.com/MayGo/colors-to-lua"
      data-size="large"
      data-show-count="true"
      aria-label="Star MayGo/colors-to-lua on GitHub"
    >
      Github
    </a>
  </div>
);

const Heading = props => <h1 className="heading">Colors to Lua</h1>;

export const App = () => {
  const [codeResult, setCodeResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [heightImage, setHeightImage] = useState();
  const [colorImage, setColorImage] = useState();

  useEffect(() => {
    if (heightImage) {
      const converter = new Converter(heightImage, colorImage);
      setCodeResult(converter.parseImage());
    }
  }, [heightImage, colorImage]);

  return (
    <div
      className="center-content"
      style={{
        flexDirection: "column"
      }}
    >
      <Heading />
      <Flex>
        <ImageUploadPreview
          image={heightImage}
          setImage={setHeightImage}
          title="Height image"
        />
        <ImageUploadPreview
          image={colorImage}
          setImage={setColorImage}
          title="Color image"
        />
      </Flex>
      <CopyToClipboard text={codeResult} onCopy={() => setCopied(true)}>
        <IconWrapper>
          <Copy />
        </IconWrapper>
      </CopyToClipboard>
      {copied ? <span style={{ color: "red" }}>Copied.</span> : null}

      <Editor codeResult={codeResult} />
      <GitHubLink />
      <Footer />
    </div>
  );
};
