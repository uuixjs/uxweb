import { Aspect, AspectRatio } from "../../aspect";
import { ButtonIcon, ButtonIconSize } from "../button-icon";
import { ForwardRefRenderFunction, forwardRef } from "react";
import { keyframes, styleVariant, styled } from "lib";

import { CoreInteractivePublicProps } from "../../core-interactive";

export enum ChromecastButtonStatus {
  Available = "available",
  Connecting = "connecting",
  Connected = "connected",
}

const ScChromecastButtonIcon = styled.div`
  fill: currentColor;
`;

const ScChromecastButtonIconWifiPath = styled.path<{
  variant: "a" | "b" | "c";
  animated?: boolean;
}>`
  animation-name: ${({ animated }) =>
    animated &&
    styleVariant("variant", {
      a: undefined,
      b: animated && ScWifiBLoading,
      c: animated && ScWifiCLoading,
    })};
  animation-duration: 1.6s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
`;

const ScWifiBLoading = keyframes`
  0% {
    opacity: 0.3;
  }
  33% {
    opacity: 0.3;
  }
  34% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;

const ScWifiCLoading = keyframes`
  0% {
    opacity: 0.3;
  }
  66% {
    opacity: 0.3;
  }
  67% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;

export interface ChromecastButtonProps extends CoreInteractivePublicProps {
  /**
   * Passes an `aria-label` to the component to provide context to assistive
   * devices. All standard HTML aria attributes are now supported on Core UI
   * components — see https://www.w3.org/TR/html-aria/."
   */
  "aria-label": string;
  status?: ChromecastButtonStatus | "available" | "connecting" | "connected"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  overlay?: boolean;
  size?: ButtonIconSize;
}

const ChromecastButton: ForwardRefRenderFunction<
  HTMLElement,
  ChromecastButtonProps
> = ({ status, ...buttonProps }, ref) => {
  const animated = status === ChromecastButtonStatus.Connecting;
  return (
    <ButtonIcon
      {...buttonProps}
      ref={ref}
      icon={
        <ScChromecastButtonIcon className="tw-chromecast-button__icon">
          <Aspect ratio={AspectRatio.Aspect1x1}>
            <svg
              width="100%"
              height="100%"
              version="1.1"
              viewBox={`0 0 20 20`}
              x="0px"
              y="0px"
            >
              <ScChromecastButtonIconWifiPath
                variant="a"
                d="M3 17a1 1 0 0 1-1-1v-1a2 2 0 0 1 2 2H3z"
              />
              <ScChromecastButtonIconWifiPath
                variant="b"
                animated={animated}
                d="M2 12.5a.5.5 0 0 1 .5-.5A4.5 4.5 0 0 1 7 16.5a.5.5 0 0 1-1 0A3.5 3.5 0 0 0 2.5 13a.5.5 0 0 1-.5-.5z"
              />
              <ScChromecastButtonIconWifiPath
                variant="c"
                animated={animated}
                d="M2 9.5a.5.5 0 0 1 .5-.5 7.5 7.5 0 0 1 7.5 7.5.5.5 0 0 1-1 0A6.5 6.5 0 0 0 2.5 10a.5.5 0 0 1-.5-.5z"
              />

              {status === ChromecastButtonStatus.Connected && (
                <path
                  className="tw-chromecast-button__screen"
                  d="M11.168 13H14V7H6v.832A10.037 10.037 0 0 1 11.168 13z"
                />
              )}

              <path
                className="tw-chromecast-button__frame"
                d="M2 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3.5a1 1 0 1 1 0-2H16V5H4v1.5a1 1 0 0 1-2 0V5z"
              />
            </svg>
          </Aspect>
        </ScChromecastButtonIcon>
      }
    />
  );
};

ChromecastButton.displayName = "ChromecastButton";
const ComponentWithRef = forwardRef(ChromecastButton);
export { ComponentWithRef as ChromecastButton };
