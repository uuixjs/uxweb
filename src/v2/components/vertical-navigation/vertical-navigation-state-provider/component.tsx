import { Component, ReactNode } from "react";

export interface VerticalNavigationStateProviderProps {
  /**
   * A function accepting a object with 3 parameters:
   * `openGroupIDs`: An array of IDs of groups which have been opened via `onOpenGroup` or `defaultOpenGroupIDs`
   * `onCloseGroup`: A callback accepting the ID of a group to close
   * `onOpenGroup`: A callback accepting the ID of a group to open
   */
  children: (args: {
    openGroupIDs: string[];
    onCloseGroup(id: string): void;
    onOpenGroup(id: string): void;
  }) => ReactNode;
  /**
   * An array of group IDs which should be open by default
   */
  defaultOpenGroupIDs?: string[];
}

interface State {
  openGroupIDs: string[];
}

/**
 * State provider for using VerticalNavigation in uncontrolled mode
 */
export class VerticalNavigationStateProvider extends Component<
  VerticalNavigationStateProviderProps,
  State
> {
  public state: State = {
    openGroupIDs: this.props.defaultOpenGroupIDs || [],
  };

  public render() {
    return this.props.children({
      openGroupIDs: this.state.openGroupIDs,
      onCloseGroup: this.handleCloseGroup,
      onOpenGroup: this.handleOpenGroup,
    });
  }

  private handleOpenGroup = (id: string) => {
    this.setState((state) => ({
      openGroupIDs: [...state.openGroupIDs, id],
    }));
  };

  private handleCloseGroup = (id: string) => {
    this.setState((state) => {
      const groupIndex = state.openGroupIDs.indexOf(id);

      return {
        openGroupIDs: [
          ...state.openGroupIDs.slice(0, groupIndex),
          ...state.openGroupIDs.slice(groupIndex + 1),
        ],
      };
    });
  };
}
