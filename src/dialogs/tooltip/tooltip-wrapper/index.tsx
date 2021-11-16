import {
  BorderRadius,
  rem,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";
import { FC, ReactNode } from "react";
import { FontSize, Layout } from "../../../layout";

import { StandardLonghandProperties } from "csstype";

export interface TooltipWrapperProps {
  children?: ReactNode;
  id?: string;
  width?: StandardLonghandProperties["width"];
  maxWidth?: StandardLonghandProperties["maxWidth"];
}

const ScTooltipWrapper = styled(Layout)`
  display: inline-block;
  font-weight: ${staticTokenRule("font-weight-semibold")};
  line-height: ${staticTokenRule("line-height-heading")};
  color: ${themeTokenRule("color-text-tooltip")};
  background-color: ${themeTokenRule("color-background-tooltip")};
`;

export const TooltipWrapper: FC<TooltipWrapperProps> = ({
  children,
  width,
  maxWidth = rem(300),
  ...otherProps
}) => {
  return (
    <ScTooltipWrapper
      className="tw-tooltip-wrapper"
      fontSize={FontSize.Size6}
      borderRadius={BorderRadius.Medium}
      padding={0.5}
      {...otherProps}
      width={width}
      maxWidth={maxWidth}
    >
      {children}
    </ScTooltipWrapper>
  );
};

TooltipWrapper.displayName = "TooltipWrapper";
