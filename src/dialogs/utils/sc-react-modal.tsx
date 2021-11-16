import { cn, staticTokenRule, styled } from "@uuixjs/uuixweb-lib";

import { PropsWithChildren } from "react";
import ReactModal from "react-modal";
import { useGetPortalThemeClass } from "./use-get-portal-theme-class";

export interface ScReactModalProps extends PropsWithChildren<ReactModal.Props> {
  className?: string; // Limit the type to disallow the "react-modal" "Classes" object.
}

/**
 * A version of ReactModal with CSS applied which:
 *   (1) removes the default styling from "react-modal"
 *   (2) adds z-index styling to position the portal in front of other content
 *
 * IMPORTANT: styled-components works by adding a "className" prop with the associated styles,
 * so in ScReactModal we re-assign it to the "react-modal" prop "portalClassName" because
 * that is really where we intend for the CSS to be applied.
 */
export const ScReactModal = styled(
  ({ className, portalClassName, ...props }: ScReactModalProps) => (
    <ReactModal
      {...props}
      className="react-modal__content" // Prevents react-modal default css from being added
      overlayClassName="react-modal__overlay" // Prevents react-modal default css from being added
      portalClassName={cn(className, portalClassName, useGetPortalThemeClass())} // styled-components "className" needs to be on the portal root
    />
  ),
)`
  position: relative;
  z-index: ${staticTokenRule("z-index-modal")};
`;
