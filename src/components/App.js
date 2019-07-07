import React, { useState, useEffect } from "react";
import { Footer } from "./Footer";
import { Editor } from "./Editor";
import { ImageUploadPreview } from "./ImageUploadPreview";
import "typeface-quicksand";

// eslint-disable-next-line
import Worker from "workerize-loader!../Converter";
import { Copy } from "styled-icons/fa-regular/Copy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  CopyIconWrapper,
  CopiedText,
  Heading,
  LoadingWrapper,
  A,
  Introduction
} from "./App.styles";
import { Flex } from "rebass";
import { GitHubLink } from "./GitHubLink";
import { WaveLoading } from "styled-spinkit";
import { imageToArray } from "../image-utils";
import { WavyLine } from "./WavyLine";

const comment = `--[[ 
  Copy this code to Roblox Command Bar.
  Or can copy to your projects workspace ModuleScript file. 
  And replace: 
      _G.Heightmap = h
  with: 
      return h
  And run it in Command Bar with command:
      _G.Heightmap = require (workspace.ModuleScript)

  ]]--`;

const defaultText = `
Drop height image to start generating heightmap. 
You can also include color image.
`;

let worker = new Worker();

export const App = () => {
  const [proccessing, setProccessing] = useState(false);
  const [codeResult, setCodeResult] = useState(defaultText);
  const [copied, setCopied] = useState(false);
  const [heightImage, setHeightImage] = useState();
  const [colorImage, setColorImage] = useState();

  useEffect(() => {
    async function calculate() {
      setProccessing(true);
      setCodeResult("...proccessing");
      const hImg = imageToArray(heightImage);
      const wImg = imageToArray(colorImage);
      const result = await worker.parseImage(hImg, wImg);
      setCodeResult(comment + "\n" + result);
      setProccessing(false);
    }
    if (heightImage) {
      calculate();
    }
  }, [heightImage, colorImage]);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading>Colors to Lua</Heading>
      <WavyLine />
      <Introduction>
        For generating input for Roblox Studio Heightmaster{" "}
        <A href="https://github.com/JoeSmaller/Heightmaster" target="_blank">
          plugin
        </A>{" "}
        (
        <A
          href="https://www.roblox.com/library/2768461796/Heightmaster"
          target="_blank"
        >
          source
        </A>
        ,{" "}
        <A
          href="https://devforum.roblox.com/t/heightmaster-a-way-to-convert-heightmaps-and-texturemaps-into-terrain/228585"
          target="_blank"
        >
          blog post
        </A>
        ){" "}
      </Introduction>
      <WavyLine />
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
      {proccessing && (
        <LoadingWrapper>
          <WaveLoading size={20} />
        </LoadingWrapper>
      )}
      {!proccessing && (
        <CopyToClipboard text={codeResult} onCopy={() => setCopied(true)}>
          <CopyIconWrapper>
            <Copy />
            {copied ? <CopiedText>Copied.</CopiedText> : null}
          </CopyIconWrapper>
        </CopyToClipboard>
      )}

      <Editor codeResult={codeResult} />
      <GitHubLink />
      <Footer />
    </Flex>
  );
};
