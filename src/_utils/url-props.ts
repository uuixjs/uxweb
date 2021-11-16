import * as history from "history";

export function isExternalURL(to: history.LocationDescriptor) {
  let url: string | undefined;
  if (typeof to === "string") {
    url = to;
  } else if (to.pathname) {
    url = to.pathname;
  }
  if (url && (/^\w+:\/\//.test(url) || url.startsWith("//"))) {
    return true;
  }
  return false;
}

export const linkProtocolBlocklist = ["javascript:", "file:"];

export function hasAllowedProtocol(to?: history.LocationDescriptor) {
  if (to === undefined) {
    return true;
  }

  let url: string | undefined;
  if (typeof to === "string") {
    url = to;
  } else if (to.pathname) {
    url = to.pathname;
  }

  if (url === undefined) {
    return true;
  }

  const isBrowser = typeof window !== "undefined";
  const basePath: string = isBrowser
    ? window.location.toString()
    : "https://www.twitch.tv";

  const globalScope = isBrowser ? window : global;
  let protocol;
  try {
    // URL must exist on global context for SSR
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protocol = new (globalScope as any).URL(url, basePath).protocol;
  } catch (ex) {
    return false;
  }
  return !linkProtocolBlocklist.includes(protocol);
}

export function ensureSafeLink(link: string): string;
export function ensureSafeLink(
  link: history.LocationDescriptor,
): history.LocationDescriptor;
export function ensureSafeLink(
  link: history.LocationDescriptor,
): history.LocationDescriptor {
  if (hasAllowedProtocol(link)) {
    return link;
  }

  if (typeof link === "string") {
    return "";
  }

  return {
    ...link,
    pathname: "",
  };
}

export function isMailToLink(to: history.LocationDescriptor) {
  let url: string | undefined;
  if (typeof to === "string") {
    url = to;
  } else {
    return false;
  }

  if (url && url.toLowerCase().startsWith("mailto:")) {
    return true;
  }
  return false;
}
