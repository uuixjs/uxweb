import { ChildMap, DimensionMap, TransitionGroupChild } from "./models";
import { Component, ReactElement, cloneElement } from "react";
import { InjectLayout, Position } from "../layout";
import { TransitionDuration, TransitionTypeOption } from "../transition";
import {
  getChildMapping,
  getKeysToTransition,
  mergeChildMappings,
} from "./utils/child-mapping";

import { TransitionGroupItem } from "./components/transition-group-item";
import { cn } from "lib";

export interface TransitionGroupProps {
  /** Array of react elements; after mounting this component, changes to this array will be animated with CSS transitions */
  children: TransitionGroupChild | TransitionGroupChild[];
  /** Timing to apply to both enter, exit, and transform effects on list changes. Provide a TransitionDuration enum for recommended preset values. Provide a number to specify a custom length of transition in miliseconds. */
  duration?: TransitionDuration | number;
  /** Transition to apply when items enter or exit. Does not apply to order change for existing list items.  */
  transitionType?: TransitionTypeOption;
  className?: string;
  /** Provide a component such as <Tower> or <Grid> to wrap around the child elements. */
  component?: ReactElement<{}>;
}

export interface TransitionGroupState {
  initialRenderComplete: boolean;
  childMap: ChildMap;
}

export interface TransitionSnapshot {
  moved: DimensionMap;
  exited: DimensionMap;
  container?: ClientRect;
}

/**
 * TransitionGroup is used to communicate a change in the UI where a group of similar elements may be rearranged or repopulated.
 * This assists in achieving UX goals by providing context between similar elements during UI changes.
 */
export class TransitionGroup extends Component<
  TransitionGroupProps,
  TransitionGroupState,
  TransitionSnapshot
