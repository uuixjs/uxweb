import convert from "../convert";
import fixtures from "./fixtures/convert.json";

describe("convert", () => {
  function round(arr) {
    return arr.map(Math.round);
  }

  function equal(actual, expected) {
    if (!Array.isArray(expected)) {
      expect(actual).toEqual(expected);
    } else {
      expect(round(actual)).toEqual(expected);
    }
  }

  function test(from, to, colors) {
    const conversion = convert[from][to];
    colors.forEach(function (color) {
      equal(conversion(color[0]), color[1]);
    });
  }

  // dyanmically create tests for hwb...
  for (let angle = 0; angle <= 360; angle++) {
    // all extreme value should give black, white or grey
    fixtures.hwb.rgb.push([
      [angle, 0, 100],
      [0, 0, 0],
    ]);
    fixtures.hwb.rgb.push([
      [angle, 100, 0],
      [255, 255, 255],
    ]);
    fixtures.hwb.rgb.push([
      [angle, 100, 100],
      [128, 128, 128],
    ]);
  }

  // run tests
  for (const from in fixtures) {
    for (const to in fixtures[from]) {
      it("converting: " + from + "2" + to, () => {
        test(from, to, fixtures[from][to]);
      });
    }
  }
});
