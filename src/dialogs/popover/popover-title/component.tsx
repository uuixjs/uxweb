import { FC } from "react";
import { CoreText, TextType } from "../../../core-text";
import { Color, FontWeight, InjectLayout, TextAlign } from "../../../layout";
import { withOverlayContext } from "../../../overlay-region/context";

export interface PopoverTitleProps {
  title: string;
  subtitle?: string;
  overlay?: boolean;
}

export const PopoverTitleComponent: FC<PopoverTitleProps> = (props) => {
  const { title, subtitle } = props;
  return (
    <>
      <InjectLayout
        textAlign={TextAlign.Center}
        fontWeight={FontWeight.SemiBold}
      >
        <CoreText
          type={TextType.H5}
          color={props.overlay ? Color.Overlay : Color.Alt}
        >
          {title}
        </CoreText>
      </InjectLayout>
      {subtitle ? (
        <InjectLayout textAlign={TextAlign.Center}>
          <CoreText
            type={TextType.H6}
            color={props.overlay ? Color.OverlayAlt : Color.Alt2}
          >
            {subtitle}
          </CoreText>
        </InjectLayout>
      ) : null}
    </>
  );
};

PopoverTitleComponent.displayName = "PopoverTitle";
export const PopoverTitle = withOverlayContext(PopoverTitleComponent);
