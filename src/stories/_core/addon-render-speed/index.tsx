import { makeDecorator } from "@storybook/addons";
import { StoryDecorator } from "./components/story-decorator";
import { PARAM_KEY } from "./constants";

export const withRenderSpeedBenchmark = makeDecorator({
  name: "withRenderSpeedBenchmark",
  parameterName: PARAM_KEY,
  wrapper: StoryDecorator,
});
