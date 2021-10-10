import {
  Children,
  Component,
  ReactElement,
  ReactNode,
  cloneElement,
  createElement,
  isValidElement,
} from "react";
import { Margin, getAriaProps } from "lib/ui-utils";
import {
  VerticalNavigationGroup,
  VerticalNavigationGroupProps,
} from "./vertical-navigation-group";
import {
  VerticalNavigationItem,
  VerticalNavigationItemProps,
} from "./vertical-navigation-item";

import { Layout } from "../layout";
import { TransitionGroup } from "../transition-group";
import { TransitionType } from "../transition";
import { VerticalNavigationGroupHeader } from "./vertical-navigation-group-header";

export interface VerticalNavigationProps {
  /**
   * Children of type `VerticalNavigationTitle`, `VerticalNavigationSubHeader`, `VerticalNavigationItem`,
   * `VerticalNavigationGroup`, and `VerticalNavigationSpacer`.
   */
  children: ReactNode;
  /**
   * A margin applied to the outer container
   */
  margin?: Margin;
  /**
   * Use to temporarily disable the list change transition, such as while asynchronously loading in
   * new nav items, or when changing the list of nav items where a transition is not desirable.
   */
  disableTransition?: boolean;
}

export class VerticalNavigation extends Component<VerticalNavigationProps> {
  public static defaultProps = {
    margin: 1,
  };

  public render() {
    return (
      <nav {...getAriaProps(this.props)}>
        <Layout margin={this.props.margin}>
          <TransitionGroup
            transitionType={
              this.props.disableTransition === true
                ? TransitionType.None
                : TransitionType.SlideOverTop
            }
          >
            {this.unwrapChildren(this.props.children)}
          </TransitionGroup>
        </Layout>
      </nav>
    );
  }

  private unwrapChildren = (children: ReactNode) => {
    // Injects props into children so they display and interact correctly within
    // the context of the overall navigation group, and flattens VerticalNavigationGroups so all
    // VerticalNavigationItems in the VerticalNavigation are siblings (so that they can be properly
    // wrapped and managed by the TransitionGroup).
    const flatMappedChildren = Children.toArray(
      Children.map(children, (topLevelChild) => {
        if (!childIsVerticalNavigationGroup(topLevelChild)) {
          // No special handling is required for children that aren't part of a VerticalNavigationGroup
          return topLevelChild;
        }

        const navGroupIsOpen = !!topLevelChild.props.open;

        return [
          // Add a header to each group
          <VerticalNavigationGroupHeader
            key={`group-header-${topLevelChild.props.label}`}
            iconAsset={topLevelChild.props.iconAsset}
            open={navGroupIsOpen}
            selected={
              !navGroupIsOpen && hasChildSelected(topLevelChild.props.children)
            }
            aria-expanded={navGroupIsOpen}
            onClick={
              navGroupIsOpen
                ? topLevelChild.props.onClose
                : topLevelChild.props.onOpen
            }
          >
            {topLevelChild.props.label}
          </VerticalNavigationGroupHeader>,

          ...Children.toArray(
            Children.map(
              // Map over the children of the VerticalNavigationGroup, raising them up to the top level
              topLevelChild.props.children,
              (navGroupInnerChild) => {
                if (!navGroupIsOpen) {
                  // Don't render the children of collapsed VerticalNavigationGroups
                  return null;
                }

                if (!childIsVerticalNavigationItem(navGroupInnerChild)) {
                  return navGroupInnerChild;
                }

                return cloneElement(navGroupInnerChild, {
                  indentLevel: topLevelChild.props.iconAsset ? 2 : 1,
                });
              },
            ),
          ),
        ];
      }),
    );

    return flatMappedChildren.filter((c: ReactNode): c is ReactElement<{}> => {
      return isValidElement(c);
    });
  };
}

function childIsVerticalNavigationGroup(
  child: ReactNode,
): child is ReactElement<VerticalNavigationGroupProps> {
  if (!isValidElement(child)) {
    return false;
  }

  // https://github.com/gatsbyjs/gatsby/issues/3486
  const navGroupType = createElement(VerticalNavigationGroup);
  if (child.type !== navGroupType.type) {
    return false;
  }

  return true;
}

function childIsVerticalNavigationItem(
  child: ReactNode,
): child is ReactElement<VerticalNavigationItemProps> {
  if (!isValidElement(child)) {
    return false;
  }

  // https://github.com/gatsbyjs/gatsby/issues/3486
  const navItemType = createElement(VerticalNavigationItem);
  if (child.type !== navItemType.type) {
    return false;
  }

  return true;
}

function hasChildSelected(children: ReactNode) {
  const elements = Children.toArray(children);

  const selectedIndex = elements.findIndex(
    (e) => isValidElement(e) && e.props.selected === true,
  );

  return -1 !== selectedIndex;
}
