import rgb from "../parse/rgb";
import hex from "../parse/hex";
import hsl from "../parse/hsl";
import parse from "../parse";
import fixtures from "./fixtures/parse.json";

const parsers = {
  rgb,
  hex,
  hsl,
  parse,
};

function test(from, colors) {
  const parser = parsers[from];
  colors.forEach(function (color) {
    expect(parser(color[0])).toEqual(color[1]);
  });
}

for (const space in parsers) {
  it("parsing: " + space, () => {
    test(space, fixtures[space]);
  });
}
