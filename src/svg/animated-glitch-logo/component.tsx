import { Component, RefObject, createRef } from "react";
import {
  PaddingProps,
  getPaddingStyles,
  keyframes,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";

export enum GlitchAnimationStep {
  mouseEnter = "mouse-enter",
  mouseLeave = "mouse-leave",
  mouseDown = "mouse-down",
  mouseUp = "mouse-up",
}

const PATH_BODY_STARTING = "13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8";
const PATH_BODY_EXTENDED = "16 5 8 13 8 31 14 31 14 36 19 31 23 31 35 19 35 5";
const PATH_FACE = "26 25 30 21 30 10 14 10 14 25 18 25 18 29 22 25";
const PATH_EYES =
  "M20,14 L22,14 L22,20 L20,20 L20,14 Z M27,14 L27,20 L25,20 L25,14 L27,14 Z";

const DURATIONS = {
  [GlitchAnimationStep.mouseEnter]: 150,
  [GlitchAnimationStep.mouseLeave]: 250,
  [GlitchAnimationStep.mouseDown]: 50,
  [GlitchAnimationStep.mouseUp]: 75,
};

const ScLogoContainer = styled.div<PaddingProps>`
  ${getPaddingStyles}
  display: inline-flex;
`;

const ScFigure = styled.figure`
  display: inline-flex;
`;

const ScSvg = styled.svg`
  fill: currentColor;
`;

const ScBody = styled.polygon`
  fill: ${themeTokenRule("color-fill-brand")};
`;

const ScFace = styled.polygon`
  fill: ${staticTokenRule("color-white")};
`;

const ScEyesAnimation = keyframes`
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 0.35);
  }
  100% {
    transform: scale(1, 1);
  }
`;

interface ScEyesProps {
  blinking: boolean;
}

const ScEyes = styled.g<ScEyesProps>`
  animation-duration: 0.2s;
  animation-iteration-count: 2;
  animation-name: ${(props) => (props.blinking ? ScEyesAnimation : "none")};
  animation-play-state: ${(props) => (props.blinking ? "running" : "paused")};
  transform-origin: 0% 35%;
  will-change: transform;
`;

export interface AnimatedGlitchLogoProps extends PaddingProps {
  width?: number;
  height?: number;
}

interface RefMap {
  [key: string]: RefObject<SVGAnimateElement>;
}

type SVGAnimateElement = SVGElement & { beginElement?: () => void };

export interface AnimatedGlitchLogoState extends ScEyesProps {}

export class AnimatedGlitchLogo extends Component<
  AnimatedGlitchLogoProps,
  AnimatedGlitchLogoState
> {
  public state: AnimatedGlitchLogoState = { blinking: false };
  private timer: number | undefined;
  private animationQueue: GlitchAnimationStep[] = [];

  private svgRef: RefObject<SVGSVGElement> = createRef();

  private bodyRefs: RefMap = {
    [GlitchAnimationStep.mouseEnter]: createRef(),
    [GlitchAnimationStep.mouseLeave]: createRef(),
    [GlitchAnimationStep.mouseDown]: createRef(),
    [GlitchAnimationStep.mouseUp]: createRef(),
  };

  private faceRefs: RefMap = {
    [GlitchAnimationStep.mouseEnter]: createRef(),
    [GlitchAnimationStep.mouseLeave]: createRef(),
    [GlitchAnimationStep.mouseDown]: createRef(),
    [GlitchAnimationStep.mouseUp]: createRef(),
  };

  private eyeRefs: RefMap = {
    [GlitchAnimationStep.mouseEnter]: createRef(),
    [GlitchAnimationStep.mouseLeave]: createRef(),
    [GlitchAnimationStep.mouseDown]: createRef(),
    [GlitchAnimationStep.mouseUp]: createRef(),
  };

  public render() {
    const { mouseDown, mouseUp, mouseEnter, mouseLeave } = GlitchAnimationStep;
    return (
      <ScLogoContainer
        className="tw-animated-glitch-logo"
        padding={this.props.padding}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        <ScFigure>
          <ScSvg
            ref={this.svgRef}
            overflow={"visible"}
            width={(this.props.width || 40) + "px"}
            height={(this.props.height || 40) + "px"}
            version="1.1"
            viewBox={`0 0 40 40`}
            x="0px"
            y="0px"
          >
            <g>
              <ScBody points={PATH_BODY_STARTING}>
                <animate
                  {...this.getAttributes(mouseEnter, this.bodyRefs)}
                  attributeName="points"
                  from={PATH_BODY_STARTING}
                  to={PATH_BODY_EXTENDED}
                />
                <animate
                  {...this.getAttributes(mouseLeave, this.bodyRefs)}
                  attributeName="points"
                  from={PATH_BODY_EXTENDED}
                  to={PATH_BODY_STARTING}
                />
                <animate
                  {...this.getAttributes(mouseDown, this.bodyRefs)}
                  attributeName="points"
                  to={PATH_BODY_STARTING}
                  from={PATH_BODY_EXTENDED}
                />
                <animate
                  {...this.getAttributes(mouseUp, this.bodyRefs)}
                  attributeName="points"
                  to={PATH_BODY_EXTENDED}
                  from={PATH_BODY_STARTING}
                />
              </ScBody>
              <ScFace points={PATH_FACE}>
                <animateTransform
                  {...this.getAttributes(mouseEnter, this.faceRefs)}
                  attributeName="transform"
                  type="translate"
                  from="0 0"
                  to="3 -3"
                />
                <animateTransform
                  {...this.getAttributes(mouseLeave, this.faceRefs)}
                  attributeName="transform"
                  type="translate"
                  from="3 -3"
                  to="0 0"
                />
                <animateTransform
                  {...this.getAttributes(mouseDown, this.faceRefs)}
                  attributeName="transform"
                  type="translate"
                  from="3 -3"
                  to="0 0"
                />
                <animateTransform
                  {...this.getAttributes(mouseUp, this.faceRefs)}
                  attributeName="transform"
                  type="translate"
                  from="0 0"
                  to="3 -3"
                />
              </ScFace>
              <ScEyes
                blinking={this.state.blinking}
                onAnimationEnd={this.onBlinkEyesEnd}
              >
                <ScBody as="path" d={PATH_EYES}>
                  <animateTransform
                    {...this.getAttributes(mouseEnter, this.eyeRefs)}
                    attributeName="transform"
                    type="translate"
                    from="0 0"
                    to="3 -3"
                  />
                  <animateTransform
                    {...this.getAttributes(mouseLeave, this.eyeRefs)}
                    attributeName="transform"
                    type="translate"
                    from="3 -3"
                    to="0 0"
                  />
                  <animateTransform
                    {...this.getAttributes(mouseDown, this.eyeRefs)}
                    attributeName="transform"
                    type="translate"
                    from="3 -3"
                    to="0 0"
                  />
                  <animateTransform
                    {...this.getAttributes(mouseUp, this.eyeRefs)}
                    attributeName="transform"
                    type="translate"
                    from="0 0"
                    to="3 -3"
                  />
                </ScBody>
              </ScEyes>
            </g>
          </ScSvg>
        </ScFigure>
      </ScLogoContainer>
    );
  }

  private getAttributes(step: GlitchAnimationStep, refs: RefMap) {
    return {
      dur: `${DURATIONS[step]}ms`,
      ref: refs[step],
      begin: "indefinite",
      fill: "freeze",
      calcMode: "spline",
      keyTimes: "0; 1",
      keySplines: "0.25 0.1 0.25 1",
    };
  }

  private onMouseEnter = () => {
    // Start this animation immediately in order to provide responsive UX
    this.queueAnimation(GlitchAnimationStep.mouseEnter, true);
  };

  private onMouseLeave = () => {
    this.queueAnimation(GlitchAnimationStep.mouseLeave);
  };

  private onMouseDown = () => {
    // Start this animation immediately in order to provide responsive UX
    this.queueAnimation(GlitchAnimationStep.mouseDown, true);
  };

  private onMouseUp = () => {
    this.queueAnimation(GlitchAnimationStep.mouseUp);
  };

  private queueAnimation(step: GlitchAnimationStep, startNow: boolean = false) {
    if (step === GlitchAnimationStep.mouseEnter) {
      this.fixSVGAnimationBug();
    }

    if (this.timer && !startNow) {
      this.animationQueue.push(step);
      return;
    }

    this.animationQueue = [step];
    this.runNextAnimation();
  }

  private runNextAnimation = () => {
    clearTimeout(this.timer);
    this.timer = undefined;
    const step = this.animationQueue.shift();
    if (step === undefined) {
      return;
    }
    const body = this.bodyRefs[step].current;
    const face = this.faceRefs[step].current;
    const eyes = this.eyeRefs[step].current;

    // Bail early if any element is missing or browser does not support animation
    if (
      !body ||
      !body.beginElement ||
      !face ||
      !face.beginElement ||
      !eyes ||
      !eyes.beginElement
    ) {
      return;
    }

    // Run animation
    body.beginElement();
    face.beginElement();
    eyes.beginElement();
    if (
      step === GlitchAnimationStep.mouseEnter ||
      step === GlitchAnimationStep.mouseUp
    ) {
      this.runBlinkEyes();
    }
    this.timer = window.setTimeout(this.runNextAnimation, DURATIONS[step]);
  };

  private runBlinkEyes = () => {
    this.setState(() => ({
      blinking: true,
    }));
  };

  private onBlinkEyesEnd = () => {
    this.setState(() => ({
      blinking: false,
    }));
  };

  /**
   * Safari has a bug where repeated svg smil animations can stop working.
   *
   * Without this fix, clicking on the glitch logo repeatedly in Safari will
   * cause the animations to stop playing after a few clicks.
   */
  private fixSVGAnimationBug() {
    /**
     * Do not apply this fix to Firefox;
     *
     * If this fix gets applied in Firefox, it can cause "jumpy animations"
     * where the logo does not smoothly transition between all of its states
     */
    if (!navigator.userAgent.toLowerCase().includes("safari/")) {
      return;
    }
    if (!this.svgRef.current) {
      return;
    }
    this.svgRef.current.pauseAnimations();
    this.svgRef.current.setCurrentTime(0);
    this.svgRef.current.unpauseAnimations();
  }
}
