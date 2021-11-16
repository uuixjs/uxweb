import { Display, Layout, LayoutProps, Position } from "../../../layout";
import { FC, ReactNode } from "react";
import {
  css,
  getDataProps,
  hoverCssWithSelector,
  newUUIDv4,
  omitDataProps,
  rem,
  staticTokenRule,
  styleVariant,
  styled,
  themeTokenRule,
} from "lib";

export enum TooltipDirection {
  Top = "top",
  Bottom = "bottom",
  Left = "left",
  Right = "right",
}

export enum TooltipAlign {
  Left = "left",
  Center = "center",
  Right = "right",
}

export interface AttachedTooltipProps extends ScAttachedTooltipProps {
  children?: ReactNode;

  /**
   * The content of the tooltip.
   *
   * @example Viewers
   */
  label: string;
  id?: string;

  title?: string;
  disabled?: boolean;
  display?: Display;
}

interface ScAttachedTooltipProps {
  direction?: TooltipDirection | "top" | "bottom" | "left" | "right"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  align?: TooltipAlign | "left" | "center" | "right"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  width?: number;
  offsetX?: string;
  offsetY?: string;
  /**
   * Manually force the tooltip to be visible. Passing `false` allows default 'show on hover' behavior.
   *
   * @example true
   */
  show?: boolean;
}

const ScAttachedTooltipWrapper = styled(Layout)(() => undefined);

const tooltipArrowSize = 6;
const tooltipArrowOffset = 6;

const ScAttachedTooltip = styled.div<
  ScAttachedTooltipProps & { $wrap?: boolean }
>`
  padding: 3px 6px;
  border-radius: ${staticTokenRule("border-radius-medium")};
  background-color: ${themeTokenRule("color-background-tooltip")};
  color: ${themeTokenRule("color-text-tooltip")};
  display: ${({ show }) => (show ? "block" : "none")};
  position: absolute;
  left: 0;

  font-size: ${staticTokenRule("font-size-6")};
  font-weight: ${staticTokenRule("font-weight-semibold")};
  line-height: ${staticTokenRule("line-height-heading")};

  text-align: left;

  z-index: ${staticTokenRule("z-index-balloon")};
  pointer-events: none;
  user-select: none;

  width: ${({ width }) => width && rem(width)};
  white-space: ${({ $wrap }) => ($wrap ? "normal" : "nowrap")};

  ${hoverCssWithSelector(`${ScAttachedTooltipWrapper}:hover &`)`
    display: block;
  `}

  &::before,
  &::after {
    position: absolute;
    content: "";
  }
  &::before {
    top: ${-1 * tooltipArrowSize}px;
    left: ${-1 * tooltipArrowSize}px;
    width: calc(100% + ${tooltipArrowSize * 2}px);
    height: calc(100% + ${tooltipArrowSize * 2}px);
    z-index: ${staticTokenRule("z-index-below")};
  }
  &::after {
    background-color: ${themeTokenRule("color-background-tooltip")};
    width: ${tooltipArrowSize}px;
    height: ${tooltipArrowSize}px;
    transform: rotate(45deg);
    z-index: ${staticTokenRule("z-index-below")};
  }

  ${styleVariant("direction", {
    [TooltipDirection.Top]: styleVariant("align", {
      [TooltipAlign.Left]: css`
        margin-bottom: ${tooltipArrowSize}px;
        top: auto;
        bottom: 100%;
        left: 0;
        &::after {
          border-radius: 0 0 ${staticTokenRule("border-radius-small")};
          top: 100%;
          left: ${tooltipArrowOffset}px;
          margin-top: ${(-1 * tooltipArrowSize) / 2}px;
        }
      `,
      [TooltipAlign.Center]: css`
        margin-bottom: ${tooltipArrowSize}px;
        top: auto;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);

        &::after {
          border-radius: 0 0 ${staticTokenRule("border-radius-small")};
          top: 100%;
          left: 50%;
          margin-top: ${(-1 * tooltipArrowSize) / 2}px;
          margin-left: ${(-1 * tooltipArrowSize) / 2}px;
        }
      `,
      [TooltipAlign.Right]: css`
        margin-bottom: ${tooltipArrowSize}px;
        top: auto;
        bottom: 100%;
        right: 0;
        left: auto;

        &::after {
          border-radius: 0 0 ${staticTokenRule("border-radius-small")};
          top: 100%;
          left: 100%;
          margin-top: ${(-1 * tooltipArrowSize) / 2}px;
          margin-left: ${-1 * tooltipArrowOffset - tooltipArrowSize}px;
        }
      `,
    }),
    [TooltipDirection.Right]: css`
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
      margin-left: ${tooltipArrowSize}px;
      &::after {
        border-radius: 0 0 0 ${staticTokenRule("border-radius-small")};
        top: 50%;
        left: 0;
        margin-left: ${(-1 * tooltipArrowSize) / 2}px;
        margin-top: ${(-1 * tooltipArrowSize) / 2}px;
      }
    `,
    [TooltipDirection.Bottom]: styleVariant("align", {
      [TooltipAlign.Left]: css`
        margin-top: ${tooltipArrowSize}px;
        top: 100%;
        left: 0;
        &::after {
          border-radius: 0 0 ${staticTokenRule("border-radius-small")};
          left: ${tooltipArrowOffset}px;
          top: ${(-1 * tooltipArrowSize) / 2}px;
        }
      `,
      [TooltipAlign.Center]: css`
        margin-top: ${tooltipArrowSize}px;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);

        &::after {
          border-radius: 0 0 ${staticTokenRule("border-radius-small")};
          left: 50%;
          top: ${(-1 * tooltipArrowSize) / 2}px;
          margin-left: ${(-1 * tooltipArrowSize) / 2}px;
        }
      `,
      [TooltipAlign.Right]: css`
        margin-top: ${tooltipArrowSize}px;
        top: 100%;
        right: 0;
        left: auto;

        &::after {
          border-radius: 0 0 ${staticTokenRule("border-radius-small")};
          left: 100%;
          top: ${(-1 * tooltipArrowSize) / 2}px;
          margin-left: ${-1 * tooltipArrowOffset - tooltipArrowSize}px;
        }
      `,
    }),
    [TooltipDirection.Left]: css`
      right: 100%;
      left: auto;
      top: 50%;
      transform: translateY(-50%);
      margin-right: ${tooltipArrowSize}px;
      &::after {
        border-radius: 0 ${staticTokenRule("border-radius-small")} 0 0;
        top: 50%;
        left: 100%;
        margin-left: ${(-1 * tooltipArrowSize) / 2}px;
        margin-top: ${(-1 * tooltipArrowSize) / 2}px;
      }
    `,
  })}

  ${({ offsetX, align }) => {
    if (offsetX) {
      if (align === TooltipAlign.Right) {
        return { "margin-right": offsetX };
      } else {
        return { "margin-left": offsetX };
      }
    }
  }}

  ${({ offsetY, direction }) => {
    if (offsetY) {
      if (!direction || direction === TooltipDirection.Top) {
        return { "margin-bottom": offsetY };
      } else {
        return { "margin-top": offsetY };
      }
    }
  }}
`;

