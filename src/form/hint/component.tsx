import { Color, FontSize } from "../../layout";
import { CoreText, TextType } from "../../core-text";

import { FC } from "react";
import { getAriaProps } from "@uuixjs/uuixweb-lib";
import { withOverlayContext } from "../../overlay-region/context";

export interface FormHintProps {
  /**
   * @example Any combination of letters or numbers
   */
  hint: string;
  overlay?: boolean;
}

export const FormHintComponent: FC<FormHintProps> = (props) => {
  return (
    <CoreText
      type={TextType.P}
      fontSize={FontSize.Size7}
      color={props.overlay ? Color.OverlayAlt : Color.Alt2}
      {...getAriaProps(props)}
    >
      {props.hint}
    </CoreText>
  );
};

FormHintComponent.displayName = "FormHintComponent";

export const FormHint = withOverlayContext(FormHintComponent);
