import {
  AlignItems,
  Color,
  Display,
  FlexWrap,
  FontSize,
  InjectLayout,
  JustifyContent,
  Layout,
  TextAlign,
} from "../../layout";
import { CoreLink, CoreLinkType } from "../../core-link";
import {
  Padding,
  getAriaProps,
  getDataProps,
  styleVariant,
  styled,
} from "lib";
import {
  TabItem,
  TabItemProps,
  TabItemPublicProps,
} from "./components/tab-item";

import { Component } from "react";
import { Icon } from "../../icon";
import { SVGAsset } from "../../svg";
import { TabMenu } from "./components/tab-menu";
import { isTabItemsLayoutEqual } from "./utils";

export { TabItemPublicProps } from "./components/tab-item";

/**
 * The width of the "More Items Menu" button in pixels;
 * Used when calculating how many items can be displayed in the available space.
 */
const MORE_BUTTON_WIDTH = 32;

export enum TestSelectors {
  ActiveTabIndicator = "ACTIVE_TAB_INDICATOR",
}

export enum TabSize {
  Default = "default",
  Large = "large",
}

interface ScTabsLayoutProps {
  $size: TabSize;
  $twoLineText: boolean;
}

const ScTabsLayout = styled(Layout)<ScTabsLayoutProps>`
  position: relative;
  display: flex;
  width: 100%;
  height: ${styleVariant("$size", {
    [TabSize.Default]: ({ $twoLineText }) => ($twoLineText ? "4.9rem" : "3rem"),
    [TabSize.Large]: ({ $twoLineText }) => ($twoLineText ? "6rem" : "4rem"),
  })};
`;

const ScActiveIndicator = styled.div`
  height: 0.2rem;
  margin-bottom: -0.1rem;
  transition: 0.2s transform ease;
  transform-origin: 0 0;
  background-color: currentColor;
`;

export type TabsResizeHandler = (
  /**
   * If set to true, indicates that tab sizes may have changed and
   * a full re-measurement should be taken of all tabs.
   * Defaults to false and uses cached tab sizes.
   */
  remeasureSizes?: boolean,
) => void;

export interface TabsProps {
  tabs: TabItemPublicProps[];
  activeTabIndex: number;
  size?: TabSize;
  borderBottom?: boolean;
  justifyContent?:
    | JustifyContent.Start
    | JustifyContent.Center
    | JustifyContent.End;
  /**
   * A callback which will override default resize handlers.
   * Useful if the UI layout changes at times other than window.resize, such a
   * collapsing sidebars. If providing this callback, your code should:
   *
   * 1. Call the update function immediately after rendering is complete
   * 2. Call the update function again anytime the components size has changed
   *
   * @param update Function which will update the currently visible tabs when called.
   */
  setupResizeHandler?: (update: TabsResizeHandler) => void;
  /**
   * A callback which will override default resize handlers;
   * your code should use this to remove any custom resize handlers which were added.
   *
   * @param update Function which will update the currently visible tabs when called.
   */
  removeResizeHandler?: (update: TabsResizeHandler) => void;
}

export interface TabsState {
  visibleTabIndexList: number[];
  activeIndicatorTransform: string;
  showAllTabsForMeasuring?: boolean;
  showMoreItemsMenu?: boolean;
  tabWidths: number[];
}

export type TabsIndicatorTransform = string | null;

export class Tabs extends Component<
  TabsProps,
  TabsState,
  TabsIndicatorTransform
