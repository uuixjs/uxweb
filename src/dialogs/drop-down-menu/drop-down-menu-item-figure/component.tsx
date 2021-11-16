import { AlignItems, Display, InjectLayout, Layout } from "../../../layout";
import { Aspect, AspectRatio } from "../../../aspect";
import { CoreImage, CoreImageProps } from "../../../core-image";
import { getAriaProps, styled } from "lib";

import { FC } from "react";
import { Icon } from "../../../icon";
import { SVGAsset } from "../../../svg";
import { getImageProps } from "../../../_utils/image-props";

export interface DropDownMenuItemImageProps extends CoreImageProps {
  aspectRatio?: AspectRatio;
}

export interface DropDownMenuItemIconProps {
  icon: SVGAsset;
}

const ScDropDownMenuItemFigureImage = styled.div`
  width: 2rem;
`;
export type DropDownMenuItemFigureProps =
  | DropDownMenuItemImageProps
  | DropDownMenuItemIconProps;

export const DropDownMenuItemFigure: FC<DropDownMenuItemFigureProps> = (
  props,
) => {
  let figure: JSX.Element | undefined;

  if (isDropDownMenuItemImage(props)) {
    figure = (
      <ScDropDownMenuItemFigureImage>
        <Aspect ratio={props.aspectRatio || AspectRatio.Aspect1x1}>
          <CoreImage {...getImageProps(props)} />
        </Aspect>
      </ScDropDownMenuItemFigureImage>
    );
  }

  if (isDropDownMenuItemImageIcon(props)) {
    figure = (
      <Layout display={Display.Flex} alignItems={AlignItems.Center}>
        <Icon asset={props.icon} />
      </Layout>
    );
  }

  return (
    <InjectLayout
      className="tw-drop-down-menu-item-figure"
      {...getAriaProps(props)}
    >
      {figure}
    </InjectLayout>
  );
};

function isDropDownMenuItemImage(
  arg: DropDownMenuItemImageProps | DropDownMenuItemIconProps,
): arg is CoreImageProps {
  return (
    (arg as CoreImageProps).src !== undefined &&
    (arg as CoreImageProps).alt !== undefined
  );
}

function isDropDownMenuItemImageIcon(
  arg: DropDownMenuItemImageProps | DropDownMenuItemIconProps,
): arg is DropDownMenuItemIconProps {
  return (arg as CoreImageProps).src === undefined;
}

DropDownMenuItemFigure.displayName = "DropDownMenuItemFigure";
