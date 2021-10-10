import {
  ensureSafeLink,
  hasAllowedProtocol,
  isMailToLink,
  linkProtocolBlocklist,
} from "./url-props";

describe("url-props utils", () => {
  describe("hasAllowedProtocol", () => {
    const dangerousPaths: string[] = [];
    linkProtocolBlocklist.forEach((protocol) => {
      dangerousPaths.push(`${protocol}//www.twitch.tv/test`);
      dangerousPaths.push(`${protocol}test`);
      dangerousPaths.push(`   ${protocol}test`);
      dangerousPaths.push(`${protocol.toUpperCase()}test`);
    });

    it("handles allowed string paths", () => {
      expect(hasAllowedProtocol("https://www.twitch.tv/test")).toBe(true);
      expect(hasAllowedProtocol("intent:something")).toBe(true);
    });

    it("handles allowed LocationDescriptor paths", () => {
      expect(
        hasAllowedProtocol({
          pathname: "https://www.twitch.tv/test",
        }),
      ).toBe(true);

      expect(
        hasAllowedProtocol({
          pathname: "intent:something",
        }),
      ).toBe(true);
    });

    it("disallows dangerous protocols", () => {
      dangerousPaths.forEach((path) => {
        expect(hasAllowedProtocol(path)).toBe(false);
      });

      dangerousPaths.forEach((path) => {
        expect(hasAllowedProtocol({ pathname: path })).toBe(false);
      });
    });

    it("returns true for undefined string path", () => {
      expect(hasAllowedProtocol(undefined)).toBe(true);
    });

    it("returns true for LocationDescriptor with undefined path", () => {
      expect(hasAllowedProtocol({ pathname: undefined })).toBe(true);
    });
  });

  describe("ensureSafeLink", () => {
    it("returns the link for safe links", () => {
      expect(ensureSafeLink("https://www.twitch.tv")).toBe(
        "https://www.twitch.tv",
      );
      expect(ensureSafeLink({ pathname: "https://www.twitch.tv" })).toEqual({
        pathname: "https://www.twitch.tv",
      });
    });

    it("returns empty string for unsafe links", () => {
      expect(ensureSafeLink("javascript:alert(1)")).toBe("");
      expect(ensureSafeLink({ pathname: "javascript:alert(1)" })).toEqual({
        pathname: "",
      });
    });
  });

  describe("isMailToLink", () => {
    it("returns true for links including mailto:", () => {
      expect(isMailToLink("mailto:123@fakeemailstreet.com")).toBe(true);
    });

    it("returns false for links not including mailto:", () => {
      expect(isMailToLink("https://www.twitch.tv/")).toBe(false);
      expect(isMailToLink("https://www.amazon.com/")).toBe(false);
      expect(isMailToLink("https://mailto.twitch.tv/")).toBe(false);
      expect(isMailToLink("x:mailto:123@twitch.tv")).toBe(false);
      expect(isMailToLink("mailtofoobar:123@twitch.tv")).toBe(false);
      expect(isMailToLink("https://twitch.tv/?a=mailto:123@twitch.tv")).toBe(
        false,
      );
    });

    it("returns false for non string links", () => {
      expect(isMailToLink({ pathname: "123@fakeemailstreet.com" })).toBe(false);
      expect(isMailToLink("https://www.amazon.com/")).toBe(false);
    });
  });
});
