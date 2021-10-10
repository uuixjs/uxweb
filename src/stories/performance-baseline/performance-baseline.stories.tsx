import * as React from "react";
import { FC } from "react";

export default { title: "Performance | Baseline" };

export function EmptyStory() {
  return (
    <>
      This story has nothing in it! The time it takes to render this story
      represents the base cost to render one story.
    </>
  );
}

/**
 * Just a bunch of nested components.
 *
 */
export function FiftyDivs() {
  return (
    <>
      This story renders 50 HTML divs:
      {[...Array(50)].map((_, i) => (
        <div key={i}>{i + 1}</div>
      ))}
    </>
  );
}

export function FiftyComponents() {
  return (
    <>
      This story renders 50 simple React components:
      {[...Array(50)].map((_, i) => (
        <MySimpleComponent key={i}>{i + 1}</MySimpleComponent>
      ))}
    </>
  );
}

const MySimpleComponent: FC = (props) => <div>{props.children}</div>;
