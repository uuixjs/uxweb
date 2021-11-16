import { Color, FontSize, Layout } from "../../../layout";
import { CoreText, TextTransform } from "../../../core-text";

import { FC } from "react";
import { getAriaProps } from "@uuixjs/uuixweb-lib";
import { withOverlayContext } from "../../../overlay-region/context";

export interface DropDownMenuHeadingProps {
  children?: string;
  overlay?: boolean;
}

export const DropDownMenuHeadingComponent: FC<DropDownMenuHeadingProps> = (
  props,
) => {
  return (
    <Layout padding={{ x: 0.5 }} margin={{ y: 0.5 }} {...getAriaProps(props)}>
      <CoreText
        color={props.overlay ? Color.Overlay : Color.Alt2}
        fontSize={FontSize.Size6}
        transform={TextTransform.Uppercase}
        bold
      >
        {props.children}
      </CoreText>
    </Layout>
  );
};

DropDownMenuHeadingComponent.displayName = "DropDownMenuHeadingComponent";

export const DropDownMenuHeading = withOverlayContext(
  DropDownMenuHeadingComponent,
);
