import React from "react";
import DropZone from "react-dropzone";
import { Camera } from "styled-icons/boxicons-regular/Camera";
import { Button, Flex } from "rebass";
import {
  PreviewWrapper,
  PreviewImage,
  DropZoneWrapper,
  CameraIconWrapper
} from "./ImageUploadPreview.styles";

export const ImageUploadPreview = ({ image, setImage, title }) => {
  const onDropAccepted = acceptedFiles => {
    acceptedFiles.map(img => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = event => {
        const dataUrl = event.target.result;
        const image = new Image();
        image.src = dataUrl;
        image.onload = () => {
          setImage(image);
        };
      };
      return null;
    });
  };
  return (
    <PreviewWrapper>
      <DropZoneWrapper>
        <DropZone
          accept="image/jpeg, image/png"
          multiple={false}
          onDropAccepted={onDropAccepted}
          style={{}}
        >
          {({ getRootProps, getInputProps }) => (
            <Flex
              flexDirection="column"
              {...getRootProps()}
              justifyContent="space-between"
            >
              <input {...getInputProps()} />
              {image && <PreviewImage src={image.src} />}
              {!image && (
                <CameraIconWrapper>
                  <Camera />
                </CameraIconWrapper>
              )}

              <Button m={10} bg="#1771F1">
                {title}
              </Button>
            </Flex>
          )}
        </DropZone>
      </DropZoneWrapper>
    </PreviewWrapper>
  );
};
