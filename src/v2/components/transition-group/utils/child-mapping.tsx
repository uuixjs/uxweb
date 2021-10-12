import { ChildMap, TransitionGroupChild } from "../models";
import { Children, ReactElement } from "react";

import { TransitionGroupItemProps } from "../components/transition-group-item";

export function getChildMapping(
  children: TransitionGroupChild | TransitionGroupChild[],
): ChildMap {
  const result: ChildMap = {};

  /**
   * By chaining .map and .forEach we get the computed key value;
   * without this step, keys will not yet be set for react elements
   * which did not have a key explicitly provided
   */
  Children.map(children, (c) => c as ReactElement<{}>)?.forEach((child) => {
    if (child.key === null) {
      return;
    }
    const childItem: TransitionGroupItemProps = {
      id: child.key,
      transition: {
        show: true,
      },
      child,
    };
    result[child.key] = childItem;
  });

  return result;
}

/**
 * Given a change in the child map, determine which items will need to
 * have a translate transition applied in order to move them to a new location in the list.
 * Note: We do not translate currently exiting keys (they get positioned absolutely)
 */
export function getKeysToTransition(
  prevChildMap: ChildMap,
  nextChildMap: ChildMap,
): string[] {
  const prevChildKeys = Object.keys(prevChildMap).filter(
    (k) => prevChildMap[k].transition.show === true,
  );
  const nextChildKeys = Object.keys(nextChildMap);

  // Handle transitions caused by entering keys
  const transitionKeys = nextChildKeys.filter((k, i) => {
    return prevChildKeys[i] !== k && k in prevChildMap;
  });

  return transitionKeys;
}

/**
 * COPIED FROM 'react-transition-group'
 * https://github.com/reactjs/react-transition-group/blob/c1787ed05c636b32f36158c55db5049e082195b6/src/utils/ChildMapping.js#L21-L82
 *
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
export function mergeChildMappings(prev: ChildMap, next: ChildMap): ChildMap {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key: string) {
    return key in next ? next[key] : prev[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  const nextKeysPending = Object.create(null);

  let pendingKeys = [];
  for (const prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else { // @ts-ignore
      pendingKeys.push(prevKey);
    }
  }

  let i;
  const childMapping: ChildMap = {};
  for (const nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        const pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(
          pendingNextKey,
        );
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}
