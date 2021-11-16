import {
  AlignItems,
  Background,
  Display,
  Elevation,
  FlexDirection,
  JustifyContent,
  Layout,
  Position,
} from "../layout";
import { BorderRadius, Padding, styled } from "@uuixjs/uuixweb-lib";
import { CloseButtonProps, CoreDismissible } from "../core-dismissible";
import { FC, ReactNode } from "react";

import { ButtonIconSize } from "../button/button-icon";
import { OverlayRegion } from "../overlay-region";

export enum CalloutOrientation {
  Column = "column",
  Row = "row",
}

export interface CalloutProps {
  /**
   * Sets the Callout background color. Defaults to Background.Base.
   */
  background?: Background.Base | Background.Accent | Background.AccentAlt;
  /**
   * Sets Callout elevation. Defaults to 4.
   */
  elevation?: Elevation;
  /**
   * Renders a close button target.
   */
  closeButton?: CloseButtonProps;
  /**
   * The message of the callout. Accomodates a CalloutMessage component.
   */
  message?: ReactNode;
  /*
   * Insert an optional figure to render inline before the title.
   */
  figure?: ReactNode;
  /**
   * Up to two actionable buttons as part of the banner.
   */
  actions?: ReactNode;
  /*
   * Displays Callout as a column or row of elements. Defaults to Column.
   */
  orientation?: CalloutOrientation | "column" | "row"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  /*
   * Padding for callout interior. Defaults to 2.
   */
  padding?: Padding;
}

const ScCalloutClose = styled(Layout)`
  display: inline-flex;
  align-self: start;
  flex-shrink: 0;
  float: right;
`;

export const Callout: FC<CalloutProps> = ({
  background,
  elevation,
  closeButton,
  message,
  figure,
  actions,
  orientation = CalloutOrientation.Column,
  padding = 2,
  ...props
}) => {
  const closeButtoneElement = closeButton && (
    <ScCalloutClose className="tw-callout__close" margin={{ left: 1 }}>
      <CoreDismissible
        aria-label={closeButton["aria-label"]}
        onClick={closeButton.onClick}
        size={ButtonIconSize.Small}
      />
    </ScCalloutClose>
  );

  return (
    <Layout
      {...props}
      background={background}
      borderRadius={BorderRadius.Medium}
      elevation={elevation}
      position={Position.Relative}
      padding={padding}
    >
      <OverlayRegion overlay={background && background !== Background.Base}>
        <Layout
          display={Display.Flex}
          alignItems={AlignItems.Start}
          flexDirection={
            orientation === CalloutOrientation.Row
              ? FlexDirection.Row
              : FlexDirection.Column
          }
        >
          <Layout
            fullWidth
            display={Display.Flex}
            alignItems={AlignItems.Start}
          >
            {figure && (
              <Layout
                margin={{ right: 1 }}
                padding={0.5}
                display={Display.Flex}
                flexGrow={0}
                flexShrink={0}
                alignItems={AlignItems.Center}
                justifyContent={JustifyContent.Center}
              >
                {figure}
              </Layout>
            )}
            <Layout flexGrow={1}>
              {orientation === CalloutOrientation.Column && closeButtoneElement}
              {message}
            </Layout>
          </Layout>
          {actions && (
            <Layout
              display={Display.Flex}
              justifyContent={JustifyContent.End}
              margin={{
                top: orientation === CalloutOrientation.Column ? 1 : 0,
                left: orientation === CalloutOrientation.Column ? 0 : 1,
              }}
              fullWidth={orientation === CalloutOrientation.Column}
            >
              {actions}
            </Layout>
          )}
          {orientation === CalloutOrientation.Row && closeButtoneElement}
        </Layout>
      </OverlayRegion>
    </Layout>
  );
};

Callout.defaultProps = {
  background: Background.Base,
  elevation: 1,
  padding: 2,
};

Callout.displayName = "Callout";
