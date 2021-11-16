import { ReactElement } from "react";
import { TransitionGroupItemProps } from "./components/transition-group-item";

export type TransitionGroupChild = ReactElement<{}> | false | null | undefined;

export interface ChildMap {
  [key: string]: TransitionGroupItemProps;
}

export interface DimensionMap {
  [key: string]: ClientRect;
}
