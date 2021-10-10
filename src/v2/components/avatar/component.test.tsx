import { Avatar, AvatarProps } from "./component";

import { BorderRadius } from "lib/ui-utils";
import { DefaultAvatar } from "./default-avatar";
import { ImageAvatar } from "./image-avatar";
import { PresenceStatus } from "../presence";
import { setupShallowTest } from "../../tests/helpers";

const AVATAR_SIZE = 30;
const AVATAR_ALT = "Test alt string";
const AVATAR_URL = "testURL";

function getRequiredProps(): AvatarProps {
  return {
    size: AVATAR_SIZE,
    alt: AVATAR_ALT,
    // userLogin being null (and src being undefined) represents a 'loading state'
    userLogin: null,
  };
}

function getOptionalProps(): AvatarProps {
  return {
    ...getRequiredProps(),
    userLogin: "pondelinp",
    borderRadius: BorderRadius.Medium,
    src: AVATAR_URL,
    onError: jest.fn(),
    onLoad: jest.fn(),
    presenceIndicator: true,
    presenceStatus: PresenceStatus.Online,
  };
}

const setup = setupShallowTest(Avatar, getRequiredProps);

describe("Avatar", () => {
  it("renders avatar component with required props (placeholder state)", () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders an ImageAvatar when a src property is provided, and it is not a 'default picture'", () => {
    const { wrapper } = setup(getOptionalProps());
    expect(wrapper.find(ImageAvatar)).toExist();
  });

  it("renders a DefaultAvatar when a src property is provided, but it is a 'default picture'", () => {
    const { wrapper } = setup({
      ...getOptionalProps(),
      src:
        "https://some.static.cdn/user-default-pictures/29391-asdf-profile_image-30x30.jpg",
    });
    expect(wrapper.find(DefaultAvatar)).toExist();
  });

  it("renders a DefaultAvatar when neither src nor srcSet property is provided'", () => {
    const { wrapper } = setup({
      ...getOptionalProps(),
      src: null,
      srcSet: undefined,
    });
    expect(wrapper.find(DefaultAvatar)).toExist();
  });

  it("renders an ImageAvatar when a srcSet property is provided, and it is not a 'default picture'", () => {
    const { wrapper } = setup(getOptionalProps());
    expect(wrapper.find(ImageAvatar)).toExist();
  });

  it("renders a DefaultAvatar when a srcSet property is provided, but it is a 'default picture'", () => {
    const { wrapper } = setup({
      ...getOptionalProps(),
      src: null,
      srcSet: {
        "1x":
          "https://some.static.cdn/user-default-pictures/29391-asdf-profile_image-30x30.jpg",
      },
    });
    expect(wrapper.find(DefaultAvatar)).toExist();
  });

  it("renders avatar component with all props", () => {
    const { wrapper } = setup(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
