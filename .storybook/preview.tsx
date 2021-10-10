import "loki/configure-react";
// Add Core UI CSS
import "../src/lib/ui-scss-compat/css/base.css";
// Add custom font and base styling.
import "./preview.scss";
import "../src/stories/components"; // import components first

import * as React from "react";

import { PreviewDecorator } from "../src/stories/components/preview-decorator";
import { addDecorator } from "@storybook/react";
import { withCoreUIRoot } from "../src/stories/_core/addon-features";
import { withPerformance } from "storybook-addon-performance";
import { withRenderSpeedBenchmark } from "../src/stories/_core/addon-render-speed";

// Global story preview decorator.
addDecorator((storyFn) => <PreviewDecorator>{storyFn()}</PreviewDecorator>);

// Controls classNames on the root for touch, hover, and theme features.
addDecorator(withCoreUIRoot);

addDecorator(withPerformance);

addDecorator(withRenderSpeedBenchmark);