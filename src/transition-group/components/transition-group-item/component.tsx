import { Component, CSSProperties, ReactElement } from "react";
import {
  Transition,
  TransitionProps,
  TransitionType,
} from "../../../transition";

export interface MoveStyles {
  transform: string;
}

export interface ExitStyles {
  position: "absolute";
  top: string;
  left: string;
  width: string;
  height: string;
}

export interface TransitionGroupItemProps {
  id: string | number;
  transition: Partial<TransitionProps>;
  moveStyles?: MoveStyles;
  exitStyles?: ExitStyles;
  child: ReactElement<{}>;

  prepareForTransform?: boolean;

  refDelegate?: (e: HTMLDivElement, key: string | number) => void;
  onExitComplete?: (key: string | number) => void;
  onTransformEnd?: (key: string | number) => void;
}

export class TransitionGroupItem extends Component<
  TransitionGroupItemProps,
  {}
> {
  public render() {
    const shouldTransition =
      !this.props.moveStyles && !this.props.prepareForTransform;

    let styles: CSSProperties = {};

    if (
      this.props.transition.show === false &&
      this.props.exitStyles === undefined
    ) {
      styles.position = "absolute"; // just to get it out of the flow
    } else if (this.props.transition.show === false && this.props.exitStyles) {
      styles = this.props.exitStyles;
    } else if (this.props.moveStyles) {
      styles = this.props.moveStyles;
    }

    /**
     * Critical note:
     *
     * Transition has the injectChild prop set which means both the Transition component
     * and also the 'styles' prop on the div below are going to be setting CSS transition
     * properties. Both this component and Transition have critical requirements for
     * CSS transitions to be enabled/disabled at different times and they have overlap.
     *
     * For example: A child may be "entering" with a fade-in transition, and also receive
     * a transform/translate to move the item in the list while it is concurrently fading in.
     *
     * When making changes. Be sure to do ALL manual regression tests (look at the transitions
     * in slow motion in the browser on the manual regression page). This visual details
     * for how these transitions look are not covered by automated unit tests.
     *
     * TODO: This code needs to be refactored so that only one component is managing the lifecycle
     * and application of transition props, as well as the overlap between CSS classnames
     * and custom 'styles' attributes.
     */
    return (
      <Transition
        key={this.props.id}
        show={!!this.props.transition.show}
        type={this.props.transition.type || TransitionType.ScaleOver}
        transitionInitialMount={!!this.props.transition.transitionInitialMount}
        duration={this.props.transition.duration}
        onExitComplete={this.onExitComplete}
        injectChild
      >
        <div
          key={this.props.id}
          ref={this.refHandler}
          style={{
            ...styles,
            transitionProperty: shouldTransition
              ? "transform, opacity"
              : "opacity",
            transitionTimingFunction: "ease",
          }}
          onTransitionEnd={this.onTransformEnd}
        >
          {this.props.child}
        </div>
      </Transition>
    );
  }

  private refHandler = (element: HTMLDivElement) => {
    if (this.props.refDelegate) {
      this.props.refDelegate(element, this.props.id);
    }
  };

  private onExitComplete = () => {
    if (this.props.onExitComplete) {
      this.props.onExitComplete(this.props.id);
    }
  };

  private onTransformEnd = () => {
    if (this.props.onTransformEnd) {
      this.props.onTransformEnd(this.props.id);
    }
  };
}
