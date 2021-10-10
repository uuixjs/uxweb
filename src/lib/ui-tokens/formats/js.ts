import { Dictionary, Property } from "../types";
import { render } from "mustache";
import { readFileSync } from "fs";

type TokenName = string;
type TokenValue = string | number;
type TokenGroup = "dark" | "light" | "variables";
type TokenData = { name: TokenName; value: TokenValue };
type GroupedTokenDataArrays = Record<TokenGroup, TokenData[]>;
type TokenMap = Record<TokenName, TokenValue>;
type GroupedTokenMaps = Record<TokenGroup, TokenMap>;

function convertPropertyToTokenData(property: Property): TokenData {
  return { name: property.name, value: property.value };
}

function convertThemePropertyToTokenData(property: Property): TokenData {
  return {
    // drop "themes" and "light/dark"
    name: property.path.slice(2).join("-"),
    value: property.value,
  };
}

function alphabetizePropertyTuples(
  token1: TokenData,
  token2: TokenData,
): number {
  return token1.name.localeCompare(token2.name);
}

// build a list of all properties split into theme groups or variables group
function convertAllPropertiesToGroupedDataArrays(
  allProperties: Property[],
): GroupedTokenDataArrays {
  return allProperties.reduce<GroupedTokenDataArrays>(
    (acc, property) => {
      if (property.attributes.category === "themes") {
        const theme = property.attributes.type as TokenGroup;
        acc[theme].push(convertThemePropertyToTokenData(property));
        return acc;
      }

      acc.variables.push(convertPropertyToTokenData(property));
      return acc;
    },
    {
      dark: [],
      light: [],
      variables: [],
    },
  );
}

function buildTokenMapFromDataArray(data: TokenData[]): TokenMap {
  return data.reduce<TokenMap>((acc, { name, value }) => {
    acc[name] = value;
    return acc;
  }, {});
}

function convertGroupedTuplesToTokenMaps(
  groupedData: GroupedTokenDataArrays,
): GroupedTokenMaps {
  return Object.entries(groupedData).reduce<GroupedTokenMaps>(
    (acc, [group, groupData]) => {
      groupData.sort(alphabetizePropertyTuples);
      acc[group as TokenGroup] = buildTokenMapFromDataArray(groupData);
      return acc;
    },
    {
      dark: {},
      light: {},
      variables: {},
    },
  );
}

/**
 * Returns all tokens in JSON format, grouped by type and alphabetized.
 */
export const jsonAllCustomFormat = {
  name: "json/all",
  formatter: ({ allProperties }: Dictionary) => {
    const groupedData = convertAllPropertiesToGroupedDataArrays(allProperties);
    return JSON.stringify(convertGroupedTuplesToTokenMaps(groupedData));
  },
};

/**
 * Returns tokens for a single theme in an alphabetized flat JSON object.
 */
export const jsonThemeCustomFormat = {
  name: "json/theme",
  formatter: ({ allProperties }: Dictionary) => {
    const data = allProperties
      .map(convertThemePropertyToTokenData)
      .sort(alphabetizePropertyTuples);

    return JSON.stringify(buildTokenMapFromDataArray(data));
  },
};

/**
 * Returns variables tokens in an alphabetized flat JSON object.
 */
export const jsonVariablesCustomFormat = {
  name: "json/variables",
  formatter: ({ allProperties }: Dictionary) => {
    const data = allProperties
      .map(convertPropertyToTokenData)
      .sort(alphabetizePropertyTuples);

    return JSON.stringify(buildTokenMapFromDataArray(data));
  },
};

const tsTemplate = `
/**
 * Literal union of all static token names
 */
export type StaticToken =
{{#variables}}
  | "{{name}}"
{{/variables}}
;

/**
 * Map of static tokens to their values
 */
export const StaticTokenMap = {{{variablesString}}} as const;

/**
 * Literal union of all theme token names
 */
export type ThemeToken =
{{#light}}
  | "{{name}}"
{{/light}}
;

/**
 * Map of theme tokens to their dark values
 */
export const DarkThemeMap = {{{darkThemeString}}} as const;

/**
 * Map of theme tokens to their light values
 */
export const LightThemeMap = {{{lightThemeString}}} as const;

/**
 * Map of themes to maps of theme token names with values, allowing theme-dynamic lookups
 */
export const DynamicThemeMap = {
  dark: DarkThemeMap,
  light: LightThemeMap,
} as const;

/**
 * Literal union type of all themes currently supported by Core UI
 */
export type Theme = keyof typeof DynamicThemeMap;

/**
 * All themes currently supported by Core UI
 */
export const THEMES: Theme[] = ['dark', 'light'];
`.trim();

const tsDicionaryTemplate = `
/**
 * Style Dictionary types.
 */
{{{dictionaryTypes}}}

/**
 * Map of all property values.
 */
export const DictionaryData = {{{dictionaryData}}} as const;
`.trim();

export const tsCustomFormat = {
  name: "ts/all",
  formatter: ({ allProperties }: Dictionary) => {
    const groupedData = convertAllPropertiesToGroupedDataArrays(allProperties);

    return render(tsTemplate, {
      ...groupedData,
      variablesString: JSON.stringify(
        buildTokenMapFromDataArray(groupedData.variables),
      ),
      darkThemeString: JSON.stringify(
        buildTokenMapFromDataArray(groupedData.dark),
      ),
      lightThemeString: JSON.stringify(
        buildTokenMapFromDataArray(groupedData.light),
      ),
    });
  },
};

export const tsDictionaryCustomFormat = {
  name: "ts/dictionary",
  formatter: ({ allProperties }: Dictionary) => {
    // Get the style-dictionary types
    const dictionaryTypes = readFileSync("src/types.ts", "utf-8");

    return render(tsDicionaryTemplate, {
      dictionaryData: JSON.stringify(allProperties),
      dictionaryTypes,
    });
  },
};
