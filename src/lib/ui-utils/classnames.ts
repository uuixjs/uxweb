import classnames from "classnames";

/*
  This fuction trims and sorts the classnames function
  to reduce snapshot thrashing downstream
*/
export function cn(...classes: any[]) {
  return classnames(...classes)
    .split(" ")
    .sort()
    .join(" ")
    .trim();
}
