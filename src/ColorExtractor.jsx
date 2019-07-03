import * as React from "react";
import { Vibrant } from "./Vibrant";

// This component takes a src prop (image source, can be a blob or an image path) or intercepts it's children to get the image element,
// and parses the image using node-vibrant, and finally invokes the prop callback with an array of colors.
export const ColorExtractor = ({ src, children }) => {
  React.useEffect(() => {
    processImage();
  }, []);

  const parseImage = img => {
    new Vibrant(img);
  };

  React.useEffect(() => {
    if (typeof src === "string" && src.length > 0) {
      parseImage(src);
    } else if (children && children.props.src) {
      parseImage(children.props.src);
    }
  }, [src, children]);

  const processImage = () => {
    if (children) {
      if (children.props.src) {
        parseImage(children.props.src);
      }
    } else if (src && typeof src === "string" && src.length > 0) {
      // if the image is provided via src prop
      parseImage(src);
    } else {
      console.error(
        "Please provide an image url using the 'src' prop or wrap an image element under the <ColorExtractor /> component. Check out the docs for more info - https://goo.gl/rMZ5L7"
      );
    }
  };

  const length = React.Children.count(children);

  // We don't handle multiple images at the moment or custom components, sorry!
  if (length > 1) {
    throw new Error("Expected only one image element.");
  } else if (length === 1) {
    // Children should be an image element
    // $FlowFixMe
    if (children.type === "img") {
      return children;
    } else {
      throw new Error(
        `Expected children to be an image element but instead got a "${
          children.type
        }"`
      );
    }
  } else {
    return null;
  }
};
