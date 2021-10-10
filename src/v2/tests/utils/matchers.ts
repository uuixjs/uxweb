import { ShallowWrapper } from "enzyme";

interface EnzymeMatchers extends jasmine.CustomMatcherFactories {
  toHaveClass: jasmine.CustomMatcherFactory;
  toHaveElement: jasmine.CustomMatcherFactory;
}

export const Matchers: EnzymeMatchers = {
  toHaveClass: (): jasmine.CustomMatcher => {
    return {
      compare: (
        wrapper: ShallowWrapper<
          Record<string, unknown>,
          Record<string, unknown>
        >,
        expectedClass: string,
      ) => {
        const pass = wrapper.hasClass(expectedClass);
        return {
          pass,
          message: pass
            ? `Expected element ${wrapper.debug()} NOT to have class '${expectedClass}', but it did.`
            : `Expected element ${wrapper.debug()} to have class '${expectedClass}', but it did not.`,
        };
      },
    };
  },
  toHaveElement: (): jasmine.CustomMatcher => {
    return {
      compare: (
        wrapper: ShallowWrapper<
          Record<string, unknown>,
          Record<string, unknown>
        >,
        selector: string,
      ) => {
        const pass = wrapper.find(selector).length > 0;
        return {
          pass,
          message: pass
            ? `Expected ${wrapper.debug()} NOT to contain element for selector '${selector}'.`
            : `Expected ${wrapper.debug()} to contain element for selector '${selector}'.`,
        };
      },
    };
  },
  toHaveTestSelector: (): jasmine.CustomMatcher => {
    return {
      compare: (
        wrapper: ShallowWrapper<
          Record<string, unknown>,
          Record<string, unknown>
        >,
        testSelector: string,
      ) => {
        const pass =
          wrapper.find(`[data-test-selector="${testSelector}"]`).length > 0;
        return {
          pass,
          message: pass
            ? `Expected ${wrapper.text()} NOT to contain test selector '${testSelector}'.`
            : `Expected ${wrapper.text()} to contain test selector '${testSelector}'.`,
        };
      },
    };
  },
};

// @ts-ignore
jest.addMatchers(Matchers);
