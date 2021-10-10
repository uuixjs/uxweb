import * as React from "react";

import {
  Background,
  InFeatureNotification,
  InFeatureNotificationProps,
  NotificationType,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";

export default { title: InFeatureNotification.displayName };

export const examples = () => {
  const requireProps: InFeatureNotificationProps = {
    closeButton: {
      "aria-label": "Close",
    },
    message: {
      title: "A short title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consectetur mi ac cursus pellentesque.",
    },
    type: NotificationType.Info,
  };

  return (
    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "message",
          propValues: [
            {
              title: "A short title",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consectetur mi ac cursus pellentesque.",
              link: { linkTo: "", children: "Link to more information" },
            },
            {
              title:
                "A long title used to demonstrate how longer titles are used in context with the in feature notification component.",
              description:
                "Donec aliquam et orci nec imperdiet. Integer iaculis dapibus suscipit. Phasellus vulputate sit amet dolor sit amet ultricies. Cras pulvinar eleifend ante, eu sagittis elit finibus ac. Ut rutrum id augue eu gravida. Phasellus sed lectus dolor. Fusce sit amet nunc fermentum, sollicitudin velit vel, laoreet lectus. Sed tempus erat ante, quis pretium justo mollis et.",
            },
            {
              title: "A short title",
              description: "Integer consectetur mi ac cursus pellentesque.",
              link: { linkTo: "", children: "Link to more information" },
              inline: true,
            },
          ],
        },
        {
          propKey: "type",
          propValues: [
            NotificationType.Error,
            NotificationType.Info,
            NotificationType.Success,
            NotificationType.Warning,
          ],
        },
        {
          propKey: "avatar",
          propValues: [undefined, { alt: "Avatar" }],
        },
        {
          propKey: "actions",
          propValues: [
            undefined,
            { primaryButton: { children: "Action Item" } },
            {
              primaryButton: { children: "Action Item 1" },
              secondaryButton: { children: "Action Item 2" },
            },
          ],
        },
        { propKey: "closeButton", propValues: [undefined, { to: "" }] },
        {
          propKey: "background",
          propValues: [Background.Base, Background.Alt, Background.Alt2],
        },
      ]}
    >
      <InFeatureNotification {...requireProps} />
    </CombinationGenerator>
  );
};

export const withCustomContent = () => (
  <InFeatureNotification
    type={NotificationType.Info}
    closeButton={{
      "aria-label": "",
      onClick: () => alert("click"),
    }}
  >
    <div>Custom Thing</div>
  </InFeatureNotification>
);
