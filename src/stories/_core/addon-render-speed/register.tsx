import { addons, types } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";
import { MyPanel } from "./components/panel";
import { ADDON_ID, PANEL_ID, PARAM_KEY } from "./constants";

addons.register(ADDON_ID, (_) => {
  const render = ({ active, key }: { active: boolean; key: string }) => (
    <AddonPanel active={active} key={key}>
      <MyPanel />
    </AddonPanel>
  );
  const title = "Render Speed";

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title,
    render,
    paramKey: PARAM_KEY,
  });
});
