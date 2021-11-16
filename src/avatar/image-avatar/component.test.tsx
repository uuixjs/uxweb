import { ImageAvatar, ImageAvatarProps } from "./component";

import { BorderRadius } from "lib";
import { PresenceStatus } from "../../presence";
import { setupShallowTest } from "../../../tests/helpers";

const AVATAR_SIZE = 30;
const AVATAR_ALT = "Test alt string";
const AVATAR_URL = "testURL";

function getRequiredProps(): ImageAvatarProps {
  return {
    size: AVATAR_SIZE,
    alt: AVATAR_ALT,
  };
}

function getOptionalProps(): ImageAvatarProps {
  return {
    borderRadius: BorderRadius.Medium,
    size: AVATAR_SIZE,
    alt: AVATAR_ALT,
    src: AVATAR_URL,
    onError: jest.fn(),
    onLoad: jest.fn(),
    presenceIndicator: true,
    presenceStatus: PresenceStatus.Online,
  };
}

const setupShallow = setupShallowTest(ImageAvatar, getRequiredProps);

describe("ImageAvatar", () => {
  it("renders image-avatar component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders image-avatar component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
