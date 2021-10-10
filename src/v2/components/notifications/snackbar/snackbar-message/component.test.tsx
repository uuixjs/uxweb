import { setupShallowTest } from "../../../../tests/helpers";
import { Layout } from "../../../layout/layout";
import { NotificationType } from "../../notification";
import { SnackbarMessage, SnackbarMessageProps } from "./component";

function getOptionalProps(): SnackbarMessageProps {
  return {
    title: "Snackbar Title",
    iconType: NotificationType.Info,
  };
}

const setupShallow = setupShallowTest(SnackbarMessage);
describe("SnackbarMessage", () => {
  it("renders Snackbar Message component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders Snackbar Message component with Element as title", () => {
    const { wrapper } = setupShallow({
      title: <Layout>JSX Element as Title</Layout>,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
