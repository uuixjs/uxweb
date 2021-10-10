import { Options, Property } from "../types";
import { snakeCase } from "lodash";
import Color from "tinycolor2";
import { hasCssKeywordValue } from "../utils";

const isColorToken = (prop: Property) => {
  // If this is a color property or a theme color property and does not
  // use a special keyword value, ie `currentColor`.
  return (
    (prop.attributes.category === "color" ||
      (prop.attributes.item && prop.attributes.item.startsWith("color-"))) &&
    !hasCssKeywordValue(prop)
  );
};

export const nameTiSnakeCustomTransform = {
  name: "name/ti/snake",
  type: "name",
  transformer(prop: Property, options: Options) {
    const path = prop.path.slice(1);
    return snakeCase([options.prefix].concat(path).join(" "));
  },
};

export const customColorCss = {
  name: "color/css-custom",
  type: "value",
  matcher: isColorToken,
  transformer(prop: Property) {
    if (typeof prop.value === "number") {
      return;
    }
    const color = Color(prop.value);
    if (color.getAlpha() === 1) {
      return color.toHexString();
    } else {
      return color.toRgbString();
    }
  },
};

export const colorUIColorSwiftCustomTransform = {
  name: "color/UIColorSwiftCustom",
  type: "value",
  matcher: isColorToken,
  transformer(prop: Property) {
    if (typeof prop.value === "number") {
      return;
    }
    const { r, g, b, a } = Color(prop.value).toRgb();
    const rFixed = (r / 255.0).toFixed(4);
    const gFixed = (g / 255.0).toFixed(4);
    const bFixed = (b / 255.0).toFixed(4);
    let hexStr = Color(prop.value).toHex8();
    hexStr = "#" + (a !== 1.0 ? hexStr.slice(6) : "") + hexStr.slice(0, 6);
    return `UIColor(red: ${rFixed}, green: ${gFixed}, blue: ${bFixed}, alpha: ${a}) /* ${hexStr} */`;
  },
};

export const cssCustomTransformGroup = {
  name: "css-custom",
  transforms: [
    "attribute/cti",
    "name/cti/kebab",
    "time/seconds",
    "content/icon",
    "size/rem",
    "color/css-custom",
  ],
};

export const scssCustomTransformGroup = {
  name: "scss-custom",
  transforms: [
    "attribute/cti",
    "name/cti/kebab",
    "time/seconds",
    "content/icon",
    "size/rem",
    "color/css-custom",
  ],
};

export const iosSwiftSeparateCustomTransformGroup = {
  name: "ios-swift-separate-custom",
  transforms: [
    "attribute/cti",
    "name/ti/camel",
    "color/UIColorSwiftCustom",
    "content/swift/literal",
    "asset/swift/literal",
    "size/swift/remToCGFloat",
    "font/swift/literal",
  ],
};
