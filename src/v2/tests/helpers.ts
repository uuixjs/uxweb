import {
  ReactWrapper,
  shallow,
  ShallowRendererProps,
  ShallowWrapper,
} from "enzyme";
import { ComponentClass, createElement, FC } from "react";

type TestableComponent<Props> = FC<Props> | ComponentClass<Props>;

/**
 * This file contains various test scaffolding solutions for unit, integation, and component snapshot tests for more
 * details. See: https://git.xarth.tv/pages/twilight/twilight-docs/docs/guides/testing.html#testing
 */

/**
 * An component property override generator function that allows you to consume the default properties generated
 * for a test case. Useful for when you need to override a specific key on non-shallow object props.
 */
type PropOverrideFunc<Props> = (defaultProps: Props) => Partial<Props>;

/**
 * Specifies the various ways to override specific component properties for a given test case.
 */
type PropOverrides<Props> = Partial<Props> | PropOverrideFunc<Props>;

interface EnzymeShallowSetup<Props, State> {
  props: Props;
  wrapper: ShallowWrapper<Props, State>;
}

interface EnzymeMountSetup<Props, State> {
  props: Props;
  wrapper: ReactWrapper<Props, State>;
}

export interface EnzymeShallowGenerator<Props, State> {
  (propOverrides?: PropOverrides<Props>): EnzymeShallowSetup<Props, State>;
}

export interface EnzymeMountGenerator<Props, State> {
  (propOverrides?: PropOverrides<Props>): EnzymeMountSetup<Props, State>;
}

/**
 * Builds the full property set for a component given test suite defaults, and overrides for a specific test case.
 */
export function combineProps<Props>(
  defaultPropGenerator?: () => Props,
  overrides?: PropOverrides<Props>,
): Props {
  // TODO: Determine if there is a better way to handle the typing this, or if we have to make prop generator mandatory
  const defaultProps = defaultPropGenerator
    ? defaultPropGenerator()
    : ({} as Props);

  if (typeof overrides === "function") {
    return Object.assign<Props, Partial<Props>>(
      defaultProps,
      overrides(defaultProps),
    );
  } else if (typeof overrides === "object") {
    return Object.assign<Props, Partial<Props>>(defaultProps, overrides);
  }

  return defaultProps;
}

export function setupShallowTest<Props, State>(
  Component: TestableComponent<Props>,
  initialPropGenerator?: () => Props,
  options?: ShallowRendererProps,
): EnzymeShallowGenerator<Props, State> {
  return (propOverrides?: PropOverrides<Props>) => {
    const combinedProps = combineProps(initialPropGenerator, propOverrides);

    /**
     * Note: "lifecycleExperimental" allows all lifecycle hooks in shallow rendering to be exercised, will be on
     * by default in Enzyme 3.0: https://github.com/airbnb/enzyme/issues/678
     */
    const shallowRenderOptions: ShallowRendererProps = {
      lifecycleExperimental: true,
      ...options,
    };

    const element = createElement(Component, combinedProps);

    return {
      props: combinedProps,
      wrapper: shallow<Props, State>(element, shallowRenderOptions),
    };
  };
}
