import { ADDON_ID, ADDON_TITLE } from "./constants";
import { addons, types } from "@storybook/addons";

import React from 'react';
import { ToolbarSettingsForm } from "./components/toolbar-settings-form";

addons.register(ADDON_ID, (api) => {
  addons.add(ADDON_ID, {
    title: ADDON_TITLE,
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === "story",
    // eslint-disable-next-line react/display-name
    render: () => <ToolbarSettingsForm api={api} />,
  });
});
