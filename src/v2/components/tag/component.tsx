import {
  CoreInteractive,
  CoreInteractiveElement,
  CoreInteractivePublicProps,
} from "../core-interactive";
import { ForwardRefRenderFunction, forwardRef } from "react";
import { SVG, SVGAsset } from "../svg";
import {
  css,
  focusVisible,
  hoverCss,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "lib/ui-utils";

import { withOverlayContext } from "../overlay-region/context";

interface ScTagProps {
  $overlay: TagProps["overlay"];
}

const overlayStyles = css`
  color: ${themeTokenRule("color-text-overlay")};
  background-color: ${staticTokenRule("color-opac-b-6")};
  border-color: ${themeTokenRule("color-border-input-overlay")};

  &:not(:disabled) {
    ${focusVisible`
      border-color: ${themeTokenRule("color-border-input-overlay-focus")};
    `}

    ${hoverCss`
      text-decoration: none;
      color: ${themeTokenRule("color-text-overlay")};
      background-color: ${themeTokenRule(
        "color-background-interactable-overlay-hover",
      )};
    `}

    /* Active must be below Hover to take precedence */
    &:active {
      background-color: ${themeTokenRule(
        "color-background-interactable-overlay-active",
      )};
    }
  }
`;

const ScTag = styled(CoreInteractive)<ScTagProps>`
  display: inline-flex;
  border-radius: ${staticTokenRule("border-radius-rounded")};
  font-weight: ${staticTokenRule("font-weight-semibold")};
  color: ${themeTokenRule("color-text-tag")};
  background-color: ${themeTokenRule("color-background-tag-default")};
  border: ${staticTokenRule("border-width-tag")} solid transparent;
  height: 2rem;

  &:not(:disabled) {
    ${focusVisible`
      border-style: solid;
      border-width:${staticTokenRule("border-width-tag")};
      border-color: ${themeTokenRule("color-border-input-overlay-focus")};
      background-color: ${themeTokenRule("color-background-tag-hover")};
    `}

    ${hoverCss`
      text-decoration: none;
      color: ${themeTokenRule("color-text-tag")};
      background-color: ${themeTokenRule("color-background-tag-hover")};
    `}

    /* Active must be below Hover to take precedence */
    &:active {
      background-color: ${themeTokenRule("color-background-tag-active")};
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $overlay }) => $overlay && overlayStyles}
`;

const ScTagContent = styled.div<{ action: TagProps["action"] }>`
  display: flex;
  align-items: center;
  font-size: ${staticTokenRule("font-size-7")};
  padding: 0 0.8rem;
  padding-right: ${({ action }) => (action ? "0.4rem" : undefined)};
`;

const ScTagIconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 1.6rem;
  height: 1.6rem;
`;

export enum TagAction {
  Remove = "remove",
  Add = "add",
}

export interface TagProps extends CoreInteractivePublicProps {
  action?: TagAction | "remove" | "add"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  /**
   * Text to render within the tag.
   *
   * @example Competitive
   */
  label: string;
  overlay?: boolean;
}

export const TagComponent: ForwardRefRenderFunction<
  CoreInteractiveElement,
  TagProps
> = ({ label, action, overlay, ...tagProps }, ref) => {
  return (
    <ScTag className="tw-tag" $overlay={overlay} {...tagProps} ref={ref}>
      <ScTagContent action={action}>
        {label}
        {action && (
          <ScTagIconWrapper>
            <SVG
              fill
              asset={
                action === TagAction.Add
                  ? SVGAsset.Smallplus
                  : SVGAsset.Smallhide
              }
            />
          </ScTagIconWrapper>
        )}
      </ScTagContent>
    </ScTag>
  );
};

TagComponent.displayName = "Tag";
const ComponentWithRef = forwardRef(TagComponent);
const ComponentWithOverlayContext = withOverlayContext<TagProps, HTMLElement>(
  ComponentWithRef,
);
export { ComponentWithOverlayContext as Tag };