> {
  public static getDerivedStateFromProps(
    nextProps: TransitionGroupProps,
    state: TransitionGroupState,
  ): Partial<TransitionGroupState> {
    const prevChildMap = state.childMap;
    const nextChildMap = getChildMapping(nextProps.children);

    /**
     * TODO:
     * getChildMapping is returning object with 'transform' and 'transition' set which
     * is overriding any value which existed previously on state.childMap
     *
     * Need to refactor so it does not do this; values must persist from state.ChildMap
     */

    // Initial render
    if (!state.initialRenderComplete) {
      return {
        childMap: nextChildMap,
        initialRenderComplete: true,
      };
    }

    const keysToTransition = getKeysToTransition(prevChildMap, nextChildMap);

    const childMap = mergeChildMappings(prevChildMap, nextChildMap);

    Object.keys(childMap).forEach((key) => {
      const hasPrev = key in prevChildMap;
      const hasNext = key in nextChildMap;
      const didMove = keysToTransition.includes(key);

      // persist fields
      if (hasPrev) {
        childMap[key].moveStyles = prevChildMap[key].moveStyles;
        childMap[key].exitStyles = prevChildMap[key].exitStyles;
        childMap[key].transition = prevChildMap[key].transition;
      }

      childMap[key].prepareForTransform = didMove;

      if (hasNext && !hasPrev) {
        // Entering
        childMap[key].transition.show = true;
        childMap[key].transition.transitionInitialMount = true;
      } else if (!hasNext && hasPrev) {
        // Exiting
        childMap[key].transition.show = false;
      } else if (
        hasNext &&
        hasPrev &&
        childMap[key].transition.show === false
      ) {
        // Re-entry during exit transition
        childMap[key].transition.show = true;
        childMap[key].exitStyles = undefined;
      }
    });

    return {
      childMap,
    };
  }

  public state: TransitionGroupState = {
    childMap: {},
    initialRenderComplete: false,
  };

  public containerRef: HTMLDivElement | undefined = undefined;
  public childRefMap: { [key: string]: HTMLDivElement } = {};
  public currentlyTransitioningKeys: string[] = [];

  public getSnapshotBeforeUpdate(): TransitionSnapshot | null {
    const { childMap } = this.state;

    const movedKeys = Object.keys(childMap).filter(
      (k) => childMap[k].prepareForTransform === true,
    );
    const exitedKeys = Object.keys(childMap).filter(
      (k) => childMap[k].transition.show === false && !childMap[k].exitStyles,
    );

    if (movedKeys.length === 0 && exitedKeys.length === 0) {
      return null;
    }

    return {
      moved: this.measureItems([
        ...movedKeys,
        ...this.currentlyTransitioningKeys,
      ]),
      exited: this.measureItems(exitedKeys),
      container:
        exitedKeys.length && this.containerRef
          ? this.containerRef.getBoundingClientRect()
          : undefined,
    };
  }

  public componentDidUpdate(
    _1: TransitionGroupProps,
    _2: TransitionGroupState,
    snapshot?: TransitionSnapshot,
  ) {
    if (!snapshot || Object.keys(snapshot).length === 0) {
      return;
    }

    const movedKeys = Object.keys(snapshot.moved);
    this.setTransforms(snapshot).then(() => {
      if (movedKeys) {
        this.ensureLayoutReflow();
        this.clearMoveStyles(movedKeys);
        this.currentlyTransitioningKeys = movedKeys.filter(
          (k) => !(k in snapshot.exited),
        );
      }
    });
  }

  public render() {
    if (!this.state.childMap) {
      return null;
    }

    const children = Object.keys(this.state.childMap).map((key) => {
      const item = this.state.childMap[key];
      return (
        <TransitionGroupItem
          {...item}
          key={key}
          transition={{
            ...item.transition,
            duration: this.props.duration,
            type: this.props.transitionType,
          }}
          refDelegate={this.setItemRef}
          onExitComplete={this.deleteChild}
          onTransformEnd={this.onTransformEnd}
        />
      );
    });

    return (
      <InjectLayout
        position={Position.Relative} // a position context is required for exit transforms
      >
        <div
          className={cn(this.props.className, "tw-transition-group")}
          ref={this.setContainerRef}
        >
          {this.props.component
            ? cloneElement(this.props.component, undefined, children)
            : children}
        </div>
      </InjectLayout>
    );
  }

  private setContainerRef = (element: HTMLDivElement) => {
    this.containerRef = element;
  };

  private setItemRef = (element: HTMLDivElement, key: string | number) => {
    if (element) {
      this.childRefMap[key] = element;
    }
  };

  private onTransformEnd = (key: string | number) => {
    this.currentlyTransitioningKeys = this.currentlyTransitioningKeys.filter(
      (k) => k !== key,
    );
  };

  private deleteChild = (childKey: string | number) => {
    if (!(childKey in this.state.childMap)) {
      return;
    }

    delete this.childRefMap[childKey];

    this.setState((prevState) => {
      const children = { ...prevState.childMap };
      delete children[childKey];
      return { childMap: children };
    });
  };

  private measureItems = (keys: string[]): DimensionMap => {
    const dimensions: DimensionMap = {};
    keys
      .filter((k) => k in this.childRefMap)
      .forEach((key) => {
        if (!(key in dimensions)) {
          dimensions[key] = this.childRefMap[key].getBoundingClientRect();
        }
      });
    return dimensions;
  };

  private setTransforms = async (snapshot: TransitionSnapshot) => {
    return new Promise<void>((resolve) => {
      this.setState(({ childMap: prevChildMap }) => {
        const childMap = { ...prevChildMap };
        const { moved, exited, container } = snapshot;

        // 1. handle moved items
        const from = moved;
        const to = this.measureItems(Object.keys(moved));
        Object.keys(from).forEach((key) => {
          const x = from[key].left - to[key].left;
          const y = from[key].top - to[key].top;
          childMap[key].moveStyles = {
            transform: `translate3d(${x}px, ${y}px,0)`,
          };
          childMap[key].prepareForTransform = false;
        });

        // 2. handle exited items
        Object.keys(exited).forEach((key) => {
          const child = exited[key];
          const x = child.left - (container ? container.left : 0);
          const y = child.top - (container ? container.top : 0);
          childMap[key].exitStyles = {
            top: `${y}px`,
            left: `${x}px`,
            position: "absolute",
            width: `${child.width}px`, // preserve width and height because position: absolute will remove item from flex context
            height: `${child.height}px`,
          };
        });

        return {
          childMap,
        };
      }, resolve);
    });
  };

  private clearMoveStyles = (keys: string[]) => {
    this.setState((prevState) => {
      const c = { ...prevState.childMap };
      keys.forEach((key) => (c[key].moveStyles = undefined));
      return {
        childMap: c,
      };
    });
  };

  /**
   * CRITICAL NOTE:
   * By reading 'scrollTop' of any element, we ensure the browser will synchronously perform layout/reflow.
   * This is often a necessary step for animations where we must ensure the initial element position
   * has rendered in the browser before updating the position and triggering a CSS transition.
   */
  private ensureLayoutReflow = () => {
    // Just grab literally any ref
    const someRef = this.childRefMap[Object.keys(this.childRefMap)[0]];
    // Although the above this line doesn't appear to do anything, accessing
    // the layout-dependent value forces layout by the browser.
    // eslint-disable-next-line no-unused-expressions
    someRef && someRef.scrollTop;
  };
}
