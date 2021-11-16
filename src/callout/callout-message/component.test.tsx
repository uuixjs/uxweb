import { setupShallowTest } from "../../../tests/helpers";
import { Layout } from "../../layout/layout";
import { CalloutMessage, CalloutMessageProps } from "./component";

function getOptionalProps(): CalloutMessageProps {
  return {
    pill: {
      label: "New",
    },
    title: "Callout Title",
    description: "Callout Description",
    inline: true,
  };
}

const setupShallow = setupShallowTest(CalloutMessage);
describe("CalloutMessage", () => {
  it("renders Callout Message component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders Callout Message component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders Callout Message component with Element as title", () => {
    const { wrapper } = setupShallow({
      title: <Layout>JSX Element as Title</Layout>,
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("renders Callout Message component with React Node as description", () => {
    const { wrapper } = setupShallow({
      description: <Layout>ReactNode as description</Layout>,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
