import { Children, Component, ReactElement, ReactNode } from "react";
import {
  TransitionStatus,
  TransitionType,
  TransitionTypeValue,
} from "./models";
import { cn, prefersReducedMotion } from "@uuixjs/uuixweb-lib";

import { ScTransitionBase } from "./components/sc-transition-base";

export type TransitionTypeOption =
  | TransitionTypeValue
  | [TransitionTypeValue, TransitionTypeValue];

export enum TransitionDuration {
  Short = "short",
  Medium = "medium",
  Long = "long",
}

export enum TransitionDelay {
  None = "none",
  Short = "short",
  Medium = "medium",
  Long = "long",
}

// TODO: Convert timing values to JSON tokens and import values directly. Currently duplicated in _timings.scss
const TIMING_MAP = {
  [TransitionDuration.Short]: 100,
  [TransitionDuration.Medium]: 250,
  [TransitionDuration.Long]: 300,
};

const DELAY_TIMING_MAP = {
  [TransitionDelay.None]: 0,
  [TransitionDelay.Short]: 100,
  [TransitionDelay.Medium]: 250,
  [TransitionDelay.Long]: 300,
};

export interface TransitionProps {
  children: ReactNode | ReactElement<{ className?: string }>;
  /** Controls visibility of children; applies a CSS transition effect when this prop changes over time. */
  show: boolean;
  /** CSS transition style to use; applies the same value to both enter and exit effects unless an array with different types is provided. */
  type: TransitionTypeOption;
  /** The delay before the transition is triggered. Provide a TransitionDelay enum for recommended preset values, or a number to specify a custom length in miliseconds. */
  delay?: TransitionDelay | "none" | "short" | "medium" | "long" | number; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  /** Provide a TransitionDuration enum for recommended preset values. Provide a number to specify a custom length of transition in miliseconds. */
  duration?: TransitionDuration | "short" | "medium" | "long" | number; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  /** If true, apply an "enter" transition when this component initially mounts if "show" is also set to true. */
  transitionInitialMount?: boolean;
  /** If true, keep the child mounted at all times even when not visible. By default, child will be mounted just before entering and un-mounted right after exiting. */
  alwaysRenderChild?: boolean;
  /** Callback when child component enter transition has completed. */
  onEnterComplete?: () => void;
  /** Callback when child component exit transition has completed. */
  onExitComplete?: () => void;
  className?: string;
  /** If true, inject all props onto a single child node instead of wrapping with a new div  */
  injectChild?: boolean;
}

export interface TransitionState {
  status: TransitionStatus;
}

/**
 * Transitions are used to effectively communicate a change in the UI to the user.
 * They assist in achieving UX goals by providing context between elements during UI changes.
 */
export class Transition extends Component<TransitionProps, TransitionState> {
  public static getDerivedStateFromProps(
    { show }: TransitionProps,
    { status }: TransitionState,
  ) {
    const t = TransitionStatus;

    if (show && status === t.exited) {
      return { status: t.enter };
    } else if (show && status === t.exiting) {
      return { status: t.entering };
    } else if (!show && status === t.entered) {
      return { status: t.exit };
    } else if (!show && status === t.entering) {
      return { status: t.exiting };
    }
    return null;
  }

  private containerRef: HTMLDivElement | undefined;

  /**
   * We use a JS timer to track when an element has finished entering or exiting
   * and then run appropriate callback functions. The DOM event 'transitionend' is
   * unfortunately un-reliable as it is not guaranteed to run.
   *
   * More info: https://jira.twitch.com/browse/COREUI-1219
   */
  private transitionTimer: number | undefined;

  public constructor(props: TransitionProps) {
    super(props);
    this.state = {
      status:
        props.show && !props.transitionInitialMount
          ? TransitionStatus.entered
          : TransitionStatus.exited,
    };
  }

  public componentDidMount() {
    if (this.props.transitionInitialMount && this.props.show) {
      this.setState({
        status: TransitionStatus.enter,
      });
    }
  }

  public componentWillUnmount() {
    clearTimeout(this.transitionTimer);
  }

