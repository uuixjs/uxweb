export interface StyleDictionary {
  registerFilter: (args: RegisterFilterArgs) => void;
  registerTransform: (args: RegisterTransformArgs) => void;
  registerTransformGroup: (args: RegisterTransformGroupArgs) => void;
  registerFormat: (args: RegisterFormatArgs) => void;
}

export interface RegisterFilterArgs {
  name: string;
  matcher: Matcher;
}

export interface RegisterTransformArgs {
  name: string;
  type: string;
  transformer: Transformer;
  matcher?: Matcher;
}

export interface RegisterTransformGroupArgs {
  name: string;
  transforms: string[];
}

export interface RegisterFormatArgs {
  name: string;
}

type Matcher = (prop: Property) => boolean;
type Transformer = (prop: Property, options: Options) => string;

export interface Options {
  prefix: string;
}

export interface Property {
  readonly value: string | number;
  readonly original: OriginalValue;
  readonly name: string;
  readonly attributes: PropertyAttributes;
  readonly path: readonly string[];
}

export interface Dictionary {
  allProperties: Property[];
  properties: Properties;
}

export interface Properties {
  [key: string]: {};
}

export interface OriginalValue {
  value: number | string | HSLColorObject;
}

export interface HSLColorObject {
  h: number;
  s: number;
  l: number;
}

export interface PropertyAttributes {
  category: string;
  type?: string;
  item?: string;
  subitem?: string;
  state?: string;
}
