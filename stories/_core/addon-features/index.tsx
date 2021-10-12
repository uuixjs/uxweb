import * as React from 'react';

import { makeDecorator, StoryContext, StoryGetter } from "@storybook/addons";

import { PARAM_KEY } from "./constants";
import { RootClassesDecorator } from "./components/root-classes-decorator";

export const withCoreUIRoot = makeDecorator({
  name: "withCoreUIRoot",
  parameterName: PARAM_KEY,
  // eslint-disable-next-line react/display-name, no-empty-pattern
  wrapper: (getStory: StoryGetter, context: StoryContext, {}) => {
    return <RootClassesDecorator>{getStory(context)}</RootClassesDecorator>;
  },
});
