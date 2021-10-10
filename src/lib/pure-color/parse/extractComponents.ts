const component = /-?\d+(\.\d+)?%?/g;

export function extractComponents(color: string) {
  return color.match(component);
}

export default extractComponents;
