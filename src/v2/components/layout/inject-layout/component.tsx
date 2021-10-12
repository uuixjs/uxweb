import {
  Children,
  PropsWithChildren,
  cloneElement,
  isValidElement,
} from "react";
import { CommonLayoutProps, propMap } from "../utils/layout-props";
import { cn, getAriaProps, getDataProps, styled } from "lib";

import { getLayoutStyles } from "../utils/common";

export interface InjectLayoutProps extends CommonLayoutProps {}

export const InjectLayout = styled(
  (props: PropsWithChildren<InjectLayoutProps>) => {
    const child = Children.only(props.children);

    if (!isValidElement(child)) {
      return null;
    }

    const classList = [];

    if (props.className) {
      const propClassNames = props.className.split(" "); // @ts-ignore
      classList.push(...propClassNames);
    }

    if (child.props.className) {
      const childClassNames = child.props.className.split(" "); // @ts-ignore
      classList.push(...childClassNames);
    }

    const mergedProps = {
      ...child.props,
      ...getDataProps(props),
      ...getAriaProps(props),
      className: cn(classList),
    };

    return cloneElement(child, mergedProps);
  },
)<InjectLayoutProps>((props) => getLayoutStyles(props, propMap));

InjectLayout.displayName = "InjectLayout";
