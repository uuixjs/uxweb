import * as React from "react";

import { AssistiveText, InjectLayout, TextType } from "v2";

export default { title: AssistiveText.displayName };

export const examples = () => (
  <AssistiveText>This text is not visible</AssistiveText>
);

export const withTextType = () => (
  <InjectLayout border>
    <div style={{ maxWidth: 360 }}>
      <AssistiveText type={TextType.Span}>
        This text is not visible and is also a span!
      </AssistiveText>
    </div>
  </InjectLayout>
);
