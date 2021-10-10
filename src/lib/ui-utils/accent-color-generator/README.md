## Accent Color Generator

### Algorithm Overview

Accepts one input color, expressed as an RGB value (three integers, each between 0 and 255). Output five generated colors ranging from light to dark that are representative of the input color.

### Contrast Requirements

1. Minimum 4.5 contrast ratio between colors 1 and 4
2. Minimum 4.5 contrast ratio between colors 2 and 5
3. Minimum contrast ratio between color 5 and rgb(230, 230, 234)
4. Minimum contrast ratio between color 1 and rgb(38, 38, 44)
5. Contrast distance between the scale of colors is symmetrical

### Value storage

The original input color must be stored along with the five generated colors. The generated colors may be stored or cached. The algorithm will not be changed frequently, but assume that at some point in the future we might want to tweak it and re-generate all values based on the original input colors.

The API must provide all six colors (original color plus five generated colors). The original input color is not always included in the set of five generated colors even though the first color may often be identical to it.

### Algorithm Implementation

Core UI team has a Javascript implementation which meets all requirements. It has been written with zero dependancies and can be re-implemented in another language, if needed, for server-side calculations. The algorithm is divided into two supporting parts:

1. A function to calculate contrast ratio changes needed from the input color and to generate five colors, each based on the previous.

The input color will be used for the first color, unless it is too dark in which case it will be lightened exactly as much is necessary to meet contrast requirements for all colors in the set.

2. A function, `changeColor`, will lighten or darken a given color until a specified contrast ratio has been met. The contrast ratio of the returned color may be higher than the specified contrast ratio. If a color cannot be darkened or lightened to achieve the specified contrast ratio, then either black or white will be returned.
