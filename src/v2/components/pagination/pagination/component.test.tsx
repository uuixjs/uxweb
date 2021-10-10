import { setupShallowTest } from "../../../tests/helpers";
import { Pagination, PaginationProps } from "./component";

const ARIA_LABEL = "Test Label";
const CURRENT_PAGE = 4;
const TOTAL_PAGES = 10;

function getRequiredProps(): PaginationProps {
  return {
    previousPageButtonAriaLabel: ARIA_LABEL,
    nextPageButtonAriaLabel: ARIA_LABEL,
    currentPage: CURRENT_PAGE,
    totalPages: TOTAL_PAGES,
  };
}

function getOptionalProps(): PaginationProps {
  return {
    previousPageButtonAriaLabel: ARIA_LABEL,
    nextPageButtonAriaLabel: ARIA_LABEL,
    currentPage: CURRENT_PAGE,
    totalPages: TOTAL_PAGES,
    onClickPrevious: jest.fn(),
    onClickNext: jest.fn(),
    onClickIndex: jest.fn(),
  };
}

const setupShallow = setupShallowTest(Pagination, getRequiredProps);

describe("Pagination", () => {
  it("renders pagination component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders pagination component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
