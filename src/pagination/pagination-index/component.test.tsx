import { setupShallowTest } from "../../../tests/helpers";
import { PaginationIndex, PaginationIndexProps } from "./component";

const CURRENT_PAGE = 4;
const TOTAL_PAGES = 10;

function getRequiredProps(): PaginationIndexProps {
  return {
    currentPage: CURRENT_PAGE,
    totalPages: TOTAL_PAGES,
  };
}

function getOptionalProps(): PaginationIndexProps {
  return {
    currentPage: CURRENT_PAGE,
    totalPages: TOTAL_PAGES,
    onClick: jest.fn(),
  };
}

const setupShallow = setupShallowTest(PaginationIndex, getRequiredProps);

describe("PaginationIndex", () => {
  it("renders pagination index component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders pagination index component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
