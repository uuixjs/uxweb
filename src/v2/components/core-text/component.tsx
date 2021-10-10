import { CoreTextCssProps, textPropMap } from "./utils/text-props";
import { HTMLProps, ReactNode } from "react";
import { TextType, TextTypeValue } from "./types";

import { FontWeight } from "../layout";
import { getLayoutStyles } from "../layout/utils/common";
import { styled } from "lib/ui-utils";

export interface CoreTextProps extends CoreTextCssProps {
  children?: ReactNode;
  align?: CoreTextCssProps["verticalAlign"];
  bold?: boolean;
  type?: TextType | TextTypeValue;
  title?: string;
}

type Props = CoreTextProps &
  Omit<HTMLProps<HTMLElement>, "color" | "as" | "ref">;

export const CoreText = styled.p
  .attrs((props: Props) => ({
    as: props.type,
    verticalAlign: props.align,
    ellipsis: props.ellipsis || props.lines === 1,
    fontWeight: props.fontWeight
      ? props.fontWeight
      : props.bold
      ? FontWeight.SemiBold
      : undefined,
    title:
      props.ellipsis &&
      typeof props.title !== "string" &&
      typeof props.children === "string"
        ? props.children
        : props.title,
  }))
  .withConfig({
    shouldForwardProp: (propName, defaultValidatorFn) => {
      if (propName in textPropMap) {
        return false;
      }

      // Special CoreText props, which just get re-mapped to other props
      // @ts-expect-error These strings exist even though the right type is not inferred here.
      if (propName === "align" || propName === "bold" || propName === "type") {
        return false;
      }

      return defaultValidatorFn(propName);
    },
  })<Props>((props) => getLayoutStyles(props, textPropMap));

CoreText.displayName = "CoreText";
