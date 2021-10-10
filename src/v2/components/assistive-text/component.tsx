import { CoreText, TextType } from "../core-text";
import { Display, InjectLayout } from "../layout";
import { FC, ReactNode } from "react";

import { getAriaProps } from "lib/ui-utils";

export interface AssistiveTextProps {
  children: ReactNode;
  type?: TextType;
}

export const AssistiveText: FC<AssistiveTextProps> = (props) => {
  return (
    <InjectLayout display={Display.HideAccessible}>
      <CoreText type={props.type} {...getAriaProps(props)}>
        {props.children}
      </CoreText>
    </InjectLayout>
  );
};

AssistiveText.displayName = "AssistiveText";
