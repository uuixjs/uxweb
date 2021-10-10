import {
  AlignItems,
  Background,
  Display,
  FlexWrap,
  JustifyContent,
  Layout,
} from "../../layout";
import { FC, MouseEventHandler, ReactNode } from "react";
import { staticTokenRule, styled } from "lib/ui-utils";

import { Icon } from "../../icon";
import { Interactable } from "../../interactable";
import { SVGAsset } from "../../svg";

export interface ToastProps {
  children?: ReactNode;
  tabIndex?: number;
  /**
   * @example ()=>{ alert('Close Event Detected') }
   */
  onClose: MouseEventHandler<HTMLElement>;
}

const ScToast = styled(Layout)`
  width: 100%;
  min-width: 30rem;
  z-index: ${staticTokenRule("z-index-notification")};
`;

const ScToastDismiss = styled(Layout)`
  /* Google minimum recommended touch target size.
  https://developers.google.com/speed/docs/insights/SizeTapTargetsAppropriately */
  min-width: 4.8rem;
  min-height: 4.8rem;
`;

// @deprecated Consider the Snackbar pattern instead.
export const Toast: FC<ToastProps> = (props) => {
  return (
    <Layout fullWidth>
      <ScToast
        display={Display.Flex}
        flexWrap={FlexWrap.NoWrap}
        className="tw-toast"
        elevation={3}
        background={Background.Base}
        border
      >
        <Layout flexGrow={1}>{props.children}</Layout>
        <Layout display={Display.Flex} flexShrink={0} borderLeft>
          <Interactable
            onClick={props.onClose}
            aria-label="Dismiss This"
            tabIndex={props.tabIndex}
            data-a-target="tw-toast-close"
          >
            <ScToastDismiss
              padding={1}
              display={Display.Flex}
              alignItems={AlignItems.Center}
              justifyContent={JustifyContent.Center}
              className="tw-toast__dismiss-target"
            >
              <Icon asset={SVGAsset.Close} />
            </ScToastDismiss>
          </Interactable>
        </Layout>
      </ScToast>
    </Layout>
  );
};

Toast.displayName = "Toast";
