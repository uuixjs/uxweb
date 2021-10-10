import * as React from "react";
import {
  AlignItems,
  Background,
  Button,
  ButtonType,
  Display,
  JustifyContent,
  Layout,
  Position,
  TooltipLayer,
  TooltipWrapper,
  useTooltipState,
  ZIndex,
} from "v2";

export default { title: "Dialogs / TooltipLayer" };

export function WithNonStandardChild() {
  const { anchorProps, tooltipProps } = useTooltipState();

  return (
    <>
      <Button variant={ButtonType.Secondary} {...anchorProps}>
        Non-standard tooltip
      </Button>

      <TooltipLayer {...tooltipProps}>
        <div
          style={{
            padding: "2rem",
            background: "#003db8",
            border: "3px solid #00e6cb",
            color: "#FFFFFF",
            fontSize: "2rem",
            borderRadius: "1rem",
          }}
        >
          This is an extremely non-standard tooltip!
        </div>
      </TooltipLayer>
    </>
  );
}

/**
 * This story tests when a tooltip is rendered inside of an element which has a
 * positive z-index value set. This demonstrates that the tooltiip should still
 * appear in front of other elements which have a z-index defined.
 */
export function ZIndexBehavior() {
  const { anchorProps, tooltipProps } = useTooltipState();
  return (
    <Layout
      border
      background={Background.Alt}
      position={Position.Relative}
      zIndex={ZIndex.Above}
      style={{ height: "300px", width: "300px" }}
      display={Display.Flex}
      justifyContent={JustifyContent.Center}
      alignItems={AlignItems.Center}
    >
      <Button variant={ButtonType.Secondary} {...anchorProps}>
        A tooltip should be visible
      </Button>
      <TooltipLayer {...tooltipProps} show={true}>
        <TooltipWrapper>If you can see this, it works!</TooltipWrapper>
      </TooltipLayer>
    </Layout>
  );
}
