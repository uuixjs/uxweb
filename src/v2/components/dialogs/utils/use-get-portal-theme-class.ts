import {
  CORE_UI_ROOT_DARK_THEME_SELECTOR,
  CORE_UI_ROOT_LIGHT_THEME_SELECTOR,
  useTheme,
} from "lib";

/**
 * TEMPORARY HELPER, DO NOT USE THIS!
 *
 * This exists to add an extra root class name around modals, dialogs, and tooltips
 * to support an edge case where SSR applications may omit the root theme class names
 * on the `<html>` node and instead add them lower within the page.
 *
 * react-modal portals content high up just inside of the `<body>` tag, where it would be
 * out of scope of the DOM node where the root class names are placed.
 *
 * This fixes CSS variable resolution for this edge case by adding an extra, redundant
 * root class name onto the react-modal portal root.
 *
 * This should be deleted after we complete the migration from scss to styled-components,
 * because then applications which cannot set class names on the `<html>` node can disable
 * CSS vars mode which will eliminate the need for any root class names at all.
 *
 * To be removed by: https://jira.xarth.tv/browse/COREUI-3376
 *
 * @deprecated DO NOT USE THIS, except for the special case described above.
 */
export function useGetPortalThemeClass() {
  const theme = useTheme();

  if (!theme) {
    return;
  }

  if (theme.name === "light") {
    return CORE_UI_ROOT_LIGHT_THEME_SELECTOR;
  }

  if (theme.name === "dark") {
    return CORE_UI_ROOT_DARK_THEME_SELECTOR;
  }

  // Do not return any class name if no theme context value exists
}
