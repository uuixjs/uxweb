import { SVGAsset, SVG_PATHS } from "../../svg";

import { FC } from "react";
import { styled } from "@uuixjs/uuixweb-lib";

const ScFormRequired = styled.svg`
  fill: currentColor;
`;
export const FormRequired: FC<{}> = () => {
  return (
    <ScFormRequired
      className="tw-form-required"
      role="img"
      width="1em"
      height="1em"
      version="1.1"
      viewBox="0 0 12 12"
      x="0"
      y="0"
    >
      {SVG_PATHS[SVGAsset.Xsmallasterisk].path}
    </ScFormRequired>
  );
};

FormRequired.displayName = "FormRequired";
