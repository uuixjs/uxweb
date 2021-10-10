type EnumObject = Record<string, any>;

type KeyValue = [string, any];

export const Enum = {
  /**
   * entries
   */
  entries: (obj: EnumObject): KeyValue[] => {
    return Object.keys(obj || {}).map((i) => [i, obj[i]]);
  },

  /**
   * keys
   */
  keys: (obj: EnumObject): string[] => {
    return Object.keys(obj || {});
  },

  /**
   * values
   */
  values: (obj: EnumObject): string[] => {
    return Object.values(obj || {});
  },
};

export default Enum;
