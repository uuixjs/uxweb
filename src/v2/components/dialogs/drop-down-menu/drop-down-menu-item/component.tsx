import { AlignItems, Display, Layout, Position } from "../../../layout";
import {
  DropDownMenuItemFigure,
  DropDownMenuItemFigureProps,
} from "../drop-down-menu-item-figure";
import { FC, Fragment, ReactNode } from "react";
import { Interactable, InteractableType } from "../../../interactable";

import { BorderRadius } from "lib/ui-utils";
import { CoreInteractivePublicProps } from "../../../core-interactive";
import { Icon } from "../../../icon";
import { SVGAsset } from "../../../svg";

export type DropDownMenuActionIcon =
  | SVGAsset.AngleRight
  | SVGAsset.Popout
  | SVGAsset.Externallink;

export interface DropDownMenuItemProps extends CoreInteractivePublicProps {
  /**
   * Content to render inside the menu item, this replaces label and value as recommended path for custom menus
   * Label and value will be ignored if children exists.
   */
  children?: ReactNode;
  /**
   * The link label; e.g. "About Us".
   *
   * @deprecated Use children to fully control the menu item content between the figure and selected / action icon
   */
  label?: string;
  /* Icon or image to display with the menu item. */
  figure?: DropDownMenuItemFigureProps;
  /**
   * An icon (from a subset of icons) that provide a visual cue of what interacting with the item will do.
   * This icon takes priority over the selected icon if both exist
   */
  actionIcon?: DropDownMenuActionIcon;
  /**
   * Type of interactable to render.
   */
  variant?: InteractableType.Alpha | InteractableType.Alert;
  /* Indicates whether the item in the menu is currently selected */
  selected?: boolean;
  /**
   * Indicates the selected value of an item – such as a language selection.
   *
   * @deprecated Use children to fully control menu item content between the figure and selected / action icon
   */
  value?: string;
}

export const DropDownMenuItem: FC<DropDownMenuItemProps> = ({
  label,
  figure,
  actionIcon,
  variant,
  selected,
  value,
  ...props
}) => {
  let figureElement: JSX.Element | undefined;
  let iconElement: JSX.Element | undefined;
  let valueElement: JSX.Element | undefined;
  let labelElement: JSX.Element | undefined;

  if (figure) {
    figureElement = (
      <Layout
        display={Display.Flex}
        alignItems={AlignItems.Center}
        padding={{ right: 0.5 }}
        flexShrink={0}
      >
        <DropDownMenuItemFigure {...figure} />
      </Layout>
    );
  }

  if (value) {
    valueElement = (
      <Layout
        alignItems={AlignItems.Center}
        padding={{ x: 0.5 }}
        margin={{ left: 1 }}
      >
        {value}
      </Layout>
    );
  }

  if (props.children) {
    labelElement = <Layout flexGrow={1}>{props.children}</Layout>;
  } else {
    labelElement = (
      <Fragment>
        <Layout flexGrow={1}>{label}</Layout>
        {valueElement}
      </Fragment>
    );
  }

  if (selected && !actionIcon) {
    iconElement = <Icon asset={SVGAsset.Check} />;
  } else if (actionIcon) {
    iconElement = <Icon asset={actionIcon} />;
  }

  if (iconElement) {
    iconElement = (
      <Layout
        display={Display.Flex}
        alignItems={AlignItems.Center}
        margin={value ? { left: 0.5 } : { left: 2 }}
        flexShrink={0}
      >
        {iconElement}
      </Layout>
    );
  }

  return (
    <Layout position={Position.Relative} fullWidth>
      <Interactable
        variant={variant}
        borderRadius={BorderRadius.Medium}
        selected={selected}
        {...props}
      >
        <Layout
          display={Display.Flex}
          alignItems={AlignItems.Center}
          position={Position.Relative}
          padding={0.5}
        >
          {figureElement}
          {labelElement}
          {iconElement}
        </Layout>
      </Interactable>
    </Layout>
  );
};

DropDownMenuItem.displayName = "DropDownMenuItem";
