import { CoreText, TextTransform, TextType } from "../core-text";
import { FC, ReactNode } from "react";
import { FontSize, FontWeight } from "../layout";

import { getAriaProps } from "lib/ui-utils";

export interface HeaderProps {
  children?: ReactNode;
  ellipsis?: boolean;
  type?: TextType;
}

export const Header: FC<HeaderProps> = (props) => {
  return (
    <CoreText
      type={props.type}
      fontSize={FontSize.Size6}
      fontWeight={FontWeight.SemiBold}
      transform={TextTransform.Uppercase}
      ellipsis={props.ellipsis}
      {...getAriaProps(props)}
    >
      {props.children}
    </CoreText>
  );
};

Header.displayName = "Header";
