import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RGBColor, rgb2hsl } from "@uuixjs/uuixweb-lib";

export const useColorStorage = (): [
  string,
  Dispatch<SetStateAction<string>>,
] => {
  const [color, setColor] = useState(
    localStorage.getItem("color-context-value") || "#00FADC",
  );

  useEffect(() => {
    localStorage.setItem("color-context-value", color);
  }, [color]);

  return [color, setColor];
};

export const printColor = (rgb: RGBColor) => {
  const [h, s, l] = rgb2hsl(rgb);
  return `hsl(${Math.round(h)}, ${Math.round(s)}, ${Math.round(l)})`;
};
