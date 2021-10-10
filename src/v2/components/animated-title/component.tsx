import { Component, Fragment } from "react";
import { keyframes, staticTokenRule, styled } from "lib/ui-utils";

const DELAY_INTERVAL_MS = 30;
const DELIMITER = " ";
const DISTANCE = 60;

export interface AnimatedTitleProps {
  children: string;
}

interface ScAnimatedTitleSegmentProps {
  index: number;
}

const ScAnimatedTitleEntrance = keyframes`
  0% {
    opacity: 0;
    transform: translateY(${DISTANCE + "px"});
  }
  0.1% {
    opacity: 1;
  }
  25% {
    transform: translateY(${DISTANCE + "px"});
  }
  43% {
    transform: translateY(${DISTANCE * 0.896 + "px"});
  }
  43.75% {
    transform: translateY(${DISTANCE * 0.567 + "px"});
  }
  44.5% {
    transform: translateY(${DISTANCE * 0.307 + "px"});
  }
  55% {
    transform: translateY(${DISTANCE * 0.045 + "px"});
  }
  100% {
    transform: translateY(${DISTANCE * 0 + "px"});
  }
`;

const ScAnimatedTitleSegment = styled.span<ScAnimatedTitleSegmentProps>`
  font-family: ${staticTokenRule("font-display")};
  display: inline-block;
  animation-name: ${ScAnimatedTitleEntrance};
  animation-duration: 385ms;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: both;
  animation-delay: ${({ index }) => DELAY_INTERVAL_MS * index + "ms"};
`;

export class AnimatedTitle extends Component<AnimatedTitleProps, {}> {
  public render() {
    const segments = this.props.children.split(DELIMITER);

    return segments.map((s, i) => (
      <Fragment key={s + i}>
        <ScAnimatedTitleSegment
          className="tw-animated-title__segment"
          index={i}
        >
          {s}
        </ScAnimatedTitleSegment>
        {i < segments.length && DELIMITER && <span>{DELIMITER}</span>}
      </Fragment>
    ));
  }
}
