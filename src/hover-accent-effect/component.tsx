import {
  formatColor,
  hoverCssWithSelector,
  staticTokenRule,
  styled,
} from "@uuixjs/uuixweb-lib";

import { FC } from "react";

const FX_LENGTH = "0.6rem";
const HOVER_DELAY = "75ms";

export interface HoverAccentEffectProps {
  /* Manually force the effect to be visible. Passing `false` allows default behavior. */
  show?: boolean;
  /* A CSS color string such as "FFFFFF" or "rgb(255,255,255)" - if not provided, it will inherit from the nearest parent <AccentRegion> */
  color?: string | null;
}

export const HoverAccentEffect: FC<HoverAccentEffectProps> = (props) => {
  return (
    <ScWrapper colorAccent={props.color} className="tw-hover-accent-effect">
      <ScCornerTop
        show={props.show}
        transformValue={`translateY(-${FX_LENGTH}) scale(1)`}
      />
      <ScCornerBottom
        show={props.show}
        transformValue={`translateX(${FX_LENGTH}) scale(1)`}
      />
      <ScEdgeLeft show={props.show} transformValue={`scaleX(1)`} />
      <ScEdgeBottom show={props.show} transformValue={`scaleY(1)`} />
      <ScTransformWrapper
        transformValue={`translate3d(${FX_LENGTH}, -${FX_LENGTH}, 0)`}
        show={props.show}
      >
        {props.children}
      </ScTransformWrapper>
    </ScWrapper>
  );
};

export const ScWrapper = styled.div<{ colorAccent?: string | null }>`
  --color-accent: ${(props) =>
    props.colorAccent ? formatColor(props.colorAccent) : ""};
  position: relative;
`;

interface ScTransformWrapperProps {
  transformValue: string;
  show?: boolean;
}

const ScTransformWrapper = styled.div<ScTransformWrapperProps>`
  transition-property: transform;
  transition-timing-function: ease;
  transition-duration: ${staticTokenRule("timing-short")};

  transform: ${(props) => props.show && props.transformValue};

  ${hoverCssWithSelector(`${ScWrapper}:hover &&`)`
    transform: ${(props) => props.transformValue};
    transition-delay: ${HOVER_DELAY};
  `}

  ${/* sc-selector */ ScWrapper}:focus-within && {
    transform: ${(props) => props.transformValue};
  }
`;

const ScCornerTop = styled(ScTransformWrapper)`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-top: ${FX_LENGTH} solid transparent;
  border-bottom: ${FX_LENGTH} solid transparent;
  border-right: ${FX_LENGTH} solid var(--color-accent);
  transform-origin: center left;
  transform: ${(props) => !props.show && `translateY(-${FX_LENGTH}) scale(0)`};
`;

const ScCornerBottom = styled(ScTransformWrapper)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  border-left: ${FX_LENGTH} solid transparent;
  border-right: ${FX_LENGTH} solid transparent;
  border-top: ${FX_LENGTH} solid var(--color-accent);
  transform-origin: bottom center;
  transform: ${(props) => !props.show && `translateX(${FX_LENGTH}) scale(0)`};
`;

const ScEdgeLeft = styled(ScTransformWrapper)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background: var(--color-accent);
  transform-origin: 0 100%;
  width: ${FX_LENGTH};
  transform: ${(props) => !props.show && `scaleX(0)`};
`;

const ScEdgeBottom = styled(ScTransformWrapper)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-accent);
  transform-origin: 0 100%;
  height: ${FX_LENGTH};
  transform: ${(props) => !props.show && `scaleY(0)`};
`;