/**
 * Legacy implementation of Tooltip which uses CSS position: absolute.
 *
 * Displays a text label upon hover. A tooltip should provide contextual information about a given element.
 *
 * @deprecated Please migrate to the new `<Tooltip>` component; see Core UI 19.0.0 release notes and docs for migration steps.
 */
export const AttachedTooltip: FC<AttachedTooltipProps> = ({
  align = TooltipAlign.Center,
  direction = TooltipDirection.Top,
  show,
  display,
  children,
  label,
  id,
  width,
  offsetX,
  offsetY,
  title,
  disabled,
  ...props
}) => {
  const generatedId = newUUIDv4();

  const tooltipProps = {
    direction,
    align,
    width,
    offsetX,
    offsetY,
  };

  const wrapperProps: LayoutProps = {
    display: display ? display : Display.InlineFlex,
    position: Position.Relative,
    ...getDataProps(props),
  };

  if (!disabled) {
    Object.assign(wrapperProps, {
      "aria-describedby": id || generatedId,
      title,
    });
  }

  return (
    <ScAttachedTooltipWrapper {...wrapperProps}>
      {children}
      {!disabled && (
        <ScAttachedTooltip
          className="tw-tooltip"
          data-a-target="tw-tooltip-label"
          role="tooltip"
          id={id || generatedId}
          $wrap={!!width}
          show={show}
          {...tooltipProps}
          {...omitDataProps(props)}
        >
          {label}
        </ScAttachedTooltip>
      )}
    </ScAttachedTooltipWrapper>
  );
};

AttachedTooltip.displayName = "AttachedTooltip";
