export const ADDON_ID = "core-ui-render-speed";
export const PARAM_KEY = "coreUiRenderSpeed";
export const PANEL_ID = `${ADDON_ID}/panel`;

export enum Events {
  SetUpdateCount = "myaddon/setUpdateCount",
  SetMountCount = "myaddon/setMountCount",
  OnRenderUpdate = "myaddon/onRenderUpdate",
}
