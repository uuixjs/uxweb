import { Property } from "../types";

export const excludeThemesCustomFilter = {
  name: "excludeThemes",
  matcher: (prop: Property) => prop.attributes.category !== "themes",
};

export const isThemeColor = {
  name: "isThemeColor",
  matcher: (prop: Property) =>
    prop.attributes.category === "themes" &&
    prop.attributes.item &&
    prop.attributes.item.startsWith("color"),
};