> {
  private containerRef: HTMLElement | null = null;
  private indicatorRef: HTMLElement | null = null;
  private tabRefs: HTMLLIElement[] = [];

  public constructor(props: TabsProps) {
    super(props);
    this.state = {
      visibleTabIndexList: props.tabs.map((_, i) => i),
      activeIndicatorTransform: "",
      tabWidths: [],
    };
  }

  /**
   * Runs when the active tab index prop is changed
   *
   * Implements FLIP animation technique.
   *
   * The active indicator is always rendered under the tab it belongs to;
   * CSS transforms move the indicator to the FIRST frame of the animation;
   * the transorm gets removed, and the indicator animates into the final position.
   */
  public getSnapshotBeforeUpdate(
    prevProps: TabsProps,
    _: TabsState,
  ): TabsIndicatorTransform {
    if (this.props.activeTabIndex !== prevProps.activeTabIndex) {
      return this.getIndicatorTransform(this.props.activeTabIndex);
    }
    return null;
  }

  public componentDidUpdate(
    prevProps: TabsProps,
    _2: TabsState,
    snapshot: TabsIndicatorTransform,
  ) {
    // If the list of props has changed async, we need to do a full re-measure and update
    if (!isTabItemsLayoutEqual(prevProps.tabs, this.props.tabs)) {
      this.updateVisibleTabs(true);
    }

    // If the active tab indicator changed, we will animate it
    if (snapshot) {
      this.setState(
        {
          activeIndicatorTransform: snapshot,
          showMoreItemsMenu: false,
        },
        () => {
          this.updateVisibleTabs();
          this.ensureLayoutReflow();
          this.setState({
            activeIndicatorTransform: "",
          });
        },
      );
    }
  }

  public componentDidMount() {
    if (this.props.setupResizeHandler) {
      this.props.setupResizeHandler(this.updateVisibleTabs);
    } else {
      this.setupResizeHandler();
    }
  }

  public componentWillUnmount() {
    if (this.props.removeResizeHandler) {
      this.props.removeResizeHandler(this.updateVisibleTabs);
    } else {
      this.removeResizeHandler();
    }
  }

  public render() {
    const tabs = this.state.showAllTabsForMeasuring
      ? this.props.tabs.map(this.setTabProps)
      : this.getVisibleTabs();

    return (
      <ScTabsLayout
        className={"tw-tabs"}
        borderBottom={
          this.props.borderBottom !== undefined ? this.props.borderBottom : true
        }
        $size={this.props.size || TabSize.Default}
        $twoLineText={this.hasItemWithTwoLineText()}
      >
        <InjectLayout
          flexGrow={1}
          display={Display.Flex}
          fullHeight
          alignItems={AlignItems.Center}
          justifyContent={
            this.props.justifyContent
              ? this.props.justifyContent
              : JustifyContent.Start
          }
          fontSize={FontSize.Size4}
          flexWrap={FlexWrap.Wrap}
        >
          <ul
            ref={this.setContainerRef}
            role="tablist"
            {...getDataProps(this.props)}
            {...getAriaProps(this.props)}
          >
            {tabs.map(this.renderTab)}
          </ul>
        </InjectLayout>
        {this.hasHiddenItems() && (
          <CoreLink
            variant={CoreLinkType.Inherit}
            onClick={this.toggleMoreItemsMenu}
          >
            <Layout margin={{ left: 1 }}>
              <Icon asset={SVGAsset.NavMore} />
            </Layout>
          </CoreLink>
        )}
        {this.state.showMoreItemsMenu && (
          <TabMenu tabs={this.getHiddenTabs()} />
        )}
      </ScTabsLayout>
    );
  }

  private renderTab = (tabProps: TabItemProps, tabIndex: number) => {
    const flexGrow =
      this.props.justifyContent === undefined &&
      !this.state.showAllTabsForMeasuring
        ? 1
        : 0;

    let padding: Padding;
    if (this.props.justifyContent === JustifyContent.Start && tabIndex === 0) {
      padding = {
        left: 0,
        right: 1,
      };
    } else if (
      this.props.justifyContent === JustifyContent.End &&
      tabIndex === this.props.tabs.length - 1
    ) {
      padding = {
        left: 1,
        right: 0,
      };
    } else {
      padding = {
        x: 1,
      };
    }

    return (
      <InjectLayout
        key={tabProps.originalIndex}
        flexGrow={flexGrow}
        color={
          this.props.activeTabIndex === tabProps.originalIndex
            ? Color.Link
            : Color.Base
        }
        alignItems={AlignItems.Center}
        justifyContent={JustifyContent.Center}
        fullHeight
      >
        <li
          /**
           * Set the Aria role to presentation to assist screenreaders ability to properly
           * index and count the number of tabs. This is done by removing the list item
           * from the accessibility tree. tablist > listitem > tab becomes tablist > tab
           */
          role="presentation"
          ref={this.setTabRef}
          data-index={tabProps.originalIndex}
        >
          <TabItem
            {...tabProps}
            padding={padding}
            size={this.props.size}
            textAlign={
              [JustifyContent.Center, undefined].includes(
                this.props.justifyContent,
              )
                ? TextAlign.Center
                : TextAlign.Left
            }
            activeIndicator={
              (this.props.activeTabIndex === tabProps.originalIndex && (
                <ScActiveIndicator
                  ref={this.setIndicatorRef}
                  style={{ transform: this.state.activeIndicatorTransform }}
                  data-test-selector={TestSelectors.ActiveTabIndicator}
                />
              )) ||
              undefined
            }
          />
        </li>
      </InjectLayout>
    );
  };

  private getVisibleTabs(): TabItemProps[] {
    const allTabs = this.props.tabs.map(this.setTabProps);
    return this.state.visibleTabIndexList
      .map((i) => allTabs[i])
      .filter((item) => item !== undefined);
  }

  private getHiddenTabs(): TabItemProps[] {
    return this.props.tabs
      .map(this.setTabProps)
      .filter((_, i) => this.state.visibleTabIndexList.indexOf(i) === -1);
  }

  /**
   * It is important that we keep track of the original index from this.props.tabs
   * because the display order of the tabs may change when some tabs are hidden behind
   * the overflow menu and the active tab gets moved higher up in the list in order to
   * keep the active tab visible at all times, even if it would have been hidden in overflow
   */
  private setTabProps = (tab: TabItemPublicProps, i: number): TabItemProps => {
    return {
      ...tab,
      originalIndex: i,
    };
  };

  private toggleMoreItemsMenu = () => {
    this.setState((prevState) => ({
      showMoreItemsMenu: !prevState.showMoreItemsMenu,
    }));
  };

  private hasHiddenItems() {
    return this.state.visibleTabIndexList.length !== this.props.tabs.length;
  }

  private setContainerRef = (element: HTMLElement | null) => {
    this.containerRef = element;
  };

  private setIndicatorRef = (element: HTMLElement | null) => {
    this.indicatorRef = element;
  };

  private setTabRef = (element: HTMLLIElement | null) => {
    // Delete any refs with which no longer exist / index is greater than props.tabs.length
    if (this.tabRefs.length > this.props.tabs.length) {
      this.tabRefs.splice(this.props.tabs.length);
    }
    if (!element) {
      return;
    }
    const indexString = element.getAttribute("data-index");
    if (null === indexString) {
      return;
    }
    const index = parseInt(indexString, undefined);
    this.tabRefs[index] = element;
  };

  /**
   * Calculates the CSS transformation that will get the active indicator from where
   * it WILL be displayed under `tabIndex` to where it is CURRENTLY being displayed.
   *
   * Critically, this must run BEFORE changing the active tab;
   * this.indicatorRef must be a reference to the active indicator before the change.
   *
   * @param tabIndex The tab to calculate the transformation from
   */
  private getIndicatorTransform(tabIndex: number): string {
    const itemRef = this.tabRefs[tabIndex];
    if (!itemRef || !this.indicatorRef || !this.containerRef) {
      return "";
    }

    // We have to use getBoundingClientRect() to account for any currently active CSS transforms
    const indicatorRect = this.indicatorRef.getBoundingClientRect();
    const relativeOffsetLeft =
      indicatorRect.left - this.containerRef.getBoundingClientRect().left;

    const scale = `scaleX(${indicatorRect.width / itemRef.clientWidth})`;
    const move = `translateX(${relativeOffsetLeft - itemRef.offsetLeft}px)`;

    return [move, scale].join(" ");
  }

  /**
   * Quickly updates what is visible based on cached tab sizes.
   * This is relatively performant as it does not re-measure every tab.
   */
  private updateVisibleTabs: TabsResizeHandler = (() => async (
    measureTabs: boolean = false,
  ) => {
    if (!this.tabRefs || !this.containerRef) {
      return "";
    }

    if (
      true === measureTabs ||
      this.state.tabWidths.length !== this.tabRefs.length
    ) {
      await this.measureTabWidths();
    }

    const activeTabIndex = this.props.activeTabIndex || 0;
    const visible: number[] = [];
    let remainingWidth = this.containerRef.clientWidth;

    // Save space for the menu button IF it is not currently visible
    if (!this.hasHiddenItems()) {
      remainingWidth -= MORE_BUTTON_WIDTH;
    }

    // Always show the active tab, if it is valid
    if (this.props.tabs[activeTabIndex]) {
      visible.push(activeTabIndex);
      remainingWidth -= this.state.tabWidths[activeTabIndex];
    }

    // Now add non-active tabs
    this.state.tabWidths.some((width, i) => {
      if (i === activeTabIndex) {
        return false; // keep going; this was already added
      } else if (remainingWidth - width <= 0) {
        return true; // stop
      }

      remainingWidth -= width;

      if (i < activeTabIndex) {
        visible.splice(i, 0, i); // insert just before the active tab
      } else {
        visible.push(i);
      }
      return false; // keep going
    });

    // Prevent unecessary state updates; improves performance
    if (
      JSON.stringify(visible) !== JSON.stringify(this.state.visibleTabIndexList)
    ) {
      this.setState({
        visibleTabIndexList: visible,
      });
    }
    return;
  })();

  /**
   * Async method which ensures correct tab measurements have been made.
   * This is less performant because it requires two re-renders and should only run when absolutely necessary!
   *
   * In order for us to be able to measure tab sizes:
   *
   * 1. All tabs must be visible (even if flex wrapped and overflow hidden)
   * 2. flex grow must be off so we measure the smallest tab sizes
   * Setting `state.showAllTabsForMeasuring` will cause render to meet the above conditions
   */
  private measureTabWidths = async () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<void>(async (resolve) => {
      if (!this.state.showAllTabsForMeasuring) {
        await this.setState({ showAllTabsForMeasuring: true });
      }

      this.ensureLayoutReflow();

      this.setState(
        {
          tabWidths: this.tabRefs.map((item) => item.clientWidth),
          showAllTabsForMeasuring: false,
        },
        resolve,
      );
    });
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

  private setupResizeHandler = () => {
    window.addEventListener("resize", this.onResize);

    /**
     * We need to wait to measure until after the page has settled and
     * each item is the actual width that it will be.
     * Measuring happens ONLY ONCE and it must be accurate the first time!
     *
     * This setTimeout is just some arbitrary way to wait until the page is done loading.
     */
    setTimeout(() => {
      this.updateVisibleTabs(true);
    }, 500);
  };

  private removeResizeHandler = () => {
    window.removeEventListener("resize", this.onResize);
  };

  private onResize = (_: Event) => {
    this.updateVisibleTabs();
  };

  private hasItemWithTwoLineText = () => {
    return (
      -1 <
      this.props.tabs.findIndex((tab) => {
        return typeof tab.label === "object" && tab.label.length > 1;
      })
    );
  };
}
