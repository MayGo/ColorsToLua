import React from "react";
import DropZone from "react-dropzone";
import { Camera } from "styled-icons/boxicons-regular/Camera";
import { Button } from "rebass";
import {
  PreviewWrapper,
  PreviewImage,
  DropZoneWrapper
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
      {image && <PreviewImage src={image.src} />}
      <DropZoneWrapper>
        <DropZone
          accept="image/jpeg, image/png"
          multiple={false}
          onDropAccepted={onDropAccepted}
          style={{}}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Camera />
              <Button>{title}</Button>
            </div>
          )}
        </DropZone>
      </DropZoneWrapper>
    </PreviewWrapper>
  );
};
