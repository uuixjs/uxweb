import { AvatarProps } from "../component";
/**
 * Returns FALSE if the url or Source Set provided appears to be one of a set of specific
 * "default picutres" which were assigned automatically by the User Service,
 * a deprecated user experience also known as 'the blocky guys'.
 * This can be removed in favor of the simple check for src || srcSet
 * when https://jira.twitch.com/browse/IDPLAT-2425 is completed.
 */
export function userCustomizedImage(
  srcOrSrcSet: AvatarProps["src"] | AvatarProps["srcSet"],
): boolean {
  let stringToTest = "";
  if (typeof srcOrSrcSet === "string") {
    stringToTest = srcOrSrcSet;
  } else if (srcOrSrcSet && typeof srcOrSrcSet === "object") {
    // if given a srcset, we only care about any random image URL; size doesn't matter.
    // So, just grab the value of the first key.
    stringToTest = srcOrSrcSet[Object.keys(srcOrSrcSet)[0]];
  }
  return !stringToTest.match(
    /user-default-pictures\/[a-z0-9-]+?-profile_image-.+\.jpg$/i,
  );
}
