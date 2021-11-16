import { staticTokenRule, styleVariant, styled } from "@uuixjs/uuixweb-lib";

// TODO: Rename the enum
export enum BalloonDirection {
  Top = "top",
  Bottom = "bottom",
  Left = "left",
  Right = "right",
  TopLeft = "top-left",
  TopRight = "top-right",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
  TopCenter = "top-center",
  BottomCenter = "bottom-center",
  LeftCenter = "left-center",
  RightCenter = "right-center",
}

export interface AttachedProps {
  /** Direction the child will go. */
  direction?:
    | BalloonDirection
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center"
    | "left-center"
    | "right-center"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  /** Offsets the child position horizontally; string should include a CSS unit such as '10px' */
  offsetX?: string;
  /** Offsets the child position vertically; string should include a CSS unit such as '10px' */
  offsetY?: string;
}

const positionedMargin = "8px";

/**
 * Applies CSS Absolute positioning to the child to appear just outside of
 * the nearest parent positiooning context, such as position: relative.
 */
export const Attached = styled.div.attrs<AttachedProps>(
  ({ direction = BalloonDirection.Bottom }) => ({
    direction,
  }),
)<AttachedProps>`
  position: absolute;
  z-index: ${staticTokenRule("z-index-balloon")};

  ${styleVariant("direction", {
    [BalloonDirection.Top]: {
      top: "auto",
      bottom: "100%",
      left: 0,
      "margin-bottom": positionedMargin,
    },
    [BalloonDirection.Bottom]: {
      top: "100%",
      left: 0,
      "margin-top": positionedMargin,
    },
    [BalloonDirection.Left]: {
      top: 0,
      right: "100%",
      "margin-right": positionedMargin,
    },
    [BalloonDirection.Right]: {
      top: 0,
      left: "100%",
      "margin-left": positionedMargin,
    },
    [BalloonDirection.TopLeft]: {
      top: "auto",
      bottom: "100%",
      "margin-bottom": positionedMargin,
      right: "auto",
      left: 0,
    },
    [BalloonDirection.TopRight]: {
      top: "auto",
      bottom: "100%",
      "margin-bottom": positionedMargin,
      right: 0,
      left: "auto",
    },
    [BalloonDirection.BottomRight]: {
      top: "100%",
      "margin-top": positionedMargin,
      right: 0,
      left: "auto",
    },
    [BalloonDirection.BottomLeft]: {
      top: "100%",
      "margin-top": positionedMargin,
      right: "auto",
      left: 0,
    },
    [BalloonDirection.TopCenter]: {
      top: "auto",
      bottom: "100%",
      "margin-bottom": positionedMargin,
      left: "50%",
      transform: "translateX(-50%)",
    },
    [BalloonDirection.BottomCenter]: {
      top: "100%",
      "margin-top": positionedMargin,
      left: "50%",
      transform: "translateX(-50%)",
    },
    [BalloonDirection.LeftCenter]: {
      right: "100%",
      "margin-right": positionedMargin,
      top: "50%",
      transform: "translateY(-50%)",
    },
    [BalloonDirection.RightCenter]: {
      left: "100%",
      "margin-left": positionedMargin,
      top: "50%",
      transform: "translateY(-50%)",
    },
  })}

  ${(props) => {
    let marginLeft: string | undefined;
    let marginRight: string | undefined;
    let marginTop: string | undefined;
    let marginBottom: string | undefined;

    if (props.offsetX) {
      if (
        props.direction === BalloonDirection.Left ||
        props.direction === BalloonDirection.TopLeft ||
        props.direction === BalloonDirection.BottomLeft ||
        props.direction === BalloonDirection.LeftCenter ||
        props.direction === BalloonDirection.BottomRight ||
        props.direction === BalloonDirection.TopRight
      ) {
        marginRight = props.offsetX;
      } else {
        marginLeft = props.offsetX;
      }
    }

    if (props.offsetY) {
      if (
        props.direction === BalloonDirection.Top ||
        props.direction === BalloonDirection.TopLeft ||
        props.direction === BalloonDirection.TopRight ||
        props.direction === BalloonDirection.TopCenter
      ) {
        marginBottom = props.offsetY;
      } else {
        marginTop = props.offsetY;
      }
    }

    return {
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
    };
  }}
`;

Attached.displayName = "Attached";
