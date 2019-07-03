import React from "react";
import MonacoEditor from "@uiw/react-monacoeditor";

const options = {
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: "line",
  automaticLayout: false,
  theme: "vs-dark"
};
export const Editor = ({ codeResult }) => {
  return (
    <MonacoEditor
      height={600}
      language="lua"
      theme="vs-dark"
      value={codeResult}
      options={options}
    />
  );
};