  public componentDidUpdate(_: TransitionProps, prevState: TransitionState) {
    const t = TransitionStatus;

    if (this.state.status === t.enter) {
      this.ensureLayoutReflow();
      this.setState({ status: t.entering });
    } else if (this.state.status === t.exit) {
      this.ensureLayoutReflow();
      this.setState({ status: t.exiting });
    } else if (
      this.state.status === t.entering &&
      prevState.status !== t.entering
    ) {
      clearTimeout(this.transitionTimer);
      this.transitionTimer = window.setTimeout(
        this.onEnterComplete,
        this.getDuration() + this.getDelay(),
      );
    } else if (
      this.state.status === t.exiting &&
      prevState.status !== t.exiting
    ) {
      clearTimeout(this.transitionTimer);
      this.transitionTimer = window.setTimeout(
        this.onExitComplete,
        this.getDuration() + this.getDelay(),
      );
    }
  }

  public render() {
    if (
      this.state.status === TransitionStatus.exited &&
      !this.props.alwaysRenderChild
    ) {
      return null;
    }

    return (
      <ScTransitionBase
        className={cn("tw-transition", this.props.className)}
        ref={this.refHandler}
        children={this.props.children}
        injectChild={this.props.injectChild}
        $type={this.getType()}
        $status={this.state.status}
        $delay={this.getDelay()}
        $duration={this.getDuration()}
      />
    );
  }

  private getType = (): TransitionTypeValue => {
    if (!Array.isArray(this.props.type)) {
      // If one type provided, use for both enter and exit
      return this.props.type;
    }

    const incoming = [
      TransitionStatus.enter,
      TransitionStatus.entering,
      TransitionStatus.entered,
    ].includes(this.state.status);

    // If two types provided, choose the current one by status:
    return incoming ? this.props.type[0] : this.props.type[1];
  };

  private getDuration = (): number => {
    // "TransitionType.None" is essentially just a convenience to set the duration to be "0"
    // It is important to set duration to 0 so the JS callbacks fire immediately.
    if (TransitionType.None === this.getType()) {
      return 0;
    }

    if (prefersReducedMotion()) {
      return 0;
    }

    if (typeof this.props.duration === "string") {
      return TIMING_MAP[this.props.duration];
    }

    if (typeof this.props.duration === "number") {
      return this.props.duration;
    }

    return TIMING_MAP[TransitionDuration.Medium];
  };

  private getDelay = (): number => {
    // "TransitionType.None" is essentially just a convenience to set the duration and delay to be "0"
    // It is important to set delay to 0 so the JS callbacks fire immediately.
    if (TransitionType.None === this.getType()) {
      return 0;
    }

    if (prefersReducedMotion()) {
      return 0;
    }

    if (typeof this.props.delay === "string") {
      return DELAY_TIMING_MAP[this.props.delay];
    }

    if (typeof this.props.delay === "number") {
      return this.props.delay;
    }

    return DELAY_TIMING_MAP[TransitionDelay.None];
  };

  private onEnterComplete = () => {
    this.setState({ status: TransitionStatus.entered });

    if (this.props.onEnterComplete) {
      this.props.onEnterComplete();
    }
  };

  private onExitComplete = () => {
    this.setState({ status: TransitionStatus.exited });

    if (this.props.onExitComplete) {
      this.props.onExitComplete();
    }
  };

  private refHandler = (element: HTMLDivElement) => {
    this.containerRef = element;

    // Preserve original ref
    if (this.props.injectChild) {
      const child = Children.only(this.props.children);

      // child.ref exists at runtime despite not existing on the type definition for ReactElement<any>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const originalRef = (child as any).ref;
      if (typeof originalRef === "function") {
        originalRef(element);
      }
    }
  };

  /**
   * CRITICAL NOTE:
   * By reading 'scrollTop' of any element, we ensure the browser will synchronously perform layout/reflow.
   * This is often a necessary step for animations where we must ensure the initial element position
   * has rendered in the browser before updating the position and triggering a CSS transition.
   */
  private ensureLayoutReflow = () => {
    // Although the above this line doesn't appear to do anything, accessing
    // the layout-dependent value forces layout by the browser.
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.containerRef && this.containerRef.scrollTop;
  };
}
