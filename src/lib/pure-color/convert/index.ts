import cmyk2rgb from "./cmyk2rgb";
import hsl2hsv from "./hsl2hsv";
import hsl2rgb from "./hsl2rgb";
import hsl2string from "./hsl2string";
import hsv2hsl from "./hsv2hsl";
import hsv2rgb from "./hsv2rgb";
import hwb2rgb from "./hwb2rgb";
import lab2lch from "./lab2lch";
import lab2xyz from "./lab2xyz";
import lch2lab from "./lch2lab";
import rgb2cmyk from "./rgb2cmyk";
import rgb2grayscale from "./rgb2grayscale";
import rgb2hex from "./rgb2hex";
import rgb2hsl from "./rgb2hsl";
import rgb2hsv from "./rgb2hsv";
import rgb2hwb from "./rgb2hwb";
import rgb2lab from "./rgb2lab";
import rgb2string from "./rgb2string";
import rgb2xyz from "./rgb2xyz";
import xyz2lab from "./xyz2lab";
import xyz2rgb from "./xyz2rgb";

export * from "./cmyk2rgb";
export * from "./hsl2hsv";
export * from "./hsl2rgb";
export * from "./hsl2string";
export * from "./hsv2hsl";
export * from "./hsv2rgb";
export * from "./hwb2rgb";
export * from "./lab2lch";
export * from "./lab2xyz";
export * from "./lch2lab";
export * from "./rgb2cmyk";
export * from "./rgb2grayscale";
export * from "./rgb2hex";
export * from "./rgb2hsl";
export * from "./rgb2hsv";
export * from "./rgb2hwb";
export * from "./rgb2lab";
export * from "./rgb2string";
export * from "./rgb2xyz";
export * from "./xyz2lab";
export * from "./xyz2rgb";

export const convert = {
  cmyk: {
    rgb: cmyk2rgb,
  },
  hsl: {
    hsv: hsl2hsv,
    rgb: hsl2rgb,
    string: hsl2string,
  },
  hsv: {
    hsl: hsv2hsl,
    rgb: hsv2rgb,
  },
  hwb: {
    rgb: hwb2rgb,
  },
  lab: {
    lch: lab2lch,
    xyz: lab2xyz,
  },
  lch: {
    lab: lch2lab,
  },
  rgb: {
    cmyk: rgb2cmyk,
    hex: rgb2hex,
    hsl: rgb2hsl,
    hsv: rgb2hsv,
    hwb: rgb2hwb,
    lab: rgb2lab,
    xyz: rgb2xyz,
    grayscale: rgb2grayscale,
    string: rgb2string,
  },
  xyz: {
    lab: xyz2lab,
    rgb: xyz2rgb,
  },
};

export default convert;
