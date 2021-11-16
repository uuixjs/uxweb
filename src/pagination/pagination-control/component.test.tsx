import { setupShallowTest } from "../../../tests/helpers";
import {
  PaginationControl,
  PaginationControlProps,
  PaginationControlType,
} from "./component";

const TYPE = PaginationControlType.Next;
const ARIA_LABEL = "Test Label";
const CURRENT_PAGE = 4;
const TOTAL_PAGES = 10;

function getRequiredProps(): PaginationControlProps {
  return {
    type: TYPE,
    "aria-label": ARIA_LABEL,
    currentPage: CURRENT_PAGE,
    totalPages: TOTAL_PAGES,
  };
}

function getOptionalProps(): PaginationControlProps {
  return {
    "aria-label": ARIA_LABEL,
    currentPage: CURRENT_PAGE,
    totalPages: TOTAL_PAGES,
    onClick: jest.fn(),
    type: PaginationControlType.Next,
  };
}

const setupShallow = setupShallowTest(PaginationControl, getRequiredProps);

describe("PaginationControl", () => {
  it("renders pagination control component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders pagination control component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
