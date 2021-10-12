import * as React from "react";
import { TransitionGroupDiscoTest } from "./story-components/transition-group-disco-test";
import { TransitionGroupExample } from "./story-components/transition-group-example";

export default { title: "TransitionGroup" };

export const examples = () => (
  <>
    <TransitionGroupExample />
    <TransitionGroupDiscoTest />
  </>
);
