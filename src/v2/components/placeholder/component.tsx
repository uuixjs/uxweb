import {
  rem,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "lib/ui-utils";

import { FC } from "react";
import { withOverlayContext } from "../overlay-region/context";

export interface PlaceholderProps {
  lineCount?: number;
  overlay?: boolean;
  height?: number;
  width?: number;
}

const ScPlaceholderWrapper = styled.span<PlaceholderProps>`
  width: 100%;
  height: 100%;
`;

export const ScPlaceholder = styled.span<PlaceholderProps>`
  display: flex;
  align-items: center;
  max-width: 100%;
  width: ${(props) => (props.width ? rem(props.width) : "100%")};
  height: ${(props) => (props.height ? rem(props.height) : "100%")};
  min-height: ${(props) => (props.height ? "0" : "1.7em")};

  &::before {
    border-radius: ${staticTokenRule("border-radius-small")};
    display: block;
    width: 100%;
    max-width: 100%;
    min-height: ${(props) => (props.height ? "0" : "calc(1em)")};
    height: ${(props) => (!props.lineCount ? "100%" : "")};
    content: "";

    /* Inverts the color for overlay applications. */
    background-color: ${(props) =>
      themeTokenRule(
        props.overlay
          ? "color-background-overlay-placeholder"
          : "color-background-placeholder",
      )};
  }

  /* Updates spacing between multiple lines. */
  &:not(:first-of-type) {
    margin-top: -0.1em;
  }
`;

/**
 * Placeholder content helps ease the pain of loading. They provide content
 * while the page is fetching data allowing for the page to take shape and
 * help make the page load feel faster.
 */
export const PlaceholderComponent: FC<PlaceholderProps> = ({
  lineCount,
  overlay,
  height,
  width,
  ...props
}) => {
  const placeholders: JSX.Element[] = [];

  for (let i = 0; i < (lineCount || 1); i++) {
    placeholders.push(
      <ScPlaceholder
        className="tw-placeholder"
        key={i}
        width={width}
        height={height}
        overlay={overlay}
        lineCount={lineCount}
      />,
    );
  }

  return (
    <ScPlaceholderWrapper className="tw-placeholder-wrapper" {...props}>
      {placeholders}
    </ScPlaceholderWrapper>
  );
};

PlaceholderComponent.displayName = "PlaceholderComponent";

export const Placeholder = withOverlayContext(PlaceholderComponent);
